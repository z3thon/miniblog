import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mini Blog',
  description: 'A beautiful blog powered by Blogs-For-Vercel',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

