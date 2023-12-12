const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const TerserWebpackPlugin = require('terser-webpack-plugin')

const webpack = require("webpack");
const path = require('path');
const assert = require("assert");

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV !== 'development';
const NODE_ENV = process.env.NODE_ENV || 'development';

const filename = ext => isDev ? `[name].${ext}`:`[name].[hash].${ext}`
const cssLoaders = preproc=>{
    const use=[{
        loader: MiniCssExtractPlugin.loader
    }, 'css-loader']
    if(preproc){
        use.push(`${preproc.toLowerCase()}-loader`)
    }
    return use;
}

const plugins = [
    new HTMLWebpackPlugin({
        title: "Momentum",
        template: "./index.html",
        minify:{
            collapseWhitespace: isProd,
        }
    }),
    new CleanWebpackPlugin(),   //Очистка папки dist перед каждой новой сборкой
    new MiniCssExtractPlugin({
        filename: filename('css')
    }),

];

if (isDev) {
    plugins.push(new webpack.HotModuleReplacementPlugin());
}


module.exports = {
    mode: "development",
    context: path.resolve(__dirname, 'src'),
    entry: {
        main: ['@babel/polyfill','./index.ts']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: filename('js'),
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
                use: cssLoaders()
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
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-typescript'],
                        plugins:['@babel/plugin-proposal-class-properties']
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.ts'],
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
