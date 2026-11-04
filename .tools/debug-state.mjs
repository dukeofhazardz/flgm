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
try {
  await setup(page, { width: 1440, height: 900 });
  await go(page, "http://localhost:3000/");
  for (let i = 0; i < 12; i++) {
    const state = await evaluate(
      page,
      `({
        t: Math.round(performance.now()),
        pre: !!document.querySelector("[data-pre-root]"),
        cursor: !!document.querySelector(".custom-cursor"),
        links: document.querySelectorAll('header a[href="/sermons"]').length,
        lenis: !!window.__lenis,
        overlay: !!document.querySelector("nextjs-portal"),
        bodyText: document.body.innerText.slice(0, 60).replace(/\\n/g, " | "),
      })`
    );
    console.log(JSON.stringify(state));
    await sleep(500);
  }
  console.log(JSON.stringify({ errors }, null, 2));
} finally {
  page.close();
  chrome.child.kill();
}
