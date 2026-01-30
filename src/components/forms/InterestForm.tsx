"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

interface FormData {
  email: string;
  npub: string;
  hostedWallet: boolean;
  agentRelay: boolean;
  agentRegistry: boolean;
  testnet: boolean;
  whatBuilding: string;
}

export function InterestForm() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    npub: "",
    hostedWallet: false,
    agentRelay: false,
    agentRegistry: false,
    testnet: false,
    whatBuilding: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      setStatus("success");
      setFormData({
        email: "",
        npub: "",
        hostedWallet: false,
        agentRelay: false,
        agentRegistry: false,
        testnet: false,
        whatBuilding: "",
      });
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="border border-success bg-green-50 p-6 text-center">
        <h3 className="mb-2 text-xl font-semibold text-success">Thanks for signing up!</h3>
        <p className="text-muted">
          We&apos;ll notify you when new features are ready. Check your email for updates.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium">
          Email <span className="text-error">*</span>
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full border border-border bg-background px-4 py-3 text-foreground focus:border-accent focus:outline-none"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="npub" className="mb-2 block text-sm font-medium">
          Nostr npub <span className="text-muted">(optional)</span>
        </label>
        <input
          type="text"
          id="npub"
          value={formData.npub}
          onChange={(e) => setFormData({ ...formData, npub: e.target.value })}
          className="w-full border border-border bg-background px-4 py-3 font-mono text-sm text-foreground focus:border-accent focus:outline-none"
          placeholder="npub1..."
        />
      </div>

      <div>
        <p className="mb-3 text-sm font-medium">I&apos;m interested in:</p>
        <div className="space-y-3">
          {[
            { key: "hostedWallet", label: "Hosted Lightning wallet (instant NWC)" },
            { key: "agentRelay", label: "Agent relay (discovery & messaging)" },
            { key: "agentRegistry", label: "Agent registry (list my agent)" },
            { key: "testnet", label: "Testnet environment" },
          ].map(({ key, label }) => (
            <label key={key} className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={formData[key as keyof FormData] as boolean}
                onChange={(e) =>
                  setFormData({ ...formData, [key]: e.target.checked })
                }
                className="h-5 w-5 cursor-pointer accent-accent"
              />
              <span className="text-sm">{label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="whatBuilding" className="mb-2 block text-sm font-medium">
          What are you building? <span className="text-muted">(optional)</span>
        </label>
        <textarea
          id="whatBuilding"
          value={formData.whatBuilding}
          onChange={(e) =>
            setFormData({ ...formData, whatBuilding: e.target.value })
          }
          rows={3}
          className="w-full border border-border bg-background px-4 py-3 text-foreground focus:border-accent focus:outline-none"
          placeholder="Tell us about your AI agent project..."
        />
      </div>

      {status === "error" && (
        <div className="border border-error bg-red-50 p-4 text-sm text-error">
          {errorMessage}
        </div>
      )}

      <Button type="submit" size="lg" disabled={status === "loading"} className="w-full">
        {status === "loading" ? "Submitting..." : "Get Early Access"}
      </Button>
    </form>
  );
}
