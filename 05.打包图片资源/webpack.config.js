const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        // 处理图片资源
        test: /\.(jpg|png|gif)$/,
        // 只有一个lodaer，可以不用use
        loader: 'url-loader',
        options: {
          // 图片小于8kb,就会被base64处理
          limit: 8 * 1024,
          // 视频说俩种图片处理有冲突报错，不过我这边没冲突
          // esModule: false,
          // 重命名
          name: '[hash:8].[ext]'
        }
      },
      // 处理html文件中的图片
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'development'
}