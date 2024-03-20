import fs from "fs";
import pico from "picocolors";
import { ACTUAL_PATH, DIFF_PATH, GITKEEP } from "./config";

const actualFiles = fs.readdirSync(ACTUAL_PATH);
const diffFiles = fs.readdirSync(DIFF_PATH);

for (const file of actualFiles) {
  if (file === GITKEEP) continue;
  fs.unlinkSync(`${ACTUAL_PATH}/${file}`);
  console.log(pico.red(`Removed ${ACTUAL_PATH}/${file}`));
}

for (const file of diffFiles) {
  if (file === GITKEEP) continue;
  fs.unlinkSync(`${DIFF_PATH}/${file}`);
  console.log(pico.red(`Removed ${DIFF_PATH}/${file}`));
}
