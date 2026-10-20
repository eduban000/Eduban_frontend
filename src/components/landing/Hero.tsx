'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ShieldCheck, ArrowRight, BadgeCheck, Sparkles } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * Hero
 *
 * The landing hero for Eduban: a decentralized learning platform that issues
 * tamper-proof, on-chain credentials on Stellar. Leads with a single clear value
 * proposition, a primary and secondary CTA, trust signals, and a credential
 * preview card. Entrance motion is subtle and disabled under reduced-motion.
 */
export default function Hero() {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.08, delayChildren: 0.05 },
    },
  };
  const item = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <section className="relative overflow-hidden">
      {/* Decorative background: soft radial glow + grid, non-interactive */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-10%] h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl dark:bg-primary/10" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.35)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.35)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_40%,transparent_100%)]" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:py-28">
        {/* Copy */}
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Credentials you own, verifiable by anyone
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-5 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            Learn on-chain.{' '}
            <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              Prove it forever.
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            Eduban turns your learning into tamper-proof credentials anchored on the
            Stellar network. Complete courses, earn verifiable certificates, and share
            a public proof that can never be forged or revoked without a trace.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard" className={cn(buttonVariants({ size: 'lg' }), 'group')}>
              Start learning
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/verify"
              className={cn(buttonVariants({ size: 'lg', variant: 'outline' }))}
            >
              <ShieldCheck className="mr-2 h-4 w-4" />
              Verify a credential
            </Link>
          </motion.div>

          <motion.dl
            variants={item}
            className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-6"
          >
            {[
              { value: '12k+', label: 'Credentials issued' },
              { value: '3s', label: 'Avg. verification' },
              { value: '100%', label: 'On-chain & yours' },
            ].map((stat) => (
              <div key={stat.label}>
                <dt className="text-2xl font-bold text-foreground">{stat.value}</dt>
                <dd className="mt-1 text-xs text-muted-foreground">{stat.label}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* Credential preview card */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, rotate: -1 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="rounded-2xl border border-border bg-card p-6 shadow-xl shadow-primary/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <BadgeCheck className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">Verified Credential</p>
                  <p className="text-xs text-muted-foreground">Issued on Stellar</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-600 dark:text-green-400">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" /> Valid
              </span>
            </div>

            <div className="mt-6">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Program</p>
              <p className="mt-1 text-lg font-bold text-foreground">Stellar Smart Contracts</p>
              <p className="text-sm text-muted-foreground">Soroban Developer Track · Distinction</p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs text-muted-foreground">Holder</p>
                <p className="font-medium text-foreground">Ada A.</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Issued</p>
                <p className="font-medium text-foreground">Oct 2026</p>
              </div>
            </div>

            <div className="mt-6 rounded-lg bg-muted/60 p-3">
              <p className="text-xs text-muted-foreground">On-chain hash</p>
              <p className="truncate font-mono text-xs text-foreground">
                GC7X…9F2A · ledger 58,214,903
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
