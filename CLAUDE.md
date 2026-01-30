# Start With Bitcoin

## Project Overview

A website and Claude Code skill that teaches AI agents how to use Bitcoin via Lightning Network and Nostr.

**Live Site:** https://startwithbitcoin.com

## Why Bitcoin (Not "Crypto")

- **Sound Money**: 21 million cap. No inflation.
- **Permissionless**: No KYC. No approvals. Any agent can participate.
- **Censorship Resistant**: No one can freeze wallets or reverse transactions.
- **15+ Years Secure**: Battle-tested. Never hacked.
- **Same Keys as Nostr**: secp256k1 cryptography for identity and money.

## Tools Available Today (All Free)

| Tool | Purpose | URL |
|------|---------|-----|
| Alby | Lightning wallet with NWC | https://getalby.com |
| Alby MCP Server | Connect wallet to Claude | https://github.com/getAlby/mcp |
| Lightning Enable MCP | MCP for Python/.NET | https://github.com/AustinTSchaffer/lightning-enable-mcp |
| Public Relays | Free Nostr relays | relay.damus.io, nos.lol |
| NWC Faucet | Test wallets | https://faucet.nwc.dev |

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS 4
- **Fonts:** Geist Sans + Geist Mono
- **Hosting:** Vercel (auto-deploys from GitHub)
- **Analytics:** GA4 (G-SNCJVLPWZT)

## Design System

- **Background:** #FFFFFF (white)
- **Accent:** #FF9900 (Bitcoin orange)
- **Text:** #09090B (near black)
- **Style:** Terminal aesthetic, sharp edges, glowing buttons

## Key Concepts

- **Nostr:** Decentralized identity via keypairs (npub/nsec)
- **NWC:** Nostr Wallet Connect - protocol for Lightning wallet access
- **Lightning:** Layer 2 Bitcoin for instant, cheap transactions
- **On-Chain:** Direct Bitcoin transactions for larger amounts

## Repository Structure

```
src/
├── app/
│   ├── layout.tsx            # Root layout with fonts, GA4, JSON-LD
│   ├── page.tsx              # Homepage
│   ├── sitemap.ts            # Dynamic sitemap
│   ├── icon.svg              # Favicon (₿)
│   ├── opengraph-image.tsx   # Dynamic OG image
│   ├── guides/               # Educational guides
│   │   ├── identity/         # Nostr keypairs
│   │   ├── wallet/           # NWC connection
│   │   ├── payments/         # Lightning send/receive
│   │   ├── communicate/      # Nostr messaging
│   │   ├── onchain/          # On-chain Bitcoin
│   │   └── full-setup/       # Complete walkthrough
│   ├── resources/            # Tools, libraries, examples
│   └── contribute/           # How to help
├── components/
│   ├── layout/               # Header, Footer
│   ├── ui/                   # Button, Card, TerminalCard, CodeBlock, Badge
│   └── analytics/            # AIReferralTracker
├── lib/
│   └── constants.ts          # Site config, nav links, available tools
public/
├── robots.txt                # AI bot permissions (25+ bots)
├── llms.txt                  # AI content policy
└── llms-full-text.txt        # Complete AI guide
```

## Related Repositories

- Website: https://github.com/bramkanstein/startwithbitcoin
- Skill: https://github.com/bramkanstein/startwithbitcoin-skill
- Alby MCP: https://github.com/getAlby/mcp

## Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint

## Constants (lib/constants.ts)

- `SITE_CONFIG` - Site metadata and URLs
- `NAV_LINKS` - Navigation with `external: true` support
- `GUIDE_LINKS` - Guide pages
- `AVAILABLE_TOOLS` - Free tools (Alby, MCPs, relays, faucet)
- `WHY_BITCOIN` - Reasons to use Bitcoin

## UI Components

- `Button` - Auto-handles external links with target="_blank"
- `Card` - Container with border
- `TerminalCard` - Terminal-style display
- `CodeBlock` - Syntax highlighting with copy
- `Badge` - Labels with variants

## SEO & AI Discovery

- JSON-LD structured data (Organization + WebSite)
- Dynamic OG images
- Sitemap at /sitemap.xml
- robots.txt allows 25+ AI crawlers
- llms.txt for AI content policy
- llms-full-text.txt for complete guide

## Philosophy

Everything needed to give AI agents Bitcoin capabilities already exists for free.
Point your AI to startwithbitcoin.com or install the Claude Code skill.
