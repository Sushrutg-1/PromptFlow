import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,

  {
    files: ["**/*.js"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",

      globals: {
        ...globals.node,
      },
    },

    rules: {
      // Best Practices
      "no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],

      "no-console": "off",

      "no-debugger": "warn",

      "no-var": "error",

      "prefer-const": "error",

      eqeqeq: ["error", "always"],

      curly: ["error", "all"],

      "object-shorthand": "error",

      "prefer-template": "error",

     

      // Style
      semi: ["error", "always"],

      quotes: ["error", "double"],

      indent: ["error", 2],

      "comma-dangle": ["error", "always-multiline"],

      "arrow-spacing": "error",

      "keyword-spacing": "error",

      "space-before-blocks": "error",

      "space-infix-ops": "error",
    },
  },
];
