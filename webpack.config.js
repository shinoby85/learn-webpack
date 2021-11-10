const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

const path = require('path');
const {mode} = require("./webpack.config");

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    mode: "development",
    entry: {
        main: './src/index.js',
        analytics: './src/analytics.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js'
    },
    watch: NODE_ENV === 'development',   //Автом. пересборка проекта при изменениях
    watchOptions: {
        aggregateTimeout: 100       //Задание таймаута перед пересборкой проекта
    },
    plugins: [
        new HTMLWebpackPlugin({
            title: "Test title",
            template: "./src/index.html"
        }),
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [
            {
                test: '/\.[tj]s$/',
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    }
};
