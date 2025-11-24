import js from "@eslint/js"
import globals from "globals"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import tseslint from "typescript-eslint"
import tanstackQuery from "@tanstack/eslint-plugin-query"
import { defineConfig, globalIgnores } from "eslint/config"

export default defineConfig([
	globalIgnores(["dist", "node_modules"]),
	{
		files: ["**/*.{ts,tsx}"],
		extends: [
			js.configs.recommended,
			...tseslint.configs.strictTypeChecked,
			...tseslint.configs.stylisticTypeChecked,
			reactHooks.configs.flat.recommended,
			reactRefresh.configs.vite
		],
		plugins: {
			"@tanstack/query": tanstackQuery
		},
		languageOptions: {
			ecmaVersion: 2022,
			globals: globals.browser,
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname
			}
		},
		rules: {
			// Strict TypeScript rules
			"@typescript-eslint/consistent-type-definitions": ["error", "type"],
			"@typescript-eslint/no-explicit-any": "error",
			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^_"
				}
			],
			"@typescript-eslint/explicit-function-return-type": [
				"warn",
				{
					allowExpressions: true,
					allowTypedFunctionExpressions: true,
					allowHigherOrderFunctions: true
				}
			],
			"@typescript-eslint/explicit-module-boundary-types": "warn",
			"@typescript-eslint/no-non-null-assertion": "warn",
			"@typescript-eslint/no-floating-promises": "error",
			"@typescript-eslint/no-misused-promises": "error",
			"@typescript-eslint/await-thenable": "error",
			"@typescript-eslint/require-await": "error",
			"@typescript-eslint/no-unnecessary-condition": "warn",
			"@typescript-eslint/prefer-nullish-coalescing": "warn",
			"@typescript-eslint/prefer-optional-chain": "warn",
			"@typescript-eslint/strict-boolean-expressions": "off",
			"@typescript-eslint/no-confusing-void-expression": "off",
			"@typescript-eslint/restrict-template-expressions": [
				"error",
				{
					allowNumber: true
				}
			],
			// General rules
			"no-console": [
				"warn",
				{
					allow: ["warn", "error", "log"]
				}
			],
			"prefer-const": "error",
			"no-var": "error"
		}
	}
])
