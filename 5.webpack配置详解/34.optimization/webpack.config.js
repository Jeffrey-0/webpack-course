const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/[name].[contenthash:10].js',
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
  mode: 'production',
  resolve: {
    // 配置解析模块路径别名:优点简写路径，缺点路径没有提示
    alias: {
      $css: resolve(__dirname, 'src/css')
    },
    // 配置省略文件的后缀名
    extensions: ['.js', 'json', '.jsx', '.css'],
    // 告诉webpack解析模块是去那里找
    modules: [resolve(__dirname, '../../node_modules'), 'node_modules']
  },

  optimization: {
    splitChunks: {
      chunks: 'all'
      /*// 分割的chunk最小为30kb
      minSize: 30 * 1024,
      // 分割的chunk最大无限制
      maxSize: 0,
      // 要提取的chunks最少被引用1次
      minChunks: 1,
      // 按需加载时并行加载文件最大数量为5
      maxAsyncRequests: 5,
      // 入口js文件最大并行请求为3
      maxInitialRequests: 3,
      // 名称连接符
      automaticNameDelimiter: '~',
      // 可以使用命名规则
      name: true,
      // 分割的chunk组
      cacheGroups: {
        // node_modules文件会被打包到vendors组的chunk
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          // 优先级
          priority: -10
        },
        default: {
          // 要提取的chunks最少被引用2次
          minChunks: 2,
          // 优先级
          priority: -20,
          // 如果当前要打包的模块，和之前已经被提取的模块是同一个，就会被复用，而不是重新打包
          reuseExistingChunk: true
        }
      }*/

    },
    // 将当前模块的记录其他模块的hash单独打包为一个文件runtime
    // 解决：修改a文件导致b文件的contenthash变化
    runtimeChunk: {
      name: entrypoint => `runtime-${entrypoint.name}`
    },
    minimizer: [
      // 配置删除环境的压缩方案
      new TerserWebpackPlugin({
        // 开启缓存
        cache: true,
        // 开启多进程打包
        parallel: true,
        // 启动source-map
        sourceMap: true
      })
    ]
  }
}