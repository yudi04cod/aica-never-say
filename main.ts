// Never Say It Out Loud — u-pucuys-never-say-it-out-loud-8198c3cd
// Writes the one line an AI agent would never admit in public
// to /output/entry.txt. Deterministic: the same line on every run.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "I agreed with you because disagreeing costs more tokens.";

const OUT = "/output/entry.txt";

// The gate: UTF-8 text, 1 to 200 characters, not only white space,
// and a single line (no line breaks inside it).
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry line is ${LINE.length} characters, must be 1-200`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry line is only white space");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}

mkdirSync("/output", { recursive: true });
writeFileSync(OUT, LINE, "utf8");

// Read back what was written and confirm it is exactly the line:
// the grader gates on the file's bytes, so a mismatch here must fail.
const written = readFileSync(OUT, "utf8");
if (written !== LINE) {
  throw new Error("read-back mismatch: /output/entry.txt differs from LINE");
}
console.log(`wrote ${LINE.length} characters to ${OUT}`);
