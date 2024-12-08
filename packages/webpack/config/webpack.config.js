const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
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
    target: ['web', 'es5'],
    module: {
        rules: [
            {
                // 如果项目源码中只有 js 文件就不要写成 /\.jsx?$/，提升正则表达式性能
                test: /\.jsx?$/,
                include: path.resolve(__dirname, '../src'),
                // babel-loader 支持缓存转换出的结果，通过 cacheDirectory 选项开启
                use: [
                    // "thread-loader",
                    'babel-loader?cacheDirectory',
                    // 'stringReplaceLoader', // 自定义loader
                ],
                // use: ['babel-loader?cacheDirectory'],
                // 只对项目根目录下的 src 目录中的文件采用 babel-loader
            },
        ]
    },
    resolveLoader:{
        modules: ['node_modules', path.resolve(__dirname, 'loader')],
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
        // new BundleAnalyzerPlugin()
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.css'],
        //   alias: {
        //     react: path.resolve(__dirname, 'node_modules/react') // 指定唯一的 React 路径
        //   },
        //   mainFields: ['main'],
    },
    cache: {
        type: 'filesystem',
    },
}
