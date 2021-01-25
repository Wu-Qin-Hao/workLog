export default {
  input: "./index.js",
  output: [
    {
      file: "dist/rollup-numbers.js",
      format: "iife",
      name: "rollupNumbers",
    }
  ]
}