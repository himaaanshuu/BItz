import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
  : null;

function CardPaymentForm({ clientSecret, onSuccess, onCancel }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    setError(null);
    const { error: submitError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + '/order',
        receipt_email: undefined,
      },
    });
    if (submitError) {
      setError(submitError.message || 'Payment failed');
      setLoading(false);
      return;
    }
    setLoading(false);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!stripe || loading}
          className="flex-1 py-2 rounded-lg bg-orange-600 text-white font-medium disabled:opacity-50"
        >
          {loading ? 'Processing…' : 'Pay now'}
        </button>
      </div>
    </form>
  );
}

export function CardPaymentModal({ clientSecret, total, onSuccess, onCancel }) {
  if (!stripePromise) {
    return (
      <div className="p-4 bg-amber-50 rounded-lg">
        <p className="text-amber-800">Card payment is not configured. Set VITE_STRIPE_PUBLISHABLE_KEY.</p>
        <button onClick={onCancel} className="mt-2 text-orange-600 font-medium">Close</button>
      </div>
    );
  }

  const options = { clientSecret, appearance: { theme: 'stripe' } };

  return (
    <div className="space-y-4">
      <p className="font-semibold text-gray-700">Total: ₹{total}</p>
      <Elements stripe={stripePromise} options={options}>
        <CardPaymentForm onSuccess={onSuccess} onCancel={onCancel} />
      </Elements>
    </div>
  );
}
