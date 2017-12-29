const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PATHS = {
  app: path.join(__dirname, 'app'),
  dist: path.join(__dirname, 'dist')
};

module.exports = {
    context: PATHS.app,
    entry: [ 'babel-polyfill', path.join(PATHS.app, 'scripts', 'entry.js') ],
    output: {
        path: PATHS.dist,
        filename: 'assets/scripts/bundle.js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader'
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /\.(ico|txt|htaccess)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]'
                    }
                }
            },
            {
                test: /\.(jpe?g|png|svg|xml|json)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]',
                        outputPath: 'assets/'
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(PATHS.app, 'index.html'),
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            template: path.join(PATHS.app, '403.html'),
            filename: '403.html',
            inject: false
        }),
        new HtmlWebpackPlugin({
            template: path.join(PATHS.app, '404.html'),
            filename: '404.html',
            inject: false
        }),
        new ExtractTextPlugin({
            filename: 'assets/styles/main.css',
            disable: process.env.NODE_ENV !== 'production'
        })
    ]
};
