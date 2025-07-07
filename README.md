📝 Complaint Management Web App

A full-stack complaint submission and management system built using Next.js (App Router), React, MongoDB, NodeMailer, and Tailwind CSS.
🔧 Features

  Users can submit complaints with category, priority, and description.

  Admins can view, filter, and update the status of complaints.

  Email notifications sent to admin when:

  A new complaint is submitted

  A complaint status is updated

🚀 Setup Instructions
1. Clone the Repository

        git clone https://github.com/yourusername/complaint-app.git
        cd complaint-app

2. Install Dependencies

        npm install

3. Environment Variables

Create a .env.local file at the root:

    MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/complaint-app?retryWrites=true&w=majority
    EMAIL_USER=your-email@gmail.com
    EMAIL_PASS=your-app-password
    ADMIN_EMAIL=admin@example.com

🔐 Use App Passwords for Gmail, or configure SendGrid/Mailgun.

▶️ Running the App

      npm run dev

Open: http://localhost:3000

🧪 How to Use

👤 User

    Visit / (home page).
  
    Fill in:
  
    Complaint Title
  
    Description
  
    Category (Product, Service, Support)
  
    Priority (Low, Medium, High)
  
    Click Submit.
  
    You’ll see a success message, and the complaint is stored in MongoDB.

🛠 Admin

    Visit /admin
  
    View all complaints in a table
  
    Filter by status and priority
  
    Change the status via dropdown
  
    Automatically updates the backend
  
    Sends an email notification

✉️ Email Notification Setup

    SMTP is configured via nodemailer in src/lib/mail.ts.
    
    Emails are sent to the admin on:
    
    New complaint submission (sendNewComplaintEmail)
    
    Complaint status update (sendStatusUpdateEmail)
    
    Gmail Users:
    
    Enable 2FA
    
    Generate an App Password
    
    Use it in .env.local as EMAIL_PASS

    Alternative:
    
    Use services like:
    
    Mailtrap (for dev testing)
    
    SendGrid
    
    Mailgun

🗄 MongoDB Setup

    You can use MongoDB Atlas (recommended):
    
    Go to https://cloud.mongodb.com/
    
    Create a free cluster
    
    Create a DB user and whitelist your IP
    
    Copy the connection URI:
    
    mongodb+srv://<user>:<password>@cluster.mongodb.net/complaint-app
    
    Paste it into .env.local as MONGODB_URI
    
    No further setup required — the schema is created automatically via Mongoose.
🧰 Tech Stack
    Frontend	React + Tailwind CSS
    Backend	Next.js App Router API
    Database	MongoDB (via Mongoose)
    Emails	Nodemailer + SMTP
    
🌍 Deployment

Deploy the app on Vercel (frontend + backend in one).
Steps:

Push your project to GitHub

Import it on https://vercel.com

Add the environment variables in the Vercel dashboard

Connect to MongoDB Atlas

🏁 Future Enhancements

  Admin authentication (JWT or NextAuth)

  User login and email confirmations
