import { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Payments Guide",
  description: "Learn how to send and receive Lightning payments with your AI agent using NWC.",
};

export default function PaymentsGuidePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <div className="mb-12">
        <div className="mb-4 flex items-center gap-4">
          <Badge variant="accent">Guide 3</Badge>
          <Link href="/guides" className="text-sm text-muted hover:text-foreground">
            ← Back to Guides
          </Link>
        </div>
        <h1 className="mb-4">Payments</h1>
        <p className="text-lg text-muted">
          Send and receive Lightning payments programmatically using NWC.
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        <section className="mb-12">
          <h2>NWC Methods Overview</h2>
          <p className="text-muted">
            NWC provides these core payment methods:
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="border border-border p-4">
              <code className="text-accent">make_invoice</code>
              <p className="mt-2 text-sm text-muted">Create an invoice to receive payment</p>
            </div>
            <div className="border border-border p-4">
              <code className="text-accent">pay_invoice</code>
              <p className="mt-2 text-sm text-muted">Pay a Lightning invoice</p>
            </div>
            <div className="border border-border p-4">
              <code className="text-accent">get_balance</code>
              <p className="mt-2 text-sm text-muted">Check wallet balance</p>
            </div>
            <div className="border border-border p-4">
              <code className="text-accent">list_transactions</code>
              <p className="mt-2 text-sm text-muted">Get transaction history</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2>Receive Payments</h2>
          <p className="text-muted">
            Create a Lightning invoice to receive sats:
          </p>
          <CodeBlock language="javascript" filename="receive-payment.js">
{`import { nwc } from '@getalby/sdk';

const client = new nwc.NWCClient({
  nostrWalletConnectUrl: process.env.NWC_URL,
});

// Create an invoice for 1000 sats
const invoice = await client.makeInvoice({
  amount: 1000, // amount in sats
  description: 'Payment for AI service',
  expiry: 3600, // expires in 1 hour
});

console.log('Invoice:', invoice.invoice);
console.log('Payment hash:', invoice.payment_hash);

// Share invoice.invoice with the payer
// They can paste it into any Lightning wallet`}
          </CodeBlock>
        </section>

        <section className="mb-12">
          <h2>Send Payments</h2>
          <p className="text-muted">
            Pay a Lightning invoice (BOLT11 format):
          </p>
          <CodeBlock language="javascript" filename="send-payment.js">
{`import { nwc } from '@getalby/sdk';

const client = new nwc.NWCClient({
  nostrWalletConnectUrl: process.env.NWC_URL,
});

// Pay an invoice
const bolt11 = 'lnbc10u1p...'; // The invoice to pay

try {
  const result = await client.payInvoice({
    invoice: bolt11,
  });

  console.log('Payment successful!');
  console.log('Preimage:', result.preimage);
  console.log('Fees paid:', result.fees_paid, 'msats');
} catch (error) {
  console.error('Payment failed:', error.message);
}`}
          </CodeBlock>
        </section>

        <section className="mb-12">
          <h2>Check Balance</h2>
          <CodeBlock language="javascript" filename="check-balance.js">
{`import { nwc } from '@getalby/sdk';

const client = new nwc.NWCClient({
  nostrWalletConnectUrl: process.env.NWC_URL,
});

const balance = await client.getBalance();

console.log('Balance:', balance.balance, 'sats');

// Check if you have enough to pay something
const paymentAmount = 5000;
if (balance.balance >= paymentAmount) {
  console.log('Sufficient balance for payment');
} else {
  console.log('Insufficient balance');
}`}
          </CodeBlock>
        </section>

        <section className="mb-12">
          <h2>List Transactions</h2>
          <CodeBlock language="javascript" filename="list-transactions.js">
{`import { nwc } from '@getalby/sdk';

const client = new nwc.NWCClient({
  nostrWalletConnectUrl: process.env.NWC_URL,
});

const transactions = await client.listTransactions({
  limit: 10,
  offset: 0,
  unpaid: false, // only settled transactions
});

for (const tx of transactions.transactions) {
  const direction = tx.type === 'incoming' ? '↓ Received' : '↑ Sent';
  console.log(\`\${direction}: \${tx.amount} sats - \${tx.description}\`);
}`}
          </CodeBlock>
        </section>

        <section className="mb-12">
          <h2>Handle Payment Notifications</h2>
          <p className="text-muted">
            Subscribe to payment events to react in real-time:
          </p>
          <CodeBlock language="javascript" filename="payment-notifications.js">
{`import { nwc } from '@getalby/sdk';

const client = new nwc.NWCClient({
  nostrWalletConnectUrl: process.env.NWC_URL,
});

// Subscribe to incoming payments
client.on('notification', (notification) => {
  if (notification.notification_type === 'payment_received') {
    console.log('Payment received!');
    console.log('Amount:', notification.notification.amount, 'sats');
    console.log('Description:', notification.notification.description);

    // Trigger your business logic here
    handlePaymentReceived(notification.notification);
  }
});

function handlePaymentReceived(payment) {
  // Example: Unlock a feature, send a response, etc.
  console.log('Processing payment:', payment.payment_hash);
}`}
          </CodeBlock>
        </section>

        <section className="mb-12">
          <h2>Payment Flow Example</h2>
          <p className="text-muted">
            A complete example of an agent selling a service:
          </p>
          <CodeBlock language="javascript" filename="service-payment-flow.js">
{`import { nwc } from '@getalby/sdk';

const client = new nwc.NWCClient({
  nostrWalletConnectUrl: process.env.NWC_URL,
});

async function sellService(serviceName, priceSats) {
  // Step 1: Create invoice
  const invoice = await client.makeInvoice({
    amount: priceSats,
    description: \`Payment for: \${serviceName}\`,
    expiry: 600, // 10 minutes
  });

  console.log('Pay this invoice:', invoice.invoice);

  // Step 2: Wait for payment (poll method)
  const paid = await waitForPayment(invoice.payment_hash);

  if (paid) {
    // Step 3: Deliver service
    console.log('Payment confirmed! Delivering service...');
    return deliverService(serviceName);
  } else {
    console.log('Payment not received in time');
    return null;
  }
}

async function waitForPayment(paymentHash, maxAttempts = 60) {
  for (let i = 0; i < maxAttempts; i++) {
    const txs = await client.listTransactions({ unpaid: false });
    const found = txs.transactions.find(
      tx => tx.payment_hash === paymentHash
    );

    if (found) return true;

    await new Promise(r => setTimeout(r, 1000)); // Wait 1s
  }
  return false;
}

function deliverService(serviceName) {
  // Your service logic here
  return { success: true, service: serviceName };
}`}
          </CodeBlock>
        </section>

        <section className="mb-12">
          <h2>Error Handling</h2>
          <p className="text-muted">
            Common errors and how to handle them:
          </p>
          <CodeBlock language="javascript" filename="error-handling.js">
{`try {
  await client.payInvoice({ invoice: bolt11 });
} catch (error) {
  switch (error.code) {
    case 'INSUFFICIENT_BALANCE':
      console.log('Not enough sats in wallet');
      break;
    case 'PAYMENT_FAILED':
      console.log('Payment could not be routed');
      break;
    case 'INVOICE_EXPIRED':
      console.log('Invoice has expired');
      break;
    case 'RATE_LIMITED':
      console.log('Too many requests, slow down');
      break;
    default:
      console.log('Unknown error:', error.message);
  }
}`}
          </CodeBlock>
        </section>

        <div className="flex items-center justify-between border-t border-border pt-8">
          <Button href="/guides/wallet" variant="secondary">
            ← Previous: Wallet
          </Button>
          <Button href="/guides/communicate">
            Next: Communicate →
          </Button>
        </div>
      </div>
    </div>
  );
}
