const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: './src/index.js',
  output: {
    // 文件名
    filename: '[name].js',
    // 文件构建的路径
    path: resolve(__dirname, 'build'),
    // 所有输出资源的公共路径前缀
    publicPath: './',
    // 非入口chunk 的名称
    chunkFilename: 'js/[name]_chunk.js',
    // 整个库向外暴露的变量名
    library: '[name]',
    // 变量名添加到哪个上 window，global，commonjs
    libraryTarget: 'window'
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
  mode: 'development'
}