import './globals.css';
import type { Metadata } from 'next';
import { Navbar } from './components/Navbar';

export const metadata: Metadata = {
  title: 'Tracking App',
  description: 'Tracking application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="container mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}