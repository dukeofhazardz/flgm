import { launch, newPage, setup, go, evaluate, sleep } from "./cdp.mjs";

const chrome = await launch({ headless: true });
const page = await newPage();
const errors = [];
page.on((m) => {
  if (m.method === "Runtime.exceptionThrown") {
    errors.push(m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text);
  }
});
await setup(page, { width: 1440, height: 900 });
await go(page, "http://localhost:3000/");
await sleep(1000);

await evaluate(
  page,
  `(() => {
    window.__clicks = [];
    document.addEventListener("click", (e) => {
      const a = e.target.closest && e.target.closest("a");
      window.__clicks.push({
        detail: e.detail,
        prevented: e.defaultPrevented,
        href: a ? a.getAttribute("href") : null,
      });
    }, true);
    return true;
  })()`
);

const pos = await evaluate(
  page,
  `(() => {
    const el = [...document.querySelectorAll('header a[href="/events"]')][0];
    const r = el.getBoundingClientRect();
    return { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2) };
  })()`
);

await page.send("Input.dispatchMouseEvent", { type: "mouseMoved", x: pos.x, y: pos.y, button: "none" });
await sleep(120);
await page.send("Input.dispatchMouseEvent", { type: "mousePressed", x: pos.x, y: pos.y, button: "left", clickCount: 1 });
await page.send("Input.dispatchMouseEvent", { type: "mouseReleased", x: pos.x, y: pos.y, button: "left", clickCount: 1 });
await sleep(220);

const clickState = await evaluate(
  page,
  `({ clicks: window.__clicks, phase: document.querySelector("[data-wipe-phase]")?.dataset.wipePhase, url: location.pathname })`
);

// Parallax health
await evaluate(page, "window.scrollTo({top:2500,behavior:'instant'})");
await sleep(900);
const triggers = await evaluate(
  page,
  `(() => {
    const ST = window.ScrollTrigger;
    const all = ST ? ST.getAll() : [];
    const parallax = [...document.querySelectorAll("[data-parallax-max]")].slice(0, 3).map((el) => {
      const m = new DOMMatrixReadOnly(getComputedStyle(el).transform);
      return {
        y: +m.m42.toFixed(2),
        top: Math.round(el.getBoundingClientRect().top + window.scrollY),
        parents: (() => {
          let p = el.parentElement, n = 0;
          while (p && n < 6) { p = p.parentElement; n++; }
          return n;
        })(),
      };
    });
    return {
      hasScrollTriggerGlobal: !!ST,
      triggerCount: all.length,
      parallax,
      opacityOfFirst: getComputedStyle(document.querySelector("[data-parallax-max]")).opacity,
    };
  })()`
);

console.log(JSON.stringify({ clickState, triggers, errors }, null, 2));
page.close();
chrome.child.kill();
