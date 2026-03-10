# World Castles

An interactive 3D globe exploring medieval castles, star forts, Roman forts, walled cities, and fortifications from around the world.

## Features

- Interactive 3D Earth globe with NASA night-lights texture
- 100+ curated castle & fortification pins across 10 categories
- Search by name, filter by category or region
- Detail sidebar with description, heritage status, and Wikipedia link
- Dark/night aesthetic with glowing category-colored markers

## Tech Stack

- **Next.js 14** (App Router, TypeScript)
- **globe.gl** — Three.js-based 3D globe
- **Zustand** — state management
- **Framer Motion** — sidebar & filter animations
- **Tailwind CSS** — dark theme styling
- **Zod** — castle data schema validation

## Castle Categories

| Category | Color |
|----------|-------|
| European Castle | Gold |
| Star Fort | Steel Blue |
| Roman Fort | Red |
| Walled City | Sage Green |
| Japanese Castle | Terracotta |
| Middle Eastern Citadel | Purple |
| Crusader Castle | Amber |
| African Fort | Teal |
| Asian Fort | Yellow |
| New World Fort | Ocean Blue |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

One-click deploy to Vercel — connect the GitHub repo, no configuration needed.

## Data

Castle data lives in `src/data/castles/` as JSON files, validated at build time with Zod. Each entry includes coordinates, description, heritage status, and category.
