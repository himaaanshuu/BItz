import express from 'express';
import Canteen from '../models/Canteen.js';
import auth from '../middleware/auth.js';
import requireRole from '../middleware/requireRole.js';
import { isValidEmail, isValidPhone } from '../utils/validation.js';

const router = express.Router();

router.get('/public', async (req, res) => {
  try {
    const canteens = await Canteen.find().select('-menuItems.createdAt -menuItems.updatedAt');
    return res.status(200).json({ canteens });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to load canteens', error: error.message });
  }
});

router.get('/me', auth, requireRole('admin'), async (req, res) => {
  try {
    const canteen = await Canteen.findOne({ ownerId: req.user.id });
    return res.status(200).json({ canteen });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to load canteen', error: error.message });
  }
});

router.post('/me', auth, requireRole('admin'), async (req, res) => {
  try {
    const { name, location, timings, contactPhone, contactEmail } = req.body;

    if (!name || !location || !timings || !contactPhone || !contactEmail) {
      return res.status(400).json({ message: 'All canteen details are required.' });
    }

    if (!isValidPhone(contactPhone)) {
      return res.status(400).json({ message: 'Invalid contact phone.' });
    }

    if (!isValidEmail(contactEmail)) {
      return res.status(400).json({ message: 'Invalid contact email.' });
    }

    const canteen = await Canteen.create({
      ownerId: req.user.id,
      name,
      location,
      timings,
      contactPhone,
      contactEmail,
      menuItems: [],
    });

    return res.status(201).json({ canteen });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create canteen', error: error.message });
  }
});

router.put('/me', auth, requireRole('admin'), async (req, res) => {
  try {
    const { name, location, timings, contactPhone, contactEmail } = req.body;

    const updates = {
      name,
      location,
      timings,
      contactPhone,
      contactEmail,
    };

    const canteen = await Canteen.findOneAndUpdate(
      { ownerId: req.user.id },
      { $set: updates },
      { new: true }
    );

    if (!canteen) {
      return res.status(404).json({ message: 'Canteen not found.' });
    }

    return res.status(200).json({ canteen });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update canteen', error: error.message });
  }
});

router.post('/me/menu', auth, requireRole('admin'), async (req, res) => {
  try {
    const { name, price, category, available } = req.body;

    if (!name || price === undefined || !category) {
      return res.status(400).json({ message: 'Name, price, and category are required.' });
    }

    const canteen = await Canteen.findOne({ ownerId: req.user.id });
    if (!canteen) {
      return res.status(404).json({ message: 'Canteen not found.' });
    }

    canteen.menuItems.push({ name, price, category, available: available ?? true });
    await canteen.save();

    return res.status(201).json({ canteen });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to add menu item', error: error.message });
  }
});

router.put('/me/menu/:itemId', auth, requireRole('admin'), async (req, res) => {
  try {
    const { itemId } = req.params;
    const { name, price, category, available } = req.body;

    const canteen = await Canteen.findOne({ ownerId: req.user.id });
    if (!canteen) {
      return res.status(404).json({ message: 'Canteen not found.' });
    }

    const item = canteen.menuItems.id(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Menu item not found.' });
    }

    if (name !== undefined) item.name = name;
    if (price !== undefined) item.price = price;
    if (category !== undefined) item.category = category;
    if (available !== undefined) item.available = available;

    await canteen.save();

    return res.status(200).json({ canteen });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update menu item', error: error.message });
  }
});

router.delete('/me/menu/:itemId', auth, requireRole('admin'), async (req, res) => {
  try {
    const { itemId } = req.params;

    const canteen = await Canteen.findOne({ ownerId: req.user.id });
    if (!canteen) {
      return res.status(404).json({ message: 'Canteen not found.' });
    }

    const item = canteen.menuItems.id(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Menu item not found.' });
    }

    item.deleteOne();
    await canteen.save();

    return res.status(200).json({ canteen });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete menu item', error: error.message });
  }
});

export default router;
