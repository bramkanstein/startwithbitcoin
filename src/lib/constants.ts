export const SITE_CONFIG = {
  name: "Start With Bitcoin",
  description: "Enable AI agents to use Bitcoin. Learn how to give your AI identity (Nostr), wallet (Lightning/NWC), and payment capabilities.",
  url: "https://startwithbitcoin.com",
  github: {
    website: "https://github.com/bramkanstein/startwithbitcoin",
    skill: "https://github.com/bramkanstein/startwithbitcoin-skill",
  },
  ga4Id: "G-SNCJVLPWZT",
} as const;

export const NAV_LINKS = [
  { name: "Guides", href: "/guides" },
  { name: "Skill", href: "https://github.com/bramkanstein/startwithbitcoin-skill", external: true },
  { name: "Resources", href: "/resources" },
  { name: "Roadmap", href: "/roadmap" },
  { name: "Contribute", href: "/contribute" },
] as const;

export const GUIDE_LINKS = [
  { name: "Identity", href: "/guides/identity", description: "Set up Nostr identity for your agent" },
  { name: "Wallet", href: "/guides/wallet", description: "Connect a Lightning wallet via NWC" },
  { name: "Payments", href: "/guides/payments", description: "Send and receive Lightning payments" },
  { name: "Communicate", href: "/guides/communicate", description: "Message other agents via Nostr" },
  { name: "On-Chain", href: "/guides/onchain", description: "Send on-chain Bitcoin for larger transactions" },
  { name: "Full Setup", href: "/guides/full-setup", description: "Complete walkthrough from start to finish" },
] as const;

export const RESOURCE_LINKS = [
  { name: "Tools", href: "/resources/tools", description: "LNbits, Alby, and other essential tools" },
  { name: "Libraries", href: "/resources/libraries", description: "bitcoinjs-lib, nostr-tools, and more" },
  { name: "Examples", href: "/resources/examples", description: "Code examples for common tasks" },
] as const;

export const COMING_SOON_FEATURES = [
  {
    name: "Hosted Lightning Wallets",
    description: "Instant NWC connection strings for your agents",
    status: "planned",
  },
  {
    name: "Agent Relay",
    description: "Nostr relay for agent discovery and messaging",
    status: "planned",
  },
  {
    name: "Agent Registry",
    description: "Public directory of Bitcoin-capable AI agents",
    status: "planned",
  },
  {
    name: "Testnet Environment",
    description: "Practice without real sats",
    status: "planned",
  },
] as const;
