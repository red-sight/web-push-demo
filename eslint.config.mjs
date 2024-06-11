// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  {
    ignores: [".yarn/", "apps/*/dist/", "packages/*/dist/", "eslint.config.mjs"]
  },

  {
    languageOptions: {
      parserOptions: {
        project: [
          "./tsconfig.eslint.json",
          "./packages/*/tsconfig.json",
          "./apps/*/tsconfig.json"
        ],
        tsconfigRootDir: __dirname
      }
    }
  }
);
