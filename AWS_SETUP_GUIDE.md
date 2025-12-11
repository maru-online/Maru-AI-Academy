# AWS Deployment Guide for Maru AI Academy

This guide outlines the steps to deploy the Maru AI Academy backend to Amazon Web Services (AWS) using **App Runner** (for the API) and **RDS** (for the database).

## Prerequisites
- AWS Account
- AWS CLI installed locally
- GitHub Repository connected

## Step 1: Create Container Registry (ECR)
We need a place to store our Docker images.

1. Go to **Elastic Container Registry** in AWS Console.
2. Click **Create repository**.
3. Name it `maru-academy-backend`.
4. Keep settings default (Private).
5. Click **Create repository**.

## Step 2: Create Database (RDS)
We need a PostgreSQL database.

1. Go to **RDS** in AWS Console.
2. Click **Create database**.
3. Choose **Standard create** > **PostgreSQL**.
4. Template: **Free tier** (for dev) or **Production**.
5. DB Instance Identifier: `maru-academy-db`.
6. Master username: `postgres`.
7. Master password: (Create a strong password).
8. Connectivity:
   - **Public access**: No (keep it private for security).
   - **VPC Security Group**: Create new (e.g., `rds-launch-wizard`).
9. Create the database.

**Important**: 
- Note the **Endpoint** URL when created.
- You will need to allow your EC2/App Runner instance to access this database via the Security Group (Inbound Rule: TCP 5432).

## Step 3: Configure GitHub Actions
To automate deployment, add these secrets to your GitHub Repo (Settings > Secrets and variables > Actions):

- `AWS_ACCESS_KEY_ID`: Your IAM user key.
- `AWS_SECRET_ACCESS_KEY`: Your IAM user secret.

Code updates to `main` will now automatically build and push the image to ECR.

## Step 4: Deploy with AWS App Runner
App Runner handles the running of the container automatically.

1. Go to **AWS App Runner**.
2. Click **Create service**.
3. Source: **Container registry**.
4. Provider: **Amazon ECR**.
5. Image URI: Select the latest image pushed from step 3.
6. Deployment settings: **Automatic** (deploys when new image pushed).
7. **Service settings**:
   - Environment variables:
     - `DATABASE_URL`: `postgresql://postgres:PASSWORD@RDS_ENDPOINT:5432/maru_academy_db`
     - `NODE_ENV`: `production`
     - `PORT`: `8080`
   - Port: `8080`
8. Create & Deploy.

## Step 5: Database Migration
Since the API is running in a container, you need to run the initial migration.

**Option A (From local machine):**
If you configured the RDS specific security group to allow your IP, or used an ssh tunnel:
```bash
DATABASE_URL="postgresql://..." npx prisma migrate deploy
```

**Option B (Job):**
Run a one-off task definition in ECS to execute the migration.

---
**Status**: Ready for Deployment 🚀
