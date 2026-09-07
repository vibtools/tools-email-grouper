# Contributing to Email Grouper

Thank you for your interest in contributing to **Email Grouper** by **Vib Tools**! We welcome contributions that align with our engineering philosophy: **practical, maintainable, secure, and focused on real workflows**.

---

## Code of Conduct

All contributors and maintainers are expected to adhere to our [Code of Conduct](CODE_OF_CONDUCT.md). Please read it before participating.

---

## How Can I Contribute?

### 1. Reporting Bugs
- Check existing [GitHub Issues](https://github.com/vibtools/email-grouper/issues) to avoid duplicates.
- Use our [Bug Report Template](.github/ISSUE_TEMPLATE/bug_report.md).
- Clearly describe the bug, reproduction steps, expected behavior, and browser/OS environment.
- If you notice a security issue, **do not open a public issue** — see [SECURITY.md](SECURITY.md).

### 2. Suggesting Features
- Open a feature request under [GitHub Issues](https://github.com/vibtools/email-grouper/issues).
- Explain the specific real-world problem or workflow the feature solves.
- Remember Vib Tools' core principle: *avoid unnecessary complexity or feature bloat*.

### 3. Submitting Pull Requests
- Fork the repository and create your branch from `main`:
  ```bash
  git checkout -b feature/your-feature-name
  # or
  git checkout -b fix/your-bug-fix
  ```
- Install dependencies:
  ```bash
  npm install
  ```
- Ensure type-checks and lint pass without errors:
  ```bash
  npm run lint
  npm run build
  ```
- Keep pull requests focused on a single change or fix.
- Submit the pull request to the `main` branch.

---

## Development Guidelines

- **Zero-Server Guarantee**: Email Grouper must remain 100% client-side. Never introduce network transmission of user emails, external tracking, or third-party telemetry.
- **TypeScript**: Strict type definitions are required. Avoid `any`.
- **Tailwind CSS**: Use Tailwind utility classes directly. Maintain high color contrast and clean, compact spacing.
- **Performance**: Test large arrays (10,000+ items) to prevent blocking the main thread or causing layout thrashing.
- **Accessibility**: All interactive elements must be accessible via keyboard and have appropriate ARIA attributes.

---

## Questions & Contact

For questions about contributing, contact the Vib Tools team:
- **General**: [hello@vib.tools](mailto:hello@vib.tools)
- **Technical Support**: [support@vib.tools](mailto:support@vib.tools)
- **GitHub**: [@vibtools](https://github.com/vibtools)
