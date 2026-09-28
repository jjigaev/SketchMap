import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  workers: 2,
  timeout: 45_000,
  reporter: [["list"]],
  use: {
    baseURL: "http://127.0.0.1:4322",
    channel:
      process.env.PLAYWRIGHT_CHANNEL || (process.env.CI ? undefined : "msedge"),
    reducedMotion: "reduce",
    trace: "retain-on-failure",
  },
  webServer: {
    command:
      "node node_modules/astro/bin/astro.mjs preview --host 127.0.0.1 --port 4322",
    url: "http://127.0.0.1:4322/SketchMap/portfolio/",
    reuseExistingServer: !process.env.CI,
    env: { ASTRO_TELEMETRY_DISABLED: "1" },
  },
});
