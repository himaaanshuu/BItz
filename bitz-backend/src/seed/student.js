import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import User from '../models/User.js';
import { isValidEmail, isValidPhone, validatePassword, normalizePhone } from '../utils/validation.js';

const result = dotenv.config();
if (result.error) {
  console.warn('Warning: .env file not found, falling back to defaults/environment variables.');
}

const DEMO_EMAIL = 'student@bitz.demo';
const DEMO_PASSWORD = 'DemoStudent123!';
const DEMO_NAME = 'Demo Student';
const DEMO_PHONE = '+911234567891';

const seedStudent = async () => {
  const isDemo = process.env.SEED_DEMO === 'true' || !process.env.STUDENT_EMAIL;

  const email    = isDemo ? DEMO_EMAIL    : process.env.STUDENT_EMAIL;
  const password = isDemo ? DEMO_PASSWORD : process.env.STUDENT_PASSWORD;
  const name     = isDemo ? DEMO_NAME     : process.env.STUDENT_NAME;
  const rawPhone = isDemo ? DEMO_PHONE    : process.env.STUDENT_PHONE;

  if (!isValidEmail(email)) {
    throw new Error('STUDENT_EMAIL is invalid.');
  }

  const phone = normalizePhone(rawPhone);
  if (!isValidPhone(phone)) {
    throw new Error('STUDENT_PHONE must include country code, e.g. +919876543210');
  }

  const passwordCheck = validatePassword(password);
  if (!passwordCheck.valid) {
    throw new Error(passwordCheck.message);
  }

  await connectDB(process.env.MONGODB_URI);

  try {
    const existing = await User.findOne({ $or: [{ email }, { phone }] });

    if (existing) {
      if (isDemo) {
        console.log('Demo student already exists.');
        console.log('Login: email =', DEMO_EMAIL);
        console.log('Use the password you configured in DEMO_PASSWORD.');
      } else {
        console.log('Student already exists (matched on email or phone).');
      }
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role: 'student',
    });

    console.log('Student user created successfully.');
    if (isDemo) {
      console.log('\n--- Demo student credentials ---');
      console.log('Email   :', DEMO_EMAIL);
      console.log('Password: (see DEMO_PASSWORD constant in seedStudent.js)');
      console.log('Phone   :', DEMO_PHONE);
      console.log('-------------------------------\n');
    }
  } finally {
    await mongoose.connection.close();
  }
};

seedStudent()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Student seed failed:', error.message);
    process.exit(1);
  });
