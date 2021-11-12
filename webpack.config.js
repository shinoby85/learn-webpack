const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const TerserWebpackPlugin = require('terser-webpack-plugin')

const webpack = require("webpack");
const path = require('path');
const assert = require("assert");

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV !== 'development';
const NODE_ENV = process.env.NODE_ENV || 'development';

const plugins = [
    new HTMLWebpackPlugin({
        title: "Test title",
        template: "./index.html",
        minify:{
            collapseWhitespace: isProd,
        }
    }),
    new CleanWebpackPlugin(),   //Очистка папки dist перед каждой новой сборкой
    new FaviconsWebpackPlugin('./favicon.png'),
    new MiniCssExtractPlugin({
        filename: '[name].css'
    }),

];

if (isDev) {
    plugins.push(new webpack.HotModuleReplacementPlugin());
}


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
    plugins,
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader
                }, 'css-loader']
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
        },
        minimizer: [
            new CssMinimizerPlugin(),      //Оптимизация CSS
            new TerserWebpackPlugin()   //Оптимизация JavaScript
        ],
        minimize: isProd    //Разрешить оптимизацию в случае prodaction
    },
    devServer: {
        port: 4300,
        // hot: isDev
    }
};
