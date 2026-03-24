import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/components/umbra/index.ts"],
  format: ["cjs", "esm"],
  dts: false,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom", "motion", "motion/react"],
  outDir: "dist",
});
