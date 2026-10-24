# Mini Adventure

Marketing site and API for **Mini Adventure** — an AI toy company whose first product line is smart toy cars.

## Monorepo layout

```
api/   Go HTTP API (health, featured cars, waitlist stub)
web/   Next.js App Router (TypeScript) marketing site
```

## Prerequisites

- Go 1.22+
- Node.js 20+ and npm

## Run locally

Start both services (two terminals).

### 1. API

```bash
cd api
go run .
```

Listens on `http://localhost:8080` by default.

| Method | Path                 | Purpose                          |
|--------|----------------------|----------------------------------|
| GET    | `/health`            | Liveness                         |
| GET    | `/api/cars/featured` | Featured car lineup for the site |
| POST   | `/api/waitlist`      | Waitlist stub (`{"email":"..."}`)|

Optional env:

- `API_ADDR` — listen address (default `:8080`)
- `CORS_ORIGINS` — comma-separated allowed origins (default `http://localhost:3000,http://127.0.0.1:3000`)

### 2. Web

```bash
cd web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Optional env (create `web/.env.local` if needed):

```bash
NEXT_PUBLIC_API_URL=http://localhost:8080
```

## Production-ish checks

```bash
# API
cd api && go test ./...   # (no tests yet; compile check:)
cd api && go build -o /tmp/mini-adventure-api .

# Web
cd web && npm run build && npm run start
```

## Brand assumptions (v1)

- **Name:** Mini Adventure
- **Voice:** toy-brand energy (play / race / learn), not a SaaS dashboard
- **Colors:** deep aqua brand (`#0A7EA4`), racing orange accent (`#FF5A1F`), sunlit sky-to-track atmosphere
- **Fonts:** Bebas Neue (display / brand), Outfit (body)
- **Hero CTA:** Join the waitlist (secondary: Explore the cars)
