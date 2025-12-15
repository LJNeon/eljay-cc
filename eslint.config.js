import stylistic from "@stylistic/eslint-plugin";

export default [
  {
    files: ["**/*.js", "**/*.mjs"],
    plugins: {"@stylistic": stylistic},
    rules: {
      // Suggestions
      curly: ["error", "multi-or-nest"],
      eqeqeq: ["error", "always", {null: "never"}],
      "id-length": ["error", {exceptions: ["id"], min: 3, max: 20}],
      "max-lines": ["error", {max: 300, skipBlankLines: true}],
      "no-shadow": "error",
      "require-unicode-regexp": ["error", {requireFlag: "v"}],
      // Stylistic - Disallow
      "@stylistic/no-floating-decimal": "error",
      // Stylistic - Line breaks
      "@stylistic/lines-between-class-members": [
        "error",
        {
          enforce: [
            {blankLine: "always", next: "*", prev: "method"},
            {blankLine: "always", next: "method", prev: "*"},
            {blankLine: "never", next: "field", prev: "field"}
          ]
        }
      ],
      "@stylistic/padding-line-between-statements": [
        "error",
        // None by default
        {blankLine: "never", next: "*", prev: "*"},
        // Before
        {blankLine: "always", next: "break", prev: "*"},
        {blankLine: "always", next: "continue", prev: "*"},
        {blankLine: "always", next: "return", prev: "*"},
        {blankLine: "always", next: "throw", prev: "*"},
        // Before & after
        {blankLine: "always", next: "class", prev: "*"},
        {blankLine: "always", next: "*", prev: "class"},
        {blankLine: "always", next: "do", prev: "*"},
        {blankLine: "always", next: "*", prev: "do"},
        {blankLine: "always", next: "for", prev: "*"},
        {blankLine: "always", next: "*", prev: "for"},
        {blankLine: "always", next: "function", prev: "*"},
        {blankLine: "always", next: "*", prev: "function"},
        {blankLine: "always", next: "if", prev: "*"},
        {blankLine: "always", next: "*", prev: "if"},
        {blankLine: "always", next: "iife", prev: "*"},
        {blankLine: "always", next: "*", prev: "iife"},
        {blankLine: "always", next: "switch", prev: "*"},
        {blankLine: "always", next: "*", prev: "switch"},
        {blankLine: "always", next: "try", prev: "*"},
        {blankLine: "always", next: "*", prev: "try"},
        {blankLine: "always", next: "while", prev: "*"},
        {blankLine: "always", next: "*", prev: "while"},
        // Before & after, except w/ same
        {blankLine: "always", next: "import", prev: "*"},
        {blankLine: "always", next: "*", prev: "import"},
        {blankLine: "never", next: "import", prev: "import"},
        {blankLine: "always", next: "export", prev: "*"},
        {blankLine: "always", next: "*", prev: "export"},
        {blankLine: "never", next: "export", prev: "export"},
        // Before & after, except w/ similar
        {blankLine: "always", next: "const", prev: "*"},
        {blankLine: "always", next: "*", prev: "const"},
        {blankLine: "never", next: "const", prev: "const"},
        {blankLine: "always", next: "let", prev: "*"},
        {blankLine: "always", next: "*", prev: "let"},
        {blankLine: "never", next: "let", prev: "let"},
        {blankLine: "never", next: "const", prev: "let"},
        {blankLine: "never", next: "let", prev: "const"}
      ],
      // Stylistic - Comments
      "@stylistic/line-comment-position": "error",
      "@stylistic/multiline-comment-style": "error",
      "@stylistic/spaced-comment": [
        "error",
        "always",
        {block: {balanced: true}}
      ]
    }
  }
];
