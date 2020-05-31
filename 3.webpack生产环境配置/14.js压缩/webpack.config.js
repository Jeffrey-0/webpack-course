const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          // presets: ['@babel/preset-env']
          presets: [
            ['@babel/preset-env',
            {
              // // 按需加载
              useBuiltIns: 'usage',
              // 指定core-js版本
              corejs: {version: 3},
              // 指定兼容性到哪个版本浏览器
              targets: {
                chrome: '60',
                firefox: '60',
                ie: '9',
                safari: '10',
                edge: '17'
              }
            }]
          ]
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        /*// 移除属性的双引号
        removeAttributeQuotes: true,*/
        // 移除空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true,

      }
    })
  ],
  mode: 'production'
}