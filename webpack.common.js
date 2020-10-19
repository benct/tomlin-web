const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
    app: path.join(__dirname, 'app'),
    dist: path.join(__dirname, 'dist'),
};

module.exports = {
    context: PATHS.app,
    entry: path.join(PATHS.app, 'scripts', 'index.tsx'),
    output: {
        path: PATHS.dist,
        filename: 'assets/scripts/bundle.[contenthash].js',
        chunkFilename: 'assets/scripts/[id].[contenthash].js',
        publicPath: '/',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'ts-loader'],
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: 'html-loader',
            },
            {
                test: /\.md$/,
                exclude: /node_modules/,
                use: ['html-loader', 'markdown-loader'],
            },
            {
                test: /\.htaccess$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '.htaccess',
                        esModule: false,
                    },
                },
            },
            {
                test: /(favicon|humans|robots)\.(ico|txt)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        esModule: false,
                    },
                },
            },
            {
                test: /\.(xml|json|txt)$/,
                include: /images|manifest|scripts|styles/,
                type: 'javascript/auto',
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]',
                        outputPath: 'assets/',
                        esModule: false,
                    },
                },
            },
            {
                test: /\.(jpe?g|png|svg|gif)$/,
                include: /images|manifest|scripts|styles/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                            outputPath: 'assets/',
                            esModule: false,
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
