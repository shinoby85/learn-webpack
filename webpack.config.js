const HtmlWebpackPlugin = require('html-webpack-plugin')

const path = require('path');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    watch: NODE_ENV === 'development',   //Автом. пересборка проекта при изменениях
    watchOptions: {
        aggregateTimeout: 100       //Задание таймаута перед пересборкой проекта
    },
    devtool: NODE_ENV === 'development' ? 'inline-cheap-module-source-map' : null,  //Позволяет отслеживать debuger
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