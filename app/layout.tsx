import type { Metadata } from 'next';
import { Dancing_Script, Merriweather } from 'next/font/google';
import './globals.css';

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing-script',
  weight: ['400', '500', '600', '700'],
});

const merriweather = Merriweather({
  subsets: ['latin'],
  variable: '--font-merriweather',
  weight: ['300', '400', '700', '900'],
});

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
    <html lang="en" className={`light ${dancingScript.variable} ${merriweather.variable}`} style={{ colorScheme: 'light' }}>
      <body className="light">{children}</body>
    </html>
  );
}

