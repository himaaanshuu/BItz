import validator from 'validator';

export const isValidEmail = (email) => validator.isEmail(email || '');

export const isValidPhone = (phone) => {
  if (!phone) return false;
  const normalized = phone.replace(/\s+/g, '');
  return /^\+?[0-9]{10,15}$/.test(normalized);
};

export const validatePassword = (password) => {
  if (!password) return {
    valid: false,
    message: 'Password is required.',
  };

  const rules = [
    { test: /.{8,}/, message: 'Password must be at least 8 characters.' },
    { test: /[A-Z]/, message: 'Password must include an uppercase letter.' },
    { test: /[a-z]/, message: 'Password must include a lowercase letter.' },
    { test: /\d/, message: 'Password must include a number.' },
    { test: /[^A-Za-z0-9]/, message: 'Password must include a special character.' },
  ];

  for (const rule of rules) {
    if (!rule.test.test(password)) {
      return { valid: false, message: rule.message };
    }
  }

  return { valid: true };
};
