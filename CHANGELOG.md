# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- Launched documentation site powered by Docusaurus, available at `wp-react.js.org`.
- Added GitHub Pages workflow to automatically build and deploy the docs on push to `master`.
- Added trademark disclaimer clarifying wp-react is not affiliated with WordPress Foundation or Meta Platforms, Inc.

### Changed
- Refined package description to accurately reflect the library as a "type-safe" toolkit.
- Switched documentation site `baseUrl` to root (`/`) to serve from the `wp-react.js.org` custom domain.

### CI/CD
- Updated GitHub Actions to `v7` to resolve Node 20 deprecation warnings.
- Configured CodeQL to scan both TypeScript source code and GitHub Actions workflows for vulnerabilities.
- Upgraded CodeQL GitHub Actions from `v3` to `v4` to resolve Node 20 deprecation warnings and prepare for v3 retirement.
- Configured Dependabot to only monitor the root `package.json` to prevent conflicts with the documentation site.

### Dependencies
- Synced `@typescript-eslint/parser` to `^8.67.0` to match `eslint-plugin` and resolve peer dependency conflicts.
- Upgraded `inquirer` to `^14.0.2` and `@rollup/plugin-alias` to `6.0.0`.
- Upgraded `@opentelemetry/sdk-trace-web` to `2.10.0`.
- Upgraded `react-dom` and `@types/react-dom` to the latest `19.2.x` patch releases.

## [1.0.9] - 2026-08-14
### Security
- Upgraded `js-yaml` to `^4.3.1` via `overrides` to patch quadratic CPU consumption vulnerability (CVE-2026-59870).
- Upgraded `dompurify` to `^3.4.13` to patch XSS vulnerability via IN_PLACE hook removal.
- Upgraded `brace-expansion` to `^1.1.18` via `overrides` to patch DoS via unbounded expansion length.
- Removed deprecated `@types/dompurify` as DOMPurify v3+ ships with built-in TypeScript definitions.

### CI/CD & Infrastructure
- Implemented GitHub Actions Trusted Publishing (OIDC) for secure, tokenless automated releases.
- Added cryptographic build provenance (`--provenance`) to all future npm releases.
- Updated GitHub Actions workflow to use Node.js 24 for compatibility with modern npm engines.
- Cleaned up `.gitignore` to properly track dotfiles and configuration.

### Repository Health & DX
- Added `.env.example` to provide a clear template for CLI configuration.
- Configured GitHub Community Health files: Issue templates, PR templates, and Security policy (`SECURITY.md`).

## [1.0.7] - 2026-08-24
### Security
- Upgraded `axios` to `^1.18.0` to patch a high-severity prototype pollution vulnerability in the Node.js HTTP adapter (GHSA-gcfj-64vw-6mp9).

## [1.0.6] - 2026-07-05
### Added
- Added professional `shields.io` badges (Downloads, Bundle Size and TypeScript) to README.

### Security
- Override form-data to ^4.0.6 for CRLF injection protection.

## [1.0.5] - 2026-06-15
### Changed
- Updated README.md to use generic `YOUR_WP_WEBSITE` placeholders for better clarity.

## [1.0.4] - 2026-06-14
### Added
- Added `.prettierrc` and `.prettierignore` for consistent, automated code formatting.
- Added `.editorconfig` to ensure consistent indentation and line endings across all code editors.

## [1.0.3] - 2026-06-14
### Added
- Configured ESLint 9 with modern Flat Config (`eslint.config.mjs`) for better TypeScript/React support.

### Changed
- Relaxed strict ESLint rules (`no-explicit-any`, `no-unused-vars`) to reduce noise in external API integration files.

## [1.0.2] - 2026-06-14
### Changed
- Improved `package.json` description for better clarity and npm search visibility.
- Optimized `keywords` array to include high-intent search terms (`headless`, `typescript`, `react-query`, `jwt`).

## [1.0.1] - 2026-06-14
### Changed
- Updated README.md to use generic `YOUR_WEBSITE` placeholders for better clarity.
- Added `.npmrc` to `.gitignore` for improved security.

## [1.0.0] - 2026-06-13
### Added
- Core REST API client built on Axios with automatic retry logic.
- Full GraphQL client implementation with token refresh support.
- `WpAuthProvider` for seamless JWT authentication and session management.
- React Query hooks for posts, pages, users, media, and categories (`usePosts`, `useMedia`, etc.).
- Secure HTML sanitization utilities using DOMPurify.
- Complete, exported TypeScript type definitions for all hooks and components.
- `wp-react-cli` for terminal-based environment bootstrapping and endpoint testing.

### Changed
- Restructured project architecture for better modularity and tree-shaking.
- Upgraded and optimized Rollup bundling configuration for smaller production bundles.

### Fixed
- Resolved path alias resolution issues in production builds.
- Corrected type declarations for embedded WordPress resources (e.g., `_embedded` author data).