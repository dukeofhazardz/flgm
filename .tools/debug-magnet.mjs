import { launch, newPage, setup, go, evaluate, sleep } from "./cdp.mjs";

const chrome = await launch({ headless: true });
const page = await newPage();
await setup(page, { width: 1440, height: 900 });
await go(page, "http://localhost:3000/");
await sleep(1200);

const info = await evaluate(
  page,
  `(() => {
    const el = document.querySelector('header a[href="/contact"]');
    const store = Object.keys(el).filter((k) => k.startsWith("__react"));
    return {
      found: !!el,
      cls: el.className,
      display: getComputedStyle(el).display,
      rect: el.getBoundingClientRect().toJSON(),
      magnet: el.dataset.magnet ?? null,
      hasFiber: store,
      fine: matchMedia("(hover: hover) and (pointer: fine)").matches,
      coarse: matchMedia("(pointer: coarse)").matches,
      reduced: matchMedia("(prefers-reduced-motion: reduce)").matches,
    };
  })()`
);

const r = info.rect;
await page.send("Input.dispatchMouseEvent", {
  type: "mouseMoved",
  x: Math.round(r.left + 20),
  y: Math.round(r.top + r.height / 2),
  button: "none",
});
await sleep(120);
await page.send("Input.dispatchMouseEvent", {
  type: "mouseMoved",
  x: Math.round(r.left + 4),
  y: Math.round(r.top + 4),
  button: "none",
});
await sleep(400);

const after = await evaluate(
  page,
  `(() => {
    const el = document.querySelector('header a[href="/contact"]');
    const m = new DOMMatrixReadOnly(getComputedStyle(el).transform);
    return { magnet: el.dataset.magnet ?? null, x: +m.m41.toFixed(2), y: +m.m42.toFixed(2), inline: el.getAttribute("style") };
  })()`
);

console.log(JSON.stringify({ info, after }, null, 2));
page.close();
chrome.child.kill();
