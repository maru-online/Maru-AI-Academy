# Subscription & Enrollment Flow

## Overview
This document outlines the user journey for subscribing to Maru AI Academy, including plan selection, registration, and dashboard integration.

## 1. Plan Selection (Pricing Page)
- **Path:** `/pricing`
- **Actions:**
    - "Get Started Free" -> Links to `/auth/signup?plan=starter`
    - "Start 7-Day Free Trial" -> Links to `/auth/signup?plan=pro`
    - "Team Plan" -> Links to `/contact`

## 2. Registration (Signup Page)
- **Path:** `/auth/signup`
- **Logic:**
    - Reads `?plan=` query parameter from URL.
    - Displays a badge confirming the selected plan (e.g., "Selected: Pro Academy Plan").
    - **API Interaction:** Sends `plan` ('starter', 'pro', 'team') to `POST /api/auth/signup`.

## 3. Account Creation (Backend)
- **Endpoint:** `POST /api/auth/signup`
- **Logic:**
    - Maps incoming plan string to Database Enum `Plan`:
        - `starter` -> `FREE`
        - `pro` -> `PRO`
        - `team` -> `TEAM`
    - Creates `User` record with the specific `plan`.
    - Hashes password and handles standard validation.

## 4. Dashboard Experience
- **Path:** `/dashboard`
- **Logic:**
    - Checks `session.user.plan`.
    - **Profile Card:** Displays a "PRO PLAN" or "FREE PLAN" badge.
    - **Upgrade CTA:** If user is on `FREE` plan, displays an "Upgrade to Pro" button in the sidebar.

## Database Schema Updates
- **User Model:** Added `plan` field (Enum: FREE, PRO, TEAM).
- **Default:** New users default to `FREE` if no plan is specified.

## Future Improvements
- **Stripe Integration:** Currently, "Pro" signup is free (trial mode). Real payment processing needs to be added.
- **Content Gating:** Middleware or Component-level checks to restrict `intermediate` stream modules to `PRO` users only.
