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

### Running on different ports
Defaults (3001 backend, 3000 frontend, 27017 Mongo) collide with other local projects on the same stack. Override with `MONGO_PORT`/`BACKEND_PORT`/`FRONTEND_PORT`, either as env vars to `./dev.sh` or in a root `.env` for `docker compose up` — see the README's "Running on different ports" section.

## API
- Backend serves at `http://localhost:3001/api`
- Swagger docs at `http://localhost:3001/api/docs`
- All endpoints prefixed with `/api`

## Conventions
- Backend: NestJS modules pattern (schema, dto, service, controller, module)
- Frontend: Client components use 'use client' directive
- MongoDB: Mongoose schemas with timestamps
- Seed data: `npm run seed` in backend/ to populate spells, genres, and curated templates

## Before declaring any change done
- Branch first, even for chores (`chore/<slug>`). Never edit on `main`.
- Run the gate in `.claude/start-ticket.md` ("Verification gate") for every change, ticket or not.
- Run any npm script you add at least once before committing.
