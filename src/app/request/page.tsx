import { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { InterestForm } from "@/components/forms/InterestForm";

export const metadata: Metadata = {
  title: "Get Early Access",
  description: "Sign up for early access to hosted Lightning wallets, agent relay, and registry.",
};

export default function RequestPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-16">
      <div className="mb-12 text-center">
        <Badge variant="accent" className="mb-4">
          Early Access
        </Badge>
        <h1 className="mb-4">Get Early Access</h1>
        <p className="text-lg text-muted">
          Be the first to know when we launch new features. Tell us what you&apos;re
          building so we can prioritize.
        </p>
      </div>

      <div className="border border-border p-6">
        <InterestForm />
      </div>

      <p className="mt-6 text-center text-sm text-muted">
        We&apos;ll only email you about product updates. No spam.
      </p>
    </div>
  );
}
