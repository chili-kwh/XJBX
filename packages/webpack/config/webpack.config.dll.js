const webpack = require('webpack')
const path = require('path')

module.exports = {
  // mode: 'development',
  mode: 'production',
  entry: {
    libs: ['react']
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
    library: '_dll_[name]'
  },
  // target: 'web',
  // modules: {
  //
  // },
  // resolve: {
  //   alias: {
  //     react: path.resolve(__dirname, 'node_modules/react') // 指定唯一的 React 路径
  //   },
  //   mainFields: ['main'],
  // },

  plugins: [
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify('production')
    // }),
    new webpack.DllPlugin({
      // 动态链接库的全局变量名称，需要和 output.library 中保持一致
      // 该字段的值也就是输出的 manifest.json 文件 中 name 字段的值
      // 例如 react.manifest.json 中就有 "name": "_dll_react"
      name: '_dll_[name]',
      // 描述动态链接库的 manifest.json 文件输出时的文件名称
      path: path.join(__dirname, '../dist', '[name].manifest.json')
    })
  ]
}
