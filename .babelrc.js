module.exports = {
  plugins: [
    [
      "./plugins/transform-remove-console",
      {
        exclude: "error",
      },
    ],
    "./plugins/transform-css-modules",
  ],
  presets: ["@babel/preset-env", "@babel/preset-react"],
};
