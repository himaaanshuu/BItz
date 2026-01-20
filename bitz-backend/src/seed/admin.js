import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import User from '../models/User.js';
import { isValidEmail, isValidPhone, validatePassword } from '../utils/validation.js';

dotenv.config();

const seedAdmin = async () => {
  const { ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME, ADMIN_PHONE } = process.env;

  if (!ADMIN_EMAIL || !ADMIN_PASSWORD || !ADMIN_PHONE) {
    throw new Error('ADMIN_EMAIL, ADMIN_PASSWORD, and ADMIN_PHONE are required.');
  }

  if (!isValidEmail(ADMIN_EMAIL)) {
    throw new Error('ADMIN_EMAIL is invalid.');
  }

  if (!isValidPhone(ADMIN_PHONE)) {
    throw new Error('ADMIN_PHONE must include country code, e.g. +919876543210');
  }

  const passwordCheck = validatePassword(ADMIN_PASSWORD);
  if (!passwordCheck.valid) {
    throw new Error(passwordCheck.message);
  }

  await connectDB(process.env.MONGODB_URI);

  const existing = await User.findOne({ email: ADMIN_EMAIL });
  if (existing) {
    console.log('Admin already exists.');
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
  await User.create({
    name: ADMIN_NAME || 'Admin',
    email: ADMIN_EMAIL,
    phone: ADMIN_PHONE,
    password: hashedPassword,
    role: 'admin',
  });

  console.log('Admin user created successfully.');
  process.exit(0);
};

seedAdmin().catch((error) => {
  console.error('Admin seed failed:', error.message);
  process.exit(1);
});
