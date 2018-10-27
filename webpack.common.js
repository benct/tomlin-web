const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
    app: path.join(__dirname, 'app'),
    dist: path.join(__dirname, 'dist'),
};

module.exports = {
    context: PATHS.app,
    entry: ['@babel/polyfill', path.join(PATHS.app, 'scripts', 'index.js')],
    output: {
        path: PATHS.dist,
        filename: 'assets/scripts/bundle.js',
        publicPath: '/',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: ['@babel/plugin-syntax-dynamic-import'],
                    },
                },
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                use: {
                    loader: 'html-loader',
                },
            },
            {
                test: /\.htaccess$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '.htaccess',
                    },
                },
            },
            {
                test: /(favicon|humans|robots)\.(ico|txt)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                    },
                },
            },
            {
                test: /\.(xml|json|txt)$/,
                include: /content|images|scripts|styles/,
                type: 'javascript/auto',
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]',
                        outputPath: 'assets/',
                    },
                },
            },
            {
                test: /\.(jpe?g|png|svg|gif)$/,
                include: /content|images|scripts|styles/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                            outputPath: 'assets/',
                        },
                    },
                    'image-webpack-loader',
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(PATHS.app, 'index.html'),
            filename: 'index.html',
        }),
        new HtmlWebpackPlugin({
            template: path.join(PATHS.app, '403.html'),
            filename: '403.html',
            inject: false,
        }),
        new HtmlWebpackPlugin({
            template: path.join(PATHS.app, '404.html'),
            filename: '404.html',
            inject: false,
        }),
    ],
};
