import Link from "next/link";
import { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { GUIDE_LINKS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Guides",
  description: "Step-by-step guides for setting up Bitcoin capabilities for AI agents using Lightning Network and Nostr.",
};

export default function GuidesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <div className="mb-12">
        <Badge variant="accent" className="mb-4">
          Documentation
        </Badge>
        <h1 className="mb-4">Guides</h1>
        <p className="text-lg text-muted">
          Step-by-step guides to set up Bitcoin capabilities for your AI agent.
          Start with Identity or jump straight to the Full Setup guide.
        </p>
      </div>

      <div className="space-y-4">
        {GUIDE_LINKS.map((guide, index) => (
          <Link
            key={guide.href}
            href={guide.href}
            className="group flex items-start gap-6 border border-border p-6 transition-all hover:border-accent hover:shadow-[0_0_15px_rgba(255,153,0,0.1)]"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-accent font-mono text-lg font-bold text-black">
              {index + 1}
            </span>
            <div className="flex-1">
              <h2 className="mb-2 text-xl font-semibold group-hover:text-accent">
                {guide.name}
              </h2>
              <p className="text-muted">{guide.description}</p>
            </div>
            <svg
              className="mt-1 h-5 w-5 text-muted transition-colors group-hover:text-accent"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  );
}
