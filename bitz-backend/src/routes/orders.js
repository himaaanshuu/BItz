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

router.get('/admin/all', auth, requireRole('admin'), async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).limit(50);
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
});

router.put('/:orderId/status', auth, requireRole('admin'), async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const validStatuses = ['pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status.' });
    }
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: 'Order not found.' });
    
    const canteen = await Canteen.findOne({ ownerId: req.user.id });
    if (!canteen || String(order.canteenId) !== String(canteen._id)) {
      return res.status(403).json({ message: 'Not authorized to update this order.' });
    }
    
    order.status = status;
    await order.save();
    res.json({ order });
  } catch (error) {
    res.status(500).json({ message: safeErrorMessage('Failed to update order status', error) });
  }
});

router.post('/', auth, requireRole('student'), async (req, res) => {
  try {
    const { canteenId, items, paymentMethod, deliveryAddress } = req.body;

    if (!canteenId || !items || !Array.isArray(items) || items.length === 0 || !paymentMethod) {
      return res.status(400).json({ message: 'canteenId, items, and paymentMethod are required.' });
    }

    for (const item of items) {
      if (!item.name || typeof item.price !== 'number' || item.price <= 0 || !Number.isInteger(item.quantity) || item.quantity < 1) {
        return res.status(400).json({ message: 'Invalid item data.' });
      }
    }

    const canteen = await Canteen.findById(canteenId);
    if (!canteen) {
      return res.status(404).json({ message: 'Canteen not found.' });
    }

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const tokenNumber = Math.floor(Math.random() * 9000) + 1000;
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
      total,
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
