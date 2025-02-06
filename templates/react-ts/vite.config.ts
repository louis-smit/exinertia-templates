import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig(({ command }) => {
  const isDev = command !== "build";
  if (isDev) {
    // Terminate the watcher when Phoenix quits
    process.stdin.on("close", () => {
      process.exit(0);
    });

    process.stdin.resume();
  }

  return {
    publicDir: "static",
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./js"),
      },
    },
    build: {
      target: "esnext",
      emptyOutDir: false,
      polyfillDynamicImport: true,
      outDir: "../priv/static/assets",
      sourcemap: isDev,
      manifest: "vite_manifest.json",
      rollupOptions: {
        input: {
          app: "./js/app.js",
          inertia: "./js/inertia.tsx",
        },
        output: {
          entryFileNames: "[name].[hash].js",
          chunkFileNames: "[name].[hash].js",
          assetFileNames: "[name].[hash][extname]",
        },
        external: ["/fonts/*", "/images/*"],
      },
    },
  };
});
