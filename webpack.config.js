const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

const path = require('path');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    mode: "development",
    context: path.resolve(__dirname,'src'),
    entry: {
        main: './index.js',
        analytics: './analytics.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        assetModuleFilename: "assets/[name][ext]",
    },
    watch: this.mode === 'development',   //Автом. пересборка проекта при изменениях
    watchOptions: {
        aggregateTimeout: 100       //Задание таймаута перед пересборкой проекта
    },
    plugins: [
        new HTMLWebpackPlugin({
            title: "Test title",
            template: "./index.html"
        }),
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.(?:png|jpg|svg|gif)$/i,
                type: "asset/resource",
            },
            {
                test: /\.(ttf|woff|woff2|eot)/,
                type: "asset/resource",
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    }
};
