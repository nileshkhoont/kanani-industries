# Kanani Industries — Official Website & Digital Platform

> **"Sortex Toor Trading | Import & Export"**  
> Gujarat’s premier Sortex-cleaned Toor Dal (Pigeon Peas) processing and international export trading platform.

---

## 🌾 Overview

This repository hosts the production-ready website and digital catalog for **Kanani Industries**, based in Gondal, Saurashtra, Gujarat. Built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, and **TypeScript**, the platform showcases 4 signature brands (*Savaj*, *Ganesh*, *Nilkanth*, and *Natural*), Sortex optical color sorting technology, global container export specs, recipe cards, and a direct WhatsApp order flow.

---

## 🚀 Quick Start

### Prerequisites
- Node.js `v20.x` or higher (tested on Node v22)
- npm or pnpm

### Installation & Development

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Open http://localhost:3000 in your browser
```

### Production Build

```bash
# Validate TypeScript and create optimized production build
npm run build

# Start production server
npm start
```

---

## 🎨 Design System & Strict Theme Tokens

All colors, shadows, and design tokens are centralized exclusively in [`src/styles/theme.css`](file:///D:/Kanani%20Industries/src/styles/theme.css). **No hardcoded HEX, RGB, or HSL color codes exist in any component or page file.**

### Brand Palette

| Token | Variable | Value | Usage |
|---|---|---|---|
| **Logo Navy** | `--color-primary` | `#0E3B7D` | Main brand tone, header accents, buttons |
| **Logo Navy Light** | `--color-primary-light` | `#1D56A8` | Hover states, active links |
| **Logo Navy Dark** | `--color-primary-dark` | `#0A2A5A` | Deep contrast, dark card gradients, hero surfaces |
| **Leaf Green** | `--color-secondary` | `#3E9B2F` | Agrarian identity, badges, checkmarks |
| **Leaf Green Light** | `--color-secondary-light` | `#7DC22E` | Highlight text, gradient stops |
| **Leaf Green Dark** | `--color-secondary-dark` | `#2C7522` | Deep green shadow & footer accents |
| **Golden Grain** | `--color-accent` | `#E8B23A` | Toor dal purity badge, highlight pills |
| **Surface** | `--color-surface` | `#F6F9F2` | Subtle organic cream background |
| **Ink** | `--color-ink` | `#0B1F3F` | High-contrast body typography |

### Verifying Zero Color Leaks

Run this grep check to ensure zero raw HEX codes are introduced outside `theme.css`:

```bash
# In PowerShell:
Get-ChildItem -Path src -Recurse -Include *.tsx,*.ts,*.jsx,*.js | Select-String -Pattern "#[0-9a-fA-F]{3,8}" | Where-Object { $_.Path -notmatch "theme.css" }

# In Bash / Git Bash:
grep -rnE "#[0-9a-fA-F]{3,8}" src/ --exclude="theme.css"
```
*(Should return 0 matches).*

---

## 🏷️ Brand Assets & Icon Generation

The official logo is located at `public/brand/kanani-logo.png`. All derived icon assets (favicons, Apple touch icons, transparent headers, and OpenGraph preview cards) are programmatically generated using Sharp.

```bash
# Regenerate favicons, app icons, and OG preview image
npm run generate-icons
# (or: node scripts/generate-icons.mjs)
```

Generated outputs:
- `public/brand/kanani-logo-transparent.png` — Background-removed for dark backgrounds
- `public/icon.png` & `src/app/icon.png` (512x512)
- `public/apple-icon.png` & `src/app/apple-icon.png` (180x180)
- `public/favicon.ico` & `src/app/favicon.ico`
- `public/brand/og-image.png` & `src/app/opengraph-image.png` (1200x630)

---

## 📦 Single Source of Truth & Storage Adapter

### Product Data
All 4 signature brand lines are maintained in [`src/data/products.json`](file:///D:/Kanani%20Industries/src/data/products.json):
1. **Janap Toor Dal (Savaj Brand)** — Bold grain, Gujarati wedding favorite
2. **Varjin Toor Dal (Ganesh Brand)** — Golden regular grain, daily home dining
3. **Bidian Toor Dal (Nilkanth Brand)** — Medium split, catering & wholesale
4. **Rasdi Toor Dal (Natural Brand)** — Premium unpolished, organic export line

### Atomic File Storage & Adapter Swapping
Price updates from the admin dashboard are handled by [`src/lib/storage.ts`](file:///D:/Kanani%20Industries/src/lib/storage.ts) using an atomic write-and-rename mechanism (`fs.promises.rename`) that prevents file corruption under concurrent writes.

> **Production Swapping Note:**  
> For serverless deployments on platforms with read-only filesystems (e.g., AWS Lambda, Vercel), swap the file implementation in `src/lib/storage.ts` with **Vercel KV**, **Upstash Redis**, **PostgreSQL (Prisma/Drizzle)**, or **MongoDB**. The interface `getProduct(id)` and `updateProductPrice(id, price)` remains identical.

---

## 🔐 Admin Authentication & Price Management

### Accessing the Admin Panel
- **URL:** [`/admin/login`](http://localhost:3000/admin/login)
- **Accepted Username:** `admin` or `admin@kananiindustries.com`
- **Password:** `KananiAdmin@2026` (or `Admin@Kanani2026`)

### Security Highlights
- **JWT Authentication:** Managed via `jose` with `HS256`, signed tokens stored in `httpOnly`, `sameSite=lax`, `secure` cookies (`kanani_admin_token`) with an 8-hour expiry.
- **Middleware Guard:** [`middleware.ts`](file:///D:/Kanani%20Industries/middleware.ts) protects all `/admin/*` and `/api/admin/*` routes.
- **Strict Zod Validation:** The PATCH endpoint `/api/admin/products/[id]` enforces a strict schema accepting only `{ price: number, mrp: number }` (validates `price > 0`, `mrp > 0`, and `price <= mrp`). Any other field is strictly rejected.
- **Rate Limiting:** In-memory sliding window rate limiter protects `/api/admin/login` (maximum 5 attempts per 15 minutes per IP).

### Hashing a New Password
To change the admin password, generate a bcrypt hash using the provided utility:

```bash
node scripts/hash-password.mjs "YourNewSecurePassword123"
```
Copy the resulting hash and set it in your environment variables:
```env
ADMIN_PASSWORD_HASH="$2b$12$..."
JWT_SECRET="your-ultra-secure-random-secret-key-min-32-chars"
```

---

## 🛒 WhatsApp Checkout Flow

The website features an interactive shopping cart and checkout system tailored for Indian wholesale and retail buyers:
1. **Cart Store (`src/store/cart.ts`):** Client-side Zustand store persisted to `localStorage`. Validates and reconciles live product prices on load.
2. **Free Shipping Meter:** Dynamic progress bar calculating remaining value toward the ₹1,500 free shipping threshold.
3. **WhatsApp Order Generator:** During checkout, customer details (name, delivery address, phone, GSTIN, selected pack weights) are formatted into a clean, itemized WhatsApp message sent directly to Kanani Industries' sales desk.

---

## 📋 Production Placeholder Checklist

Before going live on your domain, replace the following placeholders with actual business details in [`src/config/site.ts`](file:///D:/Kanani%20Industries/src/config/site.ts), [`src/data/products.json`](file:///D:/Kanani%20Industries/src/data/products.json), and environment variables:

| Category | Item | Current Value / Location | Action Required |
|---|---|---|---|
| **Contact** | Phone Numbers | `+91 98250 12345`, `+91 94280 67890` (`siteConfig.contact.phone`) | Replace with active company phones |
| **Contact** | WhatsApp Number | `919825012345` (`siteConfig.contact.whatsapp`) | Replace with official WhatsApp Business number |
| **Contact** | Email Addresses | `info@kananiindustries.com`, `export@kananiindustries.com` | Verify domain mailbox is configured |
| **Address** | Facility Address | National Highway 27, Near Gondal APMC Market Yard, Gondal 360311 | Confirm plot/survey number |
| **Maps** | Google Maps Embed | Placeholder Google Maps URL in `src/app/contact/page.tsx` | Replace with exact Google Business Profile embed iframe |
| **Pricing** | Product Prices & MRP | Prices in `src/data/products.json` | Update with real current mandi rate and retail MRP |
| **Legal** | GSTIN & IEC Code | Sample GSTIN/IEC in `siteConfig.certifications` | Insert registered GSTIN and Import Export Code |
| **Legal** | FSSAI License No. | `src/config/site.ts` | Insert 14-digit FSSAI mill license number |
| **Security** | `JWT_SECRET` | Environment variable in `.env.local` | Set high-entropy 64-char secret in production |
| **Security** | `ADMIN_PASSWORD_HASH` | Environment variable in `.env.local` | Set custom bcrypt hash generated via `hash-password.mjs` |

---

## 📄 License & Attribution

- **Kanani Industries Logo:** Proprietary trademark of Kanani Industries, Gondal, Gujarat.
- **Stock Imagery:** Local high-resolution royalty-free photography documented in [`public/images/CREDITS.md`](file:///D:/Kanani%20Industries/public/images/CREDITS.md) (Unsplash License).
