# Security Policy

## Overview

Autoglow Cleaning Services Limited takes the security of this website seriously. This document outlines our security practices, how to report vulnerabilities, and what protections are in place.

## Supported Versions

This is a static marketing website. We maintain and patch only the current live version hosted at [daud09.github.io/autoglow-website](https://daud09.github.io/autoglow-website).

| Version | Supported |
|---------|-----------|
| Current (main branch) | ✅ Yes |
| All previous versions | ❌ No |

## Reporting a Vulnerability

If you discover a security vulnerability in this website, please report it responsibly:

**Do not** open a public GitHub issue for security vulnerabilities.

**Instead, contact us directly:**

- **Email:** Autoglowcleaningservices25@yahoo.com
- **Subject line:** `[SECURITY] Vulnerability Report — Autoglow Website`
- **Phone:** +265 999 915 894

We will acknowledge your report within **48 hours** and aim to resolve confirmed issues within **7 days**.

We appreciate responsible disclosure and will credit researchers who report valid vulnerabilities (unless they prefer to remain anonymous).

## Security Controls in Place

### HTTP Security Headers (via meta tags)
- `X-Content-Type-Options: nosniff` — prevents MIME-type sniffing
- `X-Frame-Options: SAMEORIGIN` — blocks clickjacking
- `Referrer-Policy: strict-origin-when-cross-origin` — controls referrer leakage
- `Permissions-Policy` — disables camera, microphone, geolocation
- `Content-Security-Policy` — restricts allowed content sources

### Content Security Policy
Resources are restricted to:
- **Scripts:** `self` only (no inline scripts, no third-party JS)
- **Styles:** `self` + Google Fonts + `unsafe-inline` (required for Tailwind)
- **Images:** `self` + Unsplash CDN + data URIs
- **Fonts:** Google Fonts CDN only
- **Connections:** Formspree only (for quote form submissions)
- **Frame ancestors:** `self` only
- **Form actions:** Formspree only

### Contact Form Protection
- Honeypot field (`_gotcha`) to reject bot submissions
- Client-side rate limiting (60-second session cooldown)
- Input validation — name, phone format, required fields enforced
- All submissions go to Formspree over HTTPS — no server-side code executed

### Email Protection
- No `mailto:` links anywhere on the site — email addresses displayed as plain text only to prevent harvesting by bots

### Dependency Security
- Minimal production dependency surface (Vite, Tailwind, PostCSS — all dev-only)
- Zero production JavaScript dependencies loaded from third-party CDNs
- `npm audit` run on every build via CI/CD pipeline

## What This Site Does NOT Do
- No cookies set by this site
- No user accounts or authentication
- No server-side processing
- No database
- No storage of personal data on this site (form data goes directly to Formspree)
- No tracking pixels or advertising scripts

## CI/CD Security
- Deployments automated via GitHub Actions using `GITHUB_TOKEN` (scoped permissions)
- Only pushes to `main` branch trigger deployments
- `force_orphan: true` keeps deployment history clean and auditable

## Scope

This policy covers:
- `https://daud09.github.io/autoglow-website/`
- All HTML, CSS, and JavaScript in this repository

It does **not** cover:
- Third-party services (Formspree, Google Fonts, Unsplash)
- Any future custom domain (will be updated when live)

## Last Updated
23rd April 2026
