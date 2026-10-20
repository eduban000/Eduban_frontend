'use client';

import React, { useState } from 'react';
import { Wallet, LogOut, Loader2, Check, Copy } from 'lucide-react';
import { useWallet } from '@/contexts/WalletContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/** Shorten a Stellar public key to `GABC…WXYZ` for compact display. */
function truncateKey(key: string): string {
  if (key.length <= 10) return key;
  return `${key.slice(0, 4)}…${key.slice(-4)}`;
}

interface ConnectWalletButtonProps {
  className?: string;
  /** `full` shows address + copy + disconnect; `compact` is just the pill. */
  variant?: 'full' | 'compact';
}

/**
 * ConnectWalletButton
 *
 * The primary wallet CTA used in the site header. When disconnected it shows a
 * "Connect Wallet" button; when connected it shows the truncated address with a
 * copy affordance and a disconnect control. Wallet state comes from the shared
 * WalletProvider (Freighter, with a dev fallback), so every surface stays in sync.
 */
export default function ConnectWalletButton({
  className,
  variant = 'full',
}: ConnectWalletButtonProps) {
  const { publicKey, isConnected, connect, disconnect } = useWallet();
  const [isConnecting, setIsConnecting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConnect = async () => {
    setError(null);
    setIsConnecting(true);
    try {
      await connect();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleCopy = async () => {
    if (!publicKey) return;
    try {
      await navigator.clipboard.writeText(publicKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard may be unavailable; ignore */
    }
  };

  if (isConnected && publicKey) {
    return (
      <div className={cn('flex items-center gap-1', className)}>
        <button
          type="button"
          onClick={handleCopy}
          title={publicKey}
          aria-label={`Connected wallet ${publicKey}. Copy address.`}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          <span className="h-2 w-2 rounded-full bg-green-500" aria-hidden="true" />
          <span className="font-mono">{truncateKey(publicKey)}</span>
          {copied ? (
            <Check className="h-3.5 w-3.5 text-green-500" aria-hidden="true" />
          ) : (
            <Copy className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
          )}
        </button>
        {variant === 'full' && (
          <Button
            variant="ghost"
            size="icon"
            onClick={disconnect}
            aria-label="Disconnect wallet"
            title="Disconnect wallet"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col items-end', className)}>
      <Button onClick={handleConnect} disabled={isConnecting} aria-label="Connect your Stellar wallet">
        {isConnecting ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          <Wallet className="mr-2 h-4 w-4" aria-hidden="true" />
        )}
        {isConnecting ? 'Connecting…' : 'Connect Wallet'}
      </Button>
      {error && (
        <span role="alert" className="mt-1 text-xs text-destructive">
          {error}
        </span>
      )}
    </div>
  );
}
