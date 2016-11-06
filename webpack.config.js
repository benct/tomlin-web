const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PATHS = {
  app: path.join(__dirname, 'app'),
  dist: path.join(__dirname, 'dist')
};

module.exports = {
  context: PATHS.app,

  entry: {
    main: ['babel-polyfill', path.join(PATHS.app, 'scripts', 'entry.js')]
  },

  output: {
    path: PATHS.dist,
    filename: 'assets/scripts/bundle.js',
    publicPath: '/'
  },

  devtool: 'source-map',

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css'),
        exclude: /node_modules/
      },
      {
        test: /\.(ico|txt|htaccess)$/,
        loader: 'file?name=[name].[ext]',
        exclude: /node_modules/
      },
      {
        test: /\.(jpe?g|png|svg|xml|json)$/,
        loader: 'file?name=assets/[path][name].[ext]',
        exclude: /node_modules/
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({ template: path.join(PATHS.app, 'index.html') }),
    new HtmlWebpackPlugin({ template: path.join(PATHS.app, '403.html'), filename: '403.html', inject: false }),
    new HtmlWebpackPlugin({ template: path.join(PATHS.app, '404.html'), filename: '404.html', inject: false }),
    new ExtractTextPlugin(path.join('assets', 'styles', 'main.css'))
  ],

  devServer: {
    colors: true,
    historyApiFallback: true,
    inline: true,
    hot: true
  }
};
