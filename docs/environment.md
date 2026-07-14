# Environment Variables

This document explains the environment variables required to run **PromptFlow**.

PromptFlow is a monorepo consisting of two applications:

- **Backend** (`backend/`)
- **Frontend** (`frontend/`)

Each application has its own environment configuration.

---

# Backend

Create a `.env` file inside the `backend` directory.

```text
backend/.env
```

You can use `backend/.env.example` as a reference.

## Required Variables

| Variable                | Description                                                                                       | Example                 |
| ----------------------- | ------------------------------------------------------------------------------------------------- | ----------------------- |
| `PORT`                  | Port on which the backend server runs.                                                            | `3000`                  |
| `NODE_ENV`              | Application environment. Use `development` for local development and `production` for deployment. | `development`           |
| `CORS_ORIGIN`           | Allowed frontend origin for Cross-Origin Resource Sharing (CORS).                                 | `http://localhost:5173` |
| `MONGODB_URI`           | MongoDB Atlas connection string.                                                                  | `mongodb+srv://...`     |
| `ACCESS_TOKEN_SECRET`   | Secret used to sign JWT access tokens.                                                            | `your-secret`           |
| `ACCESS_TOKEN_EXPIRY`   | Access token lifetime.                                                                            | `15m`                   |
| `REFRESH_TOKEN_SECRET`  | Secret used to sign JWT refresh tokens.                                                           | `your-secret`           |
| `REFRESH_TOKEN_EXPIRY`  | Refresh token lifetime.                                                                           | `7d`                    |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name used for media storage.                                                     | `promptflow`            |
| `CLOUDINARY_API_KEY`    | Cloudinary API key.                                                                               | `123456789`             |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret.                                                                            | `********`              |
| `GEMINI_API_KEY`        | Google Gemini API key.                                                                            | `AIza...`               |
| `OPENAI_API_KEY`        | OpenAI API key.                                                                                   | `sk-...`                |
| `GROQAI_API_KEY`        | Groq API key.                                                                                     | `gsk_...`               |

---

# Frontend

Create a `.env` file inside the `frontend` directory.

```text
frontend/.env
```

You can use `frontend/.env.example` as a reference.

## Required Variables

| Variable       | Description                             | Example                        |
| -------------- | --------------------------------------- | ------------------------------ |
| `VITE_API_URL` | Base URL of the PromptFlow backend API. | `http://localhost:3000/api/v1` |

---

# Development Configuration

### Backend

```env
PORT=3000

NODE_ENV=development

CORS_ORIGIN=http://localhost:5173

MONGODB_URI=<your-mongodb-uri>

ACCESS_TOKEN_SECRET=<your-access-token-secret>
ACCESS_TOKEN_EXPIRY=15m

REFRESH_TOKEN_SECRET=<your-refresh-token-secret>
REFRESH_TOKEN_EXPIRY=7d

CLOUDINARY_CLOUD_NAME=<your-cloud-name>
CLOUDINARY_API_KEY=<your-api-key>
CLOUDINARY_API_SECRET=<your-api-secret>

GEMINI_API_KEY=<your-gemini-api-key>
OPENAI_API_KEY=<your-openai-api-key>
GROQAI_API_KEY=<your-groq-api-key>
```

### Frontend

```env
VITE_API_URL=http://localhost:3000/api/v1
```

---

# Production Configuration

### Backend

```env
NODE_ENV=production

CORS_ORIGIN=https://your-frontend.vercel.app
```

### Frontend

```env
VITE_API_URL=https://your-backend.onrender.com/api/v1
```

---

# Security Best Practices

- Never commit `.env` files to Git.
- Commit only `.env.example` files.
- Store production secrets using your hosting provider's Environment Variables (Render, Vercel, etc.).
- Use strong, randomly generated secrets for JWT authentication.
- Rotate API keys and secrets if they are ever exposed.

---

# Project Structure

```text
PromptFlow
│
├── backend
│   ├── .env
│   └── .env.example
│
└── frontend
    ├── .env
    └── .env.example
```

---

# Notes

- Restart the development server after modifying environment variables.
- Frontend environment variables must always begin with the `VITE_` prefix.
- Ensure `CORS_ORIGIN` matches the deployed frontend URL in production.
- Keep API keys and secrets private at all times.
