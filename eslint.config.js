// eslint.config.ts
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";
import pluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default tseslint.config(
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ["src/**/*.ts"],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: './tsconfig.json',
                tsconfigRootDir: import.meta.dirname,
            },
            globals: {
                ...globals.node,
            }
        },
        rules: {
            "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
        },
    },
    pluginPrettierRecommended
);