import fetch from 'node-fetch';

export const sendOtpSms = async ({ to, otp }) => {
  const authKey = process.env.MSG91_AUTH_KEY;
  const serviceId = process.env.MSG91_SERVICE_ID;

  if (!authKey || !serviceId) {
    console.log(`[OTP SMS] ${to}: ${otp} (MSG91 not configured, OTP logged only)`);
    return { delivered: false, preview: 'MSG91 not configured; OTP logged.' };
  }

  try {
    const response = await fetch('https://api.msg91.com/api/v5/otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authkey': authKey,
      },
      body: JSON.stringify({
        mobile: to.replace('+', ''),
        otp: otp,
        msg91: serviceId,
      }),
    });

    const data = await response.json();

    if (data.type === 'success') {
      console.log(`[OTP SMS] Sent to ${to} via MSG91`);
      return { delivered: true };
    } else {
      console.error('[OTP SMS] MSG91 error:', data);
      console.log(`[OTP SMS] ${to}: ${otp} (fallback: logged)`);
      return { delivered: false, preview: `MSG91 error: ${data.message || 'Unknown error'}` };
    }
  } catch (error) {
    console.error('[OTP SMS] MSG91 request failed:', error.message);
    console.log(`[OTP SMS] ${to}: ${otp} (fallback: logged)`);
    return { delivered: false, preview: 'MSG91 request failed; OTP logged.' };
  }
};
