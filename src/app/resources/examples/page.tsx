import { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const metadata: Metadata = {
  title: "Code Examples",
  description: "Ready-to-use code examples for Bitcoin-capable AI agents.",
};

export default function ExamplesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <div className="mb-12">
        <div className="mb-4 flex items-center gap-4">
          <Badge variant="accent">Resources</Badge>
          <Link href="/resources" className="text-sm text-muted hover:text-foreground">
            ← Back to Resources
          </Link>
        </div>
        <h1 className="mb-4">Code Examples</h1>
        <p className="text-lg text-muted">
          Copy-paste examples for common Bitcoin agent tasks.
        </p>
      </div>

      <div className="space-y-12">
        <section>
          <h2 className="mb-4">Generate Nostr Identity</h2>
          <p className="mb-4 text-muted">
            Create a new keypair for your agent:
          </p>
          <CodeBlock language="javascript" filename="generate-identity.js">
{`import { generateSecretKey, getPublicKey } from 'nostr-tools/pure';
import { bytesToHex } from '@noble/hashes/utils';
import { nip19 } from 'nostr-tools';

const secretKey = generateSecretKey();
const publicKey = getPublicKey(secretKey);

const nsec = nip19.nsecEncode(secretKey);
const npub = nip19.npubEncode(publicKey);

console.log('npub:', npub);
console.log('nsec:', nsec);
console.log('hex public:', publicKey);
console.log('hex secret:', bytesToHex(secretKey));`}
          </CodeBlock>
        </section>

        <section>
          <h2 className="mb-4">Connect NWC Wallet</h2>
          <p className="mb-4 text-muted">
            Initialize wallet connection and check balance:
          </p>
          <CodeBlock language="javascript" filename="connect-wallet.js">
{`import { nwc } from '@getalby/sdk';

const client = new nwc.NWCClient({
  nostrWalletConnectUrl: process.env.NWC_URL,
});

// Get balance
const { balance } = await client.getBalance();
console.log(\`Balance: \${balance} sats\`);

// Get wallet info
const info = await client.getInfo();
console.log(\`Connected to: \${info.alias}\`);`}
          </CodeBlock>
        </section>

        <section>
          <h2 className="mb-4">Create Invoice</h2>
          <p className="mb-4 text-muted">
            Generate a Lightning invoice to receive payment:
          </p>
          <CodeBlock language="javascript" filename="create-invoice.js">
{`import { nwc } from '@getalby/sdk';

const client = new nwc.NWCClient({
  nostrWalletConnectUrl: process.env.NWC_URL,
});

const invoice = await client.makeInvoice({
  amount: 1000, // sats
  description: 'Payment for AI service',
  expiry: 3600, // 1 hour
});

console.log('Invoice:', invoice.invoice);
console.log('Payment hash:', invoice.payment_hash);

// Share invoice.invoice with the payer`}
          </CodeBlock>
        </section>

        <section>
          <h2 className="mb-4">Pay Invoice</h2>
          <p className="mb-4 text-muted">
            Send a Lightning payment:
          </p>
          <CodeBlock language="javascript" filename="pay-invoice.js">
{`import { nwc } from '@getalby/sdk';

const client = new nwc.NWCClient({
  nostrWalletConnectUrl: process.env.NWC_URL,
});

const bolt11 = 'lnbc10u1p...'; // Invoice to pay

try {
  const result = await client.payInvoice({ invoice: bolt11 });
  console.log('Payment successful!');
  console.log('Preimage:', result.preimage);
} catch (error) {
  console.error('Payment failed:', error.message);
}`}
          </CodeBlock>
        </section>

        <section>
          <h2 className="mb-4">Send Encrypted DM</h2>
          <p className="mb-4 text-muted">
            Send a private message via Nostr:
          </p>
          <CodeBlock language="javascript" filename="send-dm.js">
{`import { finalizeEvent, nip04 } from 'nostr-tools';
import { Relay } from 'nostr-tools/relay';

async function sendDM(secretKey, recipientPubkey, message) {
  const encrypted = await nip04.encrypt(
    secretKey,
    recipientPubkey,
    message
  );

  const event = finalizeEvent({
    kind: 4,
    created_at: Math.floor(Date.now() / 1000),
    tags: [['p', recipientPubkey]],
    content: encrypted,
  }, secretKey);

  const relay = await Relay.connect('wss://relay.damus.io');
  await relay.publish(event);
  relay.close();

  return event.id;
}`}
          </CodeBlock>
        </section>

        <section>
          <h2 className="mb-4">Post Public Note</h2>
          <p className="mb-4 text-muted">
            Publish a public announcement:
          </p>
          <CodeBlock language="javascript" filename="post-note.js">
{`import { finalizeEvent } from 'nostr-tools';
import { Relay } from 'nostr-tools/relay';

async function postNote(secretKey, content) {
  const event = finalizeEvent({
    kind: 1,
    created_at: Math.floor(Date.now() / 1000),
    tags: [],
    content: content,
  }, secretKey);

  const relay = await Relay.connect('wss://relay.damus.io');
  await relay.publish(event);
  relay.close();

  return event.id;
}

// Usage
await postNote(mySecretKey, 'Hello from my AI agent!');`}
          </CodeBlock>
        </section>

        <section>
          <h2 className="mb-4">Listen for DMs</h2>
          <p className="mb-4 text-muted">
            Subscribe to incoming messages:
          </p>
          <CodeBlock language="javascript" filename="listen-dms.js">
{`import { nip04 } from 'nostr-tools';
import { Relay } from 'nostr-tools/relay';

async function listenForDMs(secretKey, publicKey) {
  const relay = await Relay.connect('wss://relay.damus.io');

  relay.subscribe([
    {
      kinds: [4],
      '#p': [publicKey],
    },
  ], {
    onevent: async (event) => {
      const decrypted = await nip04.decrypt(
        secretKey,
        event.pubkey,
        event.content
      );
      console.log('From:', event.pubkey);
      console.log('Message:', decrypted);
    },
  });

  console.log('Listening for DMs...');
}`}
          </CodeBlock>
        </section>

        <section>
          <h2 className="mb-4">Complete Agent Class</h2>
          <p className="mb-4 text-muted">
            A reusable agent class with all capabilities:
          </p>
          <CodeBlock language="javascript" filename="bitcoin-agent.js">
{`import { hexToBytes } from '@noble/hashes/utils';
import { getPublicKey, finalizeEvent, nip04 } from 'nostr-tools';
import { Relay } from 'nostr-tools/relay';
import { nwc } from '@getalby/sdk';

export class BitcoinAgent {
  constructor(config) {
    this.secretKey = hexToBytes(config.secretKey);
    this.publicKey = getPublicKey(this.secretKey);
    this.wallet = new nwc.NWCClient({
      nostrWalletConnectUrl: config.nwcUrl,
    });
    this.relays = config.relays || ['wss://relay.damus.io'];
  }

  async getBalance() {
    const { balance } = await this.wallet.getBalance();
    return balance;
  }

  async createInvoice(amount, description) {
    const invoice = await this.wallet.makeInvoice({
      amount,
      description,
      expiry: 3600,
    });
    return invoice.invoice;
  }

  async payInvoice(bolt11) {
    const result = await this.wallet.payInvoice({ invoice: bolt11 });
    return result.preimage;
  }

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

    const relay = await Relay.connect(this.relays[0]);
    await relay.publish(event);
    relay.close();
    return event.id;
  }

  async postNote(content) {
    const event = finalizeEvent({
      kind: 1,
      created_at: Math.floor(Date.now() / 1000),
      tags: [],
      content,
    }, this.secretKey);

    const relay = await Relay.connect(this.relays[0]);
    await relay.publish(event);
    relay.close();
    return event.id;
  }
}

// Usage
const agent = new BitcoinAgent({
  secretKey: process.env.NOSTR_SECRET_KEY,
  nwcUrl: process.env.NWC_URL,
});`}
          </CodeBlock>
        </section>
      </div>
    </div>
  );
}
