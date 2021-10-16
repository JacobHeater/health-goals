import nodemailer from "nodemailer";

if (require.main === module) {
  (async () => {
    await sendEmailAsync(
      {
        auth: {
          user: process.env.USERNAME,
          pass: process.env.PASSWORD,
        },
        host: process.env.HOST,
        port: JSON.parse(process.env.PORT),
        secure: JSON.parse(process.env.SECURE),
      },
      {
        from: process.env.FROM,
        to: process.env.TO,
        subject: process.env.SUBJECT,
        text: process.env.TEXT,
      }
    );
  })();
}

export interface EmailCredentials {
  user: string;
  pass: string;
}

export interface EmailSettings {
  auth: EmailCredentials;
  host: string;
  port: number;
  secure: boolean;
}

export interface EmailContents {
  from: string;
  to: string;
  subject: string;
  text: string;
}

export async function sendEmailAsync(
  settings: EmailSettings,
  contents: EmailContents
): Promise<void> {
  const transporter = nodemailer.createTransport(settings);
  const result = await transporter.sendMail(contents);

  console.log(`Message sent: ${result.messageId}`);
}
