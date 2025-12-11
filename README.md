# Maru AI Academy

A comprehensive AI productivity training platform for African professionals.

## 🌐 Live URLs

| Environment | URL |
|-------------|-----|
| **Frontend** | [academy.maruonline.com](https://academy.maruonline.com) |
| **API** | [maru-academy-api-bdqus7zlya-uc.a.run.app](https://maru-academy-api-bdqus7zlya-uc.a.run.app) |

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     FRONTEND                            │
│          academy.maruonline.com (Vercel)                │
│                Next.js 14 + Tailwind                    │
└─────────────────────┬───────────────────────────────────┘
                      │ API calls
                      ▼
┌─────────────────────────────────────────────────────────┐
│                      BACKEND                            │
│             GCP Cloud Run (Express.js)                  │
│                  Prisma ORM                             │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│                     DATABASE                            │
│                  Neon PostgreSQL                        │
└─────────────────────────────────────────────────────────┘
```

## 📁 Project Structure

```
/app            # Next.js frontend (App Router)
  /components   # React components
  /lib          # Utilities & API client
  /types        # TypeScript types
/backend        # Express.js API
  /src          # Source code
  /prisma       # Database schema
/.github        # CI/CD workflows
/content        # Training content (Markdown)
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm

### Frontend Development

```bash
# Install dependencies
npm install

# Set up environment
cp env.example .env.local
# Edit .env.local with API URL

# Run development server
npm run dev
```

### Backend Development

```bash
cd backend

# Install dependencies
npm install

# Set up environment
# Create .env with DATABASE_URL

# Run development server
npm run dev
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/api/modules` | List all modules |
| GET | `/api/modules/:id` | Get module by ID |
| POST | `/api/modules` | Create module |
| GET | `/api/users` | List all users |

## 📚 Content Structure

### Beginner Stream
1. AI Made Simple (Foundations & Safety)
2. Prompts That Work at Work
3. No-Code Quick Wins
4. Your First Live Workflow (Capstone)

### Intermediate Stream
1. From Ad-Hoc to Repeatable
2. Semantic Search & Private Knowledge
3. No-Code Automations That Stick
4. Measurement, Governance & Handover

## 🔄 Deployment

### Frontend (Vercel)
- **Trigger:** Push to `main` branch
- **Auto-deploy:** Yes

### Backend (GCP Cloud Run)
- **Trigger:** Push to `main` branch (changes in `backend/`)
- **CI/CD:** GitHub Actions

## 📊 Progress Tracking

- [WEEK1_PROGRESS.md](./WEEK1_PROGRESS.md) - Frontend modernization
- [WEEK2_PROGRESS.md](./WEEK2_PROGRESS.md) - Backend migration
- [WEEK3_PROGRESS.md](./WEEK3_PROGRESS.md) - Deployment & integration

## 📝 License

Proprietary - Maru AI Academy
