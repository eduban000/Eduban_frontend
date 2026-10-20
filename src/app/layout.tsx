import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import './globals.css';
import { performanceMonitor } from '@/lib/performance-monitor';
import { GlobalShell } from '@/components/PWA/GlobalShell';
import { CommandPalette } from '@/components/ui/command-palette';
import { Footer } from '@/components/Footer';
import SiteHeader from '@/components/layout/SiteHeader';
import { WalletProvider } from '@/contexts/WalletContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Eduban Education - Decentralized Learning Platform',
  description: 'Learn blockchain development with courses powered by Stellar',
};

// RTL locales
const RTL_LOCALES = new Set(['ar', 'he', 'fa', 'ur']);

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params?: { locale?: string };
}) {
  const locale = params?.locale ?? 'en';
  const dir = RTL_LOCALES.has(locale) ? 'rtl' : 'ltr';

  return (
    /*
     * suppressHydrationWarning is required because next-themes injects a
     * `class` attribute on <html> on the client before React hydration
     * completes, which would otherwise trigger a mismatch warning.
     */
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body className={inter.className}>
        {/*
         * ThemeProvider configuration:
         *   attribute="class"      → Tailwind darkMode: 'class' strategy
         *   defaultTheme="system"  → first visit follows OS preference
         *   enableSystem           → listens for prefers-color-scheme changes
         *   storageKey             → persists choice under 'eduban-theme'
         *   disableTransitionOnChange={false} → our CSS handles transitions
         */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          storageKey="eduban-theme"
          disableTransitionOnChange={false}
        >
          <WalletProvider>
            <GlobalShell />
            <div className="flex flex-col min-h-screen">
              <SiteHeader />
              <main id="main-content" className="flex-grow">{children}</main>
              <Footer />
            </div>
          </WalletProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
