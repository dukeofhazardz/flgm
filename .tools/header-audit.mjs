// Header / live strip / mobile menu / footer credit audit.
// Usage: node .tools/header-audit.mjs
import { launch, newPage, setup, go, shot, evaluate, sleep } from "./cdp.mjs";

const BASE = "http://localhost:3000";

const chrome = await launch({ headless: true });
const page = await newPage();
const errors = [];
page.on((m) => {
  if (m.method === "Runtime.exceptionThrown") {
    errors.push({
      kind: "exception",
      text:
        m.params.exceptionDetails.exception?.description ??
        m.params.exceptionDetails.text,
    });
  }
  if (m.method === "Runtime.consoleAPICalled" && m.params.type === "error") {
    errors.push({
      kind: "console",
      text: m.params.args.map((a) => a.value ?? a.description).join(" "),
    });
  }
});

const move = (x, y) => page.send("Input.dispatchMouseEvent", { type: "mouseMoved", x, y });
const clickAt = async (x, y) => {
  await move(x, y);
  await page.send("Input.dispatchMouseEvent", {
    type: "mousePressed",
    x,
    y,
    button: "left",
    clickCount: 1,
  });
  await page.send("Input.dispatchMouseEvent", {
    type: "mouseReleased",
    x,
    y,
    button: "left",
    clickCount: 1,
  });
};

const centre = async (selector, index = 0) =>
  evaluate(
    page,
    `(() => {
      const els = [...document.querySelectorAll(${JSON.stringify(selector)})];
      const el = els[${index}];
      if (!el) return null;
      el.scrollIntoView({ block: "center", behavior: "instant" });
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return null;
      return { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2) };
    })()`
  );

const waitReady = async () => {
  for (let i = 0; i < 80; i++) {
    const ok = await evaluate(
      page,
      `!!document.querySelector('header[data-header]') && !document.querySelector('[data-pre-root]')`
    );
    if (ok) return;
    await sleep(150);
  }
  throw new Error("page never became ready");
};

const snapshot = () =>
  evaluate(
    page,
    `(() => {
      const header = document.querySelector("header[data-header]");
      if (!header) return { missing: true };
      const bar = header.firstElementChild;
      const strip = header.children[1] ?? null;
      const barCS = getComputedStyle(bar);
      const stripCS = strip ? getComputedStyle(strip) : null;
      const primary = header.querySelector('nav[aria-label="Primary"]');
      const links = primary ? [...primary.querySelectorAll("a")] : [];
      const active = links.find(
        (a) => a.getAttribute("href") === (location.pathname === "/" ? "/" : location.pathname)
      );
      const inactive = links.find((a) => a !== active) ?? null;
      const clock = [...header.querySelectorAll("span")].find((s) =>
        /^\\d{2}:\\d{2}/.test((s.textContent || "").trim())
      );
      const cta = [...header.querySelectorAll('a[href="/contact"]')].find(
        (a) => !a.closest("#connect-menu")
      );
      const underline = active
        ? [...active.querySelectorAll('span[aria-hidden="true"]')].find((s) =>
            /h-\\[2px\\]/.test(s.className)
          )
        : null;
      const rect = header.getBoundingClientRect();
      const topEl = document.elementFromPoint(700, 8);
      const menu = document.querySelector("#mobile-menu");
      return {
        url: location.pathname,
        scrollY: Math.round(window.scrollY),
        theme: header.dataset.theme,
        headerTop: Math.round(rect.top),
        hidden: rect.top < -1,
        barBg: barCS.backgroundColor,
        barBorder: barCS.borderBottomColor,
        barBackdrop: barCS.backdropFilter,
        barOpacity: barCS.opacity,
        headerZ: getComputedStyle(header).zIndex,
        stripBg: stripCS ? stripCS.backgroundColor : null,
        stripText: stripCS ? stripCS.color : null,
        nav: inactive ? getComputedStyle(inactive).color : null,
        navActive: active ? getComputedStyle(active).color : null,
        underline: underline ? getComputedStyle(underline).backgroundColor : null,
        clock: clock ? getComputedStyle(clock).color : null,
        ctaBg: cta ? getComputedStyle(cta).backgroundColor : null,
        ctaColor: cta ? getComputedStyle(cta).color : null,
        headerIsTopmost: !!(topEl && header.contains(topEl)),
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        lenis: window.__lenis ? { stopped: window.__lenis.isStopped } : null,
        menu: menu
          ? {
              ariaHidden: menu.getAttribute("aria-hidden"),
              top: Math.round(menu.getBoundingClientRect().top),
              opacity: getComputedStyle(menu).opacity,
            }
          : null,
      };
    })()`
  );

const problems = [];
const check = (label, snap, expectedTheme) => {
  const pure =
    snap.barBg === "rgba(0, 0, 0, 0)" || snap.barBg === "rgb(255, 255, 255)";
  if (!pure) problems.push(`${label}: header background ${snap.barBg} (not transparent/solid white)`);
  if (snap.barBackdrop !== "none") problems.push(`${label}: backdrop-filter ${snap.barBackdrop}`);
  if (!snap.headerIsTopmost) problems.push(`${label}: header is not topmost at (700,8)`);
  if (snap.scrollWidth > snap.clientWidth)
    problems.push(`${label}: horizontal overflow ${snap.scrollWidth} > ${snap.clientWidth}`);
  if (expectedTheme && snap.theme !== expectedTheme)
    problems.push(`${label}: theme ${snap.theme}, expected ${expectedTheme}`);
  const stripOk =
    snap.stripBg === null ||
    (snap.theme === "dark"
      ? snap.stripBg === "rgb(4, 24, 15)"
      : snap.stripBg === "rgb(242, 248, 243)");
  if (!stripOk) problems.push(`${label}: live strip ${snap.stripBg} in ${snap.theme} state`);
};

const report = { desktop: [], mobile: [], history: {}, footer: {}, console: errors };

try {
  // ── Desktop 1440 ────────────────────────────────────────────────────────
  await setup(page, { width: 1440, height: 900 });
  await go(page, BASE + "/");
  await waitReady();
  await sleep(700);

  const clickRoute = async (route, label, { viaConnect = false } = {}) => {
    if (viaConnect) {
      const btn = await centre('header button[aria-controls="connect-menu"]');
      if (!btn) throw new Error("no connect button");
      await clickAt(btn.x, btn.y);
      await sleep(320);
    }
    const target = viaConnect
      ? await centre(`#connect-menu a[href="${route}"]`)
      : await centre(`header nav[aria-label="Primary"] a[href="${route}"]`);
    if (!target) throw new Error(`no clickable link for ${route}`);
    await clickAt(target.x, target.y);

    const at0 = await snapshot();
    await sleep(150);
    const mid = await snapshot();
    await shot(page, `.shots/audit/${label}-150ms.png`);
    await sleep(800);
    const settled = await snapshot();
    await sleep(500);
    const later = await snapshot();

    // Header must slide away on downward scroll then return on upward scroll.
    await evaluate(page, "window.scrollTo({top:600,behavior:'instant'})");
    await sleep(900);
    const down = await snapshot();
    await evaluate(page, "window.scrollTo({top:0,behavior:'instant'})");
    await sleep(900);
    const up = await snapshot();

    report.desktop.push({ label, route, at0, mid, settled, later, down, up });
    return { settled, down, up };
  };

  const routes = [
    ["/about", "about"],
    ["/watch-and-pray", "watch"],
    ["/sermons", "sermons"],
    ["/events", "events"],
    ["/give", "give"],
    ["/", "home"],
  ];
  for (const [route, label] of routes) {
    const r = await clickRoute(route, label);
    check(`desktop ${label} settled`, r.settled, route === "/" ? "dark" : "dark");
    check(`desktop ${label} after-scroll-up`, r.up, route === "/" ? "dark" : "dark");
  }

  for (const [route, label] of [
    ["/prayer", "prayer"],
    ["/new-members", "new-members"],
    ["/volunteer", "volunteer"],
    ["/contact", "contact"],
  ]) {
    const r = await clickRoute(route, label, { viaConnect: true });
    check(`desktop ${label} settled`, r.settled, "dark");
  }

  // Policy pages are solid-light from the first pixel.
  await go(page, BASE + "/privacy");
  await waitReady();
  await sleep(700);
  const policy = await snapshot();
  await shot(page, ".shots/audit/privacy-1440-top.png");
  check("desktop privacy", policy, "light");
  report.desktop.push({ label: "privacy", route: "/privacy", settled: policy });

  // Footer credit geometry on desktop.
  await evaluate(page, "window.scrollTo({top:document.body.scrollHeight,behavior:'instant'})");
  await sleep(1200);
  report.footer.desktop = await evaluate(
    page,
    `(() => {
      const copy = [...document.querySelectorAll("footer p")].find((p) => p.textContent.includes("©"));
      const credit = [...document.querySelectorAll("footer p")].find((p) => p.textContent.includes("Dukehouse"));
      const policies = document.querySelector('footer nav[aria-label="Policies"]');
      const rect = (el) => el ? el.getBoundingClientRect() : null;
      const c = rect(copy), cr = rect(credit), p = rect(policies);
      const style = (el) => {
        const s = getComputedStyle(el);
        return { font: s.fontFamily, size: s.fontSize, weight: s.fontWeight, tracking: s.letterSpacing, transform: s.textTransform, color: s.color };
      };
      return {
        sameRow: !!c && !!cr && Math.abs(c.top - cr.top) < 2,
        creditAfterCopy: !!c && !!cr && cr.left > c.right,
        policiesSameRow: !!cr && !!p && Math.abs(cr.top - p.top) < 2,
        copy: c && { top: Math.round(c.top), left: Math.round(c.left), right: Math.round(c.right) },
        credit: cr && { top: Math.round(cr.top), left: Math.round(cr.left), right: Math.round(cr.right) },
        policies: p && { top: Math.round(p.top), left: Math.round(p.left) },
        copyStyle: copy && style(copy),
        creditStyle: credit && style(credit),
        policiesStyle: policies && style(policies.querySelector("a") || policies),
      };
    })()`
  );

  // ── History + logo ──────────────────────────────────────────────────────
  await go(page, BASE + "/events");
  await waitReady();
  await clickRoute("/about", "history-a").catch(() => {});
  await evaluate(page, "history.back()");
  await sleep(1400);
  report.history.back = await snapshot();
  check("desktop history back", report.history.back, "dark");
  await evaluate(page, "history.forward()");
  await sleep(1400);
  report.history.forward = await snapshot();
  check("desktop history forward", report.history.forward, "dark");

  const logo = await centre('header a[aria-label*="home"]');
  if (logo) {
    await clickAt(logo.x, logo.y);
    await sleep(1400);
    report.history.logo = await snapshot();
    check("desktop logo click", report.history.logo, "dark");
  }

  // ── Mobile 390 ──────────────────────────────────────────────────────────
  await setup(page, { width: 390, height: 844, mobile: true, dpr: 2 });
  await go(page, BASE + "/");
  await waitReady();
  await sleep(700);

  const menuAt = await snapshot();
  check("mobile home top", menuAt, "dark");

  const open = await centre('header button[aria-controls="mobile-menu"]');
  await clickAt(open.x, open.y);
  await sleep(700);
  const menuOpen = await snapshot();
  await shot(page, ".shots/audit/mobile-menu-open.png");
  report.mobile.push({ step: "open", ...menuOpen });
  if (menuOpen.menu?.ariaHidden !== "false") problems.push("mobile: menu did not open");
  if (menuOpen.lenis && menuOpen.lenis.stopped !== true)
    problems.push("mobile: Lenis was not stopped while the menu was open");

  const close = await centre('header button[aria-controls="mobile-menu"]');
  await clickAt(close.x, close.y);
  await sleep(800);
  const menuClosed = await snapshot();
  await shot(page, ".shots/audit/mobile-menu-closed.png");
  report.mobile.push({ step: "close", ...menuClosed });
  check("mobile menu closed", menuClosed, "dark");
  if (menuClosed.menu?.ariaHidden !== "true") problems.push("mobile: menu did not close");
  if (menuClosed.lenis && menuClosed.lenis.stopped !== false)
    problems.push("mobile: Lenis stayed stopped after the menu closed");

  // Scroll must still work after closing the menu.
  await evaluate(page, "window.scrollTo({top:500,behavior:'instant'})");
  await sleep(900);
  const scrolled = await snapshot();
  if (scrolled.scrollY < 300) problems.push(`mobile: scroll did not move (y=${scrolled.scrollY})`);
  if (scrolled.scrollWidth > scrolled.clientWidth)
    problems.push("mobile: horizontal overflow after scroll");

  // Menu navigation to a light page, then back to a dark one.
  await evaluate(page, "window.scrollTo({top:0,behavior:'instant'})");
  await sleep(600);
  const open2 = await centre('header button[aria-controls="mobile-menu"]');
  await clickAt(open2.x, open2.y);
  await sleep(650);
  const privacyLink = await centre('#mobile-menu a[href="/privacy"]');
  if (privacyLink) {
    await clickAt(privacyLink.x, privacyLink.y);
    await sleep(1600);
    const mobilePrivacy = await snapshot();
    await shot(page, ".shots/audit/mobile-privacy.png");
    report.mobile.push({ step: "privacy", ...mobilePrivacy });
    check("mobile privacy", mobilePrivacy, "light");
    if (mobilePrivacy.menu?.ariaHidden !== "true")
      problems.push("mobile: menu stayed open after navigating");
    if (mobilePrivacy.scrollY !== 0)
      problems.push(`mobile: route did not reset to top (y=${mobilePrivacy.scrollY})`);

    await evaluate(page, "window.scrollTo({top:document.body.scrollHeight,behavior:'instant'})");
    await sleep(1200);
    report.footer.mobile = await evaluate(
      page,
      `(() => {
        const copy = [...document.querySelectorAll("footer p")].find((p) => p.textContent.includes("©"));
        const credit = [...document.querySelectorAll("footer p")].find((p) => p.textContent.includes("Dukehouse"));
        const rect = (el) => el ? el.getBoundingClientRect() : null;
        const c = rect(copy), cr = rect(credit);
        return {
          ownLine: !!c && !!cr && cr.top > c.bottom,
          insideViewport: !!cr && cr.left >= 0 && cr.right <= document.documentElement.clientWidth,
          copy: c && { top: Math.round(c.top), bottom: Math.round(c.bottom) },
          credit: cr && { top: Math.round(cr.top), bottom: Math.round(cr.bottom), left: Math.round(cr.left), right: Math.round(cr.right) },
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
        };
      })()`
    );
    if (!report.footer.mobile.ownLine) problems.push("mobile: credit is not on its own line");
    if (!report.footer.mobile.insideViewport) problems.push("mobile: credit overflows the viewport");
  }
} catch (error) {
  problems.push("AUDIT ERROR: " + String(error?.stack || error));
} finally {
  report.problems = problems;
  report.console = errors;
  console.log(JSON.stringify(report, null, 2));
  page.close();
  chrome.child.kill();
}
