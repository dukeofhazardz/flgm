# LAUNCH_CHECKLIST.md — FLGM Website

**Internal document. Nothing in this file may be published on the public site.**
It contains the outstanding confirmations behind `content.md` §16, plus the
operational checks that must pass before launch.

**Owner:** Church Executive Secretary, with the Chief Pastor's final approval.
**Last reviewed:** 4 November 2026.

---

## 1. What is already in place

- [x] Production build succeeds and ESLint is clean.
- [x] Every public route has a canonical URL, Open Graph and Twitter metadata.
- [x] Brand Open Graph images generated per route; arch favicon and Apple icon.
- [x] `sitemap.xml` and `robots.txt` generated; `/styleguide` and `/api/` disallowed.
- [x] `Church` JSON-LD site-wide; `Event` JSON-LD for confirmed events only.
- [x] Security headers: CSP, HSTS (production), nosniff, frame denial,
      referrer policy, permissions policy, COOP; `X-Powered-By` disabled.
- [x] Draft Privacy, Terms, Giving, and Safeguarding policies published,
      noindexed, and excluded from the sitemap.
- [x] Forms fail closed: without `RESEND_API_KEY`, `FORM_EMAIL_FROM`, and
      `FORM_EMAIL_TO`, a submission is never reported as sent.
- [x] Unconfirmed content hidden or shown as "Details coming soon".

---

## 2. §16 — Information to confirm before launch

Every row is a launch blocker. Tick only when the evidence is attached to the
launch record.

| # | Item | Status | Evidence required |
| --- | --- | --- | --- |
| 1 | Official church logo | **Required** | Approved vector or high-resolution transparent artwork. The current white-ground raster is a placeholder. |
| 2 | Founding year and historical milestones | **Required** | Chief Pastor's written confirmation of the year and the milestones that may be published. |
| 3 | Chief Pastor's name, biography, and photograph | **Required** | Signed-off name, short biography, and a photograph with permission to publish. |
| 4 | Approved doctrinal statement | **Required** | The statement approved by the Chief Pastor, replacing the proposed summary. |
| 5 | Complete leadership directory | **Required** | Names, titles, responsibilities, and photographs, each approved by the individuals named. |
| 6 | YouTube channel URL | **Required** | The official channel URL. Until then the YouTube item stays hidden. |
| 7 | Watch and Pray daily themes | **Schedule needed** | The official daily theme list for 11 November – 30 December 2026. |
| 8 | Carol Service time | **To be confirmed** | Time and venue for 17 December 2026. Remains "Details coming soon". |
| 9 | First Fruit Worship daily schedule | **To be confirmed** | Daily schedule for 31 December 2026 – 8 January 2027, including the corrected end date. |
| 10 | Church building project approved images | **Required** | Approved images. Anything unbuilt must stay labelled "Architectural concept". |
| 11 | Google Maps church pin | **Requires verification** | Confirm the pin and the correct entrance before removing the unverified state. |
| 12 | Secure payment gateway | **Requires approval and integration** | Written approval, integration, and a tested end-to-end flow. No checkout may be presented before then. |
| 13 | Website hosting and domain | **To be confirmed** | Domain, DNS access, SSL, and backup ownership recorded. |
| 14 | Privacy and safeguarding policies | **Required before collecting personal data** | Formal adoption by the church, a named safeguarding lead, and a published reporting route. |

---

## 3. Giving account re-verification

The account shown on `/give` and in the footer must be re-verified in person
with the church's finance signatories before launch and at every details change.

- [ ] Confirm the account name exactly: **Forever Life And Grace Mission**.
- [ ] Confirm the bank: **Moniepoint MFB**.
- [ ] Confirm the account number: **6023762744**.
- [ ] Confirm the account is the church's official receiving account and is
      still open.
- [ ] Confirm who may authorise a change of account details, and record it.
- [ ] Make a small test transfer and confirm the credit appears in the church's
      statement.
- [ ] Confirm no payment gateway, card checkout, or USSD flow is described as
      live anywhere on the site.
- [ ] Agree the wording for reporting a transfer made in error.
- [ ] Re-check the published details against the footer and `/give` after any
      update.

**Do not publish a second account, a personal account, or a "new" account sent
by message without in-person verification with a known signatory.**

---

## 4. Name and identity approvals

Publishing a person's name is a separate approval from publishing the church's
copy. Record each approval.

- [ ] Chief Pastor — full name, title, biography, and photograph approved.
- [ ] Leadership directory — every name, title, and photograph approved by the
      person named.
- [ ] Department and ministry leaders — approved by the Executive Secretary.
- [ ] Watch and Pray Media Team names — approved for publication.
- [ ] Testimonies — written consent for the words and the attribution.
- [ ] Photographs — permission recorded for every image, including children.
- [ ] Social handles — confirm the official Instagram, Facebook, and TikTok
      accounts, and the YouTube channel once supplied.
- [ ] Confirm the public church name, identity line, and tagline are exactly:
      **Forever Life and Grace Mission**, **A House of Grace. A People of
      Purpose.**, **We Get Better Every Day!**

---

## 5. Programme and event confirmations

- [ ] Confirm Sunday Sonship and Victory Ministry at 8:00 AM.
- [ ] Confirm Sunday Combined Celebration Service at 9:30 AM.
- [ ] Confirm Thursday Prophetic Prayer and Faith Building at 5:45 PM.
- [ ] Resolve the Alpha Worship time (the source material gives conflicting
      times) and confirm the first-Thursday rhythm.
- [ ] Confirm Watch and Pray runs 11 November – 30 December 2026, daily at
      5:30 AM WAT.
- [ ] Confirm the Business and Career Summit on 28 November 2026 at 10:00 AM.
- [ ] Confirm the Annual Harvest Thanksgiving, Building Fundraising and
      Ordination Service on 5 December 2026 at 10:00 AM.
- [ ] Confirm the Carol Service time (17 December 2026).
- [ ] Confirm First Fruit Worship (31 December 2026 – 8 January 2027).
- [ ] Confirm House Fellowship details before removing "Time to be confirmed".
- [ ] Re-check every calendar download after any time change.

---

## 6. Forms, privacy, and safeguarding

- [ ] Set `RESEND_API_KEY`, `FORM_EMAIL_FROM`, and `FORM_EMAIL_TO` in the
      hosting project and send one test of each form.
- [ ] Confirm the receiving inbox is monitored by the right team.
- [ ] Agree who may read prayer and counselling submissions.
- [ ] Confirm the retention period for form submissions and who deletes them.
- [ ] Confirm the safeguarding lead and the reporting route, then update the
      draft Safeguarding policy.
- [ ] Have the Privacy, Terms, and Giving policies reviewed and formally
      adopted; remove the draft note and the noindex directive only after that.
- [ ] Confirm the church's official email address before publishing one. The
      site currently publishes phone lines only.

---

## 7. Technical launch checks

- [ ] Set `NEXT_PUBLIC_SITE_URL` to the live origin and redeploy.
- [ ] Confirm HTTPS and the HSTS header on the production domain.
- [ ] Confirm `/robots.txt` and `/sitemap.xml` use the live domain.
- [ ] Confirm the sitemap contains only public pages (no policies, no styleguide).
- [ ] Confirm `/privacy`, `/terms`, `/giving-policy`, and `/safeguarding` return
      `noindex` and are absent from the sitemap.
- [ ] Confirm each route's Open Graph image loads at 1200×630.
- [ ] Validate the `Church` and `Event` structured data.
- [ ] Confirm the favicon and Apple touch icon appear on a real device.
- [ ] Confirm the map embed loads and the directions link opens the right place.
- [ ] Confirm no console errors and no CSP violations on every page.
- [ ] Confirm the header has exactly two states and no grey-green tint at any
      width, including mid-transition.
- [ ] Confirm the site scrolls by wheel, trackpad, keyboard, and touch, and that
      `scrollWidth <= clientWidth` at 360, 768, 1440, and 1920 px.
- [ ] Confirm the site is usable with reduced motion enabled.
- [ ] Test on a real Android phone and a real iPhone, not only a desktop
      emulator.
- [ ] Record the rollback deployment in Vercel before announcing the launch.

---

## 8. Final approval and launch

- [ ] Chief Pastor reviews the site in full and approves publication.
- [ ] Executive Secretary signs off this checklist with dates and evidence.
- [ ] Launch announcement approved (site, social, WhatsApp).
- [ ] Monitor forms, uptime, and analytics-free error reports for the first 48
      hours.
- [ ] Schedule the first post-launch content review at 30 days: events, sermon
      library, giving details, and policy status.

---

## 9. Deliberately not published

These remain internal and must never appear on the public site: anything
starting "Editorial note", "Important", "Technical note", "Note:", "Website
development notes", the readiness checklist, the Date Correction block, the
website implementation recommendation, the Executive Secretary responsibility
table, `x-apple-data-detectors` links, image source links, and tool-style button
labels such as "Prepare Enquiry", "Prepare Registration", or "Copy Checklist".
