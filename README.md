# Sidebase

**Find Your Next Income Stream.** — [sidebase.cc](https://sidebase.cc)

Sidebase matches people with online business ideas and side hustles that fit their skills, interests, budget and time. A free
7-question finder ranks 58 vetted opportunities and shows the top three; a one-time **$7.99** purchase unlocks the full report: the top ten
matches, each with a launch plan, tools, first-customer and first-sale guidance, common mistakes and ways to scale, plus a downloadable PDF.

- No accounts, no logins, no database server, no AI APIs, no subscriptions.
- Matching runs in the browser with deterministic, rules-based scoring.
- Payments run through Stripe Checkout, created and verified by Cloudflare Pages Functions. No secret ever reaches the browser.

---

## Contents

1. [Architecture](#architecture)
2. [Project structure](#project-structure)
3. [Local development](#local-development)
4. [Environment variables](#environment-variables)
5. [Stripe setup](#stripe-setup)
6. [Deploying to Cloudflare Pages](#deploying-to-cloudflare-pages)
7. [Stripe webhook configuration](#stripe-webhook-configuration)
8. [Testing payments (test mode)](#testing-payments-test-mode)
9. [Switching to live mode](#switching-to-live-mode)
10. [Before launch checklist](#before-launch-checklist)
11. [Editing content](#editing-content)

---

## Architecture

```
Browser (React SPA, static on Cloudflare Pages)
  │  Finder → scores 58 ideas locally (shared/scoring.ts) → free top-3 preview
  │
  ├─ POST /api/checkout ──────────► Pages Function ──► Stripe: create Checkout Session
  │      { answers, consent }        (answers stored in session metadata, $7.99 one-time)
  │
  │  … customer pays on checkout.stripe.com …
  │
  │                       Stripe ──► POST /api/stripe-webhook (signature verified)
  │                                    └─► KV "PURCHASES": session → paid (no personal data)
  │
  └─ GET /api/report?session_id=cs_… ► Pages Function
         1. Paid record in KV (written by the verified webhook)?  → build report
         2. Otherwise ask Stripe directly (secret key, server-side) → must be `paid`
         3. Refunded → 410. Unpaid → 402. Async payment processing → 202 (UI polls)
         → returns the top-10 report incl. paid-only content
```

**Why it is secure without accounts**

- The success-page redirect is never trusted. The report is only returned after the server confirms payment, either from a
  signature-verified webhook or by fetching the Checkout Session from Stripe with the secret key.
- The answers used to build the report come from the Checkout Session's metadata, so they cannot be swapped after payment.
- The paid content (`functions/_lib/content/*`) lives only in the Functions bundle and is never shipped to the browser. CI can
  confirm this: `grep -r "Download free footage from Pexels" dist/` returns nothing.
- Webhook signatures are verified with HMAC-SHA256, constant-time comparison and a 5-minute replay window.
- Full refunds (`charge.refunded`) revoke access.
- The Checkout Session ID works as the purchase reference. It is long, random and stored only in the buyer's browser and URL.

**Cost:** Cloudflare Pages, Functions and KV free tiers cover a lot of traffic. Stripe charges only per transaction.

## Project structure

```
shared/                 Used by both the browser and the Functions
  types.ts              Domain types
  questions.ts          The 7 questions, validation, compact answer encoding
  ideas.ts              Public catalog of 58 ideas (cost, time, difficulty, skills, model…)
  scoring.ts            Deterministic matching engine (weights + explanations)
  pricing.ts            The $7.99 price, single source of truth
functions/              Cloudflare Pages Functions (server side)
  api/checkout.ts       POST: creates the Stripe Checkout Session
  api/stripe-webhook.ts POST: verifies Stripe signatures, records purchases, handles refunds
  api/report.ts         GET: verifies payment and returns the full report
  api/health.ts         GET: shows configuration status (never values)
  _lib/                 Stripe client, signature verification, KV store, report builder
  _lib/content/         Paid-only report content for every idea (server only)
src/                    React app (Vite + TypeScript + Tailwind v4 + Framer Motion)
  pages/                Home, Finder, Results, Report, Explore, Idea, About, legal…
  components/           UI primitives, layout, home sections, report drawer
  lib/                  API client, storage, SEO, PDF generator, site config
public/                 Favicons, OG image, robots.txt, _headers, _redirects, manifest
tests/                  Vitest: scoring, encoding, content completeness, webhook signatures
scripts/                generate-assets.mjs renders the OG image and icons
```

## Local development

Requirements: **Node 20+** (22 recommended).

```bash
npm install
npm test            # unit tests
npm run dev         # frontend only, at http://localhost:5173
```

To run the full stack (frontend and Functions, with a local KV store):

```bash
cp .dev.vars.example .dev.vars     # then fill in your Stripe TEST keys
npm run pages:dev                  # http://localhost:8788
```

`npm run dev` proxies `/api/*` to `localhost:8788`, so you can run `pages:dev` in one terminal and `dev` in another to get hot reload
with working APIs.

Other scripts: `npm run typecheck`, `npm run build`, `npm run assets` (regenerate the OG image and icons).

## Environment variables

The **frontend has no environment variables**. Everything is server-side, configured in Cloudflare (or `.dev.vars` locally).
See [`.env.example`](.env.example).

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| `STRIPE_SECRET_KEY` | Secret | Yes | `sk_test_…` for testing, `sk_live_…` for production |
| `STRIPE_WEBHOOK_SECRET` | Secret | Yes | `whsec_…` signing secret of your webhook endpoint |
| `STRIPE_PRICE_ID` | Variable | No | `price_…` to use a Stripe Product/Price. If unset, an inline $7.99 USD price is used |
| `SITE_URL` | Variable | Recommended | `https://sidebase.cc`. Used for Stripe redirect URLs |
| `PURCHASES` | KV binding | Recommended | KV namespace recording verified purchases and refunds |

Without the `PURCHASES` binding, payments still work: `/api/report` then verifies each request directly with Stripe. Refund
revocation needs KV.

Check your configuration at any time: `https://sidebase.cc/api/health`.

## Stripe setup

1. Create or sign in to your Stripe account at [dashboard.stripe.com](https://dashboard.stripe.com).
2. **Business details:** complete account activation (business info, bank account) so you can accept live payments.
3. **Public details** (Settings → Business → Public details): set the business name *Sidebase*, the support email and the website
   `https://sidebase.cc`. Customers see these on Checkout and receipts.
4. **Branding** (Settings → Branding): upload `public/icon-512.png`, set the brand color `#38BDF8` and the accent `#080B12`.
5. **Receipts** (Settings → Customer emails): turn on *Successful payments* so buyers get an email receipt.
6. **Optional product/price:** Product catalog → Add product → "Sidebase Full Side Hustle Report", one-time **$7.99 USD**.
   Copy the `price_…` ID into `STRIPE_PRICE_ID`. Skip this to use the built-in inline price.
7. **Tax:** if you must collect sales tax or VAT, set up Stripe Tax, then add `automatic_tax[enabled]=true` in
   `functions/api/checkout.ts`.
8. **API keys** (Developers → API keys): copy the **secret** key. The publishable key is not needed, because Checkout is hosted
   by Stripe.

## Deploying to Cloudflare Pages

### 1. Create the Pages project

1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Select this GitHub repository and the production branch (`main`).
3. Build settings:
   - Framework preset: **None** (or Vite)
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: *(leave empty)*
   - Environment variable: `NODE_VERSION` = `22`
4. **Save and Deploy.** Cloudflare builds the site and deploys the `functions/` directory as Pages Functions automatically.

### 2. Create and bind the KV namespace

1. **Workers & Pages → KV → Create namespace**, named `sidebase-purchases`.
2. Pages project → **Settings → Bindings → Add → KV namespace**: variable name **`PURCHASES`**, namespace `sidebase-purchases`.
   Add it for both **Production** and **Preview**. You can use a separate namespace for preview.

### 3. Add variables and secrets

Pages project → **Settings → Variables and Secrets**, for the **Production** environment:

- `STRIPE_SECRET_KEY`: type **Secret**
- `STRIPE_WEBHOOK_SECRET`: type **Secret** (created in the next section)
- `SITE_URL` = `https://sidebase.cc`
- `STRIPE_PRICE_ID` *(optional)*

For **Preview** deployments, use your **test-mode** keys.

Redeploy after changing variables (Deployments → ⋯ → Retry deployment).

### 4. Custom domain

Pages project → **Custom domains → Set up a custom domain** → `sidebase.cc` (and optionally `www.sidebase.cc`). If the domain's DNS
is on Cloudflare this is automatic. Otherwise, follow the CNAME instructions.

### 5. Email

The site lists `hello@sidebase.cc` (configurable in `src/lib/site.ts`). With DNS on Cloudflare, **Email Routing** can forward it to
your inbox for free.

### Deploying from the CLI (alternative)

```bash
npx wrangler login
npm run pages:deploy
```

Every push to GitHub also runs CI (typecheck, tests, build) via `.github/workflows/ci.yml`.

## Stripe webhook configuration

1. Stripe dashboard → **Developers → Webhooks → Add endpoint**.
2. Endpoint URL: `https://sidebase.cc/api/stripe-webhook`
3. Select these events:
   - `checkout.session.completed`
   - `checkout.session.async_payment_succeeded`
   - `charge.refunded`
4. Create it, then reveal the **Signing secret** (`whsec_…`) and save it as `STRIPE_WEBHOOK_SECRET` in Cloudflare.
5. Redeploy, then use **Send test event** in Stripe. The endpoint answers `200` for valid signatures and `400` for invalid ones.

Test mode and live mode have **separate** webhook endpoints and signing secrets. Create one in each.

## Testing payments (test mode)

1. Turn on **Test mode** in the Stripe dashboard and use your `sk_test_…` key.
2. Locally, forward webhooks with the [Stripe CLI](https://docs.stripe.com/stripe-cli):
   ```bash
   stripe listen --forward-to localhost:8788/api/stripe-webhook
   ```
   Put the printed `whsec_…` into `.dev.vars` as `STRIPE_WEBHOOK_SECRET`, then run `npm run pages:dev`.
3. Complete the finder, tick the consent box and click **Unlock My Full Report →**.
4. Pay with test card **4242 4242 4242 4242**, any future expiry, any CVC and any postal code.
5. You are redirected to `/report?session_id=cs_test_…`. The page verifies the payment and unlocks the report.
6. Other useful test cards: `4000 0000 0000 9995` (declined), `4000 0025 0000 3155` (3-D Secure).
7. Test a refund: refund the payment in the dashboard. After the `charge.refunded` webhook, the report returns "unavailable".

## Switching to live mode

1. Activate your Stripe account (business and bank details).
2. In live mode, copy the **live** secret key (`sk_live_…`).
3. Create the **live** webhook endpoint (same URL and events) and copy its live `whsec_…`.
4. If you use `STRIPE_PRICE_ID`, create the product in live mode and use the **live** `price_…`.
5. Update the Production secrets in Cloudflare and redeploy.
6. Check that `https://sidebase.cc/api/health` shows `"mode":"live"`, `"webhook":true` and `"purchasesStore":true`.
7. Make one real purchase, then refund it to confirm the full loop.

## Before launch checklist

- [ ] Fill in `src/lib/site.ts`: `operator` (legal business name), `governingLaw`, `email`, `lastUpdated`.
- [ ] Have the Terms, Privacy and Refund pages reviewed for your jurisdiction. They are a solid starting point, not legal advice.
- [ ] Set up email forwarding for the support address.
- [ ] Configure Stripe public details, branding and receipts (see [Stripe setup](#stripe-setup)).
- [ ] Decide on sales tax or VAT collection (Stripe Tax).
- [ ] Bind KV, add secrets, create the webhook, and confirm `/api/health`.
- [ ] Submit `https://sidebase.cc/sitemap.xml` in Google Search Console.
- [ ] Optional: enable cookieless **Cloudflare Web Analytics** for the Pages project.

## Editing content

- **Ideas (public):** `shared/ideas.ts`. Each idea has realistic costs, hours, difficulty, skills, goals and work styles. The
  sitemap regenerates automatically on build.
- **Report content (paid):** `functions/_lib/content/*.ts`, one entry per idea ID. `npm test` fails if any idea is missing content.
- **Scoring weights:** `WEIGHTS` in `shared/scoring.ts`. The About page shows them automatically.
- **Price:** `shared/pricing.ts` (and `STRIPE_PRICE_ID` if you use one).
- **OG image and icons:** edit `scripts/generate-assets.mjs`, then run `npm run assets`.

Sidebase makes no income claims. Keep it that way when adding content: describe realistic ranges, never guaranteed earnings.
