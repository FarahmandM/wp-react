# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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