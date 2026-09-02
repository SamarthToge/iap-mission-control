# Indian Antarctic Programme (IAP) — Mission Control

An offline-first, edge-capable mission operations platform for the Indian Antarctic Programme (NCPOR / MoES). Built to operate resiliently across low-bandwidth VSAT, intermittent Iridium SBD links, or full air-gapped station deployments.

---

## 🛰️ Overview & Operational Modules

- **HQ Overview (`/`)**: Real-time operational overview across **Bharati** (70°S 11°E) and **Maitri** (74°S 163°E) stations, sync status, muster boards, days-of-supply gauges, active emergencies, and cargo legs.
- **Emergency Response (`/emergency`)**: Local-first alert engine, offline Standard Operating Procedures (SOPs), incident logging (append-only ledger), and automated response checklists.
- **Personnel Movement (`/personnel`)**: Digital muster, field party trackings, buddy-system check-in monitors, certifications & training expiry alerts, and privacy-compliant next-of-kin status reporting.
- **Inventory Stores (`/inventory`)**: Event-sourced stock ledgers for fuel, rations, medical supplies, and mechanical spares with 9-month winter isolation buffer projections.
- **Cargo Tracking (`/cargo`)**: End-to-end chain-of-custody tracking across ship (MV Polar Dawn), air (IAF C-295), cold chain temperature monitoring, and RFID scan reconciliation.
- **Expedition Planning (`/expedition`)**: Season itineraries, multi-level digital sign-offs, risk registers, and field resource requests.

---

## 🛠️ Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/start/latest) (Full-stack React with SSR & file-based routing)
- **Routing**: [TanStack Router](https://tanstack.com/router/latest)
- **Data Fetching & Cache**: [TanStack React Query](https://tanstack.com/query/latest)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with a custom polar console theme and semantic design tokens
- **Icons**: [Lucide React](https://lucide.dev/)
- **Server / Build**: [Vite](https://vite.dev/) & [Nitro](https://nitro.unjs.io/) (Targeting Cloudflare Module / Node)
- **Language**: TypeScript (Strict type safety)

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v20+ recommended
- **Package Manager**: `npm` (or `pnpm` / `yarn`)

### Installation

```bash
npm install
```

### Development Server

Start the local development server on `http://localhost:8080`:

```bash
npm run dev
```

### Production Build & Preview

Build the application for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

### Linting & Formatting

```bash
# Check for lint errors
npm run lint

# Format code with Prettier
npm run format
```

---

## 📁 Project Structure

```
Frontend/
├── public/                     # Static assets (favicon, robots.txt)
├── src/
│   ├── components/
│   │   └── ops/                # Mission Control components (Masthead, ModuleNav, Panel, SyncStrip)
│   ├── lib/                    # Core utilities & SSR error recovery handlers
│   ├── routes/                 # File-based routes (__root, index, cargo, emergency, expedition, inventory, personnel)
│   ├── router.tsx              # TanStack Router instance & QueryClient provider
│   ├── routeTree.gen.ts        # Auto-generated route tree
│   ├── server.ts               # SSR entrypoint & h3 error normalizer
│   ├── start.ts                # Start instance & request middleware (CSRF + Error)
│   └── styles.css              # Tailwind v4 theme, fonts, and console palette
├── eslint.config.js            # ESLint flat config
├── tsconfig.json               # TypeScript configuration
└── vite.config.ts              # Vite + TanStack Start + Nitro configuration
```

---

## 🔒 Offline & Data Integrity Principles

- **Local Source of Truth**: Edge nodes maintain an append-only transaction ledger that merges losslessly when uplink becomes available.
- **Bandwidth Optimization**: Compressed deltas prioritize emergency traffic first, followed by safety telemetry, cargo/inventory deltas, and routine media.
- **Data Protection**: Personal records and field coordinates adhere to DPDP Act 2023 handling principles.
