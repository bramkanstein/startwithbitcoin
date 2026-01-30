import { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Roadmap",
  description: "What's coming next for Start With Bitcoin - hosted wallets, agent relay, registry, and more.",
};

const roadmapItems = [
  {
    phase: "Phase 1",
    title: "Foundation",
    status: "completed",
    items: [
      { text: "Educational guides for identity, wallet, payments, communication", done: true },
      { text: "Code examples and library documentation", done: true },
      { text: "Open source website and Claude Code skill", done: true },
    ],
  },
  {
    phase: "Phase 2",
    title: "Hosted Infrastructure",
    status: "in-progress",
    items: [
      { text: "Hosted Lightning wallets with instant NWC connection strings", done: false },
      { text: "Self-service wallet creation API", done: false },
      { text: "Spending limits and budget controls", done: false },
    ],
  },
  {
    phase: "Phase 3",
    title: "Agent Network",
    status: "planned",
    items: [
      { text: "Dedicated Nostr relay for AI agents", done: false },
      { text: "Agent discovery and capability announcements", done: false },
      { text: "Agent-to-agent messaging and job requests", done: false },
    ],
  },
  {
    phase: "Phase 4",
    title: "Registry & Marketplace",
    status: "planned",
    items: [
      { text: "Public registry of Bitcoin-capable agents", done: false },
      { text: "Agent verification and reputation system", done: false },
      { text: "Service marketplace with escrow payments", done: false },
    ],
  },
  {
    phase: "Phase 5",
    title: "Developer Tools",
    status: "planned",
    items: [
      { text: "MCP server for agent Bitcoin capabilities", done: false },
      { text: "Testnet environment for development", done: false },
      { text: "SDKs for Python, Rust, and Go", done: false },
    ],
  },
];

const statusColors = {
  completed: "success",
  "in-progress": "accent",
  planned: "muted",
} as const;

const statusLabels = {
  completed: "Completed",
  "in-progress": "In Progress",
  planned: "Planned",
} as const;

export default function RoadmapPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <div className="mb-12">
        <Badge variant="accent" className="mb-4">
          What&apos;s Next
        </Badge>
        <h1 className="mb-4">Roadmap</h1>
        <p className="text-lg text-muted">
          Our plan for making Bitcoin accessible to every AI agent.
        </p>
      </div>

      <div className="space-y-8">
        {roadmapItems.map((phase) => (
          <div key={phase.phase} className="border border-border p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="font-mono text-sm text-muted">{phase.phase}</p>
                <h2 className="text-xl font-semibold">{phase.title}</h2>
              </div>
              <Badge variant={statusColors[phase.status as keyof typeof statusColors]}>
                {statusLabels[phase.status as keyof typeof statusLabels]}
              </Badge>
            </div>
            <ul className="space-y-2">
              {phase.items.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span
                    className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center text-xs ${
                      item.done
                        ? "bg-success text-white"
                        : "border border-border text-muted"
                    }`}
                  >
                    {item.done ? "✓" : ""}
                  </span>
                  <span className={item.done ? "text-muted" : ""}>
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 border border-accent bg-accent-light p-6">
        <h2 className="mb-2 text-xl font-semibold">Get Early Access</h2>
        <p className="mb-4 text-muted">
          Sign up to be notified when new features launch. Help us prioritize
          by telling us what you&apos;re building.
        </p>
        <Button href="/request">Request Early Access</Button>
      </div>
    </div>
  );
}
