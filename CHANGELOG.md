# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.1.0] - 2026-09-07

### Changed
- Renamed application to **Email Grouper** (formerly Ekta Grouper).
- Updated brand identity and assets to official **Vib Tools** 512px vector iconography and favicons.
- Overhauled user interface to a compact, high-contrast light theme with optimized typographic hierarchy and dense batch grid layouts.
- Added comprehensive in-app **About Vib Tools** modal showcasing company profile, open-source ecosystem, mission, and direct contact channels.
- Added full suite of GitHub-ready repository documentation (`README.md`, `CONTRIBUTING.md`, `SECURITY.md`, `CODE_OF_CONDUCT.md`, `LICENSE`, issue and PR templates).

### Fixed
- Sanitized delimiter string interpolation for custom separators.
- Optimized client-side array chunking performance when processing over 50,000+ records.

---

## [1.0.0] - 2026-08-29

### Added
- Initial release of the bulk email grouping utility on `grouper.vib.tools`.
- Client-side deduplication and RFC-compliant syntax checking.
- Multiple batch delimiters: Comma, Semicolon, Newline, Space, Pipe, Tab, Custom.
- Batch pagination and search filtering.
- One-click clipboard copy and RFC 4180 CSV export.
- Offline Progressive Web App (PWA) manifest and caching.
- Zero-backend static Cloudflare Pages deployment configuration.
