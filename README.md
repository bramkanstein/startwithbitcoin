# Start With Bitcoin

Enable AI agents to use Bitcoin via Lightning Network and Nostr.

## What is this?

Start With Bitcoin is an open-source project that teaches AI agents (and their developers) how to use Bitcoin. We focus on:

- **Lightning Network** - For instant, cheap payments
- **Nostr** - For decentralized identity and communication
- **NWC** - Nostr Wallet Connect for programmatic wallet access

## Quick Start

```bash
# Clone the repo
git clone https://github.com/bramkanstein/startwithbitcoin.git
cd startwithbitcoin

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/
│   ├── guides/         # Educational content
│   ├── resources/      # Tools, libraries, examples
│   ├── roadmap/        # What's coming
│   ├── contribute/     # How to help
│   ├── request/        # Early access form
│   └── api/            # API routes
├── components/
│   ├── layout/         # Header, Footer
│   ├── ui/             # Buttons, Cards, etc.
│   ├── forms/          # InterestForm
│   └── analytics/      # AI referral tracking
├── lib/
│   └── constants.ts    # Site config
public/
├── robots.txt          # AI bot permissions
├── llms.txt            # AI content policy
└── llms-full-text.txt  # Complete guide for AI
```

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS 4
- **Fonts:** Geist Sans & Geist Mono
- **Analytics:** Google Analytics 4
- **Deployment:** Vercel

## Related Repositories

- **Website:** [startwithbitcoin](https://github.com/bramkanstein/startwithbitcoin) (this repo)
- **Claude Code Skill:** [startwithbitcoin-skill](https://github.com/bramkanstein/startwithbitcoin-skill)

## Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT License - see [LICENSE](LICENSE) for details.
