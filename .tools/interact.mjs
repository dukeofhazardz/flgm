import { launch, newPage, setup, go, shot, evaluate, sleep } from "./cdp.mjs";

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

const move = async (x, y) => {
  await page.send("Input.dispatchMouseEvent", { type: "mouseMoved", x, y });
};
const click = async (x, y) => {
  await page.send("Input.dispatchMouseEvent", { type: "mouseMoved", x, y });
  await page.send("Input.dispatchMouseEvent", { type: "mousePressed", x, y, button: "left", clickCount: 1 });
  await page.send("Input.dispatchMouseEvent", { type: "mouseReleased", x, y, button: "left", clickCount: 1 });
};
const centre = async (selector) =>
  evaluate(
    page,
    `(() => {
      const el = [...document.querySelectorAll(${JSON.stringify(selector)})]
        .find((n) => !n.closest("#connect-menu") && n.getBoundingClientRect().height > 0);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2) };
    })()`
  );
const waitFor = async (selector) => {
  for (let i = 0; i < 60; i++) {
    if (await evaluate(page, `!!document.querySelector(${JSON.stringify(selector)})`)) return true;
    await sleep(200);
  }
  throw new Error(`timeout waiting for ${selector}`);
};
const waitReady = async () => {
  await waitFor("header a[href='/sermons']");
  for (let i = 0; i < 40; i++) {
    if (await evaluate(page, "!document.querySelector('[data-pre-root]')")) return;
    await sleep(200);
  }
};

const report = {};
try {
  await setup(page, { width: 1440, height: 900 });
  await go(page, "http://localhost:3000/");
  await waitReady();
  await sleep(400);

  // 1. Roll link: hover the "Sermons" nav item.
  const sermons = await centre('header a[href="/sermons"]');
  await move(sermons.x, sermons.y);
  await sleep(150);
  await shot(page, ".shots/check/roll-mid.png");
  await sleep(500);
  await shot(page, ".shots/check/roll-done.png");
  report.roll = await evaluate(
    page,
    `(() => {
      const el = [...document.querySelectorAll('header a[href="/sermons"]')][0];
      return {
        inTransform: getComputedStyle(el.querySelector(".roll-link__face--in")).transform,
        outTransform: getComputedStyle(el.querySelector(".roll-link__face--out")).transform,
        faces: el.querySelectorAll(".roll-link__glyph").length,
      };
    })()`
  );

  // 2. Cursor label on the "Give" nav item.
  const give = await centre('header a[href="/give"]');
  await move(give.x, give.y);
  await sleep(320);
  await shot(page, ".shots/check/cursor-label.png");
  report.cursor = await evaluate(
    page,
    `(() => {
      const ring = document.querySelector(".custom-cursor__ring");
      return {
        visible: ring.dataset.visible,
        labelled: ring.dataset.labelled,
        label: document.querySelector(".custom-cursor__label").textContent,
        at: getComputedStyle(ring).transform,
      };
    })()`
  );

  // 3. Magnetic button lean (header CTA, not the Connect menu item).
  const visit = await centre('header a[href="/contact"]');
  await move(visit.x - 18, visit.y - 4);
  await sleep(400);
  report.magnet = await evaluate(
    page,
    `(() => {
      const el = [...document.querySelectorAll('header a[href="/contact"]')]
        .find((n) => !n.closest("#connect-menu"));
      const m = new DOMMatrixReadOnly(getComputedStyle(el).transform);
      return { x: +m.m41.toFixed(2), y: +m.m42.toFixed(2), flag: el.dataset.magnet ?? null };
    })()`
  );
  await shot(page, ".shots/check/magnet.png");

  // 4. Parallax travel on the first art slot.
  const parallax = await evaluate(
    page,
    `(() => {
      const el = document.querySelector("[data-parallax-max]");
      const top = el.getBoundingClientRect().top + window.scrollY;
      return { top: Math.round(top), vh: window.innerHeight };
    })()`
  );
  const sample = async (y) => {
    await evaluate(page, `window.scrollTo({top:${Math.round(y)},behavior:'instant'})`);
    await sleep(900);
    return evaluate(
      page,
      `(() => {
        const el = document.querySelector("[data-parallax-max]");
        const m = new DOMMatrixReadOnly(getComputedStyle(el).transform);
        return { y: +m.m42.toFixed(2), viewportTop: Math.round(el.getBoundingClientRect().top) };
      })()`
    );
  };
  report.parallax = {
    entering: await sample(parallax.top - parallax.vh),
    mid: await sample(parallax.top - parallax.vh * 0.35),
    leaving: await sample(parallax.top + 40),
  };

  // 5. Horizon wipe on navigation, from the top with the header visible.
  await evaluate(page, "window.scrollTo({top:0,behavior:'instant'})");
  await sleep(900);
  const events = await centre('header a[href="/events"]');
  await click(events.x, events.y);
  await sleep(260);
  await shot(page, ".shots/check/wipe-cover.png");
  report.wipe = await evaluate(
    page,
    `(() => {
      const root = document.querySelector("[data-wipe-phase]");
      const sheet = root?.firstElementChild;
      return {
        phase: root?.dataset.wipePhase,
        sheet: sheet ? getComputedStyle(sheet).transform : null,
      };
    })()`
  );
  await sleep(1800);
  await shot(page, ".shots/check/wipe-arrived.png");
  report.arrived = await evaluate(
    page,
    `(() => ({
      url: location.pathname,
      phase: document.querySelector("[data-wipe-phase]")?.dataset.wipePhase,
      scrollY: Math.round(window.scrollY),
      headerTheme: document.querySelector("[data-header]")?.dataset.theme,
      h1: document.querySelector("h1")?.textContent?.trim().slice(0, 48) ?? null,
    }))()`
  );
} catch (error) {
  report.error = String(error?.stack || error);
} finally {
  report.consoleErrors = errors;
  console.log(JSON.stringify(report, null, 2));
  page.close();
  chrome.child.kill();
}
