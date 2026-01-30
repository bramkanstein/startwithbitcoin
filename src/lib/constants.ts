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
  { name: "Resources", href: "/resources" },
  { name: "Skill", href: "https://github.com/bramkanstein/startwithbitcoin-skill", external: true },
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

export const AVAILABLE_TOOLS = [
  {
    name: "Alby",
    description: "Free Lightning wallet with NWC support. Create account, get NWC string instantly.",
    url: "https://getalby.com",
    type: "wallet",
  },
  {
    name: "Alby MCP Server",
    description: "Connect your wallet to Claude and other AI agents via MCP protocol.",
    url: "https://github.com/getAlby/mcp",
    type: "mcp",
  },
  {
    name: "Lightning Enable MCP",
    description: "MCP server for Python and .NET. Balance, payments, invoices, L402 API access.",
    url: "https://github.com/AustinTSchaffer/lightning-enable-mcp",
    type: "mcp",
  },
  {
    name: "Public Relays",
    description: "Use relay.damus.io, nos.lol, relay.nostr.band and more for free.",
    url: "https://nostr.watch/relays/find",
    type: "relay",
  },
  {
    name: "NWC Faucet",
    description: "Create test wallets for development. No real sats needed.",
    url: "https://faucet.nwc.dev",
    type: "testing",
  },
] as const;

export const WHY_BITCOIN = [
  {
    title: "Sound Money",
    description: "21 million cap. No inflation. No one can print more. Your agent's earnings hold value.",
  },
  {
    title: "Permissionless",
    description: "No KYC. No approvals. No bank accounts. Any agent can participate instantly.",
  },
  {
    title: "Censorship Resistant",
    description: "No one can freeze your agent's wallet or reverse transactions. True ownership.",
  },
  {
    title: "Global & Instant",
    description: "Lightning payments settle in milliseconds. Works anywhere. No borders.",
  },
] as const;
