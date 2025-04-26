import globals from "globals";
import javascript from "@eslint/js";
import json from "@eslint/json";
import toml from "eslint-plugin-toml";
import stylistic from "@stylistic/eslint-plugin";

/* eslint-disable max-lines -- Too many rules */
/* eslint-disable id-length -- Rules have long identifiers */
export default [
  {linterOptions: {reportUnusedDisableDirectives: 2}},
  ...toml.configs["flat/recommended"],
  {
    files: ["**/*.json"],
    plugins: {json},
    language: "json/json",
    ...json.configs.recommended
  },
  {
    files: ["**/*.js", "**/*.mjs"],
    ...javascript.configs.recommended
  },
  {
    files: ["**/*.js", "**/*.mjs"],
    plugins: {"@stylistic": stylistic},
    languageOptions: {globals: {...globals.browser}},
    rules: {
      /* Possible Problems */
      "array-callback-return": [2, {checkForEach: true, allowVoid: true}],
      "no-await-in-loop": 2,
      "no-constructor-return": 2,
      "no-duplicate-imports": [2, {includeExports: true}],
      "no-fallthrough": [2, {reportUnusedFallthroughComment: true}],
      "no-irregular-whitespace": [2, {skipStrings: false}],
      "no-promise-executor-return": [2, {allowVoid: true}],
      "no-self-compare": 2,
      "no-template-curly-in-string": 2,
      "no-undef": [2, {"typeof": true}],
      "no-unmodified-loop-condition": 2,
      "no-unreachable-loop": 2,
      "no-unsafe-negation": [2, {enforceForOrderingRelations: true}],
      "no-unsafe-optional-chaining": [2, {disallowArithmeticOperators: true}],
      "no-unused-vars": [2, {
        args: "all",
        argsIgnorePattern: "^_",
        reportUsedIgnorePattern: true
      }],
      "no-use-before-define": 2,
      "no-useless-assignment": 2,
      "require-atomic-updates": 2,
      "use-isnan": [2, {enforceForIndexOf: true}],

      /* Suggestions */
      "accessor-pairs": 2,
      "arrow-body-style": 2,
      camelcase: 2,
      "capitalized-comments": 2,
      "class-methods-use-this": 2,
      complexity: [2, {max: 20, variant: "modified"}],
      "consistent-return": 2,
      "consistent-this": [2, "self"],
      curly: [2, "multi-or-nest", "consistent"],
      "default-case": [2, {commentPattern: "/^do\\snothing$/i"}],
      "default-case-last": 2,
      "default-param-last": 2,
      "dot-notation": 2,
      eqeqeq: [2, "always", {"null": "never"}],
      "func-name-matching": [2, {considerPropertyDescriptor: true}],
      "func-names": [2, "as-needed"],
      "func-style": [2, "declaration"],
      "grouped-accessor-pairs": [2, "getBeforeSet"],
      "guard-for-in": 2,
      "id-length": [2, {exceptions: ["id"], min: 3, max: 20}],
      "logical-assignment-operators": [
        2,
        "always",
        {enforceForIfStatements: true}
      ],
      "max-classes-per-file": 2,
      "max-depth": 2,
      "max-lines": [2, {max: 300, skipBlankLines: true}],
      "max-lines-per-function": [2, {max: 50, skipBlankLines: true}],
      "max-nested-callbacks": [2, {max: 3}],
      "max-params": [2, {max: 5}],
      "new-cap": 2,
      "no-alert": 2,
      "no-array-constructor": 2,
      // "no-console": 2,
      "no-div-regex": 2,
      "no-else-return": 2,
      "no-empty": [2, {allowEmptyCatch: true}],
      "no-empty-function": 2,
      "no-eval": 2,
      "no-extend-native": 2,
      "no-extra-bind": 2,
      "no-extra-boolean-cast": [2, {enforceForInnerExpressions: true}],
      "no-extra-label": 2,
      "no-implicit-coercion": [2, {disallowTemplateShorthand: true}],
      "no-implicit-globals": 2,
      "no-implied-eval": 2,
      "no-inline-comments": 2,
      "no-invalid-this": 2,
      "no-iterator": 2,
      "no-label-var": 2,
      "no-lone-blocks": 2,
      "no-lonely-if": 2,
      "no-loop-func": 2,
      "no-multi-str": 2,
      "no-negated-condition": 2,
      "no-new": 2,
      "no-new-func": 2,
      "no-new-wrappers": 2,
      "no-object-constructor": 2,
      "no-param-reassign": [2, {props: true}],
      "no-plusplus": 2,
      "no-proto": 2,
      "no-return-assign": 2,
      "no-script-url": 2,
      "no-sequences": 2,
      "no-shadow": [2, {builtinGlobals: true}],
      "no-throw-literal": 2,
      "no-undef-init": 2,
      "no-underscore-dangle": [2, {
        allowInArrayDestructuring: false,
        allowInObjectDestructuring: false,
        allowFunctionParams: true
      }],
      "no-unneeded-ternary": [2, {defaultAssignment: false}],
      "no-unused-expressions": 2,
      "no-useless-call": 2,
      "no-useless-computed-key": 2,
      "no-useless-concat": 2,
      "no-useless-constructor": 2,
      "no-useless-rename": 2,
      "no-useless-return": 2,
      "no-var": 2,
      "object-shorthand": 2,
      "one-var": [2, "never"],
      "operator-assignment": 2,
      "prefer-arrow-callback": 2,
      "prefer-const": [2, {destructuring: "all"}],
      "prefer-destructuring": 2,
      "prefer-exponentiation-operator": 2,
      "prefer-numeric-literals": 2,
      "prefer-object-has-own": 2,
      "prefer-object-spread": 2,
      "prefer-promise-reject-errors": 2,
      "prefer-regex-literals": [2, {disallowRedundantWrapping: true}],
      "prefer-rest-params": 2,
      "prefer-spread": 2,
      "prefer-template": 2,
      radix: [2, "as-needed"],
      "require-await": 2,
      "require-unicode-regexp": [2, {requireFlag: "v"}],
      "sort-imports": [2, {ignoreDeclarationSort: true}],
      strict: 2,
      "symbol-description": 2,
      yoda: 2,

      /* Stylistic - Spacing */
      "@stylistic/arrow-spacing": 2,
      "@stylistic/block-spacing": 2,
      "@stylistic/computed-property-spacing": 2,
      "@stylistic/function-call-spacing": 2,
      "@stylistic/generator-star-spacing": [2, "after"],
      "@stylistic/key-spacing": 2,
      "@stylistic/keyword-spacing": [2, {
        // After by default
        before: false,
        after: true,
        overrides: {
          // Before
          "this": {before: true, after: false},
          // Before & after
          as: {before: true},
          "extends": {before: true},
          from: {before: true},
          "in": {before: true},
          "instanceof": {before: true},
          of: {before: true},
          // Neither
          "break": {after: false},
          "catch": {after: false},
          "continue": {after: false},
          "else": {after: false},
          "finally": {after: false},
          "for": {after: false},
          "if": {after: false},
          "super": {after: false},
          "switch": {after: false},
          "while": {after: false}
        }
      }],
      "@stylistic/rest-spread-spacing": 2,
      "@stylistic/space-before-blocks": 2,
      "@stylistic/switch-colon-spacing": 2,
      "@stylistic/template-tag-spacing": 2,
      "@stylistic/yield-star-spacing": 2,

      /* Stylistic - Line breaks */
      "@stylistic/array-element-newline": [2, {
        ArrayExpression: "consistent",
        ArrayPattern: "never"
      }],
      "@stylistic/eol-last": 2,
      "@stylistic/function-call-argument-newline": [2, "consistent"],
      "@stylistic/implicit-arrow-linebreak": 2,
      "@stylistic/linebreak-style": 2,
      "@stylistic/lines-between-class-members": 2,
      "@stylistic/newline-per-chained-call": [2, {ignoreChainWithDepth: 4}],
      "@stylistic/object-property-newline": [
        2,
        {allowAllPropertiesOnSameLine: true}
      ],
      "@stylistic/padding-line-between-statements": [
        2,
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

      /* Stylistic - Brackets */
      "@stylistic/array-bracket-newline": [2, "consistent"],
      "@stylistic/array-bracket-spacing": 2,
      "@stylistic/arrow-parens": [2, "as-needed"],
      "@stylistic/brace-style": 2,
      "@stylistic/curly-newline": [2, "always"],
      "@stylistic/function-paren-newline": [2, "multiline-arguments"],
      "@stylistic/new-parens": 2,
      "@stylistic/object-curly-newline": [2, {
        multiline: true,
        minProperties: 4
      }],
      "@stylistic/object-curly-spacing": 2,
      "@stylistic/space-before-function-paren": [2, {
        anonymous: "never",
        named: "never",
        asyncArrow: "always"
      }],
      "@stylistic/space-in-parens": 2,
      "@stylistic/template-curly-spacing": 2,
      "@stylistic/wrap-iife": [2, "inside", {functionPrototypeMethods: true}],

      /* Stylistic - Indent */
      "@stylistic/indent": [2, 2, {SwitchCase: 1}],
      "@stylistic/indent-binary-ops": [2, 2],

      /* Stylistic - Quotes */
      "@stylistic/quote-props": [
        2,
        "as-needed",
        {keywords: true, numbers: true}
      ],
      "@stylistic/quotes": 2,

      /* Stylistic - Commas */
      "@stylistic/comma-dangle": 2,
      "@stylistic/comma-spacing": 2,
      "@stylistic/comma-style": 2,

      /* Stylistic - Semis */
      "@stylistic/no-extra-semi": 2,
      "@stylistic/semi": [2, "always", {
        omitLastInOneLineBlock: true,
        omitLastInOneLineClassBody: true
      }],
      "@stylistic/semi-spacing": 2,
      "@stylistic/semi-style": 2,

      /* Stylistic - Operators */
      "@stylistic/dot-location": [2, "property"],
      "@stylistic/multiline-ternary": [2, "never"],
      "@stylistic/no-mixed-operators": 2,
      "@stylistic/operator-linebreak": [2, "before"],
      "@stylistic/space-infix-ops": 2,
      "@stylistic/space-unary-ops": 2,

      /* Stylistic - Comments */
      "@stylistic/line-comment-position": 2,
      "@stylistic/lines-around-comment": [2, {
        allowBlockStart: true,
        allowObjectStart: true,
        allowArrayStart: true,
        allowClassStart: true,
        afterHashbangComment: true
      }],
      "@stylistic/multiline-comment-style": 2,
      "@stylistic/spaced-comment": [2, "always", {block: {balanced: true}}],

      /* Stylistic - Disallow */
      "@stylistic/no-confusing-arrow": 2,
      "@stylistic/no-extra-parens": [
        2,
        "all",
        {
          conditionalAssign: false,
          nestedBinaryExpressions: false,
          enforceForArrowConditionals: false
        }
      ],
      "@stylistic/no-floating-decimal": 2,
      "@stylistic/no-mixed-spaces-and-tabs": 2,
      "@stylistic/no-multi-spaces": [2, {exceptions: {Property: false}}],
      "@stylistic/no-multiple-empty-lines": [2, {max: 1}],
      "@stylistic/no-tabs": 2,
      "@stylistic/no-trailing-spaces": 2,
      "@stylistic/no-whitespace-before-property": 2,

      /* Stylistic - Misc */
      "@stylistic/max-len": [2, {tabWidth: 2}],
      "@stylistic/max-statements-per-line": 2,
      "@stylistic/nonblock-statement-body-position": [2, "below"],
      "@stylistic/padded-blocks": [2, "never"]
    }
  }
];
