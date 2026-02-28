import express from 'express';
import Stripe from 'stripe';
import auth from '../middleware/auth.js';
import requireRole from '../middleware/requireRole.js';
import Order from '../models/Order.js';
import { safeErrorMessage } from '../utils/safeError.js';

const router = express.Router();
const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' })
  : null;

const providerSchemes = {
  gpay: 'tez://upi/pay',
  phonepe: 'phonepe://pay',
  paytm: 'paytmmp://pay',
};

router.post('/upi-intent', auth, requireRole('student'), async (req, res) => {
  try {
    const { amount, note, provider } = req.body;

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({ message: 'Amount must be greater than 0.' });
    }

    const vpa = process.env.UPI_VPA;
    const merchantName = process.env.UPI_MERCHANT_NAME || 'Bitez';

    if (!vpa) {
      return res.status(400).json({ message: 'UPI_VPA is not configured.' });
    }

    const params = new URLSearchParams({
      pa: vpa,
      pn: merchantName,
      am: Number(amount).toFixed(2),
      cu: 'INR',
    });

    if (note) {
      params.append('tn', note);
    }

    const upiUri = `upi://pay?${params.toString()}`;
    const scheme = provider ? providerSchemes[provider] : null;
    const providerUri = scheme ? `${scheme}?${params.toString()}` : null;

    return res.status(200).json({ upiUri, providerUri });
  } catch (error) {
    return res.status(500).json({ message: safeErrorMessage('Failed to create UPI intent', error) });
  }
});

router.post('/create-payment-intent', auth, requireRole('student'), async (req, res) => {
  try {
    if (!stripe) {
      return res.status(503).json({ message: 'Card payments are not configured (STRIPE_SECRET_KEY missing).' });
    }

    const { orderId } = req.body;
    if (!orderId) {
      return res.status(400).json({ message: 'orderId is required.' });
    }

    const order = await Order.findOne({ _id: orderId, studentId: req.user.id });
    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }
    if (order.paymentStatus === 'paid') {
      return res.status(400).json({ message: 'Order is already paid.' });
    }

    const amountPaise = Math.round(Number(order.total) * 100);
    if (amountPaise < 50) {
      return res.status(400).json({ message: 'Amount must be at least ₹0.50.' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountPaise,
      currency: 'inr',
      automatic_payment_methods: { enabled: true },
      metadata: { orderId: order._id.toString() },
    });

    await Order.updateOne(
      { _id: orderId },
      { $set: { stripePaymentIntentId: paymentIntent.id } }
    );

    return res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    return res.status(500).json({ message: safeErrorMessage('Failed to create payment intent', error) });
  }
});

export async function stripeWebhook(req, res) {
  if (!stripe || !process.env.STRIPE_WEBHOOK_SECRET) {
    return res.status(503).send('Webhook not configured');
  }

  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook signature verification failed: ${err.message}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    const orderId = paymentIntent.metadata?.orderId;
    if (orderId) {
      await Order.updateOne(
        { _id: orderId },
        { $set: { paymentStatus: 'paid' } }
      );
    }
  }

  res.json({ received: true });
}

export default router;
