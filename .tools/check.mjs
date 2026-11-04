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
await setup(page, { width: 1440, height: 900 });
await go(page, "http://localhost:3000/");
await sleep(1600);

const audit = await evaluate(page, `(() => {
  const sections = [...document.querySelectorAll('main section')];
  const reveals = [...document.querySelectorAll('main [data-no-reveal]')];
  return {
    title: document.title,
    sections: sections.length,
    themes: sections.map(s => s.dataset.headerTheme || 'none'),
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    hiddenRows: [...document.querySelectorAll('main section *')].filter(el => getComputedStyle(el).opacity === '0').length,
    lenis: !!window.__lenis,
    cursor: !!document.querySelector('.custom-cursor'),
    wipe: !!document.querySelector('[data-wipe-phase]'),
    bodyCursor: getComputedStyle(document.body).cursor,
  };
})()`);

await shot(page, ".shots/check/home-1440-hero.png");
await evaluate(page, "window.scrollTo({top: 1200, behavior: 'instant'})");
await sleep(1400);
await shot(page, ".shots/check/home-1440-mid.png");

const after = await evaluate(page, `(() => {
  const rows = [...document.querySelectorAll('main section > * > *')];
  return {
    rows: rows.length,
    opacity0: rows.filter(el => getComputedStyle(el).opacity === '0').length,
    headerTheme: document.querySelector('[data-header]')?.dataset.theme,
    themeProbe: (() => {
      const el = document.elementFromPoint(700, 20);
      return el?.closest('[data-header-theme]')?.dataset.headerTheme || 'none';
    })(),
  };
})()`);

console.log(JSON.stringify({ audit, after, errors }, null, 2));
page.close();
chrome.child.kill();
