# Deployment Guide

This document describes the production deployment of **PromptFlow**, including the hosting platforms, cloud services, environment configuration, and deployment architecture.

---

# Deployment Overview

PromptFlow is deployed using the following cloud services.

| Component     | Platform             |
| ------------- | -------------------- |
| Frontend      | Vercel               |
| Backend       | Render               |
| Database      | MongoDB Atlas        |
| Media Storage | Cloudinary           |
| AI Services   | Gemini, OpenAI, Groq |

---

# Production URLs

| Service      | URL                                                 |
| ------------ | --------------------------------------------------- |
| Frontend     | https://promptflow-one.vercel.app                   |
| Backend      | https://promptflow-backend-ynem.onrender.com        |
| API Base URL | https://promptflow-backend-ynem.onrender.com/api/v1 |

---

# Deployment Architecture

```text
                           User
                             │
                             ▼
                  Vercel (React Frontend)
                             │
                        HTTPS Requests
                             │
                             ▼
                  Render (Express Backend)
                      │       │        │
                      │       │        │
                      ▼       ▼        ▼
              MongoDB Atlas Cloudinary AI Providers
                                         │
                    ┌────────────────────┼────────────────────┐
                    ▼                    ▼                    ▼
                 Gemini              OpenAI                Groq
```

---

# Frontend Deployment

### Platform

```
Vercel
```

### Framework

```
React + Vite
```

### Build Command

```bash
npm run build
```

### Output Directory

```text
dist
```

### Environment Variables

```env
VITE_API_URL=https://promptflow-backend-ynem.onrender.com/api/v1
```

---

# Backend Deployment

### Platform

```
Render
```

### Runtime

```
Node.js
```

### Build Command

```bash
npm install
```

### Start Command

```bash
npm start
```

### Environment Variables

```env
NODE_ENV=production

PORT=<provided by Render>

CORS_ORIGIN=https://promptflow-one.vercel.app

MONGODB_URI=<mongodb-atlas-uri>

ACCESS_TOKEN_SECRET=<secret>
ACCESS_TOKEN_EXPIRY=15m

REFRESH_TOKEN_SECRET=<secret>
REFRESH_TOKEN_EXPIRY=7d

CLOUDINARY_CLOUD_NAME=<cloud-name>
CLOUDINARY_API_KEY=<api-key>
CLOUDINARY_API_SECRET=<api-secret>

GEMINI_API_KEY=<api-key>
OPENAI_API_KEY=<api-key>
GROQAI_API_KEY=<api-key>
```

> **Note:** All sensitive values are securely stored using Render Environment Variables and are never committed to the repository.

---

# Database Deployment

### Platform

```
MongoDB Atlas
```

MongoDB Atlas stores all application data, including users, conversations, prompts, and AI responses.

The backend connects securely using the `MONGODB_URI` environment variable.

---

# Media Storage

### Platform

```
Cloudinary
```

Cloudinary is used for storing and serving user profile images.

Instead of storing image files directly in the database, PromptFlow uploads media to Cloudinary and stores only the generated image URLs in MongoDB.

This approach improves scalability, reduces database size, and provides optimized image delivery.

---

# AI Services

PromptFlow communicates with external AI providers through their official APIs.

| Provider | Purpose                |
| -------- | ---------------------- |
| Gemini   | AI response generation |
| OpenAI   | AI response generation |
| Groq     | AI response generation |

API keys for these providers are securely managed through backend environment variables.

---

# Deployment Workflow

```text
Developer

      │

      ▼

Push Code to GitHub

      │

      ├──────────────┐
      ▼              ▼

Vercel         Render

      │              │

Frontend     Backend API

                     │
        ┌────────────┼────────────┐
        ▼            ▼            ▼

 MongoDB Atlas  Cloudinary   AI Providers

        │            │
        └────────────┴────────────┐
                                  ▼
                          Live Application
```

---

# Deployment Checklist

- [x] Frontend deployed on Vercel
- [x] Backend deployed on Render
- [x] MongoDB Atlas connected
- [x] Cloudinary configured
- [x] AI provider API keys configured
- [x] Production environment variables added
- [x] HTTPS enabled
- [x] CORS configured
- [x] Frontend connected to backend

---

# Production Configuration

| Configuration    | Value                   |
| ---------------- | ----------------------- |
| Environment      | Production              |
| Frontend Hosting | Vercel                  |
| Backend Hosting  | Render                  |
| Database         | MongoDB Atlas           |
| Media Storage    | Cloudinary              |
| Protocol         | HTTPS                   |
| Authentication   | JWT + HTTP-only Cookies |

---

# Notes

- All communication between the frontend and backend is secured using HTTPS.
- Sensitive credentials are stored using platform-managed environment variables.
- User profile images are managed through Cloudinary.
- MongoDB Atlas serves as the primary database for application data.
- AI responses are generated using external AI provider APIs.
