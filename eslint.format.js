import {styleText} from "node:util";

// eslint-disable-next-line id-length -- Option name is provided by JS
const num = Intl.NumberFormat("en-us", {maximumFractionDigits: 0});

// Provide a brief summary in a similar format as Biome
export default function (results) {
  const files = results.length === 0 ? "file" : "files";
  let time = 0;
  let fixed = 0;
  let warns = 0;
  let errs = 0;

  for (const res of results) {
    for (const pass of res.stats.times.passes) time += pass.parse.total;

    fixed += res.fixableErrorCount + res.fixableWarningCount;
    warns += res.warningCount;
    errs += res.errorCount;
  }

  let message = `${styleText(
    "greenBright",
    `Checked ${results.length} ${files} in ${num.format(time)}`
  )}${styleText("green", "ms")}`;

  message += styleText(
    "greenBright",
    `. ${fixed === 0 ? "No" : num.format(fixed)} fix${
      fixed === 1 ? "" : "es"
    } applied.`
  );

  if (errs > 0) {
    message += styleText(
      "red",
      `\nFound ${num.format(errs)} error${errs === 1 ? "" : "s"}.`
    );
  }

  if (warns > 0) {
    message += styleText(
      "yellow",
      `\nFound ${num.format(warns)} warning${warns === 1 ? "" : "s"}.`
    );
  }

  return message;
}
