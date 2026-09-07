# Cloudflare Pages Deployment Guide for grouper.vib.tools

This project is configured as a **100% Client-Side Browser Application (SPA)**.
- **Zero Backend Required**
- **Zero Cloudflare Workers Required**
- All email parsing, deduplication, syntax checking, and batch splitting execute entirely inside the user's browser for maximum privacy and zero latency.

---

## Cloudflare Pages Configuration Settings

When connecting your Git repository to **Cloudflare Pages**:

| Configuration Field | Value |
|---|---|
| **Project Name** | `grouper-vib-tools` |
| **Production Branch** | `main` (or your default branch) |
| **Framework Preset** | `Vite` |
| **Build Command** | `npm run build` |
| **Build Output Directory** | `dist` |
| **Root Directory** | `/` (Leave default) |
| **Environment Variables** | None required (All execution is client-side) |

---

## Custom Domain Setup (`grouper.vib.tools`)

1. Go to **Cloudflare Dashboard** > **Workers & Pages** > Select your project (`grouper-vib-tools`).
2. Navigate to the **Custom Domains** tab.
3. Click **Set up a domain**.
4. Enter `grouper.vib.tools`.
5. Cloudflare will automatically configure the CNAME DNS record and issue an SSL/TLS certificate.

---

## Included Cloudflare Files

- `public/_redirects`: Provides SPA fallback (`/*  /index.html  200`) so direct links work without 404s.
- `public/_headers`: Sets security headers (X-Frame-Options, CSP, Permissions-Policy) and caching rules for static assets.
- `public/_routes.json`: Disables all Cloudflare Workers / Functions invocation so requests are served directly from Cloudflare's global edge static CDN.
- `wrangler.toml`: Cloudflare CLI configuration file (`pages_build_output_dir = "dist"`).
- `public/robots.txt` & `public/sitemap.xml`: SEO configuration pointing to `https://grouper.vib.tools/`.
