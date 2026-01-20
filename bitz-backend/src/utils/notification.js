import twilio from 'twilio';

const buildTwilioClient = () => {
  if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
    return null;
  }

  return twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
};

export const sendOtpSms = async ({ to, otp }) => {
  const client = buildTwilioClient();
  if (!client || !process.env.TWILIO_PHONE) {
    console.log(`[OTP SMS] ${to}: ${otp}`);
    return { delivered: false, preview: 'Twilio not configured; OTP logged.' };
  }

  try {
    await client.messages.create({
      body: `Your Bitez OTP is ${otp}. It expires in 5 minutes.`,
      from: process.env.TWILIO_PHONE,
      to,
    });

    return { delivered: true };
  } catch (error) {
    console.error('SMS OTP delivery failed:', error.message);
    console.log(`[OTP SMS] ${to}: ${otp}`);
    return { delivered: false, preview: 'Twilio error; OTP logged.' };
  }
};
