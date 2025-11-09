// ESLint 9 (flat config)
import js from "@eslint/js";
import react from "eslint-plugin-react";
import a11y from "eslint-plugin-jsx-a11y";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    plugins: { react, "jsx-a11y": a11y },
    languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
    settings: { react: { version: "detect" } },
    rules: {
      "react/jsx-key": "error",
      "jsx-a11y/no-autofocus": "warn",
      "jsx-a11y/label-has-associated-control": "error"
    }
  }
];
