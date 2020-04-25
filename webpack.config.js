const path = require("path");

module.exports = {
  mode: 'development',
  entry: "./src/js/index.js",
  output: {
    path: path.resolve(__dirname, "public/js"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["babel-preset-env"]
          }
        }
      }
    ]
  }
};

/* 
Setting mode: 'development' optimizes for build speed and debugging,
whereas mode: 'production' optimizes for execution speed at runtime and output file size. 

watch this
https://medium.com/webpack/webpack-4-mode-and-optimization-5423a6bc597a
*/