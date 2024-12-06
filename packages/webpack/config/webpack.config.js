const webpack = require('webpack')
const path = require('path')
const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  mode: NODE_ENV,
  entry: {
    index: './src/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
  },
  target: ['web', 'es5'],
  // modules: {
  //
  // },
  // resolve: {
  //   alias: {
  //     react: path.resolve(__dirname, 'node_modules/react') // 指定唯一的 React 路径
  //   },
  //   mainFields: ['main'],
  // },

}
