import { launch, newPage, setup, go, evaluate, sleep } from "./cdp.mjs";

const chrome = await launch({ headless: true });
const page = await newPage();
await setup(page, { width: 1440, height: 900 });
await go(page, "http://localhost:3000/");
await sleep(1200);

await evaluate(
  page,
  `(() => {
    window.__log = [];
    for (const t of ["mousedown", "mouseup", "click", "pointerdown", "pointerup"]) {
      document.addEventListener(t, (e) => window.__log.push(t + ":" + (e.target?.tagName || "?") + ":" + e.detail), true);
    }
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

// variant A: no buttons field, no pause
await page.send("Input.dispatchMouseEvent", { type: "mouseMoved", x: pos.x, y: pos.y });
await page.send("Input.dispatchMouseEvent", { type: "mousePressed", x: pos.x, y: pos.y, button: "left", clickCount: 1 });
await page.send("Input.dispatchMouseEvent", { type: "mouseReleased", x: pos.x, y: pos.y, button: "left", clickCount: 1 });
await sleep(300);
const a = await evaluate(page, `({ log: window.__log, phase: document.querySelector("[data-wipe-phase]")?.dataset.wipePhase, url: location.pathname })`);

// variant B: with buttons fields, 60ms gap
await evaluate(page, "window.__log = []");
await page.send("Input.dispatchMouseEvent", { type: "mouseMoved", x: pos.x, y: pos.y });
await page.send("Input.dispatchMouseEvent", { type: "mousePressed", x: pos.x, y: pos.y, button: "left", buttons: 1, clickCount: 1 });
await sleep(60);
await page.send("Input.dispatchMouseEvent", { type: "mouseReleased", x: pos.x, y: pos.y, button: "left", buttons: 0, clickCount: 1 });
await sleep(300);
const b = await evaluate(page, `({ log: window.__log, phase: document.querySelector("[data-wipe-phase]")?.dataset.wipePhase, url: location.pathname })`);

console.log(JSON.stringify({ pos, a, b }, null, 2));
page.close();
chrome.child.kill();
