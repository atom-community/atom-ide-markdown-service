import { createPlugins } from "rollup-plugin-atomic"

const plugins = createPlugins([["ts", { tsconfig: "./src/tsconfig.json" }, true], "babel"])
const pluginsEs = createPlugins([["ts", { tsconfig: "./src/tsconfig.es.json" }, true], "babel"])

export default [
  {
    input: "src/main.ts",
    output: [
      {
        dir: "dist",
        format: "cjs",
        sourcemap: true,
      },
    ],
    // loaded externally
    external: ["atom"],
    plugins: plugins,
  },
  // csj npm
  {
    input: "src/renderer.ts",
    output: [
      {
        dir: "dist",
        format: "cjs",
        sourcemap: true,
      },
    ],
    // loaded externally
    external: ["atom"],
    plugins: plugins,
  },
  // ES6 module npm
  {
    input: "src/renderer.ts",
    output: [
      {
        dir: "modules",
        format: "es",
        sourcemap: true,
      },
    ],
    // loaded externally
    external: ["atom"],
    plugins: pluginsEs,
  },
]
