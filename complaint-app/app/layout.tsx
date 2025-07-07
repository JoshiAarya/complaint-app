import "./globals.css"; // Import Tailwind CSS here
import type { Metadata } from "next"; // Optional custom fonts

export const metadata: Metadata = {
  title: "Complaint Manager",
  description: "Submit and manage user complaints",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" >
      <body >
        {children}
      </body>
    </html>
  );
}
