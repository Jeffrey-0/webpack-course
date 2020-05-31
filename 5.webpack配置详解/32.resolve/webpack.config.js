const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // 多个loader用use
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
  mode: 'development',
  resolve: {
    // 配置解析模块路径别名:优点简写路径，缺点路径没有提示
    alias: {
      $css: resolve(__dirname, 'src/css')
    },
    // 配置省略文件的后缀名
    extensions: ['.js', 'json', '.jsx', '.css'],
    // 告诉webpack解析模块是去那里找
    modules: [resolve(__dirname, '../../node_modules'), 'node_modules']
  }
}