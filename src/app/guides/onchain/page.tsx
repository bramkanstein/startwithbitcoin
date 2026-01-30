import { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "On-Chain Bitcoin Guide",
  description: "Learn how to send and receive on-chain Bitcoin transactions with your AI agent using bitcoinjs-lib.",
};

export default function OnchainGuidePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <div className="mb-12">
        <div className="mb-4 flex items-center gap-4">
          <Badge variant="accent">Guide 5</Badge>
          <Link href="/guides" className="text-sm text-muted hover:text-foreground">
            ← Back to Guides
          </Link>
        </div>
        <h1 className="mb-4">On-Chain Bitcoin</h1>
        <p className="text-lg text-muted">
          Send and receive Bitcoin on the main blockchain for larger transactions and cold storage.
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        <section className="mb-12">
          <h2>When to Use On-Chain vs Lightning</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="border border-border p-4">
              <h3 className="mt-0 text-lg font-semibold">⚡ Lightning (Recommended)</h3>
              <ul className="mb-0 text-sm text-muted">
                <li>Instant payments (milliseconds)</li>
                <li>Near-zero fees (&lt;1 sat)</li>
                <li>Microtransactions</li>
                <li>High-frequency payments</li>
              </ul>
            </div>
            <div className="border border-accent p-4">
              <h3 className="mt-0 text-lg font-semibold">🔗 On-Chain (This Guide)</h3>
              <ul className="mb-0 text-sm text-muted">
                <li>Large amounts (&gt;$1000)</li>
                <li>Cold storage/savings</li>
                <li>Final settlement</li>
                <li>No channel limits</li>
              </ul>
            </div>
          </div>
          <p className="mt-4 text-muted">
            For most AI agent use cases, Lightning is better. Use on-chain for larger amounts
            or when you need to move Bitcoin to cold storage.
          </p>
        </section>

        <section className="mb-12">
          <h2>Install Dependencies</h2>
          <CodeBlock language="bash" filename="terminal">
{`npm install bitcoinjs-lib @noble/hashes ecpair tiny-secp256k1`}
          </CodeBlock>
          <p className="text-sm text-muted">
            Note: bitcoinjs-lib is the standard library for Bitcoin transactions in JavaScript.
          </p>
        </section>

        <section className="mb-12">
          <h2>Generate Bitcoin Address</h2>
          <p className="text-muted">
            Create a native SegWit (bech32) address from your Nostr keypair:
          </p>
          <CodeBlock language="javascript" filename="generate-address.js">
{`import * as bitcoin from 'bitcoinjs-lib';
import * as ecc from 'tiny-secp256k1';
import { ECPairFactory } from 'ecpair';
import { hexToBytes } from '@noble/hashes/utils';

// Initialize ECPair with secp256k1
bitcoin.initEccLib(ecc);
const ECPair = ECPairFactory(ecc);

// Your Nostr secret key (same curve as Bitcoin!)
const secretKeyHex = process.env.NOSTR_SECRET_KEY;
const secretKey = hexToBytes(secretKeyHex);

// Create keypair
const keyPair = ECPair.fromPrivateKey(Buffer.from(secretKey));

// Generate native SegWit address (bech32, starts with bc1)
const { address } = bitcoin.payments.p2wpkh({
  pubkey: keyPair.publicKey,
  network: bitcoin.networks.bitcoin, // Use testnet for testing
});

console.log('Bitcoin Address:', address);
// Example: bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh`}
          </CodeBlock>
          <div className="mt-4 border-l-4 border-accent bg-accent-light p-4">
            <p className="mb-0 text-sm">
              <strong>Same Keys!</strong> Your Nostr keypair uses the same secp256k1 curve as Bitcoin.
              You can derive a Bitcoin address from your Nostr identity.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2>Check Balance</h2>
          <p className="text-muted">
            Use a blockchain API to check your address balance:
          </p>
          <CodeBlock language="javascript" filename="check-balance.js">
{`// Using mempool.space API (free, no auth required)
async function getBalance(address) {
  const response = await fetch(
    \`https://mempool.space/api/address/\${address}\`
  );
  const data = await response.json();

  const confirmed = data.chain_stats.funded_txo_sum - data.chain_stats.spent_txo_sum;
  const unconfirmed = data.mempool_stats.funded_txo_sum - data.mempool_stats.spent_txo_sum;

  return {
    confirmed, // in satoshis
    unconfirmed, // in satoshis
    total: confirmed + unconfirmed,
  };
}

// Usage
const balance = await getBalance('bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh');
console.log('Confirmed:', balance.confirmed, 'sats');
console.log('Unconfirmed:', balance.unconfirmed, 'sats');`}
          </CodeBlock>
        </section>

        <section className="mb-12">
          <h2>Get UTXOs</h2>
          <p className="text-muted">
            To spend Bitcoin, you need to know your unspent transaction outputs (UTXOs):
          </p>
          <CodeBlock language="javascript" filename="get-utxos.js">
{`async function getUTXOs(address) {
  const response = await fetch(
    \`https://mempool.space/api/address/\${address}/utxo\`
  );
  const utxos = await response.json();

  return utxos.map(utxo => ({
    txid: utxo.txid,
    vout: utxo.vout,
    value: utxo.value, // in satoshis
    confirmed: utxo.status.confirmed,
  }));
}

// Usage
const utxos = await getUTXOs('bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh');
console.log('UTXOs:', utxos);
// [{ txid: '...', vout: 0, value: 50000, confirmed: true }]`}
          </CodeBlock>
        </section>

        <section className="mb-12">
          <h2>Estimate Fees</h2>
          <p className="text-muted">
            Get current fee rates for transaction priority:
          </p>
          <CodeBlock language="javascript" filename="estimate-fees.js">
{`async function getFeeRates() {
  const response = await fetch(
    'https://mempool.space/api/v1/fees/recommended'
  );
  return await response.json();
}

// Usage
const fees = await getFeeRates();
console.log('Fast (next block):', fees.fastestFee, 'sat/vB');
console.log('Medium (30 min):', fees.halfHourFee, 'sat/vB');
console.log('Slow (1 hour):', fees.hourFee, 'sat/vB');
console.log('Economy:', fees.economyFee, 'sat/vB');

// Calculate fee for a typical transaction (~140 vBytes for 1-in-1-out)
const txSize = 140; // virtual bytes
const estimatedFee = fees.halfHourFee * txSize;
console.log('Estimated fee:', estimatedFee, 'sats');`}
          </CodeBlock>
        </section>

        <section className="mb-12">
          <h2>Create & Sign Transaction</h2>
          <p className="text-muted">
            Build and sign a Bitcoin transaction:
          </p>
          <CodeBlock language="javascript" filename="create-transaction.js">
{`import * as bitcoin from 'bitcoinjs-lib';
import * as ecc from 'tiny-secp256k1';
import { ECPairFactory } from 'ecpair';

bitcoin.initEccLib(ecc);
const ECPair = ECPairFactory(ecc);

async function createTransaction({
  secretKey,
  toAddress,
  amountSats,
  feeRate,
}) {
  // Create keypair
  const keyPair = ECPair.fromPrivateKey(Buffer.from(secretKey));
  const { address: fromAddress, output } = bitcoin.payments.p2wpkh({
    pubkey: keyPair.publicKey,
  });

  // Get UTXOs
  const utxos = await getUTXOs(fromAddress);
  if (utxos.length === 0) throw new Error('No UTXOs available');

  // Build transaction
  const psbt = new bitcoin.Psbt({ network: bitcoin.networks.bitcoin });

  // Add inputs (simplified: using first UTXO)
  let inputSum = 0;
  for (const utxo of utxos) {
    // Get the raw transaction for witness data
    const txHex = await fetch(
      \`https://mempool.space/api/tx/\${utxo.txid}/hex\`
    ).then(r => r.text());

    psbt.addInput({
      hash: utxo.txid,
      index: utxo.vout,
      witnessUtxo: {
        script: output,
        value: utxo.value,
      },
    });

    inputSum += utxo.value;
    if (inputSum >= amountSats + 1000) break; // +1000 for fees
  }

  // Calculate fee (estimate ~110 vBytes for 1-in-2-out)
  const estimatedSize = 110 + (psbt.inputCount - 1) * 68;
  const fee = Math.ceil(feeRate * estimatedSize);

  // Add outputs
  psbt.addOutput({
    address: toAddress,
    value: amountSats,
  });

  // Change output (back to ourselves)
  const change = inputSum - amountSats - fee;
  if (change > 546) { // Dust limit
    psbt.addOutput({
      address: fromAddress,
      value: change,
    });
  }

  // Sign all inputs
  psbt.signAllInputs(keyPair);
  psbt.finalizeAllInputs();

  // Get raw transaction hex
  const tx = psbt.extractTransaction();
  return {
    txHex: tx.toHex(),
    txid: tx.getId(),
    fee,
  };
}`}
          </CodeBlock>
        </section>

        <section className="mb-12">
          <h2>Broadcast Transaction</h2>
          <CodeBlock language="javascript" filename="broadcast.js">
{`async function broadcastTransaction(txHex) {
  const response = await fetch('https://mempool.space/api/tx', {
    method: 'POST',
    body: txHex,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(\`Broadcast failed: \${error}\`);
  }

  const txid = await response.text();
  console.log('Transaction broadcast!');
  console.log('TXID:', txid);
  console.log('Track:', \`https://mempool.space/tx/\${txid}\`);

  return txid;
}

// Usage
const { txHex, txid, fee } = await createTransaction({
  secretKey: hexToBytes(process.env.NOSTR_SECRET_KEY),
  toAddress: 'bc1q...recipient...',
  amountSats: 50000,
  feeRate: 10, // sat/vB
});

console.log('Fee:', fee, 'sats');
await broadcastTransaction(txHex);`}
          </CodeBlock>
        </section>

        <section className="mb-12">
          <h2>Complete On-Chain Agent Class</h2>
          <CodeBlock language="javascript" filename="onchain-agent.js">
{`import * as bitcoin from 'bitcoinjs-lib';
import * as ecc from 'tiny-secp256k1';
import { ECPairFactory } from 'ecpair';
import { hexToBytes } from '@noble/hashes/utils';

bitcoin.initEccLib(ecc);
const ECPair = ECPairFactory(ecc);

export class OnChainAgent {
  constructor(secretKeyHex, network = 'mainnet') {
    this.secretKey = hexToBytes(secretKeyHex);
    this.keyPair = ECPair.fromPrivateKey(Buffer.from(this.secretKey));
    this.network = network === 'mainnet'
      ? bitcoin.networks.bitcoin
      : bitcoin.networks.testnet;

    const { address } = bitcoin.payments.p2wpkh({
      pubkey: this.keyPair.publicKey,
      network: this.network,
    });
    this.address = address;

    this.apiBase = network === 'mainnet'
      ? 'https://mempool.space/api'
      : 'https://mempool.space/testnet/api';
  }

  async getBalance() {
    const res = await fetch(\`\${this.apiBase}/address/\${this.address}\`);
    const data = await res.json();
    return {
      confirmed: data.chain_stats.funded_txo_sum - data.chain_stats.spent_txo_sum,
      unconfirmed: data.mempool_stats.funded_txo_sum - data.mempool_stats.spent_txo_sum,
    };
  }

  async send(toAddress, amountSats, feeRate = 10) {
    // Implementation as shown above
    const { txHex, txid, fee } = await this.createTransaction(
      toAddress,
      amountSats,
      feeRate
    );

    await this.broadcast(txHex);
    return { txid, fee };
  }

  async waitForConfirmation(txid, confirmations = 1) {
    while (true) {
      const res = await fetch(\`\${this.apiBase}/tx/\${txid}\`);
      const tx = await res.json();

      if (tx.status.confirmed) {
        const tipRes = await fetch(\`\${this.apiBase}/blocks/tip/height\`);
        const tipHeight = await tipRes.json();
        const confs = tipHeight - tx.status.block_height + 1;

        if (confs >= confirmations) {
          return { confirmed: true, confirmations: confs };
        }
      }

      await new Promise(r => setTimeout(r, 30000)); // Check every 30s
    }
  }
}

// Usage
const agent = new OnChainAgent(process.env.NOSTR_SECRET_KEY);
console.log('Address:', agent.address);

const balance = await agent.getBalance();
console.log('Balance:', balance.confirmed, 'sats');

// Send payment
const { txid } = await agent.send('bc1q...', 100000, 5);
await agent.waitForConfirmation(txid, 3);`}
          </CodeBlock>
        </section>

        <section className="mb-12">
          <h2>Security Considerations</h2>
          <div className="space-y-4">
            <div className="border border-border p-4">
              <h4 className="mt-0 font-semibold">Use Testnet First</h4>
              <p className="mb-0 text-sm text-muted">
                Always test with testnet before using real Bitcoin. Change network to testnet
                and use a testnet faucet to get test coins.
              </p>
            </div>
            <div className="border border-border p-4">
              <h4 className="mt-0 font-semibold">Verify Addresses</h4>
              <p className="mb-0 text-sm text-muted">
                Always double-check recipient addresses. Bitcoin transactions are irreversible.
              </p>
            </div>
            <div className="border border-border p-4">
              <h4 className="mt-0 font-semibold">Fee Estimation</h4>
              <p className="mb-0 text-sm text-muted">
                Low fees may cause transactions to get stuck. Check current mempool conditions
                and use appropriate fee rates.
              </p>
            </div>
            <div className="border border-border p-4">
              <h4 className="mt-0 font-semibold">UTXO Management</h4>
              <p className="mb-0 text-sm text-muted">
                Many small UTXOs increase transaction fees. Consider consolidating UTXOs
                during low-fee periods.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2>Testnet Resources</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <a
              href="https://mempool.space/testnet"
              target="_blank"
              rel="noopener noreferrer"
              className="block border border-border p-4 transition-colors hover:border-accent"
            >
              <h4 className="mt-0 font-semibold">Mempool.space Testnet</h4>
              <p className="mb-0 text-sm text-muted">
                Block explorer for testnet transactions
              </p>
            </a>
            <a
              href="https://coinfaucet.eu/en/btc-testnet/"
              target="_blank"
              rel="noopener noreferrer"
              className="block border border-border p-4 transition-colors hover:border-accent"
            >
              <h4 className="mt-0 font-semibold">Testnet Faucet</h4>
              <p className="mb-0 text-sm text-muted">
                Get free testnet Bitcoin for testing
              </p>
            </a>
          </div>
        </section>

        <div className="flex items-center justify-between border-t border-border pt-8">
          <Button href="/guides/communicate" variant="secondary">
            ← Previous: Communicate
          </Button>
          <Button href="/guides/full-setup">
            Next: Full Setup →
          </Button>
        </div>
      </div>
    </div>
  );
}
