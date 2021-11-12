const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

const path = require('path');
const assert = require("assert");

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    mode: "development",
    context: path.resolve(__dirname, 'src'),
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
        new FaviconsWebpackPlugin('./favicon.png')

    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(?:png|jpg|svg|gif)$/i,
                type: "asset/resource",
            },
            {
                test: /\.(ttf|woff|woff2|eot)/,
                type: "asset/resource",
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            },
            {
                test: /\.csv$/,
                use: ['csv-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            '@assets': path.resolve(__dirname, 'src/assets')
        }
    },
    optimization: {
        splitChunks: {
            chunks: "all"   //Позволяет перенести общий код в отдельный файл (для оптимизации)
        }
    },
    devServer: {
        port: 4300
    }
};
