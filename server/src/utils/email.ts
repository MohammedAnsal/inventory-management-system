import nodemailer from "nodemailer";

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const BASE_URL = process.env.FRONTEND_URL || "http://localhost:5005";

if (!EMAIL_USER || !EMAIL_PASS) {
  throw new Error("EMAIL_USER and EMAIL_PASS must be set in environment.");
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

interface SendVerificationEmailOptions {
  email: string;
  token: string;
  name?: string;
}

function buildVerificationHtml(options: SendVerificationEmailOptions): string {
  const { email, token, name = "there" } = options;
  const verifyUrl = `${BASE_URL}/auth/verify-email?email=${encodeURIComponent(email)}&token=${token}`;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 480px; margin: 40px auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
    <tr>
      <td style="padding: 32px 24px;">
        <h1 style="margin: 0 0 24px; font-size: 22px; color: #333;">Inventory Management System</h1>
        <p style="margin: 0 0 24px; font-size: 16px; color: #555; line-height: 1.6;">Hi ${name},</p>
        <p style="margin: 0 0 24px; font-size: 16px; color: #555; line-height: 1.6;">Please verify your email address by clicking the button below.</p>
        <p style="margin: 0 0 24px;">
          <a href="${verifyUrl}" style="display: inline-block; background-color: #2563eb; color: #fff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px;">Verify Email</a>
        </p>
        <p style="margin: 0; font-size: 14px; color: #888;">This link expires in 24 hours.</p>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export async function sendVerificationEmail(
  options: SendVerificationEmailOptions
): Promise<void> {
  const { email } = options;

  const mailOptions = {
    from: `"Inventory Management System" <${EMAIL_USER}>`,
    to: email,
    subject: "Verify your email",
    html: buildVerificationHtml(options),
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to send verification email"
    );
  }
}
