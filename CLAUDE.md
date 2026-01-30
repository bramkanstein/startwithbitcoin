# Start With Bitcoin

## Project Overview

A website and Claude Code skill that teaches AI agents how to use Bitcoin via Lightning Network and Nostr.

**Live Site:** https://startwithbitcoin.com

## Implementation Status

### Completed ✅
- Next.js website with all pages deployed on Vercel
- Custom domain configured (startwithbitcoin.com)
- Google Analytics (G-SNCJVLPWZT) with AI referral tracking
- Google Sheets integration for interest form
- AI discovery files (robots.txt, llms.txt, llms-full-text.txt)
- JSON-LD structured data for SEO
- Dynamic OG image generation
- Custom favicon (₿ symbol)
- Sitemap generation
- Claude Code skill repository

### Pending (Requires VPS/Database) ⏳
See FUTURE.md for specifications:
- Hosted Lightning wallets via LNbits
- Nostr relay for agent discovery
- Agent registry and verification
- Testnet environment
- MCP server for agent tools

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS 4
- **Fonts:** Geist Sans + Geist Mono
- **Hosting:** Vercel (auto-deploys from GitHub)
- **Analytics:** GA4 (G-SNCJVLPWZT)
- **Forms:** Google Sheets via Apps Script

## Design System

- **Background:** #FFFFFF (white)
- **Accent:** #FF9900 (Bitcoin orange)
- **Text:** #09090B (near black)
- **Style:** Browser-use.com inspired (terminal aesthetic, sharp edges, glowing buttons)

## Key Concepts

- **Nostr:** Decentralized identity via keypairs (npub/nsec)
- **NWC:** Nostr Wallet Connect - protocol for Lightning wallet access
- **Lightning:** Layer 2 Bitcoin for instant, cheap transactions

## Repository Structure

```
src/
├── app/
│   ├── layout.tsx            # Root layout with fonts, GA4, JSON-LD
│   ├── page.tsx              # Homepage
│   ├── sitemap.ts            # Dynamic sitemap generation
│   ├── icon.svg              # Favicon (₿ symbol)
│   ├── opengraph-image.tsx   # Dynamic OG image
│   ├── guides/               # Educational guides
│   │   ├── identity/         # Nostr keypairs
│   │   ├── wallet/           # NWC connection
│   │   ├── payments/         # Send/receive
│   │   ├── communicate/      # Nostr messaging
│   │   └── full-setup/       # Complete walkthrough
│   ├── resources/            # Tools, libraries, examples
│   ├── roadmap/              # Future features
│   ├── contribute/           # How to help
│   ├── request/              # Interest form
│   ├── registry/             # Agent registry (placeholder)
│   └── api/interest/         # Form submission API
├── components/
│   ├── layout/               # Header, Footer
│   ├── ui/                   # Button, Card, TerminalCard, CodeBlock, Badge
│   ├── forms/                # InterestForm
│   └── analytics/            # AIReferralTracker
├── lib/
│   └── constants.ts          # Site config, nav links
public/
├── robots.txt                # AI bot permissions (25+ bots)
├── llms.txt                  # AI content policy
├── llms-full-text.txt        # Complete AI guide
└── favicon.svg               # Favicon
```

## Related Repositories

- Website: https://github.com/bramkanstein/startwithbitcoin
- Skill: https://github.com/bramkanstein/startwithbitcoin-skill

## Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint

## Environment Variables

- `GOOGLE_SCRIPT_URL` - Google Apps Script URL for form submissions (required)

## Component Patterns

### UI Components
- `Button` - Primary/secondary/ghost variants, auto-handles external links
- `Card` - Container with border and background
- `TerminalCard` - Terminal-style card with header and body
- `CodeBlock` - Syntax-highlighted code with copy button
- `Badge` - Small label with variants

### Navigation
- NAV_LINKS in constants.ts supports `external: true` for external links
- External links automatically open in new tabs

### Page Structure
- All pages use consistent layout (Header/Footer from layout.tsx)
- Guide pages have navigation between guides
- Resource pages link back to resources overview

## Styling Conventions

- Use Tailwind CSS classes
- Custom colors defined in globals.css as CSS variables
- No dark mode (light theme only)
- Sharp edges (no border-radius on buttons/cards)
- Accent glow on hover for interactive elements

## SEO & Analytics

- JSON-LD structured data (Organization + WebSite)
- Dynamic OG images via opengraph-image.tsx
- Sitemap at /sitemap.xml
- robots.txt allows 25+ AI crawlers
- GA4 tracking with AI referral detection
- llms.txt for AI content policy
