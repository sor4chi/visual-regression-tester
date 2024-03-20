import fs from "fs";
import playwright from "playwright";
import z from "zod";
import pico from "picocolors";
import { ACTUAL_PATH, CONFIG_FILE } from "./config";

const rawConfig = JSON.parse(fs.readFileSync(CONFIG_FILE, "utf8"));

const configSchema = z.object({
  baseUrl: z.string(),
  waitUntil: z.enum(["load", "domcontentloaded", "networkidle"]),
  paths: z.array(
    z.object({
      path: z.string(),
      name: z.string(),
    })
  ),
  viewports: z.array(
    z.object({
      width: z.number(),
      height: z.number(),
      name: z.string(),
    })
  ),
});
const config = configSchema.parse(rawConfig);

const totalScreenshots = config.viewports.length * config.paths.length;
let currentScreenshot = 0;

(async () => {
  console.log(pico.blue(`Capturing screenshots of ${config.baseUrl}`));
  for (const { width, height, name: vpName } of config.viewports) {
    const browser = await playwright.chromium.launch();
    const context = await browser.newContext({
      viewport: {
        width,
        height,
      },
    });
    const page = await context.newPage();

    for (const { path, name: pathName } of config.paths) {
      const actualPath = `${ACTUAL_PATH}/${pathName} - ${vpName}.png`;
      console.log(
        pico.yellow(`Capturing ${path} with ${vpName}`),
        `(${++currentScreenshot}/${totalScreenshots})`
      );

      await page.goto(`${config.baseUrl}${path}`, {
        waitUntil: config.waitUntil,
      });
      await page.screenshot({
        path: actualPath,
        fullPage: true,
      });

      console.log(pico.green(`Saved to ${actualPath}`));
    }

    await browser.close();
  }
})();
