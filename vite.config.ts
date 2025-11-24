import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react({
			babel: {
				plugins: [
					// Uncomment to enable React Compiler (experimental)
					// Only enable it after solving all related issues
					// ['babel-plugin-react-compiler', {}],
				]
			}
		})
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src")
		}
	}
})
