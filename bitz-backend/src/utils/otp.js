import crypto from 'crypto';

export const generateOtp = () => {
  const otp = crypto.randomInt(100000, 999999).toString();
  return otp;
};

export const hashOtp = (otp) => {
  return crypto.createHash('sha256').update(otp).digest('hex');
};

export const compareOtp = (otp, hash) => {
  const hashToCompare = Buffer.from(hashOtp(otp), 'hex');
  const hashBuffer = Buffer.from(hash, 'hex');
  if (hashToCompare.length !== hashBuffer.length) return false;
  return crypto.timingSafeEqual(hashToCompare, hashBuffer);
};
