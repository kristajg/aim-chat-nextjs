import type { Metadata } from "next";
import { VercelToolbar } from '@vercel/toolbar/next';
import "98.css";
import BuddyList from "./ui/buddyList";

export const metadata: Metadata = {
  title: "Chat on Next.js",
  description: "Experience AOL nostalgia by chatting on this Vercel powered app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex item-center justify-between">
        <h3>AIM Chat on Next.js like Yesteryear</h3>
        <BuddyList />
        {children}
      </body>
      <VercelToolbar />
    </html>
  );
}
