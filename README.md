<div align="center">

<a href="https://grouper.vib.tools/">
  <img src="https://vibtools.github.io/vibtools-brand-assets/logos/icon-512.png" alt="Email Grouper Logo" width="96" height="96" />
</a>

# Email Grouper

### Practical, high-performance bulk email grouping, cleaning, and delimiter formatting utility.
**100% In-Browser &bull; Zero Server &bull; Zero Data Retention &bull; Offline Capable**

[![Website](https://img.shields.io/badge/website-vib.tools-4f46e5?style=flat-square)](https://vib.tools/)
[![Live App](https://img.shields.io/badge/live-grouper.vib.tools-10b981?style=flat-square)](https://grouper.vib.tools/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![GitHub Org](https://img.shields.io/badge/organization-vibtools-181717?style=flat-square&logo=github)](https://github.com/vibtools)
[![Maintained by](https://img.shields.io/badge/maintainer-@victorsteele-blueviolet?style=flat-square)](https://github.com/victorsteele)

[Live App](https://grouper.vib.tools/) &bull; [Vib Tools Official](https://vib.tools/) &bull; [Report Bug](https://github.com/vibtools/tools-email-grouper/issues) &bull; [Request Feature](https://github.com/vibtools/tools-email-grouper/issues)

</div>

---

## Overview

**Email Grouper** (formerly Ekta Grouper) is a dedicated client-side utility engineered by **Vib Tools** to solve the real-world friction of partitioning massive email contact lists into batch-ready formats for email service providers (ESPs), BCC blasts, cold campaigns, and CRM workflows.

Whether you need to group 50,000 emails into batches of 50 separated by commas, semicolons, newlines, or custom pipe symbols, **Email Grouper** processes your data entirely within your browser in milliseconds without a single byte leaving your computer.

---

## Key Features

- 🔒 **Zero Server Transmission (100% Client-Side)**: All text parsing, filtering, and splitting runs directly on your local device via JavaScript engines. No API keys, tracking, or remote databases.
- ⚡ **High-Performance Chunking**: Tested with over 50,000+ email addresses with instant batch generation and zero UI freeze.
- 🧹 **Data Sanitization & Cleaning Engine**:
  - **Deduplication**: Automatically detect and strip out duplicate email entries with one click.
  - **Syntax Validation**: Purge malformed emails and invalid syntax using RFC-compliant validation algorithms.
  - **Normalization**: Trim whitespace and lowercase strings for consistent processing.
- 🔀 **Flexible Separator Support**:
  - Comma (`, `)
  - Semicolon (`; `)
  - Newline (`\n`)
  - Space (` `)
  - Pipe (` | `)
  - Tab (`\t`)
  - Custom user-defined delimiters
- 📋 **One-Click Batch Copy & CSV Export**:
  - Copy individual batches with dedicated copy feedback.
  - Copy all generated batches simultaneously.
  - Export all batches to structured `.csv` files for direct spreadsheet or CRM import.
- 📱 **Adaptive Cross-Device UI**:
  - Compact, high-contrast light interface optimized for density and readability.
  - Dedicated desktop sidebar with batch grid view.
  - Native-feeling mobile layout with bottom navigation bar (Batches, Source, Clean, Group).
- 📴 **Offline-Ready Progressive Web App (PWA)**: Installable and works completely offline without an internet connection.

---

## Quick Start

### Online Usage
Access the production application immediately at:
👉 **[https://grouper.vib.tools/](https://grouper.vib.tools/)**

### Local Development

#### Prerequisites
- Node.js 18+ or 20+
- npm 9+ or pnpm / yarn

#### Installation
```bash
# Clone the repository
git clone https://github.com/vibtools/tools-email-grouper.git
cd tools-email-grouper

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit `http://localhost:3000` in your web browser.

#### Building for Production
```bash
# Compile and build production bundle
npm run build

# Preview production build locally
npm run preview
```

The compiled output will be generated inside the `dist/` directory, ready for deployment to any static hosting service (Cloudflare Pages, Vercel, GitHub Pages, Netlify).

---

## Deployment to Cloudflare Pages

Email Grouper is 100% client-side SPA and requires zero Cloudflare Workers or server-side functions.

| Setting | Value |
|---|---|
| **Build Command** | `npm run build` |
| **Build Output Directory** | `dist` |
| **Root Directory** | `/` |
| **Custom Domain** | `grouper.vib.tools` |

Includes pre-configured `public/_redirects` for SPA routing and `public/_headers` with high-security HTTP headers. See [CLOUDFLARE_PAGES.md](CLOUDFLARE_PAGES.md) for full instructions.

---

## Tech Stack

- **Framework**: React 18+ with TypeScript
- **Bundler**: Vite
- **Styling**: Tailwind CSS
- **Icons**: `lucide-react`
- **PWA**: `vite-plugin-pwa` with service worker caching
- **Export**: Client-side RFC 4180 CSV blob generation

---

## About Vib Tools

**Vib Tools** builds practical desktop applications, self-hosted software, automation tooling, developer utilities, reusable frameworks, and open-source projects for real workflows.

> *“Build free and open-source tools that help people do real work with less complexity.”*

### Organization & Contacts
- **Website**: [https://vib.tools/](https://vib.tools/)
- **GitHub**: [@vibtools](https://github.com/vibtools)
- **GitLab**: [@vibtools](https://gitlab.com/vibtools)
- **General Inquiries**: [hello@vib.tools](mailto:hello@vib.tools)
- **Support & Security**: [support@vib.tools](mailto:support@vib.tools)
- **WhatsApp / Phone**: +880 1795-470603 (GMT+6)
- **Head Office**: 5660 Kochakata, Nageswari, Kurigram, Rangpur, Bangladesh

### Maintainer
- **Md Nurnobi** ([@victorsteele](https://github.com/victorsteele)) — Connected GitHub account administrator.

---

## Open-Source Ecosystem by Vib Tools

Explore other practical open-source software from Vib Tools:
- **[Portable Account Browser](https://github.com/vibtools/PortableAccountBrowser)**: Portable multi-account Chromium browser with isolated profiles.
- **[ContextVault](https://github.com/vibtools/ContextVault)**: Portable ChatGPT conversation archive and RAG-ready exporter.
- **[MailStack](https://github.com/vibtools/MailStack)**: Self-hosted business mail server and shared team inbox.
- **[Licora](https://github.com/vibtools/Licora)**: Central license management system.
- **[Vib Project Template](https://github.com/vibtools/vibproject-template)**: Technology-neutral repository foundation.

---

## Contributing

Contributions, bug reports, and feature suggestions are welcome! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) before submitting pull requests.

---

## Security

Security and privacy are core engineering values at Vib Tools. For responsible vulnerability disclosure, please refer to [SECURITY.md](SECURITY.md) or email [support@vib.tools](mailto:support@vib.tools).

---

## License

This project is open-source software licensed under the [MIT License](LICENSE).  
Copyright &copy; 2026 **Vib Tools** and **Md Nurnobi**.
