"use client";

import { useEffect } from "react";

// AI platform referrer patterns
const AI_REFERRERS = [
  { pattern: /chatgpt\.com/i, source: "chatgpt" },
  { pattern: /chat\.openai\.com/i, source: "chatgpt" },
  { pattern: /claude\.ai/i, source: "claude" },
  { pattern: /anthropic\.com/i, source: "claude" },
  { pattern: /perplexity\.ai/i, source: "perplexity" },
  { pattern: /bing\.com.*chat/i, source: "copilot" },
  { pattern: /copilot\.microsoft\.com/i, source: "copilot" },
  { pattern: /gemini\.google\.com/i, source: "gemini" },
  { pattern: /bard\.google\.com/i, source: "gemini" },
  { pattern: /you\.com/i, source: "you" },
  { pattern: /phind\.com/i, source: "phind" },
  { pattern: /kagi\.com/i, source: "kagi" },
];

// AI bot user agent patterns
const AI_BOTS = [
  { pattern: /GPTBot/i, source: "gptbot" },
  { pattern: /ChatGPT-User/i, source: "chatgpt-user" },
  { pattern: /Claude-Web/i, source: "claude-web" },
  { pattern: /Anthropic/i, source: "anthropic" },
  { pattern: /PerplexityBot/i, source: "perplexitybot" },
  { pattern: /Cohere-ai/i, source: "cohere" },
  { pattern: /YouBot/i, source: "youbot" },
];

function detectAIReferrer(referrer: string): string | null {
  for (const { pattern, source } of AI_REFERRERS) {
    if (pattern.test(referrer)) {
      return source;
    }
  }
  return null;
}

function detectAIBot(userAgent: string): string | null {
  for (const { pattern, source } of AI_BOTS) {
    if (pattern.test(userAgent)) {
      return source;
    }
  }
  return null;
}

function sendGA4Event(eventName: string, params: Record<string, string>) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
}

export function AIReferralTracker() {
  useEffect(() => {
    // Check URL parameters for AI source
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get("utm_source");
    const utmMedium = urlParams.get("utm_medium");

    // Track if coming from AI platform via UTM
    if (utmSource === "ai" || utmMedium === "llms-txt") {
      sendGA4Event("ai_referral", {
        ai_source: utmSource || "unknown",
        ai_medium: utmMedium || "unknown",
        referral_type: "utm",
      });
      return;
    }

    // Check referrer for AI platforms
    const referrer = document.referrer;
    if (referrer) {
      const aiSource = detectAIReferrer(referrer);
      if (aiSource) {
        sendGA4Event("ai_referral", {
          ai_source: aiSource,
          referral_type: "referrer",
        });
        return;
      }
    }

    // Check for AI bot user agents
    const userAgent = navigator.userAgent;
    const botSource = detectAIBot(userAgent);
    if (botSource) {
      sendGA4Event("ai_bot_visit", {
        bot_source: botSource,
      });
    }
  }, []);

  return null;
}

// Type declaration for gtag
declare global {
  interface Window {
    gtag?: (
      command: string,
      eventName: string,
      params?: Record<string, string>
    ) => void;
  }
}
