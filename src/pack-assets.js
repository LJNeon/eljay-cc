/* global process */
import {readFile, readdir, writeFile} from "node:fs/promises";
import {dirname, join} from "node:path";
import {fileURLToPath} from "node:url";
import sharp from "sharp";

const directory = join(dirname(fileURLToPath(import.meta.url)), "./img");
let files = await readdir(directory);
let contents = [];
let packs = [];

console.info("Reading...");

for(const file of files)
  contents.push(readFile(join(directory, file)));

contents = await Promise.allSettled(contents);

if(contents.some(res => res.status === "rejected")) {
  console.warn("Failed to read some images... exiting.");
  process.exit(1);
}

console.info("Packing...");
files = files.map(file => `${file.slice(0, file.lastIndexOf("."))}.webp`);

for(let idx = 0; idx < files.length; idx += 1) {
  packs.push(sharp(contents[idx].value)
    .resize(128, 128, "inside")
    .webp({effort: 6, smartDeblock: true})
    .toFile(join(directory, "../../docs/assets/img", files[idx])));
}

packs = await Promise.allSettled(packs);

for(let idx = 0; idx < files.length; idx += 1) {
  if(packs[idx].status === "rejected")
    console.warn(`Failed to pack ${files[idx]}`);
}

console.info("Listing...");

try {
  await writeFile(
    join(directory, "../../docs/assets/json/pics.json"),
    JSON.stringify(files.map(file => file.slice(0, file.lastIndexOf("."))))
  );
}catch(err) {
  console.warn("Failed to list pictures...");
  console.error(err);
  process.exit(1);
}

console.info("Finished!");
