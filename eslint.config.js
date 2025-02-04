import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import prettier from "eslint-plugin-prettier";
import importPlugin from "eslint-plugin-import";
import tailwindcssPlugin from "eslint-plugin-tailwindcss";
import prettierConfig from "eslint-config-prettier";
import pluginQuery from "@tanstack/eslint-plugin-query";

const [reactQueryConfig] = pluginQuery.configs["flat/recommended"];

export default [
  {
    ignores: ["dist"],
  },
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
      // Merge your plugins with the React Query plugin(s)
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      prettier,
      import: importPlugin,
      tailwindcss: tailwindcssPlugin,
      ...reactQueryConfig.plugins, // merges React Query plugins
    },
    rules: {
      // Merge recommended ESLint + React + React hooks configurations
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,

      // Merge React Query’s recommended rules
      ...reactQueryConfig.rules,

      // Custom React overrides
      "react/jsx-no-target-blank": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "react/prop-types": "off",

      // Enforce import/export order
      "import/order": ["error", { "newlines-between": "always" }],

      // Tailwind config
      "tailwindcss/classnames-order": "warn",
      "tailwindcss/no-custom-classname": "off",

      // Standard JS rules
      "no-console": "warn",
      "no-unused-vars": "error",

      // Prettier integration
      // 1. Turn Prettier issues into ESLint errors
      "prettier/prettier": ["error"],
      // 2. Merge in default Prettier rule adjustments
      ...prettierConfig.rules,
    },
  },
];
