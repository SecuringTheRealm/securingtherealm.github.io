import react from "@astrojs/react";
import tailwind from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
	integrations: [react()],
	vite: {
		plugins: [tailwind()],
	},
});
