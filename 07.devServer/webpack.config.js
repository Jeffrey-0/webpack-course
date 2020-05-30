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
      },
      {
        test: /\.css$/, //匹配文件
        use: [
          'style-loader', // 将js中的样式资源，添加到head中
          'css-loader' // 将css变成模块加载到js中
        ]
      },
      // 打包其他资源
      {
        // 排除css、js、html图片资源
        exclude: /\.(css|js|html|jpg|png|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[hash:8].[ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'development',
  // 开发服务器 devServer:自动化（自动刷新）
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    compress: true,
    port: 3000,
    open: true
  }
}