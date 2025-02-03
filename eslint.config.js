// eslint.config.js
module.exports = [
  {
    ignores: ["backend/static/", "frontend/public/", "node_modules/"]
  },
  {
    rules: {
      semi: "error",  // use semicolons at the end of statements
      "prefer-const": "error", // use const when variables aren't reassigned
      "eqeqeq": "error",  // require === instead of ==
      "no-unused-vars": "warn",  // warn on declared but unused variables
      "no-console": "warn",  // warn if console.log is present
      "indent": ["warn", 2],  // enforce 2-space indentation (but just warn)
      "curly": "warn",  // encourage braces for if/else
      "no-multiple-empty-lines": ["warn", { "max": 1 }]  // limit empty lines to 1
    },
  }
];
