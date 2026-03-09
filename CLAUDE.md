# Bardic Inspiration

D&D bard helper web app that generates song lyrics for bard spells and abilities.

## Architecture
- **Frontend**: Next.js (App Router) + TypeScript + Tailwind CSS v4 — `frontend/`
- **Backend**: NestJS + TypeScript + MongoDB (Mongoose) — `backend/`
- **AI**: Claude API via `@anthropic-ai/sdk`
- **No auth** — public utility tool

## Development

### Prerequisites
- Node.js 20+
- MongoDB 7 (via Docker or local)

### Quick Start
```bash
# Start MongoDB
docker compose up mongodb -d

# Backend
cd backend
cp .env.example .env  # Edit with your ANTHROPIC_API_KEY
npm install
npm run seed          # Seed database
npm run start:dev     # http://localhost:3001

# Frontend
cd frontend
npm install
npm run dev           # http://localhost:3000
```

### Full Docker
```bash
ANTHROPIC_API_KEY=your-key docker compose up
```

## API
- Backend serves at `http://localhost:3001/api`
- Swagger docs at `http://localhost:3001/api/docs`
- All endpoints prefixed with `/api`

## Key Endpoints
| Method | Path | Purpose |
|--------|------|---------|
| GET | /api/spells | List spells (query: level, type, subclass, search) |
| GET | /api/spells/:id | Spell details |
| GET | /api/genres | List genres (query: category) |
| GET | /api/genres/:slug | Genre by slug |
| GET | /api/templates | List templates (query: spellId, genreId, featured) |
| GET | /api/templates/random | Random template |
| GET | /api/templates/:id | Template details |
| POST | /api/generate | Generate lyrics { spellId, genreId, customPrompt? } |
| GET | /api/generations/:id | Cached generation |
| POST | /api/generations/:id/rate | Rate generation { rating: 1-5 } |

## Project Structure
```
backend/
  src/
    spells/       — Spell schema, service, controller
    genres/       — Genre schema, service, controller
    templates/    — Curated lyric templates
    generation/   — AI generation + caching + rating
      prompts/    — System, genre, and spell prompt fragments
    seed/         — Database seeding system
frontend/
  src/
    app/          — Next.js pages (App Router)
    components/   — React components
    lib/          — API client, types
```

## Conventions
- Backend: NestJS modules pattern (schema, dto, service, controller, module)
- Frontend: Client components use 'use client' directive
- MongoDB: Mongoose schemas with timestamps
- Seed data: `npm run seed` in backend/ to populate spells, genres, and curated templates
