import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import pluginQuery from "@tanstack/eslint-plugin-query";

export default [
  { ignores: ["dist"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    settings: { react: { version: "18.3" } },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      prettier,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      "react/jsx-no-target-blank": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "react/prop-types": "off",

      // Custom JS rules
      // Enforce proper import/export order
      "import/order": ["error", { "newlines-between": "always" }],

      "tailwindcss/classnames-order": "warn",
      "tailwindcss/no-custom-classname": "off",

      "no-console": "warn", // Warn if console.log is left in code
      "no-unused-vars": "error", // Error on unused variables to keep code clean

      // Prettier integration: Treat Prettier issues as ESLint errors
      "prettier/prettier": ["error"],

      // Include all Prettier rules directly (Prettier rules turn off ESLint formatting)
      ...prettierConfig.rules,
    },
    extends: ["prettier"],

    // Enforce best practices for React Query
    ...pluginQuery.configs["flat/recommended"],
  },
];
