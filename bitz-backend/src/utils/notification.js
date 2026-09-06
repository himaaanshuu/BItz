import https from 'https';

export const sendOtpSms = async ({ to, otp }) => {
  const authKey = process.env.MSG91_AUTH_KEY;
  const serviceId = process.env.MSG91_SERVICE_ID;

  if (!authKey || !serviceId) {
    console.log(`[OTP SMS] ${to}: ${otp} (MSG91 not configured, OTP logged only)`);
    return { delivered: false, preview: 'MSG91 not configured; OTP logged.' };
  }

  const mobile = to.replace('+', '');
  const body = JSON.stringify({
    mobile,
    otp,
    msg91: serviceId,
  });

  return new Promise((resolve) => {
    const req = https.request(
      {
        hostname: 'api.msg91.com',
        path: '/api/v5/otp',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authkey': authKey,
          'Content-Length': Buffer.byteLength(body),
        },
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            const parsed = JSON.parse(data);
            if (parsed.type === 'success') {
              console.log(`[OTP SMS] Sent to ${to} via MSG91`);
              resolve({ delivered: true });
            } else {
              console.error('[OTP SMS] MSG91 error:', parsed);
              console.log(`[OTP SMS] ${to}: ${otp} (fallback: logged)`);
              resolve({ delivered: false, preview: `MSG91: ${parsed.message || 'Unknown error'}` });
            }
          } catch (e) {
            console.error('[OTP SMS] Parse error:', e.message, data);
            console.log(`[OTP SMS] ${to}: ${otp} (fallback: logged)`);
            resolve({ delivered: false, preview: 'MSG91 response parse error' });
          }
        });
      }
    );

    req.on('error', (error) => {
      console.error('[OTP SMS] Request failed:', error.message);
      console.log(`[OTP SMS] ${to}: ${otp} (fallback: logged)`);
      resolve({ delivered: false, preview: 'MSG91 request failed' });
    });

    req.write(body);
    req.end();
  });
};
