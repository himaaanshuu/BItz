import twilio from 'twilio';

const buildTwilioClient = () => {
  if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
    return null;
  }
  return twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
};

export const sendOtpSms = async ({ to, otp }) => {
  const client = buildTwilioClient();
  const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;

  if (!client) {
    console.log(`[OTP SMS] ${to}: ${otp} (Twilio not configured; OTP logged only)`);
    return { delivered: false, preview: 'Twilio not configured; OTP logged.' };
  }

  try {
    const messageParams = {
      body: `Your Bitez OTP is ${otp}. It expires in 5 minutes. Do not share this with anyone.`,
      to,
    };

    if (messagingServiceSid) {
      messageParams.messagingServiceSid = messagingServiceSid;
    } else {
      messageParams.from = process.env.TWILIO_PHONE;
    }

    await client.messages.create(messageParams);
    console.log(`[OTP SMS] Sent to ${to} via Twilio`);
    return { delivered: true };
  } catch (error) {
    console.error('[OTP SMS] Twilio error:', error.message);
    console.log(`[OTP SMS] ${to}: ${otp} (fallback: logged)`);
    return { delivered: false, preview: `Twilio error: ${error.message}` };
  }
};
