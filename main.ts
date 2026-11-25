import { mkdir, readFile, writeFile } from "node:fs/promises";

// One-line joke: an excuse for a missed deadline, negotiated with the deadline itself.
const JOKE =
  "The deadline and I had a long talk, and we mutually agreed it was more of a suggestion.";

const OUT_PATH = "/output/entry.txt";

/** The sealed scorer accepts one non-blank line of 1-200 UTF-8 characters. */
function validateLine(line: string): void {
  if (line.length < 1 || line.length > 200) {
    throw new Error(`joke must be 1-200 characters, got ${line.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("joke must not be blank");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("joke must be a single line");
  }
}

validateLine(JOKE);

await mkdir("/output", { recursive: true });
await writeFile(OUT_PATH, JOKE, "utf8");

const roundTrip = await readFile(OUT_PATH, "utf8");
if (roundTrip !== JOKE) {
  throw new Error("round-trip check failed: entry.txt differs from the joke");
}

console.log(`Wrote ${JOKE.length} characters to ${OUT_PATH}`);
