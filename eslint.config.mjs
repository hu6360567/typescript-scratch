// eslint.config.mjs
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
    { files: ["**/*.{js,mjs,cjs,ts}"] },
    { languageOptions: { globals: globals.node } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    // Turn off all ESLint formatting rules that conflict with Prettier
    eslintConfigPrettier,
    {
        rules: {
            // Add your custom rules here, for example:
            "no-console": "warn",
            "@typescript-eslint/no-explicit-any": "warn"
        }
    }
];