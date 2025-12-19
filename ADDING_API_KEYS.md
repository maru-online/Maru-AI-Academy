# How to Add API Keys - Visual Guide

This guide shows you exactly where to paste your API keys for both local development and production deployment.

---

## 🏠 **Option 1: Local Development (.env file)**

### **What You're Seeing Now**

You currently have `.env` open. This is perfect! Here's how to add your keys:

### **Step-by-Step:**

1. **Get Your API Keys First**:
   - Gemini: https://makersuite.google.com/app/apikey
   - Resend: https://resend.com/api-keys

2. **In Your `.env` File** (already open):

```bash
# Backend API
NEXT_PUBLIC_API_URL=https://maru-academy-api-bdqus7zlya-uc.a.run.app

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Authentication (NextAuth.js)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=maru-academy-secret-key-change-in-production

# Database (Neon PostgreSQL)
DATABASE_URL=postgresql://neondb_owner:npg_H3nlM4JsLVCt@ep-rapid-breeze-ab2vlfuf-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require

# AI Chatbot (Gemini) - PASTE YOUR KEY AFTER THE = SIGN
GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXX

# Email Service (Resend) - PASTE YOUR KEY AFTER THE = SIGN
RESEND_API_KEY=re_XXXXXXXXXXXXXXXXXXXXXXXXXXXX
FROM_EMAIL=noreply@maruonline.com

# Google OAuth (optional - uncomment and add your credentials)
# GOOGLE_CLIENT_ID=your-google-client-id
# GOOGLE_CLIENT_SECRET=your-google-client-secret
```

3. **How to Paste**:
   - ✅ **DO**: `GEMINI_API_KEY=AIzaSyABC123XYZ789`
   - ❌ **DON'T**: Add quotes: `GEMINI_API_KEY="AIzaSy..."` 
   - ❌ **DON'T**: Add spaces: `GEMINI_API_KEY = AIzaSy...`

4. **Save the File**: `Cmd + S` (Mac) or `Ctrl + S` (Windows)

5. **Restart Your Dev Server**:
   ```bash
   # Stop server (if running)
   # Press Ctrl + C in terminal
   
   # Start again
   npm run dev
   ```

6. **Test It Works**:
   - Open http://localhost:3000
   - Click chat widget (AI chatbot should use real AI now)
   - Create a test account (should receive welcome email)

---

## ☁️ **Option 2: Vercel (Production)**

### **Method A: Using Vercel Dashboard** (Easiest)

#### **Step 1: Go to Vercel Dashboard**

1. Open: https://vercel.com/dashboard
2. Sign in if needed
3. Find your project: **maru-ai-academy** (or similar name)
4. Click on the project

#### **Step 2: Navigate to Environment Variables**

```
Your Project Dashboard
├── Overview
├── Deployments
├── Analytics
├── Logs
└── Settings ← Click here
    ├── General
    ├── Domains
    ├── Environment Variables ← Then click here
    ├── Git
    └── ...
```

#### **Step 3: Add Each Variable**

You'll see a form like this:

```
┌─────────────────────────────────────────────────┐
│  Add New Environment Variable                   │
├─────────────────────────────────────────────────┤
│                                                 │
│  Key                                            │
│  ┌─────────────────────────────────────────┐   │
│  │ GEMINI_API_KEY                          │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│  Value                                          │
│  ┌─────────────────────────────────────────┐   │
│  │ AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXX       │   │ ← Paste here
│  └─────────────────────────────────────────┘   │
│                                                 │
│  Environments                                   │
│  ☑️ Production                                  │ ← Check this
│  ☑️ Preview                                     │ ← Optional
│  ☑️ Development                                 │ ← Optional
│                                                 │
│  [ Save ]                                       │
│                                                 │
└─────────────────────────────────────────────────┘
```

#### **Step 4: Add All Required Keys**

Add these one by one:

1. **GEMINI_API_KEY**
   - Key: `GEMINI_API_KEY`
   - Value: `AIzaSy...` (your key)
   - Environment: ✅ Production

2. **RESEND_API_KEY**
   - Key: `RESEND_API_KEY`
   - Value: `re_...` (your key)
   - Environment: ✅ Production

3. **FROM_EMAIL**
   - Key: `FROM_EMAIL`
   - Value: `noreply@maruonline.com`
   - Environment: ✅ Production

4. **ADMIN_EMAIL** (optional)
   - Key: `ADMIN_EMAIL`
   - Value: `hello@maruonline.com`
   - Environment: ✅ Production

#### **Step 5: Redeploy**

After adding variables:

1. Go to **Deployments** tab
2. Find the latest deployment
3. Click **⋯** (three dots)
4. Click **Redeploy**
5. Wait ~2 minutes for deployment

**Or** just push a new commit:
```bash
git commit --allow-empty -m "Trigger redeploy"
git push origin main
```

---

### **Method B: Using Vercel CLI** (Faster if you know terminal)

1. **Install Vercel CLI** (if not installed):
   ```bash
   npm i -g vercel
   ```

2. **Login**:
   ```bash
   vercel login
   ```

3. **Link Project** (first time only):
   ```bash
   cd /Users/ramoloimotsei/Projects/Maru-AI-Academy
   vercel link
   ```

4. **Add Environment Variables**:
   ```bash
   # Add GEMINI_API_KEY
   vercel env add GEMINI_API_KEY production
   # Paste your key when prompted
   
   # Add RESEND_API_KEY
   vercel env add RESEND_API_KEY production
   # Paste your key when prompted
   
   # Add FROM_EMAIL
   vercel env add FROM_EMAIL production
   # Type: noreply@maruonline.com
   
   # Add ADMIN_EMAIL
   vercel env add ADMIN_EMAIL production
   # Type: hello@maruonline.com
   ```

5. **List to Verify**:
   ```bash
   vercel env ls
   ```

6. **Redeploy**:
   ```bash
   vercel --prod
   ```

---

## 🔐 **Option 3: Google Cloud Secret Manager** (For Future GCP Deployment)

### **Prerequisites**
- Google Cloud project created
- `gcloud` CLI installed
- Project ID ready (e.g., `maru-academy-12345`)

### **Step 1: Enable Secret Manager API**

```bash
gcloud services enable secretmanager.googleapis.com
```

### **Step 2: Create Secrets**

For each API key:

```bash
# Create GEMINI_API_KEY secret
echo -n "AIzaSyXXXXXXXXXXXXXXXXXXXXX" | gcloud secrets create GEMINI_API_KEY \
  --data-file=- \
  --replication-policy="automatic"

# Create RESEND_API_KEY secret
echo -n "re_XXXXXXXXXXXXXXXXXXXX" | gcloud secrets create RESEND_API_KEY \
  --data-file=- \
  --replication-policy="automatic"

# Create FROM_EMAIL secret
echo -n "noreply@maruonline.com" | gcloud secrets create FROM_EMAIL \
  --data-file=- \
  --replication-policy="automatic"
```

### **Step 3: Grant Access to Cloud Run**

```bash
# Get your project number
PROJECT_NUMBER=$(gcloud projects describe YOUR_PROJECT_ID --format="value(projectNumber)")

# Grant access
gcloud secrets add-iam-policy-binding GEMINI_API_KEY \
  --member="serviceAccount:${PROJECT_NUMBER}-compute@developer.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"

gcloud secrets add-iam-policy-binding RESEND_API_KEY \
  --member="serviceAccount:${PROJECT_NUMBER}-compute@developer.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"

gcloud secrets add-iam-policy-binding FROM_EMAIL \
  --member="serviceAccount:${PROJECT_NUMBER}-compute@developer.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"
```

### **Step 4: Use in Cloud Run Deployment**

When deploying to Cloud Run:

```bash
gcloud run deploy maru-academy \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --set-secrets="GEMINI_API_KEY=GEMINI_API_KEY:latest,RESEND_API_KEY=RESEND_API_KEY:latest,FROM_EMAIL=FROM_EMAIL:latest"
```

### **Step 5: Verify Secrets**

```bash
# List all secrets
gcloud secrets list

# View secret metadata (not the value)
gcloud secrets describe GEMINI_API_KEY

# Access secret value (be careful!)
gcloud secrets versions access latest --secret="GEMINI_API_KEY"
```

---

## 🎯 **Quick Reference**

### **Where to Paste Based on Your Environment**

| Environment | Where to Add | How to Access |
|-------------|-------------|---------------|
| **Local Dev** | `.env` file | Already open in your editor |
| **Vercel** | Dashboard → Settings → Env Vars | https://vercel.com/dashboard |
| **Vercel CLI** | Terminal | `vercel env add KEY_NAME production` |
| **Google Cloud** | Secret Manager | `gcloud secrets create KEY_NAME` |

---

## ✅ **Verification Checklist**

After adding keys, verify:

### **Local**
```bash
# 1. Restart dev server
npm run dev

# 2. Check console for confirmation
# Should see: ✅ instead of ⚠️ DEMO mode
```

### **Vercel**
1. Go to: https://academy.maruonline.com
2. Click chat widget
3. Send message → Should get AI response (not demo)
4. Create test account → Should receive welcome email

---

## 🐛 **Troubleshooting**

### **Local: "Running in DEMO mode"**

**Problem**: API key not loading  
**Solution**:
```bash
# 1. Check .env file exists (not just .env.local)
ls -la .env

# 2. Check key has no quotes or spaces
cat .env | grep GEMINI

# 3. Restart dev server
npm run dev
```

### **Vercel: "API key not found"**

**Problem**: Environment variable not set or deployment not restarted  
**Solutions**:
1. Check variable is saved in Vercel dashboard
2. Environment is set to "Production"
3. Redeploy the application
4. Clear deployment cache: Settings → Clear Cache

### **Keys Not Working After Adding**

**Common Mistakes**:
- ❌ Added quotes: `KEY="value"` → Should be `KEY=value`
- ❌ Added spaces: `KEY = value` → Should be `KEY=value`
- ❌ Forgot to restart: Always restart after env changes
- ❌ Wrong environment: Check "Production" box in Vercel
- ❌ Typo in key name: `GEMINI_KEY` vs `GEMINI_API_KEY`

---

## 🔒 **Security Reminders**

- ✅ **Never commit** `.env` to Git (already in `.gitignore`)
- ✅ **Rotate keys** if accidentally exposed
- ✅ **Use separate keys** for dev vs production (if available)
- ✅ **Monitor usage** in API dashboards
- ❌ **Never share** API keys in screenshots or messages

---

## 📺 **Video Tutorial** (Alternative)

If you prefer video:

- **Vercel**: https://vercel.com/docs/concepts/projects/environment-variables
- **Google Cloud**: https://cloud.google.com/secret-manager/docs/quickstart

---

## 💡 **Pro Tips**

1. **Copy from Dashboard**: Many services let you copy keys with one click
2. **Test Locally First**: Always test in `.env` before adding to production
3. **Use `.env.local`**: For local-only secrets (auto-ignored by git)
4. **Document Keys**: Keep a secure note of where each key came from

---

## 🎯 **What You Should Do Right Now**

Since you have `.env` open:

1. ✅ Get your Gemini API key: https://makersuite.google.com/app/apikey
2. ✅ Get your Resend API key: https://resend.com/api-keys
3. ✅ Paste them in the `.env` file (no quotes!)
4. ✅ Save file: `Cmd + S`
5. ✅ Restart: `npm run dev`
6. ✅ Test: Open http://localhost:3000 and try chatbot

---

**Need help?** Let me know which part you're stuck on! 🚀

_Last Updated: December 19, 2025_
