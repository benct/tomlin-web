const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'assets/styles/main.[contenthash].css',
            chunkFilename: 'assets/styles/[id].[contenthash].css',
            // ignoreOrder: false,
        }),
    ],
    devtool: 'source-map',
});
