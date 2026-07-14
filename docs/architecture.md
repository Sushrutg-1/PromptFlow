# Architecture

This document describes the overall architecture of **PromptFlow**.

PromptFlow follows a client-server architecture where the frontend communicates with the backend through REST APIs.

---

# High-Level Architecture

```text
                +----------------------+
                |      Frontend        |
                | React + Redux Toolkit|
                +----------+-----------+
                           |
                           | HTTP Requests
                           | (Axios)
                           |
                           ▼
                +----------------------+
                |      Express API     |
                +----------+-----------+
                           |
                    Authentication
                    & Middleware
                           |
                           ▼
                    Route Handlers
                           |
                           ▼
                     Controllers
                   /            \
                  /              \
                 ▼                ▼
         MongoDB Models      AI Services
                 |                |
                 ▼                ▼
             MongoDB         AI Providers
```

---

# Architecture Overview

PromptFlow is divided into two independent applications.

| Application | Responsibility |
|-------------|----------------|
| Frontend | User Interface and API communication |
| Backend | Authentication, business logic, database operations and AI integration |

---

# Frontend Architecture

The frontend is built using React and follows a feature-based folder structure.

Main technologies:

- React
- Redux Toolkit
- React Router
- Axios
- Tailwind CSS

Responsibilities:

- User authentication
- Conversation management
- AI model selection
- Displaying AI responses
- Managing application state

---

# Backend Architecture

The backend is built using Express.js.

Responsibilities:

- REST API
- User authentication
- JWT verification
- Database operations
- AI provider integration
- Error handling

---

# Request Flow

A typical request follows this flow.

```text
Client

   │

   ▼

Express Router

   │

   ▼

Middleware

   │

   ▼

Controller

   │

   ├──────────────► MongoDB

   │

   └──────────────► AI Services

                     │

                     ▼

               AI Provider

                     │

                     ▼

Controller

   │

   ▼

JSON Response
```

---

# Frontend Structure

The frontend is organized using feature-based modules.

```text
src/

├── app/
├── assets/
├── components/
├── config/
├── constants/
├── features/
├── hooks/
├── layouts/
├── pages/
├── routes/
├── styles/
└── utils/
```

---

# Backend Structure

The backend is organized using modular folders.

```text
src/

├── config/
├── constants/
├── controllers/
├── db/
├── middlewares/
├── models/
├── routes/
├── services/
├── utils/
├── app.js
└── server.js
```

---

# Authentication Flow

```text
Client

   │

Login Request

   │

   ▼

User Controller

   │

   ▼

MongoDB

   │

Generate JWT Tokens

   │

HTTP-only Cookies

   │

   ▼

Authenticated Requests
```

---

# AI Request Flow

```text
User Prompt

      │

      ▼

Conversation Controller

      │

      ▼

AI Service

      │

      ├──────────────► Gemini

      ├──────────────► OpenAI

      └──────────────► Groq

      │

      ▼

Combined Responses

      │

      ▼

Frontend
```

---

# Database Architecture

PromptFlow currently uses four collections.

```text
User

│

└── Conversation

      │

      └── Turn

             │

             └── Response
```

---

# Design Principles

The project follows these design principles.

- Modular folder structure
- Feature-based frontend architecture
- RESTful API design
- Reusable UI components
- Centralized error handling
- JWT-based authentication
- Environment-based configuration

---

# Technologies

| Layer | Technology |
|--------|------------|
| Frontend | React |
| State Management | Redux Toolkit |
| Routing | React Router |
| HTTP Client | Axios |
| Styling | Tailwind CSS |
| Backend | Express.js |
| Database | MongoDB |
| ODM | Mongoose |
| Authentication | JWT |
| AI Providers | Gemini, OpenAI, Groq |

---

> **Note**

The current architecture represents the MVP implementation of PromptFlow. It is modular and can be extended with additional AI providers and features in future releases without significant structural changes.
