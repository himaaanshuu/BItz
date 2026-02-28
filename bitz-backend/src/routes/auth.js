import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Otp from '../models/Otp.js';
import auth from '../middleware/auth.js';
import requireRole from '../middleware/requireRole.js';
import { isValidEmail, isValidPhone, validatePassword, normalizePhone } from '../utils/validation.js';
import { generateOtp, hashOtp, compareOtp } from '../utils/otp.js';
import { sendOtpSms } from '../utils/notification.js';
import { safeErrorMessage } from '../utils/safeError.js';

const router = express.Router();

const signToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

router.post('/student/register', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: 'Name, email, phone, and password are required.' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: 'Please enter a valid email address.' });
    }

    if (!isValidPhone(phone)) {
      return res.status(400).json({ message: 'Please enter a valid phone number with country code.' });
    }

    const passwordCheck = validatePassword(password);
    if (!passwordCheck.valid) {
      return res.status(400).json({ message: passwordCheck.message });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'Email already in use.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      phone: normalizePhone(phone),
      password: hashedPassword,
      role: 'student',
    });

    return res.status(201).json({
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      message: 'Student account created. Please request OTP to login.',
    });
  } catch (error) {
    return res.status(500).json({ message: safeErrorMessage('Registration failed', error) });
  }
});

const requestOtpForUser = async ({ user, email, phone }) => {
  const otp = generateOtp();
  const hashedOtp = hashOtp(otp);
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  await Otp.deleteMany({ userId: user._id, purpose: 'login' });
  await Otp.create({
    userId: user._id,
    email,
    phone,
    purpose: 'login',
    codeHash: hashedOtp,
    expiresAt,
  });

  await sendOtpSms({ to: phone, otp });

  return otp;
};

const handleOtpRequest = async ({ req, res, role }) => {
  const { email, phone } = req.body;

  if (!email || !phone) {
    return res.status(400).json({ message: 'Email and phone are required.' });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ message: 'Please enter a valid email address.' });
  }

  if (!isValidPhone(phone)) {
    return res.status(400).json({ message: 'Please enter a valid phone number with country code.' });
  }

  const user = await User.findOne({ email, role });
  if (!user) {
    return res.status(404).json({ message: 'Account not found.' });
  }

  const phoneNorm = normalizePhone(phone);
  const userPhoneNorm = normalizePhone(user.phone);
  if (userPhoneNorm !== phoneNorm) {
    return res.status(401).json({ message: 'Phone number does not match our records.' });
  }

  const otp = await requestOtpForUser({ user, email, phone });
  const response = { message: 'OTP sent to email and phone.' };
  if (process.env.NODE_ENV !== 'production') {
    response.otp = otp;
  }
  return res.status(200).json(response);
};

router.post('/student/request-otp', async (req, res) => {
  try {
    return await handleOtpRequest({ req, res, role: 'student' });
  } catch (error) {
    return res.status(500).json({ message: safeErrorMessage('OTP request failed', error) });
  }
});

router.post('/admin/request-otp', async (req, res) => {
  try {
    return await handleOtpRequest({ req, res, role: 'admin' });
  } catch (error) {
    return res.status(500).json({ message: safeErrorMessage('OTP request failed', error) });
  }
});

const handleLogin = async ({ req, res, role }) => {
  const { email, password } = req.body;
  let { otp } = req.body;
  otp = typeof otp === 'string' ? otp.trim() : (otp != null ? String(otp).trim() : '');

  if (!email || !password || !otp) {
    return res.status(400).json({ message: 'Email, password, and OTP are required.' });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ message: 'Please enter a valid email address.' });
  }

  const user = await User.findOne({ email, role });
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  const otpRecord = await Otp.findOne({ userId: user._id, purpose: 'login' });
  if (!otpRecord || otpRecord.expiresAt < new Date()) {
    return res.status(401).json({ message: 'OTP expired. Please request a new one.' });
  }

  if (!compareOtp(otp, otpRecord.codeHash)) {
    return res.status(401).json({ message: 'Invalid OTP.' });
  }

  await Otp.deleteMany({ userId: user._id, purpose: 'login' });

  const token = signToken(user);
  return res.status(200).json({
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
};

router.post('/student/login', async (req, res) => {
  try {
    return await handleLogin({ req, res, role: 'student' });
  } catch (error) {
    return res.status(500).json({ message: safeErrorMessage('Login failed', error) });
  }
});

router.post('/admin/login', async (req, res) => {
  try {
    return await handleLogin({ req, res, role: 'admin' });
  } catch (error) {
    return res.status(500).json({ message: safeErrorMessage('Login failed', error) });
  }
});

router.post('/change-password', auth, requireRole('admin'), async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Current password and new password are required.' });
    }

    const passwordCheck = validatePassword(newPassword);
    if (!passwordCheck.valid) {
      return res.status(400).json({ message: passwordCheck.message });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Current password is incorrect.' });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return res.status(200).json({ message: 'Password updated successfully.' });
  } catch (error) {
    return res.status(500).json({ message: safeErrorMessage('Password update failed', error) });
  }
});

router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: safeErrorMessage('Failed to load profile', error) });
  }
});

export default router;
