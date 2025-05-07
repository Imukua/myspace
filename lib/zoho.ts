import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

type SendEmailResult = {
  success: boolean;
  error?: string;
};

export async function sendEmail({
  name,
  contact,
  message,
}: {
  name: string;
  contact: string;
  message: string;
}): Promise<SendEmailResult> {
  const mailOptions = {
    from: `"${name}" <${process.env.SMTP_USER}>`,
    to: process.env.SMTP_TO_EMAIL,
    subject: `New message from ${name}`,
    text: `${message}\n\nContact Email: ${contact}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
    return { success: true };
  } catch (error: any) {
    console.error("Failed to send email:", error.message || error);
    return { success: false, error: error.message || "Email send failed" };
  }
}
