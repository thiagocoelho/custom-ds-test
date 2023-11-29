import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import copy from "rollup-plugin-copy";

const packageJson = require("./package.json");

export default {
  input: "src/index.ts",
  output: [
    {
      dir: 'build',
      format: "cjs",
      sourcemap: true,
      preserveModules: true,
      banner: `'use client';`
    },
    // {
    //   file: packageJson.main,
    //   format: "cjs",
    //   sourcemap: true,
    //   preserveModules: true,
    //   banner: `'use client';`
    // },
    // {
    //   file: packageJson.module,
    //   format: "esm",
    //   sourcemap: true,
    //   preserveModules: true,
    //   banner: `'use client';`
    // }
  ],
  plugins: [
    peerDepsExternal(),
    resolve({
      browser: true
    }),
    commonjs(),
    typescript({ useTsconfigDeclarationDir: true }),
    copy({
      targets: [
        {
          src: "src/index.css",
          dest: "build",
          rename: "index.css"
        }
      ]
    })
  ]
};
