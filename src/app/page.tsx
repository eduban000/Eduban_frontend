import type { Metadata } from 'next';
import Hero from '@/components/landing/Hero';

export const metadata: Metadata = {
  title: 'Eduban — On-chain credentials for decentralized learning',
  description:
    'Eduban turns your learning into tamper-proof, verifiable credentials anchored on the Stellar network. Learn, earn certificates, and prove them anywhere.',
};

/**
 * Landing page (home).
 *
 * Composed from self-contained section components. The hero ships first;
 * the How-It-Works, Features and social-proof sections are added alongside.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
    </>
  );
}
