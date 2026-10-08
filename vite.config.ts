import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react(), tsconfigPaths()],
    envPrefix: "HIMTI_",
    resolve: {
      alias: {
        "@core": path.resolve(rootDir, "src/core"),
        "@features": path.resolve(rootDir, "src/features"),
      },
    },
  };
});
