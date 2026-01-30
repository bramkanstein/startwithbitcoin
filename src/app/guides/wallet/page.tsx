import { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Wallet Guide",
  description: "Connect a Lightning wallet to your AI agent using Nostr Wallet Connect (NWC).",
};

export default function WalletGuidePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <div className="mb-12">
        <div className="mb-4 flex items-center gap-4">
          <Badge variant="accent">Guide 2</Badge>
          <Link href="/guides" className="text-sm text-muted hover:text-foreground">
            ← Back to Guides
          </Link>
        </div>
        <h1 className="mb-4">Wallet</h1>
        <p className="text-lg text-muted">
          Connect a Lightning wallet to your agent using Nostr Wallet Connect (NWC).
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        <section className="mb-12">
          <h2>Lightning vs On-chain Bitcoin</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardTitle className="mb-2 text-accent">Lightning Network</CardTitle>
              <CardDescription>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>✓ Instant settlements</li>
                  <li>✓ Near-zero fees</li>
                  <li>✓ Perfect for microtransactions</li>
                  <li>✓ Ideal for AI agents</li>
                </ul>
              </CardDescription>
            </Card>
            <Card>
              <CardTitle className="mb-2">On-chain Bitcoin</CardTitle>
              <CardDescription>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>• 10+ minute confirmations</li>
                  <li>• Higher fees</li>
                  <li>• Better for large amounts</li>
                  <li>• Maximum security</li>
                </ul>
              </CardDescription>
            </Card>
          </div>
          <p className="mt-4 text-muted">
            For AI agents, <strong className="text-foreground">Lightning is almost always the right choice</strong>.
            It&apos;s fast enough for real-time interactions and cheap enough for microtransactions.
          </p>
        </section>

        <section className="mb-12">
          <h2>What is Nostr Wallet Connect (NWC)?</h2>
          <p className="text-muted">
            NWC is a protocol that lets applications control Lightning wallets remotely using Nostr.
            Your agent gets a connection string that allows it to:
          </p>
          <ul className="space-y-2 text-muted">
            <li>Create invoices to receive payments</li>
            <li>Pay invoices to send payments</li>
            <li>Check wallet balance</li>
            <li>List past transactions</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2>Wallet Options</h2>

          <div className="space-y-6">
            <div className="border border-border p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="mb-2 text-xl font-semibold">Option A: Alby</h3>
                  <Badge variant="success" className="mb-2">Recommended for Getting Started</Badge>
                </div>
              </div>
              <p className="text-muted">
                Alby provides custodial Lightning wallets with built-in NWC support.
                Easiest way to get started.
              </p>
              <ol className="mt-4 space-y-2 text-muted">
                <li>1. Create an account at <a href="https://getalby.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">getalby.com</a></li>
                <li>2. Go to Settings → Wallet Connections</li>
                <li>3. Click &quot;Add a new connection&quot;</li>
                <li>4. Set permissions and budget</li>
                <li>5. Copy the NWC connection string</li>
              </ol>
            </div>

            <div className="border border-border p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="mb-2 text-xl font-semibold">Option B: LNbits</h3>
                  <Badge variant="muted" className="mb-2">Self-hosted or Hosted</Badge>
                </div>
              </div>
              <p className="text-muted">
                LNbits lets you create sub-wallets with NWC. Can be self-hosted or use a public instance.
              </p>
              <ol className="mt-4 space-y-2 text-muted">
                <li>1. Access LNbits (self-hosted or <a href="https://legend.lnbits.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">legend.lnbits.com</a>)</li>
                <li>2. Create a new wallet</li>
                <li>3. Enable the NWC extension</li>
                <li>4. Create a new NWC connection</li>
                <li>5. Copy the connection string</li>
              </ol>
            </div>

            <div className="border border-border p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="mb-2 text-xl font-semibold">Option C: Your Own Node</h3>
                  <Badge variant="muted" className="mb-2">Advanced</Badge>
                </div>
              </div>
              <p className="text-muted">
                Run your own Lightning node with NWC support. Maximum control and privacy.
              </p>
              <ul className="mt-4 space-y-2 text-muted">
                <li>• <strong>Umbrel</strong> - Easy node management with NWC apps</li>
                <li>• <strong>Start9</strong> - Privacy-focused node OS</li>
                <li>• <strong>Core Lightning + NWC plugin</strong> - For developers</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2>Connect via NWC</h2>
          <p className="text-muted">
            Once you have your NWC connection string, connect programmatically:
          </p>
          <CodeBlock language="bash" filename="Install">
{`npm install @getalby/sdk`}
          </CodeBlock>

          <div className="mt-6">
            <CodeBlock language="javascript" filename="connect-wallet.js">
{`import { nwc } from '@getalby/sdk';

// Your NWC connection string from Alby, LNbits, etc.
const connectionString = process.env.NWC_URL;

// Create NWC client
const client = new nwc.NWCClient({
  nostrWalletConnectUrl: connectionString,
});

// Test the connection
const info = await client.getInfo();
console.log('Connected to:', info.alias);

// Get balance
const balance = await client.getBalance();
console.log('Balance:', balance.balance, 'sats');`}
            </CodeBlock>
          </div>
        </section>

        <section className="mb-12">
          <h2>Connection String Format</h2>
          <p className="text-muted">
            An NWC connection string looks like this:
          </p>
          <CodeBlock language="text" filename="NWC URL Format">
{`nostr+walletconnect://<wallet_pubkey>?relay=<relay_url>&secret=<connection_secret>`}
          </CodeBlock>
          <p className="mt-4 text-muted">
            <strong className="text-foreground">Keep this secret!</strong> Anyone with this string can
            control your wallet up to the permissions you granted.
          </p>
        </section>

        <section className="mb-12">
          <h2>Security Tips</h2>
          <ul className="space-y-2 text-muted">
            <li>
              <strong className="text-foreground">Set spending limits</strong> - Most NWC providers let
              you set daily/monthly budgets.
            </li>
            <li>
              <strong className="text-foreground">Use minimal permissions</strong> - Only grant
              pay_invoice if your agent needs to send.
            </li>
            <li>
              <strong className="text-foreground">Rotate connections</strong> - Create new connection
              strings periodically.
            </li>
            <li>
              <strong className="text-foreground">Monitor activity</strong> - Check your wallet&apos;s
              transaction history regularly.
            </li>
          </ul>
        </section>

        <div className="flex items-center justify-between border-t border-border pt-8">
          <Button href="/guides/identity" variant="secondary">
            ← Previous: Identity
          </Button>
          <Button href="/guides/payments">
            Next: Payments →
          </Button>
        </div>
      </div>
    </div>
  );
}
