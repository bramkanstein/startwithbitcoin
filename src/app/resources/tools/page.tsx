import { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Tools",
  description: "Essential tools for building Bitcoin-capable AI agents: LNbits, Alby, and more.",
};

const tools = [
  {
    name: "Alby",
    description: "Browser extension and custodial Lightning wallet with built-in NWC support. Easiest way to get started.",
    url: "https://getalby.com",
    category: "Wallet",
    tags: ["Custodial", "NWC", "Easy Setup"],
  },
  {
    name: "LNbits",
    description: "Open-source Lightning wallet/accounts system. Create sub-wallets with NWC. Self-host or use public instances.",
    url: "https://lnbits.com",
    category: "Wallet",
    tags: ["Self-hosted", "NWC", "Open Source"],
  },
  {
    name: "Phoenix Wallet",
    description: "Non-custodial Lightning wallet for mobile. Good for personal testing and payments.",
    url: "https://phoenix.acinq.co",
    category: "Wallet",
    tags: ["Non-custodial", "Mobile"],
  },
  {
    name: "Umbrel",
    description: "Personal server OS for running Bitcoin and Lightning nodes. NWC support via apps.",
    url: "https://umbrel.com",
    category: "Node",
    tags: ["Self-hosted", "Full Node"],
  },
  {
    name: "Start9",
    description: "Privacy-focused personal server platform. Run your own Bitcoin and Lightning infrastructure.",
    url: "https://start9.com",
    category: "Node",
    tags: ["Self-hosted", "Privacy"],
  },
  {
    name: "Primal",
    description: "Nostr client with built-in wallet. Good for testing Nostr identity and seeing your agent's posts.",
    url: "https://primal.net",
    category: "Nostr",
    tags: ["Client", "Wallet"],
  },
  {
    name: "Damus",
    description: "Popular Nostr client for iOS. Test your agent's Nostr interactions from mobile.",
    url: "https://damus.io",
    category: "Nostr",
    tags: ["iOS", "Client"],
  },
  {
    name: "Nostrudel",
    description: "Feature-rich web-based Nostr client. Great for debugging and exploring the Nostr network.",
    url: "https://nostrudel.ninja",
    category: "Nostr",
    tags: ["Web", "Advanced"],
  },
];

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <div className="mb-12">
        <div className="mb-4 flex items-center gap-4">
          <Badge variant="accent">Resources</Badge>
          <Link href="/resources" className="text-sm text-muted hover:text-foreground">
            ← Back to Resources
          </Link>
        </div>
        <h1 className="mb-4">Tools</h1>
        <p className="text-lg text-muted">
          Essential tools for building and testing Bitcoin-capable AI agents.
        </p>
      </div>

      <div className="space-y-12">
        {["Wallet", "Node", "Nostr"].map((category) => (
          <section key={category}>
            <h2 className="mb-6 text-2xl font-semibold">{category}</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {tools
                .filter((tool) => tool.category === category)
                .map((tool) => (
                  <a
                    key={tool.name}
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <Card className="h-full transition-all group-hover:border-accent group-hover:shadow-[0_0_15px_rgba(255,153,0,0.1)]">
                      <CardTitle className="mb-2 group-hover:text-accent">
                        {tool.name}
                      </CardTitle>
                      <CardDescription className="mb-4">
                        {tool.description}
                      </CardDescription>
                      <div className="flex flex-wrap gap-2">
                        {tool.tags.map((tag) => (
                          <Badge key={tag} variant="muted">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </Card>
                  </a>
                ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
