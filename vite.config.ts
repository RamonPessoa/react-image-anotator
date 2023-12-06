import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
const root = path.resolve(__dirname, "src");

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@components": path.resolve(root, "components"),
      "@assets": path.resolve(root, "assets"),
      "@domain": path.resolve(root, "domain"),
    },
  },
});
