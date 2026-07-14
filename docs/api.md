# API Documentation

This document provides an overview of all REST API endpoints available in **PromptFlow**.

**API Version:** `v1`

**Base URL**

```http
http://localhost:3000/api/v1
```

> Replace the localhost URL with your deployed backend URL when deploying to production.

---

# Table of Contents

- Authentication
- Users
- Conversations
- AI Responses
- Response Format
- HTTP Status Codes

---

# Authentication

Most endpoints require authentication using JWT.

After a successful login, the backend sends secure HTTP-only cookies containing the access token and refresh token.

Protected routes automatically verify the authenticated user before processing the request.

---

# Response Format

## Success Response

```json
{
  "success": true,
  "message": "Operation completed successfully.",
  "data": {}
}
```

---

## Error Response

```json
{
  "success": false,
  "message": "Something went wrong."
}
```

---

# User APIs

## Register User

Creates a new user account.

### Endpoint

```http
POST /users/register
```

### Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password@123"
}
```

### Success Response

```json
{
  "success": true,
  "message": "User registered successfully."
}
```

---

## Login

Authenticates an existing user.

### Endpoint

```http
POST /users/login
```

### Request Body

```json
{
  "email": "john@example.com",
  "password": "Password@123"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Login successful.",
  "data": {
    "user": {},
    "accessToken": "...",
    "refreshToken": "..."
  }
}
```

---

## Logout

Logs out the currently authenticated user.

### Endpoint

```http
POST /users/logout
```

### Authentication

Required

### Success Response

```json
{
  "success": true,
  "message": "Logged out successfully."
}
```

---

## Get Current User

Returns details of the currently authenticated user.

### Endpoint

```http
GET /users/current-user
```

### Authentication

Required

### Success Response

```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": "...",
    "role": "USER"
  }
}
```

---

## Refresh Access Token

Generates a new access token using the refresh token.

### Endpoint

```http
POST /users/refresh-token
```

### Authentication

Refresh Token Required

### Success Response

```json
{
  "success": true,
  "message": "Access token refreshed successfully."
}
```

---

# Conversation APIs

---

## Create Conversation

Creates a new conversation.

### Endpoint

```http
POST /conversations
```

### Authentication

Required

### Success Response

```json
{
  "success": true,
  "data": {
    "_id": "...",
    "title": "New Conversation"
  }
}
```

---

## Get All Conversations

Returns all conversations of the authenticated user.

### Endpoint

```http
GET /conversations
```

### Authentication

Required

---

## Get Conversation

Returns a specific conversation.

### Endpoint

```http
GET /conversations/:conversationId
```

### Authentication

Required

---

## Rename Conversation

Updates the title of a conversation.

### Endpoint

```http
PATCH /conversations/:conversationId
```

### Request Body

```json
{
  "title": "JavaScript Interview Questions"
}
```

---

## Delete Conversation

Deletes a conversation.

### Endpoint

```http
DELETE /conversations/:conversationId
```

### Authentication

Required

---

# AI APIs

## Send Prompt

Sends a prompt to one or more selected AI models.

### Endpoint

```http
POST /conversations/:conversationId/send-message
```

### Authentication

Required

### Request Body

```json
{
  "prompt": "Explain JWT Authentication.",
  "activeModels": [
    {
      "provider": "google",
      "model": "gemini-2.5-flash"
    },
    {
      "provider": "groq",
      "model": "llama-3.3-70b-versatile"
    }
  ]
}
```

### Success Response

```json
{
  "success": true,
  "data": {
    "turn": {},
    "responses": [
      {
        "provider": "google",
        "model": "gemini-2.5-flash",
        "status": "completed",
        "content": "..."
      },
      {
        "provider": "groq",
        "model": "llama-3.3-70b-versatile",
        "status": "completed",
        "content": "..."
      }
    ]
  }
}
```

---

# HTTP Status Codes

| Status Code | Description                    |
| ----------- | ------------------------------ |
| 200         | Request completed successfully |
| 201         | Resource created successfully  |
| 400         | Invalid request                |
| 401         | Authentication required        |
| 403         | Access denied                  |
| 404         | Resource not found             |
| 409         | Resource already exists        |
| 500         | Internal server error          |

---

# Supported AI Providers

| Provider | Status       |
| -------- | ------------ |
| Gemini   | ✅ Supported |
| Groq     | ✅ Supported |
| Claude   | 🚧 Planned   |
| OpenAI   | 🚧 Planned   |
| DeepSeek | 🚧 Planned   |

---

# API Flow

```text
Client
    │
    ▼
Express Router
    │
    ▼
Authentication Middleware
    │
    ▼
Controller
    │
    ▼
Service Layer
    │
    ▼
Database / AI Provider
    │
    ▼
Response
```

---

# Notes

- All endpoints return JSON responses.
- Protected endpoints require a valid authenticated session.
- Access tokens are refreshed automatically using the refresh token.
- Future API versions will maintain backward compatibility whenever possible.
