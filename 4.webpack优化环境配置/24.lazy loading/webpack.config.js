// 生产环境的基本配置
const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  /*entry: {
    // 多入口
    index: './src/js/index.js',
    test: './src/js/test.js'
  },*/
  entry: './src/js/index.js',
  output: {
    filename: 'js/[name].js',
    path: resolve(__dirname, 'build')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    })
  ],
  // 1.将node_modules中的代码单独打包一个chunk输出
  // 2.自动提取多入口chunk 的公共文件
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  mode: 'development',
}