import type {Metadata} from 'next';
import './globals.css';
import { Navbar } from '@/components/navbar';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { CartProvider } from '@/context/cart-context';

export const metadata: Metadata = {
  title: 'THREAD | Modern Fashion & Tech',
  description: 'THREAD is a modern e-commerce platform for unique lifestyle products.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen bg-background text-foreground">
        <FirebaseClientProvider>
          <CartProvider>
            <Navbar />
            <main>
              {children}
            </main>
            <footer className="bg-card py-12 border-t mt-20">
              <div className="container mx-auto px-4 text-center">
                <p className="text-muted-foreground">© {new Date().getFullYear()} THREAD. جميع الحقوق محفوظة.</p>
              </div>
            </footer>
            <Toaster />
          </CartProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
