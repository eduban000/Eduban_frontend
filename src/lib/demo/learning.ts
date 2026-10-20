/**
 * Demo data + helpers for the learner dashboard and credential verification.
 *
 * This is illustrative front-end data so the app core is usable without a live
 * backend or indexer. Swap `verifyCredential` for a call to the Eduban API /
 * Horizon lookup when wiring the real verification endpoint.
 */

export type CredentialStatus = 'verified' | 'pending' | 'revoked';

export interface DemoCredential {
  id: string;
  title: string;
  track: string;
  issuer: string;
  holder: string;
  issuedOn: string; // ISO date
  status: CredentialStatus;
  txHash: string;
  ledger: number;
}

export interface DemoCourse {
  id: string;
  title: string;
  level: string;
  progress: number; // 0–100
  lessonsTotal: number;
  lessonsDone: number;
}

export const DEMO_COURSES: DemoCourse[] = [
  {
    id: 'soroban-101',
    title: 'Soroban Smart Contracts',
    level: 'Intermediate',
    progress: 72,
    lessonsTotal: 24,
    lessonsDone: 17,
  },
  {
    id: 'stellar-foundations',
    title: 'Stellar Network Foundations',
    level: 'Beginner',
    progress: 100,
    lessonsTotal: 18,
    lessonsDone: 18,
  },
  {
    id: 'defi-stellar',
    title: 'Building DeFi on Stellar',
    level: 'Advanced',
    progress: 35,
    lessonsTotal: 30,
    lessonsDone: 10,
  },
];

export const DEMO_CREDENTIALS: DemoCredential[] = [
  {
    id: 'EDB-2026-0001',
    title: 'Stellar Network Foundations',
    track: 'Foundations · Distinction',
    issuer: 'Eduban',
    holder: 'Ada A.',
    issuedOn: '2026-09-28',
    status: 'verified',
    txHash: 'GC7X9F2A4K3M8Q1Z6B5N7D0R2T4W9Y1E3U5I7O9P0A2S4D6F8G0H2J4K6',
    ledger: 58214903,
  },
  {
    id: 'EDB-2026-0042',
    title: 'Soroban Smart Contracts',
    track: 'Developer Track · In review',
    issuer: 'Eduban',
    holder: 'Ada A.',
    issuedOn: '2026-10-12',
    status: 'pending',
    txHash: '—',
    ledger: 0,
  },
];

/** Index of verifiable demo credentials, keyed by (upper-cased) id. */
const VERIFIABLE: Record<string, DemoCredential> = DEMO_CREDENTIALS.filter(
  (c) => c.status !== 'pending'
).reduce((acc, c) => ({ ...acc, [c.id.toUpperCase()]: c }), {});

export interface VerifyResult {
  found: boolean;
  credential?: DemoCredential;
}

/**
 * Look up a credential by its id. Simulates network latency so the UI can
 * exercise its loading state. Replace with the real verification call later.
 */
export async function verifyCredential(rawId: string): Promise<VerifyResult> {
  const id = rawId.trim().toUpperCase();
  await new Promise((resolve) => setTimeout(resolve, 700));
  const credential = VERIFIABLE[id];
  return credential ? { found: true, credential } : { found: false };
}

/** A known-good id, surfaced in the UI so the demo is self-explanatory. */
export const SAMPLE_CREDENTIAL_ID = 'EDB-2026-0001';
