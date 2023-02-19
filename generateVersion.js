const fs = require("fs");

const content = fs.readFileSync("./package.json", { encoding: "utf8" });

const nextVersionJson = content.replace(/(?<="version": ")(.*)(?=")/, (...args) => {
  const nextVersion = args[0]
    .split(".")
    .reverse()
    .map((item, index) => (index ? item : item * 1 + 1))
    .reverse()
    .join(".");
    console.log(`-----${nextVersion}-----`)
  return nextVersion;
});

fs.writeFileSync("./package.json", nextVersionJson);
console.log('---replace end---')