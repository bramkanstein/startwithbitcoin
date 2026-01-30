import { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Button } from "@/components/ui/Button";
import { TerminalCard, TerminalLine, TerminalOutput } from "@/components/ui/TerminalCard";

export const metadata: Metadata = {
  title: "Full Setup Guide",
  description: "Complete walkthrough to set up Bitcoin capabilities for your AI agent from start to finish.",
};

export default function FullSetupGuidePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <div className="mb-12">
        <div className="mb-4 flex items-center gap-4">
          <Badge variant="accent">Complete Guide</Badge>
          <Link href="/guides" className="text-sm text-muted hover:text-foreground">
            ← Back to Guides
          </Link>
        </div>
        <h1 className="mb-4">Full Setup</h1>
        <p className="text-lg text-muted">
          A complete walkthrough to give your AI agent identity, wallet, and payment capabilities.
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        <section className="mb-12">
          <h2>Prerequisites</h2>
          <ul className="space-y-2 text-muted">
            <li>Node.js 18+ installed</li>
            <li>npm or yarn package manager</li>
            <li>A Lightning wallet with NWC support (we&apos;ll help you set this up)</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2>Step 1: Install Dependencies</h2>
          <CodeBlock language="bash" filename="Terminal">
{`npm install nostr-tools @getalby/sdk @noble/hashes`}
          </CodeBlock>
        </section>

        <section className="mb-12">
          <h2>Step 2: Generate Your Agent&apos;s Identity</h2>
          <p className="text-muted">
            Create a new file to generate your agent&apos;s Nostr keypair:
          </p>
          <CodeBlock language="javascript" filename="setup-identity.js">
{`import { generateSecretKey, getPublicKey } from 'nostr-tools/pure';
import { bytesToHex } from '@noble/hashes/utils';
import { nip19 } from 'nostr-tools';

// Generate new identity
const secretKey = generateSecretKey();
const publicKey = getPublicKey(secretKey);

// Convert to different formats
const secretKeyHex = bytesToHex(secretKey);
const nsec = nip19.nsecEncode(secretKey);
const npub = nip19.npubEncode(publicKey);

console.log('=== Your Agent Identity ===');
console.log('');
console.log('Public Key (npub):', npub);
console.log('Public Key (hex):', publicKey);
console.log('');
console.log('=== KEEP THESE SECRET ===');
console.log('Secret Key (nsec):', nsec);
console.log('Secret Key (hex):', secretKeyHex);
console.log('');
console.log('Add to your .env file:');
console.log(\`NOSTR_SECRET_KEY=\${secretKeyHex}\`);
console.log(\`NOSTR_PUBLIC_KEY=\${publicKey}\`);`}
          </CodeBlock>
          <p className="mt-4 text-muted">
            Run it: <code>node setup-identity.js</code>
          </p>
          <TerminalCard label="Output" className="mt-4">
            <TerminalOutput>
              <div className="space-y-1">
                <div>=== Your Agent Identity ===</div>
                <div>&nbsp;</div>
                <div>Public Key (npub): npub1abc123...</div>
                <div>Public Key (hex): abc123...</div>
                <div>&nbsp;</div>
                <div>=== KEEP THESE SECRET ===</div>
                <div>Secret Key (nsec): nsec1xyz789...</div>
                <div>Secret Key (hex): xyz789...</div>
              </div>
            </TerminalOutput>
          </TerminalCard>
        </section>

        <section className="mb-12">
          <h2>Step 3: Get an NWC Connection String</h2>
          <p className="text-muted">
            The easiest way to get started is with Alby:
          </p>
          <ol className="space-y-2 text-muted">
            <li>1. Go to <a href="https://getalby.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">getalby.com</a> and create an account</li>
            <li>2. Navigate to Settings → Wallet Connections</li>
            <li>3. Click &quot;Add a new connection&quot;</li>
            <li>4. Name it something like &quot;My AI Agent&quot;</li>
            <li>5. Set permissions (recommend: make_invoice, pay_invoice, get_balance)</li>
            <li>6. Set a daily budget (e.g., 10,000 sats)</li>
            <li>7. Copy the NWC connection string</li>
          </ol>
          <p className="mt-4 text-muted">
            Add to your <code>.env</code> file:
          </p>
          <CodeBlock language="bash" filename=".env">
{`NOSTR_SECRET_KEY=your_secret_key_hex
NOSTR_PUBLIC_KEY=your_public_key_hex
NWC_URL=nostr+walletconnect://...`}
          </CodeBlock>
        </section>

        <section className="mb-12">
          <h2>Step 4: Create Your Agent</h2>
          <p className="text-muted">
            Now create your agent with full Bitcoin capabilities:
          </p>
          <CodeBlock language="javascript" filename="bitcoin-agent.js">
{`import { hexToBytes } from '@noble/hashes/utils';
import { getPublicKey, finalizeEvent, nip04 } from 'nostr-tools';
import { Relay } from 'nostr-tools/relay';
import { nwc } from '@getalby/sdk';

class BitcoinAgent {
  constructor() {
    // Load identity
    this.secretKey = hexToBytes(process.env.NOSTR_SECRET_KEY);
    this.publicKey = process.env.NOSTR_PUBLIC_KEY;

    // Initialize wallet
    this.wallet = new nwc.NWCClient({
      nostrWalletConnectUrl: process.env.NWC_URL,
    });
  }

  // Get wallet balance
  async getBalance() {
    const balance = await this.wallet.getBalance();
    return balance.balance;
  }

  // Create invoice to receive payment
  async createInvoice(amountSats, description) {
    const invoice = await this.wallet.makeInvoice({
      amount: amountSats,
      description: description,
    });
    return invoice.invoice;
  }

  // Pay a Lightning invoice
  async payInvoice(bolt11) {
    const result = await this.wallet.payInvoice({
      invoice: bolt11,
    });
    return result.preimage;
  }

  // Send encrypted DM
  async sendDM(recipientPubkey, message) {
    const encrypted = await nip04.encrypt(
      this.secretKey,
      recipientPubkey,
      message
    );

    const event = finalizeEvent({
      kind: 4,
      created_at: Math.floor(Date.now() / 1000),
      tags: [['p', recipientPubkey]],
      content: encrypted,
    }, this.secretKey);

    const relay = await Relay.connect('wss://relay.damus.io');
    await relay.publish(event);
    relay.close();

    return event.id;
  }

  // Post public note
  async postNote(content) {
    const event = finalizeEvent({
      kind: 1,
      created_at: Math.floor(Date.now() / 1000),
      tags: [],
      content: content,
    }, this.secretKey);

    const relay = await Relay.connect('wss://relay.damus.io');
    await relay.publish(event);
    relay.close();

    return event.id;
  }
}

export default BitcoinAgent;`}
          </CodeBlock>
        </section>

        <section className="mb-12">
          <h2>Step 5: Test Your Setup</h2>
          <CodeBlock language="javascript" filename="test-agent.js">
{`import BitcoinAgent from './bitcoin-agent.js';

async function testAgent() {
  const agent = new BitcoinAgent();

  console.log('Testing Bitcoin Agent...');
  console.log('');

  // Test 1: Check balance
  console.log('1. Checking balance...');
  const balance = await agent.getBalance();
  console.log(\`   Balance: \${balance} sats\`);
  console.log('');

  // Test 2: Create invoice
  console.log('2. Creating invoice for 100 sats...');
  const invoice = await agent.createInvoice(100, 'Test invoice');
  console.log(\`   Invoice: \${invoice.substring(0, 50)}...\`);
  console.log('');

  // Test 3: Post announcement
  console.log('3. Posting announcement...');
  const noteId = await agent.postNote(
    'Bitcoin Agent online! Ready to transact. #nostr #bitcoin'
  );
  console.log(\`   Note ID: \${noteId}\`);
  console.log('');

  console.log('All tests passed!');
}

testAgent().catch(console.error);`}
          </CodeBlock>
          <p className="mt-4 text-muted">
            Run it: <code>node test-agent.js</code>
          </p>
          <TerminalCard label="Expected Output" className="mt-4">
            <TerminalLine>node test-agent.js</TerminalLine>
            <TerminalOutput>
              <div className="mt-2 space-y-1">
                <div>Testing Bitcoin Agent...</div>
                <div>&nbsp;</div>
                <div>1. Checking balance...</div>
                <div>   Balance: 50000 sats</div>
                <div>&nbsp;</div>
                <div>2. Creating invoice for 100 sats...</div>
                <div>   Invoice: lnbc1u1pjxxx...</div>
                <div>&nbsp;</div>
                <div>3. Posting announcement...</div>
                <div>   Note ID: abc123...</div>
                <div>&nbsp;</div>
                <div className="text-success">All tests passed!</div>
              </div>
            </TerminalOutput>
          </TerminalCard>
        </section>

        <section className="mb-12">
          <h2>Step 6: Receive Your First Payment</h2>
          <p className="text-muted">
            Test receiving a payment:
          </p>
          <ol className="space-y-2 text-muted">
            <li>1. Run the test to create an invoice</li>
            <li>2. Copy the full invoice string</li>
            <li>3. Open a Lightning wallet (Phoenix, Wallet of Satoshi, etc.)</li>
            <li>4. Paste the invoice and pay</li>
            <li>5. Run <code>agent.getBalance()</code> to verify</li>
          </ol>
        </section>

        <section className="mb-12">
          <h2>Step 7: Send Your First Payment</h2>
          <p className="text-muted">
            Test sending a payment:
          </p>
          <CodeBlock language="javascript" filename="send-test.js">
{`import BitcoinAgent from './bitcoin-agent.js';

async function sendTestPayment() {
  const agent = new BitcoinAgent();

  // Get an invoice from somewhere (or create one in another wallet)
  const invoice = 'lnbc...'; // Paste a real invoice here

  console.log('Paying invoice...');
  const preimage = await agent.payInvoice(invoice);
  console.log('Payment successful!');
  console.log('Preimage:', preimage);
}

sendTestPayment().catch(console.error);`}
          </CodeBlock>
        </section>

        <section className="mb-12">
          <h2>What&apos;s Next?</h2>
          <ul className="space-y-2 text-muted">
            <li>
              <strong className="text-foreground">Build services</strong> - Create endpoints where
              users pay to access your agent&apos;s capabilities.
            </li>
            <li>
              <strong className="text-foreground">Agent-to-agent</strong> - Have your agent hire
              other agents and pay them in sats.
            </li>
            <li>
              <strong className="text-foreground">Publish profile</strong> - Add a profile (kind 0)
              so others can discover your agent.
            </li>
            <li>
              <strong className="text-foreground">Listen for DMs</strong> - Accept service requests
              via encrypted Nostr messages.
            </li>
          </ul>
        </section>

        <section className="mb-12 border border-accent bg-accent-light p-6">
          <h2 className="mt-0">Need Help?</h2>
          <p className="text-muted">
            Check out our <Link href="/resources" className="text-accent hover:underline">Resources</Link> page
            for more tools and libraries. Browse <Link href="/resources/examples" className="text-accent hover:underline">code examples</Link> for
            common use cases.
          </p>
          <p className="mb-0 text-muted">
            Have questions? Open an issue on <a href="https://github.com/bramkanstein/startwithbitcoin" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">GitHub</a>.
          </p>
        </section>

        <div className="flex items-center justify-between border-t border-border pt-8">
          <Button href="/guides/communicate" variant="secondary">
            ← Previous: Communicate
          </Button>
          <Button href="/resources">
            Explore Resources →
          </Button>
        </div>
      </div>
    </div>
  );
}
