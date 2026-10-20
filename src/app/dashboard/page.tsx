'use client';

import React from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Award,
  Flame,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ArrowRight,
  Wallet,
} from 'lucide-react';
import { useWallet } from '@/contexts/WalletContext';
import ConnectWalletButton from '@/components/layout/ConnectWalletButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  DEMO_COURSES,
  DEMO_CREDENTIALS,
  type CredentialStatus,
} from '@/lib/demo/learning';

const STATUS_STYLES: Record<CredentialStatus, { label: string; className: string; Icon: React.ElementType }> = {
  verified: {
    label: 'Verified',
    className: 'bg-green-500/10 text-green-600 dark:text-green-400',
    Icon: CheckCircle2,
  },
  pending: {
    label: 'In review',
    className: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    Icon: Clock,
  },
  revoked: {
    label: 'Revoked',
    className: 'bg-destructive/10 text-destructive',
    Icon: ShieldCheck,
  },
};

function StatTile({
  icon: Icon,
  value,
  label,
}: {
  icon: React.ElementType;
  value: string;
  label: string;
}) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-5">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-6 w-6" />
        </span>
        <div>
          <div className="text-2xl font-bold text-foreground">{value}</div>
          <div className="text-sm text-muted-foreground">{label}</div>
        </div>
      </CardContent>
    </Card>
  );
}

/** Wallet gate shown when no wallet is connected. */
function ConnectGate() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Wallet className="h-7 w-7" />
      </span>
      <h1 className="mt-6 text-2xl font-bold text-foreground">Connect your wallet</h1>
      <p className="mt-2 text-muted-foreground">
        Your courses and credentials are tied to your Stellar wallet. Connect to open
        your learning dashboard.
      </p>
      <div className="mt-6">
        <ConnectWalletButton />
      </div>
      <Link
        href="/verify"
        className="mt-4 text-sm font-medium text-primary underline-offset-4 hover:underline"
      >
        Just want to verify a credential?
      </Link>
    </div>
  );
}

export default function DashboardPage() {
  const { isConnected, publicKey } = useWallet();

  if (!isConnected || !publicKey) {
    return <ConnectGate />;
  }

  const completed = DEMO_COURSES.filter((c) => c.progress === 100).length;
  const inProgress = DEMO_COURSES.length - completed;
  const verified = DEMO_CREDENTIALS.filter((c) => c.status === 'verified').length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Your dashboard
        </h1>
        <p className="text-muted-foreground">
          Signed in as{' '}
          <span className="font-mono text-foreground">
            {publicKey.slice(0, 6)}…{publicKey.slice(-6)}
          </span>
        </p>
      </div>

      {/* Stats */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile icon={BookOpen} value={String(inProgress)} label="Courses in progress" />
        <StatTile icon={CheckCircle2} value={String(completed)} label="Courses completed" />
        <StatTile icon={Award} value={String(verified)} label="Credentials earned" />
        <StatTile icon={Flame} value="9 days" label="Learning streak" />
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-3">
        {/* Continue learning */}
        <section className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Continue learning</h2>
            <Link
              href="/#features"
              className="text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              Browse courses
            </Link>
          </div>

          <div className="mt-4 space-y-4">
            {DEMO_COURSES.map((course) => (
              <Card key={course.id}>
                <CardContent className="p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-foreground">{course.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {course.level} · {course.lessonsDone}/{course.lessonsTotal} lessons
                      </p>
                    </div>
                    <span className="text-sm font-medium text-foreground">{course.progress}%</span>
                  </div>
                  <div
                    className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted"
                    role="progressbar"
                    aria-valuenow={course.progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${course.title} progress`}
                  >
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <div className="mt-4">
                    <span className={cn(buttonVariants({ size: 'sm', variant: 'secondary' }))}>
                      {course.progress === 100 ? 'Review' : 'Resume'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Credentials */}
        <section>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Your credentials</h2>
            <Link
              href="/verify"
              className="text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              Verify
            </Link>
          </div>

          <div className="mt-4 space-y-4">
            {DEMO_CREDENTIALS.map((cred) => {
              const status = STATUS_STYLES[cred.status];
              return (
                <Card key={cred.id}>
                  <CardHeader className="p-5">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-base">{cred.title}</CardTitle>
                      <span
                        className={cn(
                          'inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-xs font-medium',
                          status.className
                        )}
                      >
                        <status.Icon className="h-3.5 w-3.5" />
                        {status.label}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{cred.track}</p>
                    <dl className="mt-3 space-y-1 text-xs text-muted-foreground">
                      <div className="flex justify-between gap-2">
                        <dt>Credential ID</dt>
                        <dd className="font-mono text-foreground">{cred.id}</dd>
                      </div>
                      <div className="flex justify-between gap-2">
                        <dt>Issued</dt>
                        <dd className="text-foreground">
                          {new Date(cred.issuedOn).toLocaleDateString()}
                        </dd>
                      </div>
                    </dl>
                    {cred.status === 'verified' && (
                      <Link
                        href={`/verify?id=${encodeURIComponent(cred.id)}`}
                        className="mt-3 inline-flex items-center text-sm font-medium text-primary underline-offset-4 hover:underline"
                      >
                        View public proof
                        <ArrowRight className="ml-1 h-3.5 w-3.5" />
                      </Link>
                    )}
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
