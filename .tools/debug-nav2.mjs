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
const report = {};
try {
  await setup(page, { width: 1440, height: 900, reduced: true });
  await go(page, "http://localhost:3000/");
  await sleep(2500);
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
  await sleep(2500);
  report.reducedNav = await evaluate(
    page,
    `({ url: location.pathname, h1: document.querySelector("h1")?.textContent?.trim().slice(0, 40) })`
  );

  // Now without reduced motion: use the router directly through a plain dispatch.
  await setup(page, { width: 1440, height: 900, reduced: false });
  await go(page, "http://localhost:3000/");
  await sleep(2600);
  await evaluate(page, "window.scrollTo({top:0,behavior:'instant'})");
  const pos2 = await evaluate(
    page,
    `(() => {
      const el = [...document.querySelectorAll('header a[href="/events"]')][0];
      const r = el.getBoundingClientRect();
      return { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2) };
    })()`
  );
  await page.send("Input.dispatchMouseEvent", { type: "mouseMoved", x: pos2.x, y: pos2.y });
  await page.send("Input.dispatchMouseEvent", { type: "mousePressed", x: pos2.x, y: pos2.y, button: "left", clickCount: 1 });
  await page.send("Input.dispatchMouseEvent", { type: "mouseReleased", x: pos2.x, y: pos2.y, button: "left", clickCount: 1 });
  const trace = [];
  for (let i = 0; i < 12; i++) {
    trace.push(
      await evaluate(
        page,
        `({ t: Math.round(performance.now()), url: location.pathname, phase: document.querySelector("[data-wipe-phase]")?.dataset.wipePhase })`
      )
    );
    await sleep(300);
  }
  report.wipeTrace = trace;
} catch (error) {
  report.error = String(error?.stack || error);
} finally {
  report.consoleErrors = errors;
  console.log(JSON.stringify(report, null, 2));
  page.close();
  chrome.child.kill();
}
