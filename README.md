# Autoglow Cleaning Services Limited — Official Website

Clean, modern static website for Autoglow Cleaning Services Limited (Blantyre, Malawi).

## Tech Stack

| Tool | Purpose |
|------|---------|
| **Vite 5** | Dev server, bundler, multi-page app |
| **Tailwind CSS 3** | Utility-first styling |
| **Vanilla JS** | Navbar, mobile menu, FAQ accordion, form |
| **Node.js** | Local development runtime |
| **Git** | Version control |

## Project Structure

```
autoglow-website/
├── public/
│   ├── assets/
│   │   └── company_profile.pdf   ← Downloadable company profile
│   └── images/
│       └── orgchart.png          ← Organisation chart
├── src/
│   ├── style.css                 ← Tailwind + custom components
│   └── main.js                   ← Shared JS (navbar, FAQ, form)
├── index.html                    ← Home page
├── services.html                 ← Services & Pricing
├── about.html                    ← About, Team, Org Chart, Policies
├── contact.html                  ← Contact form & FAQ
├── tailwind.config.js
├── vite.config.js
├── postcss.config.js
└── package.json
```

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

## Brand Colours

| Name | HEX |
|------|-----|
| Navy (primary) | `#1A3C6B` |
| Blue (accent) | `#2E75B6` |
| Light (bg tint) | `#EBF3FB` |
| Pale (borders) | `#D6E4F0` |

## Company Details

- **Company No.:** COY-VWU7N7J (incorporated 08 Feb 2026)
- **TIN:** 71173084
- **Bank:** National Bank of Malawi · Acc: 1013395914
- **Contact:** +265 999 915 894

## Deployment

This is a fully static site — the `dist/` folder produced by `npm run build` can be hosted on any static host (Netlify, Vercel, GitHub Pages, shared hosting, etc.).

Make sure `public/assets/company_profile.pdf` is present before building so the download link works.
