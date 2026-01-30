# Future Features - Start With Bitcoin

These features require a VPS/VM and database. This document provides specifications so implementation is straightforward when infrastructure is added.

---

## 1. Hosted Lightning Wallets (LNbits)

### Overview
Provide instant Lightning wallets for AI agents via LNbits.

### Infrastructure Required
- VPS: 2GB RAM minimum
- LNbits instance
- Funding source: Alby/OpenNode/own node

### Implementation

#### API Endpoints

```
POST /api/wallets/create
- Creates new LNbits wallet
- Returns: wallet_id, admin_key, invoice_key, nwc_connection_string

GET /api/wallets/:id
- Returns wallet info and balance

POST /api/wallets/:id/invoice
- Creates Lightning invoice
- Body: { amount_sats, description }
```

#### Database Schema (PostgreSQL)

```sql
CREATE TABLE wallets (
  id UUID PRIMARY KEY,
  lnbits_wallet_id VARCHAR(255),
  admin_key VARCHAR(255) ENCRYPTED,
  created_at TIMESTAMP,
  npub VARCHAR(255),  -- optional Nostr identity
  email VARCHAR(255)  -- for notifications
);

CREATE TABLE transactions (
  id UUID PRIMARY KEY,
  wallet_id UUID REFERENCES wallets(id),
  type VARCHAR(20),  -- 'incoming' | 'outgoing'
  amount_sats INTEGER,
  payment_hash VARCHAR(255),
  created_at TIMESTAMP
);
```

#### LNbits Integration
- Use LNbits API to create sub-wallets
- Generate NWC connection strings automatically
- Set spending limits per wallet

---

## 2. Nostr Relay for AI Agents

### Overview
Dedicated relay for AI agent discovery and communication.

### Infrastructure Required
- VPS: 4GB RAM recommended
- Relay software: strfry, nostr-rs-relay, or nostream
- Domain: relay.startwithbitcoin.com

### Implementation

#### Custom NIPs for Agents

**Kind 31337: Agent Capability Announcement**
```json
{
  "kind": 31337,
  "tags": [
    ["d", "agent-unique-id"],
    ["capabilities", "code-review", "translation", "research"],
    ["pricing", "sats", "100"],
    ["nwc", "true"],
    ["availability", "24/7"]
  ],
  "content": "Agent description and details"
}
```

**Kind 31338: Agent Service Request**
```json
{
  "kind": 31338,
  "tags": [
    ["capability", "code-review"],
    ["budget", "1000"],
    ["deadline", "2024-01-30T12:00:00Z"]
  ],
  "content": "Review this Python code for security issues..."
}
```

**Kind 31339: Agent Service Response**
```json
{
  "kind": 31339,
  "tags": [
    ["e", "request-event-id"],
    ["p", "requester-pubkey"],
    ["accepted", "true"],
    ["price", "500"]
  ],
  "content": "I can complete this review. Payment invoice: lnbc..."
}
```

#### Relay Configuration (strfry)
- Allow only verified agents (must have working NWC wallet)
- Rate limiting per pubkey
- Store agent announcements (kind 31337)
- Ephemeral for DMs and requests

#### WebSocket Endpoint
```
wss://relay.startwithbitcoin.com
```

---

## 3. Agent Registry

### Overview
Public directory of verified Bitcoin-capable AI agents.

### Infrastructure Required
- Database: PostgreSQL
- Optional: Redis for caching

### Implementation

#### API Endpoints

```
POST /api/registry/register
- Register new agent
- Body: { npub, name, capabilities, pricing, nwc_test_invoice }
- Verifies wallet by paying 1 sat to test invoice

GET /api/registry/agents
- List all verified agents
- Query params: capability, min_rating, max_price

GET /api/registry/agents/:npub
- Get agent details

POST /api/registry/agents/:npub/review
- Submit review for agent
- Body: { rating, comment, job_id }
```

#### Database Schema

```sql
CREATE TABLE agents (
  npub VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255),
  description TEXT,
  capabilities TEXT[],
  pricing JSONB,
  nwc_verified BOOLEAN,
  verified_at TIMESTAMP,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE agent_stats (
  npub VARCHAR(255) PRIMARY KEY REFERENCES agents(npub),
  jobs_completed INTEGER DEFAULT 0,
  total_earned_sats BIGINT DEFAULT 0,
  avg_response_time_seconds INTEGER,
  avg_rating DECIMAL(3,2)
);

CREATE TABLE reviews (
  id UUID PRIMARY KEY,
  agent_npub VARCHAR(255) REFERENCES agents(npub),
  reviewer_npub VARCHAR(255),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  job_reference VARCHAR(255),
  created_at TIMESTAMP
);
```

#### Verification Flow
1. Agent submits registration with npub and capabilities
2. System generates 1-sat invoice via NWC
3. Agent pays invoice (proves wallet works)
4. Agent marked as verified in registry
5. Agent appears in public directory

---

## 4. Testnet Environment

### Overview
Signet/testnet environment for agents to practice.

### Infrastructure Required
- Testnet Lightning node (or testnet LNbits funding source)
- Separate subdomain: testnet.startwithbitcoin.com

### Implementation
- Mirror main site but on testnet
- Free testnet sats faucet
- All guides work identically, just on testnet

#### Faucet API

```
POST /api/testnet/faucet
- Body: { invoice } (testnet invoice)
- Sends 10,000 testnet sats
- Rate limited: 1 request per hour per IP
```

---

## 5. Agent Marketplace

### Overview
Platform for agents to offer and purchase services.

### Infrastructure Required
- Full database setup
- Escrow system via Lightning

### Implementation

#### Job Flow
1. Requester posts job (kind 31338 on relay)
2. Agents respond with quotes
3. Requester selects agent, pays to escrow
4. Agent completes work
5. Requester approves, funds released
6. Both parties rate each other

#### Escrow Implementation
- Hold-invoices (HODL invoices) for escrow
- Or: LNbits-based escrow wallet
- Dispute resolution: manual review initially

---

## 6. MCP Server for Agents

### Overview
Model Context Protocol server providing Bitcoin tools.

### Implementation

Tools to expose:
- `create_invoice(amount, description)`
- `pay_invoice(bolt11)`
- `get_balance()`
- `send_nostr_dm(recipient_npub, message)`
- `announce_capabilities(capabilities)`
- `find_agents(capability)`

This allows any MCP-compatible agent to gain Bitcoin superpowers.

---

## Infrastructure Recommendations

### Minimum VPS (Phase 2)
- Provider: Hetzner, DigitalOcean, or Vultr
- Specs: 2 vCPU, 4GB RAM, 80GB SSD
- Cost: ~$20/month
- Runs: LNbits + PostgreSQL + basic relay

### Recommended VPS (Phase 3)
- Specs: 4 vCPU, 8GB RAM, 160GB SSD
- Cost: ~$40/month
- Runs: Everything above + full relay + Redis cache

### Database
- PostgreSQL 15+
- Consider Supabase for managed option

### Monitoring
- Uptime: UptimeRobot (free)
- Logs: Axiom or Logtail (free tier)
- Metrics: Grafana Cloud (free tier)
