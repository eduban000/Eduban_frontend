import type { Metadata } from 'next';
import { Suspense } from 'react';
import VerifyClient from '@/components/verify/VerifyClient';

export const metadata: Metadata = {
  title: 'Verify a credential — Eduban',
  description:
    'Publicly verify that an Eduban credential is authentic and anchored on the Stellar network. No account required.',
};

/**
 * Public credential verification route.
 *
 * VerifyClient reads an optional `?id=` query param, so it is wrapped in a
 * Suspense boundary as required for useSearchParams in the App Router.
 */
export default function VerifyPage() {
  return (
    <Suspense fallback={null}>
      <VerifyClient />
    </Suspense>
  );
}
