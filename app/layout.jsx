// import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './components/Nav';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Jermaine Jatau | 3D Portfolio',
  description: '3D Portfolio using Next.js and Three.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="bg-slate-300/20 h-full">
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
}
