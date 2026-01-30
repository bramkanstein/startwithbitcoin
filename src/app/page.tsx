import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";
import { TerminalCard, TerminalLine, TerminalOutput } from "@/components/ui/TerminalCard";
import { Badge } from "@/components/ui/Badge";
import { SITE_CONFIG, GUIDE_LINKS, AVAILABLE_TOOLS, WHY_BITCOIN } from "@/lib/constants";

function HeroSection() {
  return (
    <section className="border-b border-border py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div className="flex flex-col justify-center">
            <Badge variant="accent" className="mb-6 w-fit">
              For AI Agents
            </Badge>
            <h1 className="mb-6">
              Enable AI agents to use{" "}
              <span className="text-accent">Bitcoin</span>
            </h1>
            <p className="mb-8 text-lg text-muted">
              Give your AI agents identity, wallet, and autonomous payment capabilities
              using Lightning Network and Nostr. Everything you need is free and available today.
            </p>

            <div className="space-y-3">
              <a
                href="/guides/full-setup"
                className="flex items-center gap-4 border border-border p-4 transition-all hover:border-accent hover:shadow-[0_0_15px_rgba(255,153,0,0.1)]"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-accent font-mono text-sm font-bold text-black">
                  1
                </span>
                <div>
                  <div className="font-semibold">Full Setup Guide</div>
                  <div className="text-sm text-muted">Step-by-step walkthrough from identity to payments</div>
                </div>
              </a>
              <a
                href="/resources/tools"
                className="flex items-center gap-4 border border-border p-4 transition-all hover:border-accent hover:shadow-[0_0_15px_rgba(255,153,0,0.1)]"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-accent font-mono text-sm font-bold text-black">
                  2
                </span>
                <div>
                  <div className="font-semibold">View Tools & MCPs</div>
                  <div className="text-sm text-muted">Get NWC connection and MCP servers - start building now</div>
                </div>
              </a>
              <a
                href="https://github.com/bramkanstein/startwithbitcoin-skill"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 border border-border p-4 transition-all hover:border-accent hover:shadow-[0_0_15px_rgba(255,153,0,0.1)]"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-accent font-mono text-sm font-bold text-black">
                  3
                </span>
                <div>
                  <div className="font-semibold">Claude Code Skill</div>
                  <div className="text-sm text-muted">Install the skill for hands-on help in your terminal</div>
                </div>
              </a>
            </div>
          </div>

          <div className="flex items-center">
            <TerminalCard label="Lightning Payment" className="w-full">
              <TerminalLine>npm install @getalby/sdk</TerminalLine>
              <TerminalOutput>
                <div className="mt-2 text-muted">+ @getalby/sdk@3.7.1</div>
              </TerminalOutput>
              <div className="mt-4 border-t border-border pt-4">
                <TerminalLine prompt="#">Connect wallet &amp; pay</TerminalLine>
                <TerminalOutput>
                  <pre className="mt-2 text-sm">
{`const nwc = new NWCClient({
  nostrWalletConnectUrl: NWC_URL
});
await nwc.payInvoice({ invoice });`}
                  </pre>
                </TerminalOutput>
              </div>
              <div className="mt-4 border-t border-border pt-4">
                <TerminalOutput>
                  <div className="text-success">✓ Payment sent: 1,000 sats</div>
                </TerminalOutput>
              </div>
            </TerminalCard>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyBitcoinSection() {
  return (
    <section className="border-b border-border bg-card py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-4 text-center">Why Bitcoin?</h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-muted">
          Not &quot;crypto.&quot; Bitcoin. There&apos;s a difference. AI agents need money that&apos;s
          programmable, permissionless, sound, and not controlled by any human.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {WHY_BITCOIN.map((item) => (
            <div key={item.title} className="border border-border bg-background p-6">
              <h3 className="mb-2 font-semibold">{item.title}</h3>
              <p className="text-sm text-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhatIsThisSection() {
  return (
    <section className="border-b border-border py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6">What is this?</h2>
          <p className="text-lg text-muted">
            Start With Bitcoin is an open-source project that teaches AI agents (and their developers)
            how to use Bitcoin. We focus on <strong className="text-foreground">Lightning Network</strong> for
            instant, cheap payments and <strong className="text-foreground">Nostr</strong> for decentralized
            identity and communication.
          </p>
        </div>
      </div>
    </section>
  );
}

function TheStackSection() {
  const stack = [
    {
      title: "Identity",
      description: "Nostr keypairs give your agent a unique, verifiable identity that works across platforms.",
      tech: "Nostr (secp256k1)",
      icon: "🔑",
    },
    {
      title: "Wallet",
      description: "Connect to Lightning wallets using Nostr Wallet Connect (NWC) for programmatic access.",
      tech: "NWC Protocol",
      icon: "💳",
    },
    {
      title: "Payments",
      description: "Send and receive Bitcoin instantly with minimal fees. Perfect for microtransactions.",
      tech: "Lightning Network",
      icon: "⚡",
    },
  ];

  return (
    <section className="border-b border-border py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-4 text-center">The Stack</h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-muted">
          Three components work together to give your agent full Bitcoin capabilities.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {stack.map((item) => (
            <Card key={item.title} className="text-center">
              <div className="mb-4 text-4xl">{item.icon}</div>
              <CardTitle className="mb-2">{item.title}</CardTitle>
              <CardDescription className="mb-4">{item.description}</CardDescription>
              <Badge variant="muted">{item.tech}</Badge>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function QuickStartSection() {
  return (
    <section className="border-b border-border py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-4 text-center">Quick Start</h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-muted">
          Follow our guides to set up Bitcoin capabilities for your agent in minutes.
        </p>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {GUIDE_LINKS.map((guide, index) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="group flex items-start gap-4 border border-border p-6 transition-all hover:border-accent hover:shadow-[0_0_15px_rgba(255,153,0,0.1)]"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-accent font-mono text-sm font-bold text-black">
                {index + 1}
              </span>
              <div>
                <h3 className="mb-1 text-lg font-semibold group-hover:text-accent">
                  {guide.name}
                </h3>
                <p className="text-sm text-muted">{guide.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function AvailableToolsSection() {
  return (
    <section className="border-b border-border bg-card py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-4 text-center">Tools Available Today</h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-muted">
          Everything you need exists and is free. No waiting. Start building now.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          {AVAILABLE_TOOLS.map((tool) => (
            <a
              key={tool.name}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 border border-border bg-background p-6 transition-all hover:border-accent hover:shadow-[0_0_15px_rgba(255,153,0,0.1)]"
            >
              <Badge variant="accent">{tool.type}</Badge>
              <div>
                <h4 className="mb-1 font-semibold">{tool.name}</h4>
                <p className="text-sm text-muted">{tool.description}</p>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button href="/resources/tools">
            View All Resources
          </Button>
          <Button href={`${SITE_CONFIG.github.website}/issues/new?title=Tool%20Suggestion&body=Tool%20Name:%0A%0AURL:%0A%0ADescription:`} variant="secondary">
            Suggest a Tool
          </Button>
        </div>

        <p className="mt-6 text-center text-sm text-muted">
          Know a Bitcoin/Lightning tool or MCP that should be listed?{" "}
          <a href={`${SITE_CONFIG.github.website}/issues`} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
            Open an issue on GitHub
          </a>
        </p>
      </div>
    </section>
  );
}

function CommunitySection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6">Open Source</h2>
          <p className="mb-8 text-lg text-muted">
            Start With Bitcoin is fully open source. Contribute guides, fix bugs,
            or build integrations. All code is MIT licensed.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href={SITE_CONFIG.github.website} variant="secondary" size="lg">
              Website Repository
            </Button>
            <Button href={SITE_CONFIG.github.skill} variant="secondary" size="lg">
              Claude Code Skill
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <WhatIsThisSection />
      <TheStackSection />
      <QuickStartSection />
      <AvailableToolsSection />
      <WhyBitcoinSection />
      <CommunitySection />
    </>
  );
}
