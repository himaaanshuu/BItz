const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }
  return data;
};

const withAuth = () => ({
  Authorization: `Bearer ${localStorage.getItem('bitezAuthToken')}`,
});

export const api = {
  registerStudent: async (payload) => {
    const response = await fetch(`${API_URL}/auth/student/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return handleResponse(response);
  },
  requestStudentOtp: async (payload) => {
    const response = await fetch(`${API_URL}/auth/student/request-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return handleResponse(response);
  },
  loginStudent: async (payload) => {
    const response = await fetch(`${API_URL}/auth/student/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return handleResponse(response);
  },
  requestAdminOtp: async (payload) => {
    const response = await fetch(`${API_URL}/auth/admin/request-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return handleResponse(response);
  },
  loginAdmin: async (payload) => {
    const response = await fetch(`${API_URL}/auth/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return handleResponse(response);
  },
  getCanteen: async () => {
    const response = await fetch(`${API_URL}/canteens/me`, {
      headers: { ...withAuth() },
    });
    if (response.status === 404) {
      return { canteen: null };
    }
    return handleResponse(response);
  },
  createCanteen: async (payload) => {
    const response = await fetch(`${API_URL}/canteens/me`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...withAuth() },
      body: JSON.stringify(payload),
    });
    return handleResponse(response);
  },
  updateCanteen: async (payload) => {
    const response = await fetch(`${API_URL}/canteens/me`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...withAuth() },
      body: JSON.stringify(payload),
    });
    return handleResponse(response);
  },
  addMenuItem: async (payload) => {
    const response = await fetch(`${API_URL}/canteens/me/menu`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...withAuth() },
      body: JSON.stringify(payload),
    });
    return handleResponse(response);
  },
  updateMenuItem: async (itemId, payload) => {
    const response = await fetch(`${API_URL}/canteens/me/menu/${itemId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...withAuth() },
      body: JSON.stringify(payload),
    });
    return handleResponse(response);
  },
  deleteMenuItem: async (itemId) => {
    const response = await fetch(`${API_URL}/canteens/me/menu/${itemId}`, {
      method: 'DELETE',
      headers: { ...withAuth() },
    });
    return handleResponse(response);
  },
  createUpiIntent: async (payload) => {
    const response = await fetch(`${API_URL}/payments/upi-intent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...withAuth() },
      body: JSON.stringify(payload),
    });
    return handleResponse(response);
  },
  createPaymentIntent: async (orderId) => {
    const response = await fetch(`${API_URL}/payments/create-payment-intent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...withAuth() },
      body: JSON.stringify({ orderId }),
    });
    return handleResponse(response);
  },
  getCanteensPublic: async () => {
    const response = await fetch(`${API_URL}/canteens/public`);
    return handleResponse(response);
  },
  createOrder: async (payload) => {
    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...withAuth() },
      body: JSON.stringify(payload),
    });
    return handleResponse(response);
  },
  getOrdersMe: async () => {
    const response = await fetch(`${API_URL}/orders/me`, {
      headers: { ...withAuth() },
    });
    return handleResponse(response);
  },
  changePasswordAdmin: async (payload) => {
    const response = await fetch(`${API_URL}/auth/change-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...withAuth() },
      body: JSON.stringify(payload),
    });
    return handleResponse(response);
  },
};