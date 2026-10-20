'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { GraduationCap, Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import ConnectWalletButton from './ConnectWalletButton';
import { cn } from '@/lib/utils';

/** Primary navigation. Hash links target landing sections; `/verify` is a route. */
const NAV_LINKS: { href: string; label: string }[] = [
  { href: '/#how-it-works', label: 'How It Works' },
  { href: '/#features', label: 'Features' },
  { href: '/#proof', label: 'Why Eduban' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/verify', label: 'Verify' },
];

/** Compact light/dark toggle, self-contained so it needs no external CSS. */
function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={mounted ? `Switch to ${isDark ? 'light' : 'dark'} theme` : 'Toggle theme'}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {/* Render a stable icon until mounted to avoid hydration mismatch */}
      {mounted && isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

/**
 * SiteHeader
 *
 * Responsive public navigation bar: brand, section/route links, theme toggle and
 * the Connect Wallet CTA. Sticky with a translucent blurred background; collapses
 * to a hamburger-driven panel below the `md` breakpoint.
 */
export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile panel whenever the viewport grows to desktop.
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 768px)');
    const close = () => mql.matches && setOpen(false);
    mql.addEventListener('change', close);
    return () => mql.removeEventListener('change', close);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-shadow',
        scrolled && 'shadow-sm'
      )}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-1.5 focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8" aria-label="Primary">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight" aria-label="Eduban home">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span className="text-lg text-foreground">Eduban</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <ConnectWalletButton />
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile panel */}
      {open && (
        <div id="mobile-menu" className="border-t border-border/60 bg-background md:hidden">
          <div className="space-y-1 px-4 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2 text-base font-medium text-foreground transition-colors hover:bg-accent"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <ConnectWalletButton variant="compact" className="items-stretch" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
