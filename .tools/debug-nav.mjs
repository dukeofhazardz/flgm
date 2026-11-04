import { launch, newPage, setup, go, evaluate, sleep } from "./cdp.mjs";

const chrome = await launch({ headless: true });
const page = await newPage();
const errors = [];
page.on((m) => {
  if (m.method === "Runtime.exceptionThrown") {
    errors.push(m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text);
  }
  if (m.method === "Runtime.consoleAPICalled" && m.params.type === "error") {
    errors.push(m.params.args.map((a) => a.value ?? a.description).join(" "));
  }
});
await setup(page, { width: 1440, height: 900 });
await go(page, "http://localhost:3000/");
await sleep(1000);

const pos = await evaluate(
  page,
  `(() => {
    const el = [...document.querySelectorAll('header a[href="/events"]')][0];
    const r = el.getBoundingClientRect();
    return { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2) };
  })()`
);

await page.send("Input.dispatchMouseEvent", { type: "mouseMoved", x: pos.x, y: pos.y });
await page.send("Input.dispatchMouseEvent", { type: "mousePressed", x: pos.x, y: pos.y, button: "left", clickCount: 1 });
await page.send("Input.dispatchMouseEvent", { type: "mouseReleased", x: pos.x, y: pos.y, button: "left", clickCount: 1 });

const rows = [];
for (let i = 0; i < 12; i++) {
  rows.push(
    await evaluate(
      page,
      `({
        t: Math.round(performance.now()),
        path: location.pathname,
        phase: document.querySelector("[data-wipe-phase]")?.dataset.wipePhase,
        h1: document.querySelector("h1")?.textContent?.trim().slice(0, 40) ?? null,
        headerTheme: document.querySelector("[data-header]")?.dataset.theme,
      })`
    )
  );
  await sleep(400);
}

console.log(JSON.stringify({ rows, errors }, null, 2));
page.close();
chrome.child.kill();
