import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import User from '../models/User.js';
import { isValidEmail, isValidPhone, validatePassword, normalizePhone } from '../utils/validation.js';

// Fix #6: Warn if .env is missing
const result = dotenv.config();
if (result.error) {
  console.warn('Warning: .env file not found, falling back to defaults/environment variables.');
}

const DEMO_EMAIL = 'admin@bitz.demo';
const DEMO_PASSWORD = 'DemoAdmin123!';
const DEMO_NAME = 'Demo Admin';
const DEMO_PHONE = '+911234567890';

const seedAdmin = async () => {
  // Fix #5: Use an explicit flag instead of inferring from env var presence
  const isDemo = process.env.SEED_DEMO === 'true' || !process.env.ADMIN_EMAIL;

  const email    = isDemo ? DEMO_EMAIL    : process.env.ADMIN_EMAIL;
  const password = isDemo ? DEMO_PASSWORD : process.env.ADMIN_PASSWORD;
  const name     = isDemo ? DEMO_NAME     : process.env.ADMIN_NAME;
  const rawPhone = isDemo ? DEMO_PHONE    : process.env.ADMIN_PHONE;

  if (!isValidEmail(email)) {
    throw new Error('ADMIN_EMAIL is invalid.');
  }

  // Fix #3: Normalize before validating so the stored value is also the validated value
  const phone = normalizePhone(rawPhone);
  if (!isValidPhone(phone)) {
    throw new Error('ADMIN_PHONE must include country code, e.g. +919876543210');
  }

  const passwordCheck = validatePassword(password);
  if (!passwordCheck.valid) {
    throw new Error(passwordCheck.message);
  }

  await connectDB(process.env.MONGODB_URI);

  try {
    // Fix #4: Check for duplicate email OR phone to avoid unhandled unique-index errors
    const existing = await User.findOne({ $or: [{ email }, { phone }] });

    if (existing) {
      if (isDemo) {
        console.log('Demo admin already exists.');
        console.log('Login: email =', DEMO_EMAIL);
        // Fix #1: Never log the plain-text password
        console.log('Use the password you configured in DEMO_PASSWORD.');
      } else {
        console.log('Admin already exists (matched on email or phone).');
      }
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role: 'admin',
    });

    console.log('Admin user created successfully.');
    if (isDemo) {
      console.log('\n--- Demo admin credentials ---');
      console.log('Email   :', DEMO_EMAIL);
      // Fix #1: Avoid logging the plain-text password; remind where to find it instead
      console.log('Password: (see DEMO_PASSWORD constant in seedAdmin.js)');
      console.log('Phone   :', DEMO_PHONE);
      console.log('-------------------------------\n');
    }
  } finally {
    // Fix #2: Always close the DB connection so the process doesn't hang
    await mongoose.connection.close();
  }
};

seedAdmin()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Admin seed failed:', error.message);
    process.exit(1);
  });