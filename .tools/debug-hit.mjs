import { launch, newPage, setup, go, evaluate, sleep } from "./cdp.mjs";

const chrome = await launch({ headless: true });
const page = await newPage();
await setup(page, { width: 1440, height: 900 });
await go(page, "http://localhost:3000/");
await sleep(1200);

const probe = await evaluate(
  page,
  `(() => {
    const el = [...document.querySelectorAll('header a[href="/events"]')][0];
    const r = el.getBoundingClientRect();
    const x = Math.round(r.left + r.width / 2);
    const y = Math.round(r.top + r.height / 2);
    const hit = document.elementFromPoint(x, y);
    return {
      x, y,
      rect: { left: r.left, top: r.top, w: r.width, h: r.height },
      hit: {
        tag: hit?.tagName,
        cls: String(hit?.className).slice(0, 80),
        inAnchor: !!hit?.closest("a"),
        html: hit?.outerHTML?.slice(0, 160),
      },
      headerRect: document.querySelector("header").getBoundingClientRect().toJSON(),
      headerTransform: getComputedStyle(document.querySelector("header")).transform,
    };
  })()`
);
console.log(JSON.stringify(probe, null, 2));
page.close();
chrome.child.kill();
