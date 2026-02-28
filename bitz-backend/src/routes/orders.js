import express from 'express';
import auth from '../middleware/auth.js';
import requireRole from '../middleware/requireRole.js';
import Order from '../models/Order.js';
import Canteen from '../models/Canteen.js';
import { safeErrorMessage } from '../utils/safeError.js';

const router = express.Router();

router.get('/me', auth, requireRole('student'), async (req, res) => {
  try {
    const orders = await Order.find({ studentId: req.user.id })
      .sort({ createdAt: -1 })
      .populate('canteenId', 'name location')
      .lean();
    return res.status(200).json({ orders });
  } catch (error) {
    return res.status(500).json({ message: safeErrorMessage('Failed to load orders', error) });
  }
});

router.post('/', auth, requireRole('student'), async (req, res) => {
  try {
    const { canteenId, items, total, paymentMethod, deliveryAddress } = req.body;

    if (!canteenId || !items || !Array.isArray(items) || items.length === 0 || total == null || !paymentMethod) {
      return res.status(400).json({ message: 'canteenId, items, total, and paymentMethod are required.' });
    }

    const canteen = await Canteen.findById(canteenId);
    if (!canteen) {
      return res.status(404).json({ message: 'Canteen not found.' });
    }

    const tokenNumber = Math.floor(Math.random() * 900) + 100;
    const paymentStatus = paymentMethod === 'cash' ? 'paid' : 'pending';

    const order = await Order.create({
      studentId: req.user.id,
      canteenId,
      items: items.map(({ name, price, quantity, category, canteenName }) => ({
        name,
        price: Number(price),
        quantity: Number(quantity) || 1,
        category: category || '',
        canteenName: canteenName || canteen.name,
      })),
      total: Number(total),
      paymentMethod: paymentMethod.toLowerCase(),
      paymentStatus,
      tokenNumber,
      deliveryAddress: deliveryAddress || '',
    });

    return res.status(201).json({ order });
  } catch (error) {
    return res.status(500).json({ message: safeErrorMessage('Failed to create order', error) });
  }
});

export default router;
