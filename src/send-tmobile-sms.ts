import { sendEmailAsync } from './send-email';

if (require.main === module) {
  (async () => {
    await sendTMobileSmsAsync();
  })().catch(console.error);
}

export async function sendTMobileSmsAsync(): Promise<void> {
  await sendEmailAsync({
    auth: {
      user: process.env.USERNAME,
      pass: process.env.PASSWORD,
    },
    host: process.env.HOST,
    port: JSON.parse(process.env.PORT || ''),
    secure: JSON.parse(process.env.SECURE || ''),
  },
  {
    from: process.env.FROM,
    to: `${process.env.PHONE_NUMBER}@tmomail.net`,
    subject: process.env.SUBJECT,
    text: process.env.TEXT,
  });
}
