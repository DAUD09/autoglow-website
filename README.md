# Autoglow Cleaning Services Limited — Official Website

Clean, modern static website for Autoglow Cleaning Services Limited (Blantyre, Malawi).

## Tech Stack

| Tool | Purpose |
|------|---------|
| **Vite 5** | Dev server, bundler, multi-page app |
| **Tailwind CSS 3** | Utility-first styling |
| **Vanilla JS** | Navbar, mobile menu, FAQ accordion, Formspree form |
| **Formspree** | Quote form submissions (endpoint: mqeygkgg) |
| **Node.js** | Local development runtime |
| **Git / GitHub Pages** | Version control & hosting |

## Project Structure

```
autoglow-website/
├── public/
│   ├── assets/
│   │   └── company_profile.pdf   ← Downloadable company profile
│   └── images/                   ← Logo, hero, service images
├── src/
│   ├── style.css                 ← Tailwind + custom components
│   └── main.js                   ← Shared JS (navbar, FAQ, form, image fallbacks)
├── index.html                    ← Home page
├── services.html                 ← Services & Pricing
├── about.html                    ← About, Team, Org Chart
├── contact.html                  ← Quote form & FAQ
├── privacy.html                  ← Privacy Policy
├── terms.html                    ← Terms & Conditions
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

## Deployment (GitHub Pages)

```bash
npm run build
git add .
git commit -m "Deploy"
git push origin main
git push origin `git subtree split --prefix dist main`:gh-pages --force
```

## Brand Colours

| Name | HEX |
|------|-----|
| Dark Navy (hero/navbar) | `#091E35` |
| Brand Navy | `#124E78` |
| Cyan (accent) | `#03BCF1` |
| Light Blue (bg tint) | `#DCF8FE` |
| Footer | `#060F1A` |

## Company Details

- **Company No.:** COY-VWU7N7J (incorporated 08 Feb 2026)
- **TIN:** 71173084
- **Contact:** +265 999 915 894
