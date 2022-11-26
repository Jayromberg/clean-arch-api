module.exports = {
  "extends": "@istanbuljs/nyc-config-typescript",
  "include": [
    "src/**/!(*.test.*).[tj]s?(x)"
  ],
  "exclude": [
    "src/_tests_/**/*.*"
  ],
  "reporter": [
    "text",
    "text-summary",
    "json-summary",
    "html",
    "lcov"
  ],
  "all": true,
  "check-coverage": true,
  "report-dir": "coverage"
}
