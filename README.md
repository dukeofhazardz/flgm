# Forever Life and Grace Mission — Website

The official website of Forever Life and Grace Mission (FLGM), Resurrection
Ground, Gwarinpa, Abuja.

Built with Next.js 16 (App Router), React 19, Tailwind CSS 4, GSAP with
ScrollTrigger, and Lenis. All public copy lives in `/data`; the page components
only present it.

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
npm test        # time and Watch and Pray logic tests
```

Windows note: if PowerShell blocks `npm`, use `npm.cmd run dev`,
`npm.cmd run build`, and so on.

## Environment variables

Create `.env.local` for local development and set the same values in the
hosting project. Never commit secrets.

| Variable              | Required | Purpose                                                                 |
| --------------------- | -------- | ----------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`| No       | Canonical origin used by metadata, Open Graph URLs, `sitemap.xml` and `robots.txt`. Falls back to `https://flgm.vercel.app` until the production domain is confirmed. |
| `RESEND_API_KEY`      | For forms| Resend API key used by `/api/forms/[kind]`. Without it, forms report that email delivery is not connected and show the phone and WhatsApp lines. |
| `FORM_EMAIL_FROM`     | For forms| Verified sender address, e.g. `website@yourdomain.com`.                 |
| `FORM_EMAIL_TO`       | For forms| Recipient address(es), comma-separated for more than one inbox.          |

The three form variables must all be present before any submission is treated
as delivered. The site never fakes a success state.

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://your-production-domain.example
RESEND_API_KEY=re_xxxxxxxxx
FORM_EMAIL_FROM=website@your-production-domain.example
FORM_EMAIL_TO=office@your-production-domain.example
```

## Editing content

All public copy is typed data. Edit these files rather than page components:

| File | Contents |
| --- | --- |
| `data/church.ts` | Church name, tagline, identity line, address. |
| `data/contact.ts` | Enquiry lines, service times, visit steps, map query, social links. |
| `data/events.ts` | Events, confirmed flags, annual programme. |
| `data/giving.ts` | Account details, giving categories, building project copy. |
| `data/programmes.ts` | Weekly and monthly programmes. |
| `data/watchAndPray.ts` | Watch and Pray dates, themes, and programme structure. |
| `data/sermons.ts` | Sermon library and categories. |
| `data/forms.ts` | Form field labels and options. |
| `data/nav.ts` | Navigation items. |

Every public content item carries a `confirmed` flag. Unconfirmed items are
either hidden or rendered through `<Pending>` as a tasteful "Details coming
soon" state. Never invent a name, date, statistic, photograph, sermon title,
price, or opening time — the launch checklist lists what is still outstanding.

## Page structure

- `/` — home
- `/about` — identity, history, beliefs, leadership
- `/watch-and-pray` — fifty-day prayer and outreach
- `/sermons` — teaching library
- `/events` — calendar and annual programme
- `/give` — giving and the Church Building Project
- `/prayer` — prayer and counselling
- `/new-members` — visit registration and follow-up
- `/volunteer` — volunteer registration
- `/contact` — location, enquiry lines, map, message form
- `/privacy`, `/terms`, `/giving-policy`, `/safeguarding` — draft policies,
  noindexed until the church formally adopts them
- `/styleguide` — internal design QA, noindexed and disallowed in `robots.txt`

## SEO and metadata

- `lib/seo.ts` builds canonical URLs, Open Graph and Twitter metadata for every
  page from `NEXT_PUBLIC_SITE_URL`.
- Per-route `opengraph-image.tsx` files render 1200×630 brand artwork at build
  time with `next/og`.
- `app/sitemap.ts` and `app/robots.ts` are generated; draft policies are
  excluded from the sitemap.
- `app/icon.tsx` and `app/apple-icon.tsx` generate the arch favicon.
- `lib/structured-data.ts` publishes `Church` JSON-LD site-wide and `Event`
  JSON-LD for confirmed events only.

## Security headers

`next.config.ts` sets a Content Security Policy, HSTS (production only),
`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`,
`Permissions-Policy`, and `Cross-Origin-Opener-Policy`. `X-Powered-By` is
disabled.

## Deploying to Vercel

1. Push the repository to GitHub, GitLab, or Bitbucket.
2. In Vercel, **Add New → Project** and import the repository. The framework is
   detected as Next.js; the default build command (`next build`) is correct.
3. Add the environment variables from the table above to **Production** (and
   **Preview** if preview deployments should send form email).
4. Deploy. Verify the production domain, then set `NEXT_PUBLIC_SITE_URL` to that
   exact origin and redeploy so canonicals, Open Graph URLs, and the sitemap all
   point at the live domain.
5. Add the custom domain in **Settings → Domains**, enable HTTPS, and confirm
   `https://your-domain/robots.txt` and `/sitemap.xml` resolve.

Before going live, work through `LAUNCH_CHECKLIST.md` — in particular the
outstanding identity, leadership, media, maps, and payment approvals.

## Project conventions

See `AGENTS.md` and `DESIGN.md` for the non-negotiable rules: typefaces, palette,
motion (transform, opacity, and clip-path only), scrolling foundation, and the
data-confirmation discipline.
