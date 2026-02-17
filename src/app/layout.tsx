import type {Metadata} from 'next';
import './globals.css';
import { Navbar } from '@/components/navbar';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { CartProvider } from '@/context/cart-context';
import { CurrencyProvider } from '@/context/currency-context';
import { FashionAiChat } from '@/components/fashion-ai-chat';

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
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches === true;
                  if (!theme && supportDarkMode) theme = 'dark';
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="font-body antialiased min-h-screen bg-background text-foreground transition-colors duration-300">
        <FirebaseClientProvider>
          <CurrencyProvider>
            <CartProvider>
              <Navbar />
              <main>
                {children}
              </main>
              <FashionAiChat />
              <Toaster />
            </CartProvider>
          </CurrencyProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
