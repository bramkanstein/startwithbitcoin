import { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Communication Guide",
  description: "Learn how to use Nostr for agent-to-agent and agent-to-human communication.",
};

export default function CommunicateGuidePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <div className="mb-12">
        <div className="mb-4 flex items-center gap-4">
          <Badge variant="accent">Guide 4</Badge>
          <Link href="/guides" className="text-sm text-muted hover:text-foreground">
            ← Back to Guides
          </Link>
        </div>
        <h1 className="mb-4">Communicate</h1>
        <p className="text-lg text-muted">
          Use Nostr for encrypted direct messages and public announcements.
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        <section className="mb-12">
          <h2>Nostr Relays</h2>
          <p className="text-muted">
            Nostr messages are transmitted through relays. Relays are servers that receive, store,
            and forward messages. Your agent should connect to multiple relays for reliability.
          </p>
          <div className="border border-border p-4">
            <h4 className="mb-2 font-semibold">Recommended Relays</h4>
            <ul className="space-y-1 font-mono text-sm">
              <li>wss://relay.damus.io</li>
              <li>wss://nos.lol</li>
              <li>wss://relay.nostr.band</li>
              <li>wss://nostr.wine</li>
              <li>wss://relay.primal.net</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2>Send Encrypted DMs (NIP-04)</h2>
          <p className="text-muted">
            Send private, encrypted messages to another user or agent:
          </p>
          <CodeBlock language="javascript" filename="send-dm.js">
{`import { finalizeEvent, nip04 } from 'nostr-tools';
import { Relay } from 'nostr-tools/relay';

async function sendDM(secretKey, recipientPubkey, message) {
  // Encrypt the message
  const encryptedContent = await nip04.encrypt(
    secretKey,
    recipientPubkey,
    message
  );

  // Create kind 4 (encrypted DM) event
  const event = finalizeEvent({
    kind: 4,
    created_at: Math.floor(Date.now() / 1000),
    tags: [['p', recipientPubkey]],
    content: encryptedContent,
  }, secretKey);

  // Publish to relay
  const relay = await Relay.connect('wss://relay.damus.io');
  await relay.publish(event);
  relay.close();

  return event.id;
}

// Usage
const messageId = await sendDM(
  mySecretKey,
  'npub1recipientpubkey...',
  'Hello from my AI agent!'
);`}
          </CodeBlock>
        </section>

        <section className="mb-12">
          <h2>Receive DMs</h2>
          <p className="text-muted">
            Subscribe to incoming encrypted messages:
          </p>
          <CodeBlock language="javascript" filename="receive-dm.js">
{`import { nip04 } from 'nostr-tools';
import { Relay } from 'nostr-tools/relay';

async function listenForDMs(secretKey, publicKey) {
  const relay = await Relay.connect('wss://relay.damus.io');

  relay.subscribe([
    {
      kinds: [4], // Encrypted DMs
      '#p': [publicKey], // Messages sent to us
    },
  ], {
    onevent: async (event) => {
      // Decrypt the message
      const decrypted = await nip04.decrypt(
        secretKey,
        event.pubkey,
        event.content
      );

      console.log('DM from:', event.pubkey);
      console.log('Message:', decrypted);

      // Handle the message
      handleIncomingDM(event.pubkey, decrypted);
    },
  });

  console.log('Listening for DMs...');
}

function handleIncomingDM(sender, message) {
  // Process the message and potentially respond
  console.log(\`Processing message from \${sender}: \${message}\`);
}`}
          </CodeBlock>
        </section>

        <section className="mb-12">
          <h2>NIP-44 Encryption (Recommended)</h2>
          <p className="text-muted">
            NIP-44 is the newer, more secure encryption standard. Use it when both
            parties support it:
          </p>
          <CodeBlock language="javascript" filename="nip44-dm.js">
{`import { finalizeEvent, nip44 } from 'nostr-tools';
import { Relay } from 'nostr-tools/relay';

async function sendSecureDM(secretKey, recipientPubkey, message) {
  // Generate conversation key
  const conversationKey = nip44.getConversationKey(
    secretKey,
    recipientPubkey
  );

  // Encrypt with NIP-44
  const encryptedContent = nip44.encrypt(message, conversationKey);

  // Create kind 14 (NIP-44 DM) event
  const event = finalizeEvent({
    kind: 14,
    created_at: Math.floor(Date.now() / 1000),
    tags: [['p', recipientPubkey]],
    content: encryptedContent,
  }, secretKey);

  const relay = await Relay.connect('wss://relay.damus.io');
  await relay.publish(event);
  relay.close();
}`}
          </CodeBlock>
        </section>

        <section className="mb-12">
          <h2>Public Notes</h2>
          <p className="text-muted">
            Post public announcements or status updates:
          </p>
          <CodeBlock language="javascript" filename="public-note.js">
{`import { finalizeEvent } from 'nostr-tools';
import { Relay } from 'nostr-tools/relay';

async function postNote(secretKey, content) {
  // Create kind 1 (text note) event
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

// Announce agent availability
await postNote(
  mySecretKey,
  'AI Agent online and ready to help! Accepting Lightning payments. #nostr #bitcoin'
);`}
          </CodeBlock>
        </section>

        <section className="mb-12">
          <h2>Subscribe to Events</h2>
          <p className="text-muted">
            Listen for specific events, like mentions of your agent:
          </p>
          <CodeBlock language="javascript" filename="subscribe-events.js">
{`import { Relay } from 'nostr-tools/relay';

async function subscribeToMentions(publicKey) {
  const relay = await Relay.connect('wss://relay.damus.io');

  relay.subscribe([
    {
      kinds: [1], // Text notes
      '#p': [publicKey], // That mention our pubkey
      since: Math.floor(Date.now() / 1000) - 3600, // Last hour
    },
  ], {
    onevent: (event) => {
      console.log('Mentioned by:', event.pubkey);
      console.log('Content:', event.content);

      // Maybe respond or take action
      handleMention(event);
    },
  });
}

function handleMention(event) {
  // Check if it's a service request
  if (event.content.includes('hire') || event.content.includes('help')) {
    // Respond with your services
  }
}`}
          </CodeBlock>
        </section>

        <section className="mb-12">
          <h2>Using NDK (Higher-Level SDK)</h2>
          <p className="text-muted">
            For more complex applications, use NDK for connection management and caching:
          </p>
          <CodeBlock language="javascript" filename="ndk-example.js">
{`import NDK, { NDKPrivateKeySigner } from '@nostr-dev-kit/ndk';

// Initialize NDK
const ndk = new NDK({
  explicitRelayUrls: [
    'wss://relay.damus.io',
    'wss://nos.lol',
    'wss://relay.nostr.band',
  ],
  signer: new NDKPrivateKeySigner(secretKey),
});

await ndk.connect();

// Fetch a user's profile
const user = ndk.getUser({ pubkey: somePubkey });
await user.fetchProfile();
console.log('User name:', user.profile?.name);

// Send a DM
const dm = await user.sendDM('Hello!');
console.log('DM sent:', dm.id);

// Subscribe to DMs
const sub = ndk.subscribe({
  kinds: [4],
  '#p': [myPubkey],
});

sub.on('event', async (event) => {
  const content = await event.decrypt();
  console.log('Received DM:', content);
});`}
          </CodeBlock>
        </section>

        <section className="mb-12">
          <h2>Best Practices</h2>
          <ul className="space-y-2 text-muted">
            <li>
              <strong className="text-foreground">Connect to multiple relays</strong> - Messages may
              not reach all relays. Use 3-5 for reliability.
            </li>
            <li>
              <strong className="text-foreground">Handle disconnections</strong> - Relays can go
              offline. Implement reconnection logic.
            </li>
            <li>
              <strong className="text-foreground">Respect rate limits</strong> - Don&apos;t spam
              relays with too many messages.
            </li>
            <li>
              <strong className="text-foreground">Use NIP-44 when possible</strong> - It&apos;s more
              secure than NIP-04.
            </li>
          </ul>
        </section>

        <div className="flex items-center justify-between border-t border-border pt-8">
          <Button href="/guides/payments" variant="secondary">
            ← Previous: Payments
          </Button>
          <Button href="/guides/full-setup">
            Next: Full Setup →
          </Button>
        </div>
      </div>
    </div>
  );
}
