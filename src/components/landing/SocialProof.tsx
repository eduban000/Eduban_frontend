import React from 'react';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const STATS = [
  { value: '12,480', label: 'Credentials issued' },
  { value: '38', label: 'Countries' },
  { value: '240+', label: 'Partner organizations' },
  { value: '99.9%', label: 'Verification uptime' },
];

const TESTIMONIALS = [
  {
    quote:
      'Hiring managers used to email us to confirm certificates. Now they just scan the on-chain proof — our verification overhead dropped to zero.',
    name: 'Amara Okafor',
    role: 'Talent Lead, ChainWorks',
  },
  {
    quote:
      'I finished the Soroban track and my credential was in my wallet instantly. Sharing a tamper-proof link beats attaching a PDF nobody trusts.',
    name: 'Diego Fernández',
    role: 'Smart Contract Developer',
  },
  {
    quote:
      'Eduban let our bootcamp issue verifiable certificates without building blockchain infrastructure ourselves. Students love that they truly own them.',
    name: 'Priya Nair',
    role: 'Program Director, StellarStart',
  },
];

/**
 * SocialProof
 *
 * Trust-building section: headline metrics, partner-style testimonials, and a
 * closing call to action. Values are illustrative placeholders.
 */
export default function SocialProof() {
  return (
    <section id="proof" className="scroll-mt-20 border-t border-border bg-muted/30 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Stats */}
        <dl className="grid grid-cols-2 gap-8 rounded-2xl border border-border bg-card p-8 sm:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <dt className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {stat.value}
              </dt>
              <dd className="mt-1 text-sm text-muted-foreground">{stat.label}</dd>
            </div>
          ))}
        </dl>

        {/* Testimonials */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Trusted by learners and teams
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Verifiable credentials people actually rely on.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="flex h-full flex-col rounded-xl border border-border bg-card p-6 text-left shadow-sm"
            >
              <div className="flex gap-0.5 text-amber-500" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" aria-hidden="true" />
                ))}
              </div>
              <blockquote className="mt-4 flex-grow text-foreground">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6">
                <div className="font-semibold text-foreground">{t.name}</div>
                <div className="text-sm text-muted-foreground">{t.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Closing CTA */}
        <div className="mt-16 flex flex-col items-center gap-4 rounded-2xl border border-border bg-primary/5 p-10 text-center">
          <h3 className="text-2xl font-bold tracking-tight text-foreground">
            Start earning credentials you own
          </h3>
          <p className="max-w-xl text-muted-foreground">
            Join thousands of learners building verifiable, on-chain proof of their skills on Stellar.
          </p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard" className={cn(buttonVariants({ size: 'lg' }))}>
              Start learning
            </Link>
            <Link href="/verify" className={cn(buttonVariants({ size: 'lg', variant: 'outline' }))}>
              Verify a credential
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
