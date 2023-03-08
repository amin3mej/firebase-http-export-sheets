module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "google",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.json", "tsconfig.dev.json"],
    sourceType: "module",
  },
  ignorePatterns: [
    "/lib/**/*", // Ignore built files.
  ],
  plugins: ["@typescript-eslint", "import"],
  rules: {
    "quotes": ["error", "double"],
    "import/no-unresolved": 0,
    "indent": ["error", 2],
    "semi": ["error", "always"],
    "keyword-spacing": ["error"],
    "no-multi-spaces": ["error"],
    "dot-notation": ["error"],
    "sort-imports": [
      "error",
      {ignoreCase: true, ignoreDeclarationSort: true},
    ],
    "curly": ["error"],
    "brace-style": ["error", "1tbs", {allowSingleLine: false}],
    "require-jsdoc": 0,
    "max-len": ["warn", 120],
  },
};
