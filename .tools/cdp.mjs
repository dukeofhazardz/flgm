// Minimal CDP driver for screenshots and perf checks.
// Usage: node .tools/cdp.mjs <script.json>  (not needed) — import this module instead.
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { setTimeout as sleep } from "node:timers/promises";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9222;
// Keep the browser profile outside the project: Turbopack watches the repo and
// panics when it walks Chrome's locked profile files.
const PROFILE = "C:\\Users\\USER\\AppData\\Local\\Temp\\opencode\\flgm-chrome-profile";

export async function launch({ headless = true, width = 1440, height = 900 } = {}) {
  const args = [
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${PROFILE}`,
    "--no-first-run",
    "--no-default-browser-check",
    "--hide-scrollbars",
    "--force-color-profile=srgb",
    "--disable-features=Translate",
    `--window-size=${width},${height}`,
  ];
  if (headless) args.push("--headless=new");
  const child = spawn(CHROME, args, { stdio: "ignore", detached: false });
  // wait for the debugging endpoint
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      if (res.ok) return { child, info: await res.json() };
    } catch {}
    await sleep(250);
  }
  throw new Error("Chrome did not start");
}

export async function newPage() {
  const res = await fetch(`http://127.0.0.1:${PORT}/json/new?about:blank`, { method: "PUT" });
  const target = await res.json();
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((r, j) => {
    ws.onopen = r;
    ws.onerror = j;
  });
  let id = 0;
  const pending = new Map();
  const listeners = new Set();
  ws.onmessage = (ev) => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) reject(new Error(JSON.stringify(msg.error)));
      else resolve(msg.result);
    } else {
      listeners.forEach((fn) => fn(msg));
    }
  };
  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const mid = ++id;
      pending.set(mid, { resolve, reject });
      ws.send(JSON.stringify({ id: mid, method, params }));
    });
  const on = (fn) => {
    listeners.add(fn);
    return () => listeners.delete(fn);
  };
  return { send, on, close: () => ws.close(), sessionId: target.id };
}

export async function setup(page, { width, height, dpr = 1, mobile = false, reduced = false, cpu = 1 }) {
  await page.send("Page.enable");
  await page.send("Runtime.enable");
  await page.send("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor: dpr,
    mobile,
    screenWidth: width,
    screenHeight: height,
  });
  if (mobile) {
    await page.send("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 5 });
    await page.send("Emulation.setEmitTouchEventsForMouse", { enabled: false });
  }
  await page.send("Emulation.setEmulatedMedia", {
    features: [
      { name: "prefers-reduced-motion", value: reduced ? "reduce" : "no-preference" },
      { name: "prefers-color-scheme", value: "light" },
    ],
  });
  await page.send("Emulation.setCPUThrottlingRate", { rate: cpu });
}

export async function go(page, url) {
  await page.send("Page.navigate", { url });
  await waitLoad(page);
  await sleep(1600);
}

export function waitLoad(page) {
  return new Promise((resolve) => {
    const off = page.on((msg) => {
      if (msg.method === "Page.loadEventFired") {
        off();
        resolve();
      }
    });
    setTimeout(() => {
      off();
      resolve();
    }, 20000);
  });
}

export async function evaluate(page, expression, awaitPromise = true) {
  const r = await page.send("Runtime.evaluate", {
    expression,
    awaitPromise,
    returnByValue: true,
  });
  if (r.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails));
  return r.result.value;
}

export async function shot(page, path) {
  mkdirSync(path.replace(/[\\/][^\\/]+$/, ""), { recursive: true });
  const r = await page.send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: false,
  });
  writeFileSync(path, Buffer.from(r.data, "base64"));
  return path;
}

export async function fullShot(page, path, { width } = {}) {
  const h = await evaluate(page, "document.documentElement.scrollHeight");
  const r = await page.send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: true,
    clip: { x: 0, y: 0, width: width ?? 1440, height: Math.min(h, 20000), scale: 0.25 },
  });
  writeFileSync(path, Buffer.from(r.data, "base64"));
  return path;
}

export async function scrollTo(page, y) {
  await evaluate(page, `window.scrollTo({top:${y},behavior:'instant'}); ${y}`);
  await sleep(700);
}

export { sleep };
