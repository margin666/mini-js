const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
module.exports = {
    mode: 'development',
    entry: resolve(__dirname, 'src', 'main.ts'),
    output: {
        filename: 'bundle.js',
        path: resolve(__dirname, 'dist')
    },
    devtool: 'inline-source-map',
    devServer: {
        static: './dist'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ['ts-loader'],
                exclude: /node-modules/
            },
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            '@src': resolve(__dirname, 'src'),
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'mini-js',
            template: resolve(__dirname, 'public', 'index.html')
        }),
        new CleanWebpackPlugin()
    ]
}