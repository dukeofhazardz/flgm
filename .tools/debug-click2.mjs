import { launch, newPage, setup, go, evaluate, sleep } from "./cdp.mjs";

const chrome = await launch({ headless: true });
const page = await newPage();
await setup(page, { width: 1440, height: 900 });
await go(page, "http://localhost:3000/");
await sleep(1200);

const pos = await evaluate(
  page,
  `(() => {
    const el = [...document.querySelectorAll('header a[href="/events"]')][0];
    const r = el.getBoundingClientRect();
    return { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2) };
  })()`
);

await evaluate(
  page,
  `(() => {
    window.__clicks = [];
    document.addEventListener("click", (e) => {
      window.__clicks.push({
        detail: e.detail,
        prevented: e.defaultPrevented,
        targetTag: e.target?.tagName,
        targetHtml: String(e.target?.outerHTML || e.target?.nodeName).slice(0, 120),
        path: e.composedPath().slice(0, 5).map((n) => n.tagName || n.nodeName),
      });
    }, true);
    return true;
  })()`
);

await page.send("Input.dispatchMouseEvent", { type: "mouseMoved", x: pos.x, y: pos.y, button: "none" });
await sleep(150);
await page.send("Input.dispatchMouseEvent", { type: "mousePressed", x: pos.x, y: pos.y, button: "left", buttons: 1, clickCount: 1 });
await sleep(60);
await page.send("Input.dispatchMouseEvent", { type: "mouseReleased", x: pos.x, y: pos.y, button: "left", buttons: 0, clickCount: 1 });
await sleep(250);

const s1 = await evaluate(
  page,
  `({ clicks: window.__clicks, phase: document.querySelector("[data-wipe-phase]")?.dataset.wipePhase, url: location.pathname, title: document.title })`
);
await sleep(1500);
const s2 = await evaluate(page, `({ url: location.pathname, title: document.title, phase: document.querySelector("[data-wipe-phase]")?.dataset.wipePhase })`);

console.log(JSON.stringify({ pos, s1, s2 }, null, 2));
page.close();
chrome.child.kill();
