'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  ShieldCheck,
  Search,
  Loader2,
  CheckCircle2,
  XCircle,
  ExternalLink,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  verifyCredential,
  type DemoCredential,
  SAMPLE_CREDENTIAL_ID,
} from '@/lib/demo/learning';

type State =
  | { phase: 'idle' }
  | { phase: 'loading' }
  | { phase: 'valid'; credential: DemoCredential }
  | { phase: 'invalid'; id: string };

export default function VerifyClient() {
  const searchParams = useSearchParams();
  const [id, setId] = useState('');
  const [state, setState] = useState<State>({ phase: 'idle' });

  const runVerify = React.useCallback(async (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    setState({ phase: 'loading' });
    const result = await verifyCredential(trimmed);
    if (result.found && result.credential) {
      setState({ phase: 'valid', credential: result.credential });
    } else {
      setState({ phase: 'invalid', id: trimmed });
    }
  }, []);

  // Auto-verify when arriving with ?id= (e.g. from the dashboard).
  useEffect(() => {
    const queryId = searchParams.get('id');
    if (queryId) {
      setId(queryId);
      runVerify(queryId);
    }
  }, [searchParams, runVerify]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runVerify(id);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <ShieldCheck className="h-7 w-7" />
        </span>
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground">
          Verify a credential
        </h1>
        <p className="mt-3 text-muted-foreground">
          Enter a credential ID to confirm it was issued by Eduban and anchored on the
          Stellar network. Verification is public — no account needed.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="e.g. EDB-2026-0001"
          aria-label="Credential ID"
          className="flex h-10 w-full flex-grow rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
        <Button type="submit" disabled={state.phase === 'loading' || !id.trim()}>
          {state.phase === 'loading' ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Search className="mr-2 h-4 w-4" />
          )}
          Verify
        </Button>
      </form>

      <p className="mt-2 text-xs text-muted-foreground">
        Try the sample:{' '}
        <button
          type="button"
          onClick={() => {
            setId(SAMPLE_CREDENTIAL_ID);
            runVerify(SAMPLE_CREDENTIAL_ID);
          }}
          className="font-mono font-medium text-primary underline-offset-4 hover:underline"
        >
          {SAMPLE_CREDENTIAL_ID}
        </button>
      </p>

      {/* Result */}
      <div className="mt-8" aria-live="polite">
        {state.phase === 'valid' && <ValidResult credential={state.credential} />}
        {state.phase === 'invalid' && <InvalidResult id={state.id} />}
      </div>
    </div>
  );
}

function ValidResult({ credential }: { credential: DemoCredential }) {
  return (
    <Card className="border-green-500/40">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
          <CheckCircle2 className="h-6 w-6" />
          <span className="text-lg font-semibold">Credential verified</span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          This credential is authentic and was issued on-chain by {credential.issuer}.
        </p>

        <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Program" value={credential.title} />
          <Field label="Track" value={credential.track} />
          <Field label="Holder" value={credential.holder} />
          <Field label="Issuer" value={credential.issuer} />
          <Field label="Credential ID" value={credential.id} mono />
          <Field
            label="Issued"
            value={new Date(credential.issuedOn).toLocaleDateString()}
          />
        </dl>

        <div className="mt-6 rounded-lg bg-muted/60 p-4">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            On-chain record
          </p>
          <p className="mt-1 break-all font-mono text-xs text-foreground">
            {credential.txHash}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Ledger {credential.ledger.toLocaleString()} · Stellar
          </p>
          <span className="mt-3 inline-flex cursor-not-allowed items-center text-sm font-medium text-muted-foreground">
            View on Stellar Explorer
            <ExternalLink className="ml-1 h-3.5 w-3.5" />
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

function InvalidResult({ id }: { id: string }) {
  return (
    <Card className="border-destructive/40">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 text-destructive">
          <XCircle className="h-6 w-6" />
          <span className="text-lg font-semibold">No matching credential</span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          We couldn&rsquo;t find a credential with ID{' '}
          <span className="font-mono text-foreground">{id}</span>. Check the ID and try
          again — it may be mistyped, pending issuance, or not an Eduban credential.
        </p>
      </CardContent>
    </Card>
  );
}

function Field({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className={`mt-1 text-foreground ${mono ? 'font-mono text-sm' : 'font-medium'}`}>
        {value}
      </dd>
    </div>
  );
}
