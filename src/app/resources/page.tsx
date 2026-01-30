import Link from "next/link";
import { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { RESOURCE_LINKS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Resources",
  description: "Tools, libraries, and code examples for building Bitcoin-capable AI agents.",
};

export default function ResourcesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <div className="mb-12">
        <Badge variant="accent" className="mb-4">
          Developer Resources
        </Badge>
        <h1 className="mb-4">Resources</h1>
        <p className="text-lg text-muted">
          Everything you need to build Bitcoin-capable AI agents.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {RESOURCE_LINKS.map((resource) => (
          <Link
            key={resource.href}
            href={resource.href}
            className="group border border-border p-6 transition-all hover:border-accent hover:shadow-[0_0_15px_rgba(255,153,0,0.1)]"
          >
            <h2 className="mb-2 text-xl font-semibold group-hover:text-accent">
              {resource.name}
            </h2>
            <p className="text-sm text-muted">{resource.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
