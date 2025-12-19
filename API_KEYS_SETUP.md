# API Keys Setup Guide

This guide will help you obtain and configure the API keys needed for Week 1 features.

---

## 🔑 Required API Keys

You need 2 API keys to activate all Week 1 features:

1. **Gemini API** - For AI chatbot
2. **Resend API** - For email notifications

---

## 1️⃣ Gemini API Key (AI Chatbot)

### **Step 1: Get the API Key**

1. Go to: https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Click **"Create API Key"** or **"Get API Key"**
4. Copy the key (starts with `AIza...`)

### **Step 2: Add to Local Environment**

Edit `.env.local`:

```bash
GEMINI_API_KEY=AIzaXXXXXXXXXXXXXXXXXXXXXXXXX
```

### **Step 3: Add to Vercel (Production)**

```bash
# Option A: Using Vercel CLI
vercel env add GEMINI_API_KEY production

# Option B: Via Vercel Dashboard
# 1. Go to vercel.com/dashboard
# 2. Select your project
# 3. Settings → Environment Variables
# 4. Add GEMINI_API_KEY with your key
# 5. Select "Production" environment
# 6. Save
```

### **Step 4: Restart Dev Server**

```bash
# Stop current server (Ctrl+C)
npm run dev
```

### **Test it works:**

1. Open http://localhost:3000
2. Click the chat widget (bottom right)
3. Send a message like "What is AI?"
4. You should get an AI-generated response (not a demo response)

---

## 2️⃣ Resend API Key (Email Service)

### **Step 1: Sign Up for Resend**

1. Go to: https://resend.com
2. Click **"Start Building"** or **"Sign Up"**
3. Sign up with your email or GitHub

### **Step 2: Get API Key**

1. After signup, go to **API Keys** in the dashboard
2. Click **"Create API Key"**
3. Name it: `Maru Academy`
4. Copy the key (starts with `re_...`)

⚠️ **Important**: Copy now! You won't see it again.

### **Step 3: Configure Domain (Optional but Recommended)**

For production emails, verify your domain:

1. In Resend dashboard, go to **Domains**
2. Click **"Add Domain"**
3. Enter: `maruonline.com`
4. Add the DNS records shown to your domain provider
5. Wait for verification (usually < 1 hour)

For testing, you can skip this and use the default domain.

### **Step 4: Add to Local Environment**

Edit `.env.local`:

```bash
RESEND_API_KEY=re_XXXXXXXXXXXXXXXXXXXXXXXX
FROM_EMAIL=noreply@maruonline.com  # or noreply@resend.dev for testing
```

### **Step 5: Add to Vercel (Production)**

```bash
# Option A: Using Vercel CLI
vercel env add RESEND_API_KEY production
vercel env add FROM_EMAIL production

# Option B: Via Vercel Dashboard  
# Add both variables:
# - RESEND_API_KEY
# - FROM_EMAIL
```

### **Step 6: Test Email Delivery**

Create a test account to verify welcome emails work:

1. Restart dev server: `npm run dev`
2. Go to http://localhost:3000
3. Sign up with a real email you can check
4. Check inbox for welcome email
5. Should receive within seconds

---

## 3️⃣ Optional: Admin Email

For receiving contact form and support ticket notifications:

Edit `.env.local`:

```bash
ADMIN_EMAIL=hello@maruonline.com  # or your preferred email
```

Add to Vercel:

```bash
vercel env add ADMIN_EMAIL production
```

---

## ✅ Verification Checklist

After adding all keys, verify everything works:

### **Local Testing:**

```bash
# 1. Stop dev server
# Press Ctrl+C

# 2. Restart to load new env vars
npm run dev

# 3. Test each feature:
```

- [ ] **AI Chatbot**:
  - Open chat widget
  - Send message
  - Verify AI response (not demo)

- [ ] **Welcome Email**:
  - Create new account
  - Check email inbox
  - Verify welcome email received

- [ ] **Contact Form**:
  - Go to /contact
  - Submit form
  - Check admin email receives notification

- [ ] **Support Ticket**:
  - Go to /support
  - Create ticket
  - Check confirmation email

---

## 🚀 Deploy to Production

After local testing works:

```bash
# Commit environment updates
git add .env.local
git commit -m "Add API keys (local only)"

# Push code (API keys are already in Vercel)
git push origin main

# Vercel will auto-deploy

# After deploy, test production:
# - Visit academy.maruonline.com
# - Test chatbot
# - Create test account
# - Verify welcome email
```

---

## 🐛 Troubleshooting

### **"Running in DEMO mode" in chatbot logs**

**Problem**: Gemini API key not loaded  
**Solution**:
1. Check key is in `.env.local` (no quotes)
2. Restart dev server
3. Check for typos in key

### **Welcome email not received**

**Problem**: Resend API key not configured or invalid  
**Solution**:
1. Check Resend dashboard for errors
2. Verify API key is correct
3. Check spam folder
4. For production, verify domain in Resend

### **"Failed to send email" in logs**

**Problem**: FROM_EMAIL domain not verified  
**Solution**:
- For testing: Use `noreply@resend.dev`
- For production: Verify your domain in Resend

### **Environment variables not loading**

**Problem**: Env vars not reloaded after changes  
**Solution**:
```bash
# Always restart after changing .env.local
npm run dev
```

---

## 📊 Expected Costs

### **Gemini API (AI Chatbot)**

- **Free Tier**: 60 requests/minute
- **Pricing**: Free for reasonable usage
- **Estimated**: $0-10/month

More info: https://ai.google.dev/pricing

### **Resend (Email Service)**

- **Free Tier**: 3,000 emails/month, 100 emails/day
- **Paid Plans**: Start at $20/month for 50,000 emails
- **Estimated for MVP**: $0/month (free tier sufficient)

More info: https://resend.com/pricing

### **Total Expected: $0-10/month** ✅

---

## 🎯 Next Steps After Setup

Once all API keys are configured and tested:

1. ✅ AI chatbot is live
2. ✅ Welcome emails sending
3. ✅ Contact form working
4. ✅ Support tickets operational

**Ready for:** Frontend integration (next build session)

---

## 🔐 Security Best Practices

- ✅ **Never commit** `.env` or `.env.local` to git
- ✅ **Rotate keys** if accidentally exposed
- ✅ **Use environment-specific** keys (test vs production)
- ✅ **Monitor usage** in API dashboards
- ✅ **Set rate limits** if available

---

## 📞 Support

**Gemini API Issues**: https://ai.google.dev/support  
**Resend Issues**: https://resend.com/support  
**Vercel Issues**: https://vercel.com/support

---

**Estimated Setup Time**: 15-20 minutes (including verification)

**Last Updated**: December 19, 2025
