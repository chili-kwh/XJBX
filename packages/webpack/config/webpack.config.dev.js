const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const swcJsOptions = require("./swc.config");
const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    mode: NODE_ENV,
    entry: {
        index: './src/index.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist'),
        clean: true,
    },
    // target: ['web', 'es5'],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: path.resolve(__dirname, '../src'),
                use: {
                    loader: 'swc-loader',  // 使用 swc-loader
                    options: swcJsOptions
                },
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../pub/index.html'),
        }),
        // 告诉 Webpack 使用了哪些动态链接库
        new webpack.DllReferencePlugin({
            // 描述 react 动态链接库的文件内容
            manifest: require('../asset/react.manifest.json'),
        }),
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.css'],
        //   alias: {
        //     react: path.resolve(__dirname, 'node_modules/react') // 指定唯一的 React 路径
        //   },
        //   mainFields: ['main'],
    },
}
