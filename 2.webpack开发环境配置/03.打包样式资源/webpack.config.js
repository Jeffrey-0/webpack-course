// file:webpack.config.js   webpack的配置文件
const {resolve} = require('path')
module.exports = {
  // 入口起点
  entry: './src/index.js',
  // 出口
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build') 
  },
  // loader的配置
  module: {
    rules: [
    // 详细loader配置
      {
        test: /\.css$/, //匹配文件
        use: [
          'style-loader', // 将js中的样式资源，添加到head中
          'css-loader' // 将css变成模块加载到js中
        ]
      },
      {
        test: /\.less$/, //匹配文件
        use: [
          'style-loader', // 将js中的样式资源，添加到head中
          'css-loader', // 将css变成模块加载到js中
          'less-loader' // 将less转成css文件
        ]
      }
    ]
  },
  // plugins的配置
  plugins: [
  ],
  // 模式
  mode: 'development' //开发模式
  // mode: 'production' //生产模式
}