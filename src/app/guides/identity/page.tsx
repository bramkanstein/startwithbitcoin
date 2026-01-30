import { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Identity Guide",
  description: "Learn how to create a Nostr identity for your AI agent using keypairs.",
};

export default function IdentityGuidePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <div className="mb-12">
        <div className="mb-4 flex items-center gap-4">
          <Badge variant="accent">Guide 1</Badge>
          <Link href="/guides" className="text-sm text-muted hover:text-foreground">
            ← Back to Guides
          </Link>
        </div>
        <h1 className="mb-4">Identity</h1>
        <p className="text-lg text-muted">
          Give your AI agent a unique, verifiable identity using Nostr keypairs.
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        <section className="mb-12">
          <h2>What is Nostr Identity?</h2>
          <p className="text-muted">
            Nostr (Notes and Other Stuff Transmitted by Relays) uses public-key cryptography
            for identity. Each identity consists of:
          </p>
          <ul className="space-y-2 text-muted">
            <li>
              <strong className="text-foreground">Private Key (nsec)</strong> - Your agent&apos;s secret key.
              Never share this. Used to sign messages and prove identity.
            </li>
            <li>
              <strong className="text-foreground">Public Key (npub)</strong> - Your agent&apos;s public identifier.
              Share this freely. Others use it to verify your messages and send you encrypted data.
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2>Generate a Keypair</h2>
          <p className="text-muted">
            Use the <code>nostr-tools</code> library to generate a new keypair:
          </p>
          <CodeBlock language="bash" filename="Install">
{`npm install nostr-tools`}
          </CodeBlock>

          <div className="mt-6">
            <CodeBlock language="javascript" filename="generate-identity.js">
{`import { generateSecretKey, getPublicKey } from 'nostr-tools/pure';
import { bytesToHex, hexToBytes } from '@noble/hashes/utils';
import { nip19 } from 'nostr-tools';

// Generate a new random secret key
const secretKey = generateSecretKey();
const publicKey = getPublicKey(secretKey);

// Convert to hex strings
const secretKeyHex = bytesToHex(secretKey);
const publicKeyHex = publicKey;

// Convert to bech32 format (nsec/npub)
const nsec = nip19.nsecEncode(secretKey);
const npub = nip19.npubEncode(publicKey);

console.log('Secret Key (hex):', secretKeyHex);
console.log('Public Key (hex):', publicKeyHex);
console.log('nsec:', nsec);
console.log('npub:', npub);

// Store the secret key securely!
// The npub is your agent's public identity`}
            </CodeBlock>
          </div>
        </section>

        <section className="mb-12">
          <h2>Publish Your Profile</h2>
          <p className="text-muted">
            Once you have a keypair, publish a profile (kind 0 event) so others can identify your agent:
          </p>
          <CodeBlock language="javascript" filename="publish-profile.js">
{`import { finalizeEvent } from 'nostr-tools/pure';
import { Relay } from 'nostr-tools/relay';

// Your agent's profile metadata
const profile = {
  name: 'My AI Agent',
  about: 'An AI agent that can transact in Bitcoin',
  picture: 'https://example.com/agent-avatar.png',
  nip05: 'agent@yourdomain.com', // optional verification
  lud16: 'agent@getalby.com', // Lightning address for tips
};

// Create a kind 0 (profile) event
const event = finalizeEvent({
  kind: 0,
  created_at: Math.floor(Date.now() / 1000),
  tags: [],
  content: JSON.stringify(profile),
}, secretKey);

// Publish to a relay
const relay = await Relay.connect('wss://relay.damus.io');
await relay.publish(event);
console.log('Profile published!');
relay.close();`}
          </CodeBlock>
        </section>

        <section className="mb-12">
          <h2>Recommended Libraries</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="border border-border p-4">
              <h4 className="mb-2 font-semibold">nostr-tools</h4>
              <p className="text-sm text-muted">
                Low-level Nostr utilities. Great for simple operations.
              </p>
              <code className="mt-2 block text-sm">npm install nostr-tools</code>
            </div>
            <div className="border border-border p-4">
              <h4 className="mb-2 font-semibold">@nostr-dev-kit/ndk</h4>
              <p className="text-sm text-muted">
                Higher-level SDK with caching, connection management, and more.
              </p>
              <code className="mt-2 block text-sm">npm install @nostr-dev-kit/ndk</code>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2>Security Best Practices</h2>
          <ul className="space-y-2 text-muted">
            <li>
              <strong className="text-foreground">Never expose your nsec</strong> - Store it in environment
              variables or a secure vault.
            </li>
            <li>
              <strong className="text-foreground">Use separate keys for different agents</strong> - Don&apos;t
              reuse keypairs across multiple agent instances.
            </li>
            <li>
              <strong className="text-foreground">Back up your keys</strong> - If you lose the secret key,
              you lose the identity permanently.
            </li>
          </ul>
        </section>

        <div className="flex items-center justify-between border-t border-border pt-8">
          <div />
          <Button href="/guides/wallet">
            Next: Wallet →
          </Button>
        </div>
      </div>
    </div>
  );
}
