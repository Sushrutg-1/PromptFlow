# Contributing to PromptFlow

First off, thank you for considering contributing to PromptFlow. This project is a portfolio-quality, production-grade MERN application, and contributions that help improve code quality, features, or documentation are genuinely welcome.

This document outlines the process for contributing so that your pull request has the best chance of being accepted quickly.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure Overview](#project-structure-overview)
- [How to Contribute](#how-to-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Features](#suggesting-features)
  - [Submitting Code](#submitting-code)
- [Branching Strategy](#branching-strategy)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Code Style](#code-style)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)
- [Questions](#questions)

---

## Code of Conduct

Be respectful, constructive, and professional in all interactions — issues, pull requests, discussions, and code reviews. Disagreements about implementation are fine and expected; personal attacks are not.

---

## Getting Started

Before contributing, please:

1. Check the [existing issues](../../issues) to see if your bug or feature has already been reported.
2. For anything non-trivial (a new feature, a breaking change, a large refactor), open an issue first to discuss the approach before writing code. This avoids wasted effort if the change doesn't fit the project's direction.
3. Small fixes (typos, minor bugs, documentation improvements) can go straight to a pull request without a prior issue.

---

## Development Setup

### Prerequisites

- Node.js (v18 or higher)
- npm
- A MongoDB Atlas connection string
- API keys for Gemini, OpenAI, and Groq
- A Cloudinary account

### Setup Steps

```bash
# 1. Fork the repository on GitHub, then clone your fork
git clone https://github.com/YOUR_GITHUB_USERNAME/PromptFlow.git
cd PromptFlow

# 2. Add the original repository as an upstream remote
git remote add upstream https://github.com/ORIGINAL_OWNER/PromptFlow.git

# 3. Install backend dependencies
cd backend
npm install
cp .env.example .env
# Fill in your own credentials in .env

# 4. Install frontend dependencies
cd ../frontend
npm install
cp .env.example .env
# Fill in your own credentials in .env
```

### Running the Project Locally

```bash
# Terminal 1 — backend
cd backend
npm run dev

# Terminal 2 — frontend
cd frontend
npm run dev
```

Refer to [`docs/environment.md`](docs/environment.md) for a full list of required environment variables.

---

## Project Structure Overview

- `backend/` — Express REST API, MongoDB models, AI provider services
- `frontend/` — React + Vite client application (feature-based architecture)
- `docs/` — Project documentation and screenshots

See the [Folder Structure section in the README](README.md#folder-structure) for the full directory breakdown, and [`docs/architecture.md`](docs/architecture.md) for a deeper explanation of how requests flow through the system.

---

## How to Contribute

### Reporting Bugs

When filing a bug report, please include:

- A clear, descriptive title
- Steps to reproduce the issue
- Expected behavior vs. actual behavior
- Screenshots, if applicable
- Environment details (OS, Node version, browser)

### Suggesting Features

Feature requests are welcome. Please describe:

- The problem the feature would solve
- The proposed solution or behavior
- Any alternatives you considered

### Submitting Code

1. Open or claim an issue describing the change.
2. Fork the repository and create a new branch from `main`.
3. Make your changes, following the [Code Style](#code-style) guidelines.
4. Commit your changes using the [Commit Message Guidelines](#commit-message-guidelines).
5. Push your branch and open a pull request against `main`.

---

## Branching Strategy

Use a descriptive branch name prefixed by the type of change:

| Prefix      | Use Case                                         |
| ----------- | ------------------------------------------------ |
| `feature/`  | New features                                     |
| `fix/`      | Bug fixes                                        |
| `docs/`     | Documentation-only changes                       |
| `refactor/` | Code changes that don't add features or fix bugs |
| `chore/`    | Tooling, dependencies, configuration             |

Example:

```bash
git checkout -b feature/claude-integration
git checkout -b fix/refresh-token-expiry
git checkout -b docs/update-api-reference
```

---

## Commit Message Guidelines

This project loosely follows [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <short description>

[optional body]
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

**Examples:**

```
feat(chat): add support for streaming AI responses
fix(auth): resolve refresh token expiry edge case
docs(readme): update installation instructions
refactor(services): normalize AI provider response shape
```

Keep the summary line under 72 characters. Use the body to explain _why_ the change was made, not just _what_ changed, if the reasoning isn't obvious.

---

## Code Style

- Follow the existing ESLint configuration (`eslint.config.js` in both `backend/` and `frontend/`). Run the linter before committing:

  ```bash
  npm run lint
  ```

- Match the existing folder conventions:
  - Backend: controllers stay thin, business logic and external API calls belong in `services/`, cross-cutting concerns belong in `middlewares/`.
  - Frontend: new functionality should be added inside the relevant feature module under `src/features/` (`api/`, `components/`, `pages/`, slice, thunks), not scattered across top-level folders.
- Use clear, descriptive variable and function names — avoid abbreviations that aren't already established in the codebase.
- Keep components and functions focused on a single responsibility. Prefer smaller, composable pieces over large monolithic files.
- Do not introduce new architectural patterns (for example, a repository layer or database service layer) without first discussing it in an issue — the current architecture is described in [`docs/architecture.md`](docs/architecture.md).

---

## Pull Request Process

1. Ensure your branch is up to date with `main` before opening a PR:

   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. Make sure the project builds and runs without errors, and that linting passes.
3. Fill out the pull request description clearly:
   - What does this PR change?
   - Why is the change needed?
   - Any relevant screenshots (for UI changes)?
   - Reference the related issue number, if applicable (e.g. `Closes #12`).
4. Keep pull requests focused — one feature or fix per PR. Large, unrelated changes bundled together are harder to review and more likely to be rejected.
5. Be responsive to review feedback. A maintainer may request changes before merging.

---

## Testing

Automated testing is on the [project roadmap](README.md#roadmap) and not yet fully in place. Until a formal test suite is added:

- Manually verify your changes work as expected in the browser and against the API (e.g. with Postman or similar) before opening a PR.
- If you are contributing test infrastructure itself, please open an issue first to discuss the proposed testing approach (framework choice, coverage targets, CI integration) before submitting a large PR.

---

## Questions

If anything in this guide is unclear, or you're unsure how to approach a contribution, open a [discussion or issue](../../issues) and ask — it's better to ask up front than to submit work that doesn't fit the project's direction.

Thank you for helping improve PromptFlow.
