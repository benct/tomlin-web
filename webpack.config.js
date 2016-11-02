const path = require('path');

const PATHS = {
  app: path.join(__dirname, "app"),
  dist: path.join(__dirname, "dist")
};

module.exports = {
  entry: {
    javascript: ["babel-polyfill", path.resolve(PATHS.app, "scripts", "main.js")],
    html: path.resolve(PATHS.app, "index.html"),
    css: path.resolve(PATHS.app, "styles", "main.css")
  },

  output: {
    path: PATHS.dist,
    filename: "./assets/scripts/bundle.js"
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    root: path.join(PATHS.app, "scripts")
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ["babel-loader"],
        exclude: /node_modules/,
        include: PATHS.app
      },
      {
        test: /\.css$/,
        loaders: ["css"],
        exclude: /node_modules/,
        include: PATHS.app
      },
      {
        test: /\.html$/,
        loader: "file?name=[name].[ext]",
        exclude: /node_modules/,
        include: PATHS.app
      }
    ]
  }
};
