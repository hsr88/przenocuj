import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Przenocuj.eu - Mapa noclegów w naturze',
  description: 'Interaktywna mapa dzikich noclegów, stref Zanocuj w lesie, glampingów i miejsc camper-friendly w Europie',
  keywords: ['wild camping', 'noclegi', 'natura', 'kamper', 'vanlife', 'bikepacking', 'glamping'],
  authors: [{ name: 'Przenocuj.eu' }],
  manifest: '/manifest.json',
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#2d5a3d',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className="bg-forest-50">
        {children}
      </body>
    </html>
  );
}
