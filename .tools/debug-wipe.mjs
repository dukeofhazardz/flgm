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
    window.__trace = [];
    const t0 = performance.now();
    window.__t0 = t0;
    const root = document.querySelector("[data-wipe-phase]");
    const sheet = root.firstElementChild;
    window.__sheet = sheet;
    new MutationObserver(() => {
      window.__trace.push({
        t: Math.round(performance.now() - t0),
        phase: root.dataset.wipePhase,
        y: getComputedStyle(sheet).transform,
        path: location.pathname,
      });
    }).observe(root, { attributes: true, attributeFilter: ["data-wipe-phase"] });
    window.__sample = () => ({
      t: Math.round(performance.now() - t0),
      phase: root.dataset.wipePhase,
      transform: getComputedStyle(sheet).transform,
      path: location.pathname,
    });
    return true;
  })()`
);

await page.send("Input.dispatchMouseEvent", { type: "mouseMoved", x: pos.x, y: pos.y });
await page.send("Input.dispatchMouseEvent", { type: "mousePressed", x: pos.x, y: pos.y, button: "left", clickCount: 1 });
await page.send("Input.dispatchMouseEvent", { type: "mouseReleased", x: pos.x, y: pos.y, button: "left", clickCount: 1 });

const samples = [];
for (let i = 0; i < 8; i++) {
  samples.push(await evaluate(page, "window.__sample()"));
  await sleep(120);
}
const trace = await evaluate(page, "window.__trace");
console.log(JSON.stringify({ samples, trace }, null, 2));
page.close();
chrome.child.kill();
