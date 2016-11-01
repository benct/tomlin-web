const path = require('path');

module.exports = {
  context: __dirname + "/app",

  entry: {
    javascript: ["babel-polyfill", "./scripts/main.js"],
    html: "./index.html"
  },

  output: {
    path: __dirname + "/dist",
    filename: "./assets/scripts/bundle.js"
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    root: path.resolve(__dirname, './app/scripts')
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"]
      },
      {
        test: /\.html$/,
        loader: "file?name=[name].[ext]"
      }
    ]
  }
};
