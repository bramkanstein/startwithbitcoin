import { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const metadata: Metadata = {
  title: "Libraries",
  description: "JavaScript libraries for building Bitcoin-capable AI agents: nostr-tools, Alby SDK, and more.",
};

const libraries = [
  {
    name: "nostr-tools",
    description: "Low-level Nostr utilities for JavaScript/TypeScript. Key generation, event signing, relay connections.",
    install: "npm install nostr-tools",
    github: "https://github.com/nbd-wtf/nostr-tools",
    docs: "https://github.com/nbd-wtf/nostr-tools#readme",
    category: "Nostr",
  },
  {
    name: "@nostr-dev-kit/ndk",
    description: "Higher-level Nostr Development Kit. Connection management, caching, subscriptions, and more.",
    install: "npm install @nostr-dev-kit/ndk",
    github: "https://github.com/nostr-dev-kit/ndk",
    docs: "https://ndk.fiatjaf.com",
    category: "Nostr",
  },
  {
    name: "@getalby/sdk",
    description: "Alby SDK with NWC client. Easiest way to integrate Lightning payments.",
    install: "npm install @getalby/sdk",
    github: "https://github.com/getAlby/js-sdk",
    docs: "https://github.com/getAlby/js-sdk#readme",
    category: "Lightning",
  },
  {
    name: "@noble/hashes",
    description: "Cryptographic hash functions used by Nostr. SHA256, HMAC, and utilities.",
    install: "npm install @noble/hashes",
    github: "https://github.com/paulmillr/noble-hashes",
    docs: "https://github.com/paulmillr/noble-hashes#readme",
    category: "Crypto",
  },
  {
    name: "@noble/secp256k1",
    description: "Elliptic curve cryptography for Bitcoin/Nostr. Used for key generation and signing.",
    install: "npm install @noble/secp256k1",
    github: "https://github.com/paulmillr/noble-secp256k1",
    docs: "https://github.com/paulmillr/noble-secp256k1#readme",
    category: "Crypto",
  },
  {
    name: "bitcoinjs-lib",
    description: "Full Bitcoin library for JavaScript. Useful for on-chain operations (less common for agents).",
    install: "npm install bitcoinjs-lib",
    github: "https://github.com/bitcoinjs/bitcoinjs-lib",
    docs: "https://github.com/bitcoinjs/bitcoinjs-lib#readme",
    category: "Bitcoin",
  },
  {
    name: "bolt11",
    description: "Parse and create Lightning invoices (BOLT11 format).",
    install: "npm install bolt11",
    github: "https://github.com/bitcoinjs/bolt11",
    docs: "https://github.com/bitcoinjs/bolt11#readme",
    category: "Lightning",
  },
];

export default function LibrariesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <div className="mb-12">
        <div className="mb-4 flex items-center gap-4">
          <Badge variant="accent">Resources</Badge>
          <Link href="/resources" className="text-sm text-muted hover:text-foreground">
            ← Back to Resources
          </Link>
        </div>
        <h1 className="mb-4">Libraries</h1>
        <p className="text-lg text-muted">
          JavaScript/TypeScript libraries for building Bitcoin-capable AI agents.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="mb-6">Quick Install</h2>
        <p className="mb-4 text-muted">
          Install the essential libraries for most agent projects:
        </p>
        <CodeBlock language="bash" filename="Terminal">
{`npm install nostr-tools @getalby/sdk @noble/hashes`}
        </CodeBlock>
      </section>

      <div className="space-y-12">
        {["Nostr", "Lightning", "Crypto", "Bitcoin"].map((category) => {
          const categoryLibs = libraries.filter((lib) => lib.category === category);
          if (categoryLibs.length === 0) return null;

          return (
            <section key={category}>
              <h2 className="mb-6 text-2xl font-semibold">{category}</h2>
              <div className="space-y-6">
                {categoryLibs.map((lib) => (
                  <div key={lib.name} className="border border-border p-6">
                    <div className="mb-4 flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-semibold">{lib.name}</h3>
                        <p className="mt-1 text-muted">{lib.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <a
                          href={lib.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-muted hover:text-foreground"
                        >
                          GitHub
                        </a>
                        <span className="text-border">|</span>
                        <a
                          href={lib.docs}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-muted hover:text-foreground"
                        >
                          Docs
                        </a>
                      </div>
                    </div>
                    <CodeBlock language="bash">
                      {lib.install}
                    </CodeBlock>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
