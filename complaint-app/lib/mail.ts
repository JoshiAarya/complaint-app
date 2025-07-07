import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendNewComplaintEmail(complaint: any) {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: `New Complaint: ${complaint.title}`,
    html: `<p><strong>Category:</strong> ${complaint.category}</p><p><strong>Priority:</strong> ${complaint.priority}</p><p>${complaint.description}</p>`,
  });
}
