# Start With Bitcoin

## Project Overview

A website and Claude Code skill that teaches AI agents how to use Bitcoin via Lightning Network and Nostr. The goal is to provide everything needed for AI agents to have autonomous payment capabilities.

**Live Site:** https://startwithbitcoin.com

**Philosophy:** Everything needed already exists for free. Point your AI to startwithbitcoin.com or install the Claude Code skill. No infrastructure to build - just education and pointers to existing tools.

## Why Bitcoin (Not "Crypto")

- **Sound Money**: 21 million cap. No inflation.
- **Permissionless**: No KYC. No approvals. Any agent can participate.
- **Censorship Resistant**: No one can freeze wallets or reverse transactions.
- **Not Controlled by Any Human**: Truly decentralized, no foundation or company.
- **15+ Years Secure**: Battle-tested. Never hacked.
- **Same Keys as Nostr**: secp256k1 cryptography for identity and money.

## Tools Available Today (All Free)

| Tool | Purpose | URL |
|------|---------|-----|
| Alby | Lightning wallet with NWC | https://getalby.com |
| Alby MCP Server | Connect wallet to Claude (JS/TS) | https://github.com/getAlby/mcp |
| Lightning Enable MCP | MCP for Python/.NET | https://github.com/AustinTSchaffer/lightning-enable-mcp |
| Public Relays | Free Nostr relays | relay.damus.io, nos.lol, relay.nostr.band |
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
- **Muted:** #71717A
- **Border:** #E4E4E7
- **Style:** Terminal aesthetic, sharp edges, glowing buttons

## Key Concepts

- **Nostr:** Decentralized identity via keypairs (npub/nsec) using secp256k1
- **NWC:** Nostr Wallet Connect - protocol for Lightning wallet access
- **Lightning:** Layer 2 Bitcoin for instant, cheap transactions
- **On-Chain:** Direct Bitcoin transactions for larger amounts (same keys as Nostr)

## Repository Structure

```
src/
├── app/
│   ├── layout.tsx            # Root layout with fonts, GA4, JSON-LD
│   ├── page.tsx              # Homepage with 3 paths: Guide, Tools, Skill
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

## Navigation

- **Guides** - Educational content
- **Resources** - Tools, libraries, examples
- **Skill** - Link to Claude Code skill repo (external)
- **Contribute** - How to help

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

## AI Agent Optimization

The site is optimized for both human developers AND AI agents:

### For AI Crawlers
- `robots.txt` - Allows 25+ AI bots (ChatGPT, Claude, Perplexity, etc.)
- `llms.txt` - AI content policy at /llms.txt
- `llms-full-text.txt` - Complete guide at /llms-full-text.txt
- JSON-LD schema (Organization + WebSite)

### For AI Agents Using the Site
- Clear, structured content
- Code examples that can be copied directly
- All external links to tools and resources
- The Claude Code skill for hands-on help

## SEO

- JSON-LD structured data (Organization + WebSite)
- Dynamic OG images per page
- Sitemap at /sitemap.xml
- Meta tags and Twitter cards

## Recent Changes (Jan 2026)

- Removed early access/roadmap pages (everything is available now)
- Added Lightning Enable MCP to tools
- Hero now shows 3 clear paths: Guide, Tools, Skill
- Added "autonomous" to payment capabilities messaging
- Added "not controlled by any human" to Why Bitcoin
- Simplified navigation: Guides, Resources, Skill, Contribute
- Updated OG image with autonomous messaging
