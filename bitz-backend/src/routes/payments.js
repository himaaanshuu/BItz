import express from 'express';
import auth from '../middleware/auth.js';
import requireRole from '../middleware/requireRole.js';

const router = express.Router();

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
    return res.status(500).json({ message: 'Failed to create UPI intent', error: error.message });
  }
});

export default router;
