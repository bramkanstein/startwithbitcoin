# Available Tools & Future Ideas

## Tools Available Today (No Infrastructure Needed)

Everything your AI agent needs to use Bitcoin is already available for free.

### Lightning Wallets with NWC

| Service | Type | Cost | Best For |
|---------|------|------|----------|
| [Alby](https://getalby.com) | Custodial | Free | Beginners, instant setup |
| [Coinos](https://coinos.io) | Custodial | Free | No signup required |
| [Primal](https://primal.net) | Custodial | Free | Nostr-native apps |
| [Alby Hub](https://albyhub.com) | Self-custodial | Free | Full control |

**Get started:** Create an Alby account → Settings → Wallet Connections → Create NWC string

### Public Nostr Relays

Your agent can use these relays immediately:

```
wss://relay.damus.io
wss://nos.lol
wss://relay.nostr.band
wss://relay.primal.net
wss://nostr.wine
```

See all relays: [nostr.watch](https://nostr.watch/relays/find)

### MCP Server (AI Agent Integration)

**Alby MCP Server** - Connect any NWC wallet to Claude and other AI agents.

- Repository: https://github.com/getAlby/mcp
- Features: Send/receive payments, check balance, create invoices
- Works with: Claude, any MCP-compatible AI

### Development & Testing

| Tool | Purpose | Link |
|------|---------|------|
| NWC Faucet | Test wallets for development | [faucet.nwc.dev](https://faucet.nwc.dev) |
| Alby Sandbox | Explore payment scenarios | [sandbox.albylabs.com](https://sandbox.albylabs.com) |
| NWC Playground | Test NWC commands | [nwc-playground.vercel.app](https://nwc-playground.vercel.app) |

### Libraries

```bash
# Core (identity + Lightning)
npm install nostr-tools @getalby/sdk @noble/hashes

# On-chain Bitcoin
npm install bitcoinjs-lib ecpair tiny-secp256k1
```

---

## Future Ideas

These are ideas that could add value beyond what exists. They would require infrastructure.

### 1. Agent Registry

A public directory of Bitcoin-capable AI agents.

**Why it might be valuable:**
- Discover agents by capability
- Verify agents have working wallets
- Ratings and reviews

**Could be built with:**
- Supabase (free tier)
- Vercel (free tier)
- No VPS required

**Specification:**

```sql
CREATE TABLE agents (
  npub VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255),
  description TEXT,
  capabilities TEXT[],
  pricing JSONB,
  nwc_verified BOOLEAN,
  created_at TIMESTAMP
);
```

### 2. Agent-to-Agent Protocol

Custom Nostr event kinds for agent communication.

**Kind 31337: Agent Capability Announcement**
```json
{
  "kind": 31337,
  "tags": [
    ["d", "agent-unique-id"],
    ["capabilities", "code-review", "translation"],
    ["pricing", "sats", "100"],
    ["nwc", "true"]
  ],
  "content": "Agent description"
}
```

**Kind 31338: Service Request**
```json
{
  "kind": 31338,
  "tags": [
    ["capability", "code-review"],
    ["budget", "1000"]
  ],
  "content": "Review this code..."
}
```

This could work on existing public relays - no custom infrastructure needed.

### 3. Dedicated Agent Relay

A Nostr relay optimized for agent traffic.

**When this makes sense:**
- High volume of agent messages
- Need for specialized filtering
- Want to index agent capabilities

**Infrastructure:** ~$10/month VPS

**For now:** Use public relays. They work fine.

---

## What We Don't Need to Build

These already exist and work well:

| Feature | Already Exists |
|---------|---------------|
| MCP Server | [Alby MCP](https://github.com/getAlby/mcp) |
| Hosted wallets | Alby, Coinos, Primal |
| Public relays | relay.damus.io, nos.lol, etc. |
| Test environment | [NWC Faucet](https://faucet.nwc.dev) |
| NWC libraries | @getalby/sdk, nostr-tools |

---

## Resources

- [Awesome NWC](https://github.com/getAlby/awesome-nwc) - Curated list of NWC projects
- [NWC.dev](https://nwc.dev) - Official NWC documentation
- [Nostr.how](https://nostr.how) - Nostr guides
