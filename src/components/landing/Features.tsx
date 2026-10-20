import React from 'react';
import {
  ShieldCheck,
  Lock,
  Globe2,
  Zap,
  Wallet,
  GraduationCap,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const FEATURES = [
  {
    icon: ShieldCheck,
    title: 'Tamper-proof credentials',
    description:
      'Every certificate is hashed and anchored on Stellar. Alter it and the proof breaks — forgery is simply not possible.',
  },
  {
    icon: Wallet,
    title: 'You own your record',
    description:
      'Credentials live in your wallet, not a university database. No lock-in, no lost transcripts, no third-party permission needed.',
  },
  {
    icon: Zap,
    title: 'Instant verification',
    description:
      'Anyone can confirm a credential in seconds from a public link — no emails, no waiting on a registrar.',
  },
  {
    icon: Globe2,
    title: 'Borderless & permissionless',
    description:
      'Learn and prove your skills from anywhere. Verification works the same whether you are in Lagos, Lima, or London.',
  },
  {
    icon: GraduationCap,
    title: 'Expert-built tracks',
    description:
      'Structured Stellar and Soroban learning paths with hands-on projects, assessments, and real deliverables.',
  },
  {
    icon: Lock,
    title: 'Privacy by design',
    description:
      'Share only what you choose. Selective disclosure lets you prove an achievement without exposing everything else.',
  },
];

/**
 * Features
 *
 * A responsive showcase grid of the platform's core value props, each as a
 * tokenized card with an icon, title and description.
 */
export default function Features() {
  return (
    <section id="features" className="scroll-mt-20 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need to learn and prove
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Built on Stellar so your achievements are portable, verifiable, and yours.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                className="group h-full transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
              >
                <CardHeader>
                  <span className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-6 w-6" />
                  </span>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
