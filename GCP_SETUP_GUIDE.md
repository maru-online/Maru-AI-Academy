# Google Cloud Platform Setup Guide

This guide outlines the steps to prepare your GCP environment for the Maru AI Academy deployment.

## Prerequisites
- Google Cloud Project created (Note the **Project ID**)
- Billing enabled

## Step 1: Enable APIs
Run this in Cloud Shell or ensure these APIs are enabled in Console:
- Cloud Run API
- Artifact Registry API
- Cloud Build API
- Cloud SQL Admin API

## Step 2: Create Artifact Registry
We need a place to store Docker images.

1. Go to **Artifact Registry**.
2. Click **Create Repository**.
3. Name: `maru-backend-repo`
4. Format: **Docker**
5. Region: `us-central1` (Must match the workflow config)
6. Create.

## Step 3: Create Service Account (CI/CD)
GitHub Actions needs permission to deploy.

1. Go to **IAM & Admin** > **Service Accounts**.
2. Create Service Account (e.g., `github-deployer`).
3. Grant roles:
   - **Cloud Run Admin**
   - **Artifact Registry Writer**
   - **Service Account User**
4. Create Key > JSON.
5. Download the JSON file.

## Step 4: Configure GitHub Secrets
Go to your GitHub Repo > Settings > Secrets > Actions.

1. `GCP_PROJECT_ID`: Your Project ID (e.g., `maru-academy-12345`).
2. `GCP_SA_KEY`: Paste the entire content of the JSON key file.

## Step 5: Create Database (Cloud SQL)
1. Go to **Cloud SQL**.
2. Create Instance > **PostgreSQL**.
3. Instance ID: `maru-db`.
4. Password: Generated or custom (Save this!).
5. Version: PostgreSQL 15.
6. Region: `us-central1`.
7. **Connections**:
   - Check **Public IP** (for easiest generic access, secure with authorized networks if needed).
   - Or use **Cloud SQL Auth Proxy** (recommended for production).

## Step 6: Deploy!
Push a change to the `main` branch. GitHub Actions will:
1. Build the backend container.
2. Push to Artifact Registry.
3. Deploy to Cloud Run.

## Post-Deployment: Connect Database
Once the app is deployed, update the Cloud Run service environment variables:

1. Go to **Cloud Run** > `maru-academy-api`.
2. Edit & Deploy New Revision > **Variables**.
3. Add `DATABASE_URL`:
   `postgresql://postgres:PASSWORD@HOST:5432/postgres?host=/cloudsql/PROJECT_ID:REGION:INSTANCE_ID`
   *(Note: Cloud Run connects to Cloud SQL via unix socket automatically if you add the Cloud SQL connection in the "Integrations" or "Connections" tab)*

---
**Status**: Ready for Deployment 🚀
