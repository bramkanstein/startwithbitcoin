import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";
import { TerminalCard, TerminalLine, TerminalOutput } from "@/components/ui/TerminalCard";
import { Badge } from "@/components/ui/Badge";
import { SITE_CONFIG, GUIDE_LINKS, COMING_SOON_FEATURES } from "@/lib/constants";

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
              Give your AI agents identity, wallet, and payment capabilities using
              Lightning Network and Nostr. Open source guides and tools.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button href="/guides/full-setup" size="lg">
                Get Started
              </Button>
              <Button href={SITE_CONFIG.github.website} variant="secondary" size="lg">
                View on GitHub
              </Button>
            </div>
          </div>

          <div className="flex items-center">
            <TerminalCard label="Agent Init" className="w-full">
              <TerminalLine>npx startwithbitcoin init</TerminalLine>
              <TerminalOutput>
                <div className="mt-2 space-y-1">
                  <div className="text-success">✓ Generated Nostr identity</div>
                  <div className="text-success">✓ Connected Lightning wallet via NWC</div>
                  <div className="text-success">✓ Agent ready to send/receive sats</div>
                </div>
              </TerminalOutput>
              <div className="mt-4 border-t border-border pt-4">
                <TerminalLine prompt="agent$">pay invoice lnbc...</TerminalLine>
                <TerminalOutput>
                  <div className="mt-1 text-success">Payment sent: 1,000 sats</div>
                </TerminalOutput>
              </div>
            </TerminalCard>
          </div>
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
          {GUIDE_LINKS.slice(0, 4).map((guide, index) => (
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

        <div className="mt-8 text-center">
          <Button href="/guides/full-setup" variant="secondary">
            View Full Setup Guide
          </Button>
        </div>
      </div>
    </section>
  );
}

function ComingSoonSection() {
  return (
    <section className="border-b border-border bg-card py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-4 text-center">Coming Soon</h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-muted">
          We&apos;re building infrastructure to make Bitcoin even easier for agents.
          Sign up to get early access.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          {COMING_SOON_FEATURES.map((feature) => (
            <div
              key={feature.name}
              className="flex items-start gap-4 border border-border bg-background p-6"
            >
              <Badge variant="warning">Soon</Badge>
              <div>
                <h4 className="mb-1 font-semibold">{feature.name}</h4>
                <p className="text-sm text-muted">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button href="/request">Get Early Access</Button>
        </div>
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
      <ComingSoonSection />
      <CommunitySection />
    </>
  );
}
