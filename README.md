# Bardic Inspiration

D&D bard helper web app that generates song lyrics for bard spells and abilities. Uses curated lyric templates + Claude API generation across fantasy and modern music genres.

## Tech Stack

- **Frontend**: Next.js (App Router) + TypeScript + Tailwind CSS v4
- **Backend**: NestJS + TypeScript + MongoDB (Mongoose)
- **AI**: Claude API via `@anthropic-ai/sdk`

## Development Setup

### Prerequisites

- Node.js 20+
- Docker (for MongoDB)

### 1. Start MongoDB

```bash
docker compose up mongodb -d
```

### 2. Backend

```bash
cd backend
cp .env.example .env   # Add your ANTHROPIC_API_KEY
npm install
npm run seed            # Seed spells, genres, and templates
npm run start:dev       # http://localhost:3001
```

Swagger docs available at http://localhost:3001/api/docs

### 3. Frontend

```bash
cd frontend
npm install
npm run dev             # http://localhost:3000
```

### Full Docker (alternative)

```bash
ANTHROPIC_API_KEY=your-key docker compose up
```

## API Endpoints

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/spells` | List spells (query: level, type, subclass, search) |
| GET | `/api/spells/:id` | Spell details |
| GET | `/api/genres` | List genres (query: category) |
| GET | `/api/genres/:slug` | Genre by slug |
| GET | `/api/templates` | List templates (query: spellId, genreId, featured) |
| GET | `/api/templates/random` | Random template |
| GET | `/api/templates/:id` | Template details |
| POST | `/api/generate` | Generate lyrics `{ spellId, genreId, customPrompt? }` |
| GET | `/api/generations/:id` | Cached generation |
| POST | `/api/generations/:id/rate` | Rate generation `{ rating: 1-5 }` |
