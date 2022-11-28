module.exports = {
  "extends": "@istanbuljs/nyc-config-typescript",
  "include": [
    "src/domain",
    "src/presentation",
    "src/data",
    "src/infra"
  ],
  "reporter": [
    "text",
    "text-summary",
    "json-summary",
    "html",
    "lcov"
  ],
  "all": true,
}
