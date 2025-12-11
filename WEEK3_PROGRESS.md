# Week 3 Progress Tracker: Frontend Deployment

## ✅ Completed Tasks

### Day 1: Build Preparation
- [x] Fix next.config.js (remove deprecated options)
- [x] Exclude api/backend from TypeScript build
- [x] Add missing getModuleBySlug function
- [x] Verify production build passes

### Day 2-3: Vercel Deployment
- [x] Connect GitHub repo to Vercel
- [x] Configure NEXT_PUBLIC_API_URL environment variable
- [x] Deploy to Vercel successfully
- [x] Configure custom domain `academy.maruonline.com`
- [x] Update Cloudflare DNS (CNAME → cname.vercel-dns.com)
- [x] Verify SSL working

---

## 🎯 Live URLs

| Component | URL |
|-----------|-----|
| **Frontend** | https://academy.maruonline.com |
| **API Health** | https://maru-academy-api-bdqus7zlya-uc.a.run.app/health |
| **API Modules** | https://maru-academy-api-bdqus7zlya-uc.a.run.app/api/modules |

---

## 🏗️ Architecture

```
Frontend (Vercel)
    ↓ API calls
Backend (GCP Cloud Run)
    ↓ Prisma ORM
Database (Neon PostgreSQL)
```

---

## 📦 Deployment Pipeline

### Frontend (Vercel)
- **Trigger:** Push to `main` branch
- **Build:** `npm run build`
- **Deploy:** Automatic to production

### Backend (GCP Cloud Run)
- **Trigger:** Push to `main` branch (changes in `backend/`)
- **Build:** Docker build via GitHub Actions
- **Deploy:** Cloud Run with GitHub Actions

---

**Last Updated**: December 11, 2025
**Status**: Week 3 ✅ Complete
