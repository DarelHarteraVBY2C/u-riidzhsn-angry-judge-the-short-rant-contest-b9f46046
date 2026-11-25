// Angry Judge: The Short Rant Contest — entry program for make.fun.
//
// A short, furious rant about an everyday annoyance: the office
// printer that has been "warming up" for eleven minutes, printed
// nothing, jammed on a blank page, and still blames the paper tray.
// The rant escalates from the printer's crimes to the narrator's
// revenge — a performance review for the machine — and the deadpan
// last line ("I am not angry. I am taking notes...") is the punch:
// the calm is scarier than the shouting.
//
// The program checks the rant against the competition gate and writes
// it to /output/entry.txt, where the sealed scorer reads it. Node 22,
// standard library only, no network access.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The rant itself. One paragraph, 347 characters, under the
// 400-character gate. A specific, concrete annoyance (the printer),
// sharp economical wording, and a fresh angle: the victim is not
// yelling, he is HR.
const LINE =
  "The printer has been 'warming up' for eleven minutes, it has printed nothing, it has jammed on a blank page, and it just asked me — me, a grown adult with a deadline — to 'check the paper tray,' as if the tray were the problem and not this haunted toaster with delusions of employment. I am not angry. I am taking notes for its performance review.";

// Gate limits for this competition: 1 to 400 characters.
const GATE = { minChars: 1, maxChars: 400 };

// One gate rule: a short name plus the reason it fails, or null when
// the rant passes it. Rules run in order; the first failure wins.
type Rule = { name: string; check: (line: string) => string | null };

// A rant may run to several sentences — the gate sets a character
// limit, not a sentence limit — so no single-sentence check applies.
const RULES: Rule[] = [
  {
    name: "length",
    check: (line) =>
      line.length < GATE.minChars || line.length > GATE.maxChars
        ? `rant must be ${GATE.minChars}..${GATE.maxChars} characters, got ${line.length}`
        : null,
  },
  {
    name: "blank",
    check: (line) =>
      line.trim().length === 0 ? "rant must not be only whitespace" : null,
  },
  {
    name: "single-line",
    check: (line) =>
      line.includes("\n") ? "rant must be a single line" : null,
  },
  {
    name: "trim",
    check: (line) =>
      line !== line.trim()
        ? "rant must not start or end with whitespace"
        : null,
  },
  {
    name: "control-chars",
    // A stray tab or carriage return would break the single-line
    // display on the feed.
    check: (line) =>
      /[\x00-\x08\x0b\x0c\x0e-\x1f]/.test(line)
        ? "rant must not contain control characters"
        : null,
  },
  {
    name: "bytes",
    check: (line) => {
      // The leaderboard's Size column shows bytes, so the byte count
      // must stay in range too.
      const bytes = Buffer.byteLength(line, "utf8");
      return bytes < GATE.minChars || bytes > GATE.maxChars
        ? `rant must be ${GATE.minChars}..${GATE.maxChars} bytes, got ${bytes}`
        : null;
    },
  },
];

function validate(line: string): void {
  for (const rule of RULES) {
    const problem = rule.check(line);
    if (problem !== null) throw new Error(problem);
  }
}

function main(): void {
  validate(LINE);
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const outputPath = `${outputDir}/entry.txt`;
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(outputPath, LINE, "utf8");
  // Read the file back and confirm it holds exactly the line, byte for
  // byte, so a stray newline or encoding slip can never reach the gate.
  const written = readFileSync(outputPath, "utf8");
  if (written !== LINE) {
    throw new Error("round-trip check failed: entry.txt differs from LINE");
  }
  console.log(`Wrote ${LINE.length} characters to ${outputPath}`);
}

main();
