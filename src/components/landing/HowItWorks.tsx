import React from 'react';
import { BookOpen, Award, ShieldCheck } from 'lucide-react';

const STEPS = [
  {
    icon: BookOpen,
    title: 'Learn',
    body: 'Enroll in expert-built courses on Stellar and Soroban development. Progress is tracked as you complete modules and assessments.',
  },
  {
    icon: Award,
    title: 'Earn a credential',
    body: 'Finish a track and Eduban mints a tamper-proof credential to your wallet, anchored on the Stellar network — not a PDF that can be faked.',
  },
  {
    icon: ShieldCheck,
    title: 'Prove it anywhere',
    body: 'Share a public verification link. Employers and peers confirm authenticity on-chain in seconds, with no gatekeeper in the middle.',
  },
];

/**
 * HowItWorks
 *
 * A three-step explainer of the credential flow (learn → earn → prove),
 * rendered as numbered steps with a connecting line on wide screens.
 */
export default function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 border-t border-border bg-muted/30 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            How it works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From first lesson to verifiable proof — three steps, no paperwork.
          </p>
        </div>

        <ol className="relative mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
          {/* Connecting line (desktop) */}
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-6 hidden h-px bg-border md:block"
          />
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <li key={step.title} className="relative flex flex-col items-center text-center md:items-start md:text-left">
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background text-primary shadow-sm">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="mt-5">
                  <span className="text-sm font-semibold text-primary">Step {i + 1}</span>
                  <h3 className="mt-1 text-xl font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 max-w-sm text-muted-foreground">{step.body}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
