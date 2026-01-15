import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Aman Srivastava - Full Stack Web Developer',
  description: 'Full Stack Web Developer at Vinci Highways specializing in .NET Core, Angular, TypeScript, and enterprise solutions. Expert in building scalable applications with ASP.NET MVC, Entity Framework, Docker, and Azure DevOps.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={inter.className}>
        {children}
        <Toaster />

        <Script
          id="adsbygoogle-init"
          strategy="afterInteractive"
          crossOrigin="anonymous"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID}`}
        />
      </body>
    </html>
  );
}
