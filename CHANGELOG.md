# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- Launched documentation site powered by Docusaurus, live at `wp-react.js.org`.
- Added GitHub Pages workflow to automatically build and deploy the docs on push to `master`.
- Added trademark disclaimer clarifying wp-react is not affiliated with WordPress Foundation or Meta Platforms, Inc.
- Added Google Search Console and Bing Webmaster Tools verification.
- Added comprehensive SEO, Open Graph, and Twitter Card meta tags.
- Added an "About" page (`/about`) detailing the creator's background across CMS and frontend ecosystems.
- Added `homepage` field to `package.json` and a prominent docs link in the README.

### Changed
- Refined package description to accurately reflect the library as a "type-safe" toolkit.
- Rebranded documentation theme colors to match the wp-react logo (WordPress blue / React cyan).
- Loaded custom web fonts (Inter, Space Grotesk, JetBrains Mono) for improved documentation typography.
- Configured Dependabot to ignore the `docs/` directory and hold back on ESLint 10 / TypeScript 7 due to ecosystem incompatibilities.

### Fixed
- Updated `jest.config.ts` to use Node 22+ compliant JSON imports (`with { type: 'json' }`) to resolve parsing errors in newer Node runtimes.

### CI/CD
- Updated GitHub Actions to `v7` and CodeQL to `v4` to resolve Node 20 deprecation warnings.
- Configured CodeQL to scan both TypeScript source code and GitHub Actions workflows for vulnerabilities.
- Configured Dependabot to only monitor the root `package.json` to prevent conflicts with the documentation site.
- Configured Dependabot to ignore `eslint@10.x`, `@eslint/js@10.x`, and `typescript@7.x` until the broader ecosystem supports them.

### Dependencies
- Synced `@typescript-eslint/parser` and `eslint-plugin` to 8.69.0.
- Upgraded `jest` and `@types/jest` to the latest versions, alongside `tsc-alias` to 1.9.3.
- Upgraded `@tanstack/react-query` to 5.102.4 and devtools to 5.102.8.
- Upgraded `@opentelemetry/sdk-trace-web` to 2.11.0, `dotenv` to v17, and `open` to v11.
- Upgraded `@rollup/plugin-commonjs` to v29 and `rollup` to 4.63.0.
- Upgraded `prettier` to 3.9.6, `axios` to 1.19.0, and `@testing-library/jest-dom` to v7.
- Resolved `brace-expansion` DoS advisory via lockfile re-resolution.
- Aligned `@types/node` to v24 and `@types/react-dom` to 19.2.5.

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