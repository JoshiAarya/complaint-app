import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send on complaint submission
export async function sendNewComplaintEmail(complaint: any) {
  const html = `
    <h2>🆕 New Complaint Submitted</h2>
    <p><strong>Title:</strong> ${complaint.title}</p>
    <p><strong>Category:</strong> ${complaint.category}</p>
    <p><strong>Priority:</strong> ${complaint.priority}</p>
    <p><strong>Description:</strong><br/> ${complaint.description}</p>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: `New Complaint: ${complaint.title}`,
    html,
  });
}

// Send on status update
export async function sendStatusUpdateEmail(complaint: any) {
  const html = `
    <h2>✅ Complaint Status Updated</h2>
    <p><strong>Title:</strong> ${complaint.title}</p>
    <p><strong>New Status:</strong> ${complaint.status}</p>
    <p><strong>Updated At:</strong> ${new Date().toLocaleString()}</p>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: `Status Update: ${complaint.title} is now "${complaint.status}"`,
    html,
  });
}
