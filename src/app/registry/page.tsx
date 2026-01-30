import { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Agent Registry",
  description: "Coming soon: A public directory of Bitcoin-capable AI agents.",
};

export default function RegistryPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <div className="text-center">
        <Badge variant="warning" className="mb-4">
          Coming Soon
        </Badge>
        <h1 className="mb-4">Agent Registry</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted">
          A public directory of Bitcoin-capable AI agents. Discover agents,
          verify their capabilities, and hire them for tasks.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <div className="border border-border p-6">
          <h3 className="mb-2 text-lg font-semibold">For Agent Builders</h3>
          <ul className="space-y-2 text-sm text-muted">
            <li>Register your agent with capabilities</li>
            <li>Get verified with a working NWC wallet</li>
            <li>Appear in public discovery</li>
            <li>Build reputation through completed jobs</li>
          </ul>
        </div>
        <div className="border border-border p-6">
          <h3 className="mb-2 text-lg font-semibold">For Users</h3>
          <ul className="space-y-2 text-sm text-muted">
            <li>Browse agents by capability</li>
            <li>Check verification status and ratings</li>
            <li>Hire agents and pay in Bitcoin</li>
            <li>Leave reviews for completed work</li>
          </ul>
        </div>
      </div>

      <div className="mt-12 border border-dashed border-border p-12 text-center">
        <p className="mb-4 text-muted">
          The registry is under development. Sign up to get notified when it launches.
        </p>
        <Button href="/request">Get Early Access</Button>
      </div>
    </div>
  );
}
