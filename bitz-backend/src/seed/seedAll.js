import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import User from '../models/User.js';
import Canteen from '../models/Canteen.js';

const result = dotenv.config();
if (result.error) {
  console.warn('Warning: .env file not found, falling back to defaults.');
}

const DEMO_ADMIN = {
  name: 'Rahul Sharma',
  email: 'admin@bitez.com',
  phone: '+919876543210',
  password: 'Admin@123!',
};

const DEMO_STUDENT = {
  name: 'Priya Patel',
  email: 'student@bitez.com',
  phone: '+919876543211',
  password: 'Student@123!',
};

const DEMO_CANTEEN = {
  name: 'Campus Food Court',
  location: 'Ground Floor, Main Building',
  timings: '8:00 AM - 8:00 PM',
  contactPhone: '+919876543210',
  contactEmail: 'admin@bitez.com',
  menuItems: [
    { name: 'Veg Burger', price: 60, category: 'Burgers', available: true },
    { name: 'Chicken Burger', price: 80, category: 'Burgers', available: true },
    { name: 'Paneer Tikka Pizza', price: 120, category: 'Pizza', available: true },
    { name: 'Margherita Pizza', price: 100, category: 'Pizza', available: true },
    { name: 'Cold Coffee', price: 50, category: 'Beverages', available: true },
    { name: 'Masala Chai', price: 20, category: 'Beverages', available: true },
    { name: 'Fresh Lime Soda', price: 30, category: 'Beverages', available: true },
    { name: 'Samosa (2 pcs)', price: 25, category: 'Snacks', available: true },
    { name: 'French Fries', price: 45, category: 'Snacks', available: true },
    { name: 'Veg Fried Rice', price: 70, category: 'Main Course', available: true },
    { name: 'Paneer Butter Masala', price: 90, category: 'Main Course', available: true },
    { name: 'Dal Fry', price: 55, category: 'Main Course', available: true },
    { name: 'Jeera Rice', price: 50, category: 'Main Course', available: true },
    { name: 'Gulab Jamun (2 pcs)', price: 35, category: 'Desserts', available: true },
    { name: 'Chocolate Brownie', price: 55, category: 'Desserts', available: true },
  ],
};

const seed = async () => {
  await connectDB(process.env.MONGODB_URI);

  try {
    // --- Admin ---
    let admin = await User.findOne({ email: DEMO_ADMIN.email });
    if (!admin) {
      const hashedPassword = await bcrypt.hash(DEMO_ADMIN.password, 10);
      admin = await User.create({
        name: DEMO_ADMIN.name,
        email: DEMO_ADMIN.email,
        phone: DEMO_ADMIN.phone,
        password: hashedPassword,
        role: 'admin',
      });
      console.log('Admin created:', admin.email);
    } else {
      console.log('Admin already exists:', admin.email);
    }

    // --- Student ---
    let student = await User.findOne({ email: DEMO_STUDENT.email });
    if (!student) {
      const hashedPassword = await bcrypt.hash(DEMO_STUDENT.password, 10);
      student = await User.create({
        name: DEMO_STUDENT.name,
        email: DEMO_STUDENT.email,
        phone: DEMO_STUDENT.phone,
        password: hashedPassword,
        role: 'student',
      });
      console.log('Student created:', student.email);
    } else {
      console.log('Student already exists:', student.email);
    }

    // --- Canteen ---
    let canteen = await Canteen.findOne({ ownerId: admin._id });
    if (!canteen) {
      canteen = await Canteen.create({
        ownerId: admin._id,
        name: DEMO_CANTEEN.name,
        location: DEMO_CANTEEN.location,
        timings: DEMO_CANTEEN.timings,
        contactPhone: DEMO_CANTEEN.contactPhone,
        contactEmail: DEMO_CANTEEN.contactEmail,
        menuItems: DEMO_CANTEEN.menuItems,
      });
      console.log('Canteen created:', canteen.name, 'with', canteen.menuItems.length, 'menu items');
    } else {
      console.log('Canteen already exists:', canteen.name);
    }

    console.log('\n--- Demo Credentials ---');
    console.log('Admin  :', DEMO_ADMIN.email, '/', DEMO_ADMIN.password);
    console.log('Student:', DEMO_STUDENT.email, '/', DEMO_STUDENT.password);
    console.log('-------------------------\n');
  } finally {
    await mongoose.connection.close();
  }
};

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Seed failed:', error.message);
    process.exit(1);
  });
