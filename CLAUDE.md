# Start With Bitcoin

## Project Overview

A website and skill that teaches AI agents how to use Bitcoin via Lightning Network and Nostr.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS 4
- **Fonts:** Geist Sans + Geist Mono
- **Hosting:** Vercel
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
│   ├── guides/           # Educational guides
│   │   ├── identity/     # Nostr keypairs
│   │   ├── wallet/       # NWC connection
│   │   ├── payments/     # Send/receive
│   │   ├── communicate/  # Nostr messaging
│   │   └── full-setup/   # Complete walkthrough
│   ├── resources/        # Tools, libraries, examples
│   ├── roadmap/          # Future features
│   ├── contribute/       # How to help
│   ├── request/          # Interest form
│   ├── registry/         # Agent registry (placeholder)
│   └── api/interest/     # Form submission API
├── components/
│   ├── layout/           # Header, Footer
│   ├── ui/               # Button, Card, TerminalCard, CodeBlock, Badge
│   ├── forms/            # InterestForm
│   └── analytics/        # AIReferralTracker
├── lib/
│   └── constants.ts      # Site config, nav links
public/
├── robots.txt            # AI bot permissions
├── llms.txt              # AI content policy
└── llms-full-text.txt    # Complete AI guide
```

## Related Repositories

- Website: github.com/bramkanstein/startwithbitcoin
- Skill: github.com/bramkanstein/startwithbitcoin-skill

## Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint

## Environment Variables

- `GOOGLE_SCRIPT_URL` - Google Apps Script URL for form submissions

## Component Patterns

### UI Components
- `Button` - Primary/secondary/ghost variants with href or onClick
- `Card` - Container with border and background
- `TerminalCard` - Terminal-style card with header and body
- `CodeBlock` - Syntax-highlighted code with copy button
- `Badge` - Small label with variants

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

## Future Ideas (Requires Infrastructure)

See FUTURE.md for detailed specifications on:
- Hosted Lightning wallets via LNbits
- Nostr relay for agent discovery
- Agent registry and verification
- Testnet environment
- MCP server for agent tools
