import { launch, newPage, setup, go, shot, scrollTo, evaluate, sleep } from "./cdp.mjs";

const BASE = "http://localhost:3000";
const PAGES = process.argv.slice(2).length ? process.argv.slice(2) : ["/"];
const SIZES = [
  { name: "360", width: 360, height: 780, mobile: true, dpr: 2 },
  { name: "768", width: 768, height: 1024, mobile: true, dpr: 2 },
  { name: "1440", width: 1440, height: 900, mobile: false, dpr: 1 },
  { name: "1920", width: 1920, height: 1080, mobile: false, dpr: 1 },
];
const tag = process.env.TAG || "before";

const chrome = await launch({ headless: true });
const page = await newPage();

for (const path of PAGES) {
  const slug = path === "/" ? "home" : path.replace(/\//g, "-").replace(/^-/, "");
  for (const s of SIZES) {
    await setup(page, s);
    await go(page, BASE + path);
    const stops = [0, 0.35, 0.7, 1];
    for (const [i, p] of stops.entries()) {
      const max = await evaluate(page, "document.documentElement.scrollHeight - window.innerHeight");
      await scrollTo(page, Math.round(max * p));
      await shot(page, `.shots/${tag}/${slug}-${s.name}-${i}.png`);
    }
  }
}
page.close();
chrome.child.kill();
console.log("done");
