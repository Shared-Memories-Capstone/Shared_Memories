module.exports = [
    {
        ignores: ["backend/static/", "frontend/public/", "node_modules/"]
    },
    {
        rules: {
            semi: "warn",  // Use semicolons but don’t block commits
            "prefer-const": "warn", // Use const when variables aren't reassigned
            "eqeqeq": "warn",  // Warn when === is used instead of ==
            "no-unused-vars": ["warn", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^ignored" }],  // Ignore unused vars prefixed with _ or named ignored
            "no-console": "off",  // Avoid outputting with console.log
            "indent": ["warn", 4],  // 4-space indentation
            "curly": "warn",  // Use curly braces for if/else
            "no-multiple-empty-lines": ["warn", { "max": 2 }]  // Allow up to 2 empty lines
        }
    }
];
