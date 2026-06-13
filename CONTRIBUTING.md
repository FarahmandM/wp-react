# Contributing to wp-react

Thank you for your interest in contributing to `wp-react`! This document provides guidelines and instructions for setting up the project and submitting changes.

## 🎯 What We Accept

To keep the project stable and maintainable, we have clear guidelines on the types of contributions we can merge:

### ✅ We Welcome:
* **Bug fixes:** Especially those that include a failing test case that your fix resolves.
* **Documentation improvements:** Typo fixes, clearer examples, or adding missing edge cases.
* **New features:** But please **open an issue first** to discuss the idea and ensure it aligns with the project's roadmap.
* **Performance improvements:** Provided they include benchmarks or clear explanations of the gains.

### ❌ We Do NOT Accept:
* **Blind dependency updates:** These are handled by maintainers (or automated tools) to ensure stability and compatibility.
* **Large-scale refactoring without tests:** Changes that restructure code without verifying behavior introduce too much risk of regression.
* **Breaking changes without prior discussion:** Any change that alters the public API must be discussed in an issue/RFC first to assess the impact on downstream users.
* **PRs that fail CI:** All submissions must pass linting, formatting, and tests before review.

---

## 🛠️ Development Setup

1. **Fork and Clone** the repository:
```bash
git clone https://github.com/FarahmandM/wp-react.git
cd wp-react
```

2. **Install dependencies**:
```bash
npm install
```

3. **Create a new branch** for your feature or bug fix:
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

## 📜 Development Scripts

| Command          | Description                                |
| ---------------- | ------------------------------------------ |
| `npm run dev`    | Watch for file changes and rebuild         |
| `npm run build`  | Build the library and CLI for production   |
| `npm run test`   | Run unit tests via Jest                    |
| `npm run lint`   | Check code for ESLint errors               |
| `npm run format` | Format code automatically with Prettier    |
| `npm run clean`  | Clear the `dist/` folder                   |

## ✅ Before Submitting a Pull Request

Please ensure your code meets the project's quality standards by running the following commands before pushing:

```bash
# 1. Format your code
npm run format

# 2. Ensure there are no linting errors
npm run lint

# 3. Ensure all tests pass
npm run test

# 4. Ensure the project builds successfully
npm run build
```

## 📝 Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification to keep our git history clean and automate changelog generation. 

Examples:
* `feat: add support for custom post types`
* `fix: resolve token refresh bug in WpAuthProvider`
* `docs: update README with new CLI examples`
* `chore: update rollup dependencies`

## 🚀 Submitting a Pull Request

1. Push your branch to your forked repository.
2. Open a Pull Request (PR) against the `main` branch of this repository.
3. Clearly describe the problem you are solving or the feature you are adding.
4. Link any related GitHub issues (e.g., `Closes #12`).
5. Wait for a maintainer to review your code. We may request minor changes or adjustments.

## 📜 Code of Conduct

By participating in this project, you agree to abide by our community standards. Please be respectful, inclusive, and constructive in all discussions and code reviews.

---
Thank you for helping make `wp-react` better!