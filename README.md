# webpack入门到精通

教学视频地址： [尚硅谷2020最新版Webpack5实战教程](https://www.bilibili.com/video/BV1e7411j7T5)

项目github地址: [webpack入门到精通](https://github.com/Jeffrey-0/webpack-course)

* [webpack简介](#webpack%E7%AE%80%E4%BB%8B)
* [webpack初体验](#webpack%E5%88%9D%E4%BD%93%E9%AA%8C)
* [打包样式资源](#%E6%89%93%E5%8C%85%E6%A0%B7%E5%BC%8F%E8%B5%84%E6%BA%90)
* [打包html资源](#%E6%89%93%E5%8C%85html%E8%B5%84%E6%BA%90)
* [打包图片资源](#%E6%89%93%E5%8C%85%E5%9B%BE%E7%89%87%E8%B5%84%E6%BA%90)
* [打包其他资源](#%E6%89%93%E5%8C%85%E5%85%B6%E4%BB%96%E8%B5%84%E6%BA%90)
* [devServer](#devserver)
* [提取css成单独文件](#%E6%8F%90%E5%8F%96css%E6%88%90%E5%8D%95%E7%8B%AC%E6%96%87%E4%BB%B6)
* [css的兼容性处理](#css%E7%9A%84%E5%85%BC%E5%AE%B9%E6%80%A7%E5%A4%84%E7%90%86)
* [压缩css](#%E5%8E%8B%E7%BC%A9css)
* [js语法检查](#js%E8%AF%AD%E6%B3%95%E6%A3%80%E6%9F%A5)
* [js兼容性处理](#js%E5%85%BC%E5%AE%B9%E6%80%A7%E5%A4%84%E7%90%86)
* [js压缩](#js%E5%8E%8B%E7%BC%A9)
* [html压缩](#html%E5%8E%8B%E7%BC%A9)
* [HMR](#hmr)
* [source\-map](#source-map)
* [oneOf](#oneof)
* [缓存](#%E7%BC%93%E5%AD%98)
* [tree\-shaking](#tree-shaking)
* [代码分割](#%E4%BB%A3%E7%A0%81%E5%88%86%E5%89%B2)
* [lazy loading](#lazy-loading)
* [PWA](#pwa)
* [多进程打包](#%E5%A4%9A%E8%BF%9B%E7%A8%8B%E6%89%93%E5%8C%85)
* [externals](#externals)
* [DLL](#dll)
* [优化性能总结](#%E4%BC%98%E5%8C%96%E6%80%A7%E8%83%BD%E6%80%BB%E7%BB%93)
* [entry](#entry)
* [output](#output)
* [module](#module)
* [resolve](#resolve)
* [optimization](#optimization)

**技能点**

![image](技能点.png)

**环境参数**（本机）

Nodejs v13.8.0

webpack 4.43.0

## webpack简介

**weback是什么**

* 前端资源构建工具
* 静态模块打包器（module bundler）

**webpack五个核心概念**

| 名称    | 描述 |
| ------- | ---- |
| Entry   | 入口 |
| Output  | 出口 |
| Loader  | 转换 |
| Plugins | 插件 |
| Mode    | 模式 |

## webpack初体验

**安装**

```shell
npm i webpack webpack-cli -D
```

**使用**

```shell
#开发模式
webpack ./src/index.js -o ./build/built.js --mode=development
#生成模式
webpack ./src/index.js -o ./build/built.js --mode=production
```

> 未配置前，只能处理js/json文件，不能处理css/img等其他资源

**配置模板**

```js
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
    ]
  },
  // plugins的配置
  plugins: [
  ],
  // 模式
  mode: 'development' //开发模式
  // mode: 'production' //生产模式
}
```

## 打包样式资源

安装

```shell
npm i style-loader css-loader -D
npm i less-loader -D
```

配置

```js
// file:webpack.config.js
module: {
  rules: [
  // 详细loader配置
  {
    test: /\.css$/, //匹配css文件
    use: [
      'style-loader', // 将js中的样式资源，添加到head中
      'css-loader' // 将css变成模块加载到js中
    ]
  }
  ]
},
{
  test: /\.less$/, //匹配less文件
  use: [
    'style-loader', // 将js中的样式资源，添加到head中
    'css-loader', // 将css变成模块加载到js中
    'less-loader' // 将less转成css文件
  ]
}    
```

运行

```shell
webpack
```

## 打包html资源

安装

```
npm i html-webpack-plugin -D
```

引入

```js
// file:webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin')
```

使用

```js
// file:webpack.config.js
plugins: [
  new HtmlWebpackPlugin({
    template: './src/index.html'
  })
]
```

## 打包图片资源

安装

```shell
npm i url-loader file-loader html-loader -D
```

配置

```js
// file:webpack.config.js
module: {
    rules: [
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
    }
  ]
}
// 处理html文件中的图片
{
    test: /\.html$/,
    loader: 'html-loader'
}
```

## 打包其他资源

> file-loader 前面已经安装

配置

```js
// file:webpack.config.js
module: {
    rules: [
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
}
```

## devServer

作用

> 开发服务器，自动编译，自动刷新，自动打开浏览器
>
> 只会在内存中编译打包，不会有任何输出

安装

```shell
npm i webpack-dev-server -D
```

配置

```js
devServer: {
    contentBase: resolve(__dirname, 'build'),
    compress: true,
    port: 3000,
    open: true
}
```

使用

```
npx webpack-dev-server
```

## 提取css成单独文件

安装

```shell
npm i mini-css-extract-plugin -D
```

引入

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
```

配置

```js
// 1.修改plugins
plugins: [
    new MiniCssExtractPlugin({
        filename: 'css/build.css'
    })
]
// 2.修改loader，即module中的rules
{
test: /\.css$/,
use: [MiniCssExtractPlugin.loader, 'css-loader']
}
```

## css的兼容性处理

安装

```shell
npm i postcss-loader postcss-preset-env
```

配置

```js
// 修改loader，即module中的rules
{
  test: /\.css$/,
  // use: [MiniCssExtractPlugin.loader, 'css-loader']
  use: [
  MiniCssExtractPlugin.loader,
  'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins: () => [
        require('postcss-preset-env')()
      ]
    }
  }]
}
```

## 压缩css

安装

```shell
npm i optimize-css-assets-webpack-plugin -D
```

引入

```js
const OptimizeCssAssetsWebpackPlugin= require('optimize-css-assets-webpack-plugin')
```

配置

```js
// 修改plugins
plugins: [
    new OptimizeCssAssetsWebpackPlugin()
  ]
```

## js语法检查

> 注：老师采用的是aribnb,不过我采用的代码风格是js- standard-style

安装

```shell
npm i eslint-loader eslint -D
```

```shell
npm install eslint-config-standard eslint-plugin-standard eslint-plugin-promise eslint-plugin-import eslint-plugin-node -D
```

配置

```js
// file: package.json
"eslintConfig": {
  "extends": "standard"
}
```

```js
// 增加loader，即module中的rules
{
    test: /.js$/,
    exclude: /node_modules/,
    loader: 'eslint-loader',
    options: {
    // 自动修复
    	fix: true
    }
}
```

## js兼容性处理

兼容处理有三种

* @babel/preset-env 基本js兼容处理
  问题：只能转换基本语法，如promise不能转换

* @babel/polyfill 全部兼容处理

  问题：将所有兼容处理，体积太大

* core-js 按需加载

安装

```shell
npm i babel-loader @babel/core @babel/preset-env -D
```

```shell
npm i @babel/polyfill -D
```

```shell
npm i core-js -D
```

配置

```js
// 第一种 增加loader，即module中的rules
{
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    options: {
   		presets: ['@babel/preset-env']
    }
}
```

```js
// 第二 直接在js文件中增加
import '@babel/polyfill'
```

```js
// 第三种 增加loader，即module中的rules
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
```

## js压缩

```js
// file: webpack.config.js 切换成生产模式
mode: 'production'
```

## html压缩

```js
// file： webpack.config.js 添加之前插件的minify属性
plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        // 移除空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true,
        // 移除属性的双引号，不生效
        removeAttributeQuotes: true
      }
    })
]
```

## HMR

> HMR:  hot module replacement 热模块替换,一个文件修改后，只重新构建该文件，而不是全部构建

开启热功能

```js
// file: webpack.config.js
devServer: {
    contentBase: resolve(__dirname, 'build'),
    compress: true,
    port: 3000,
    open: true,
    // 开启HMR功能
    hot: true
}
```

* 样式文件：默认有HMR功能

* js文件：默认无HMR功能

  ```js
  // file:./src/jsindex.js   入口js文件下方添加
  if (module.hot) {
    module.hot.accept('./print.js', function () {
    })
  }
  ```

* html文件：默认无HMR功能，而且会导致无法热更新

  ```js
  // file: webpack.config.js
  entry: ['./src/js/index.js', './src/index.html']
  ```

## source-map

> 找到源代码的错误信息和错误位置

**使用**

```js
// file: webpack.config.js
devtool: 'source-map'
```

**参数**

`[inline-|hidden-eval-][nosourses-][cheap-[module-]]source-map`

| 属性                    | 存放位置 | 错误原因      | 错误位置    |
| ----------------------- | -------- | ------------- | ----------- |
| source-map              | 外部     | 源文件        | 源文件      |
| inline-source-map       | 内联     | 源文件        | 源文件      |
| eval-source-map         | 内联     | 源文件(+hash) | 源文件      |
| hidden-source-map       | 外部     | 构建文件      | 构建文件    |
| nosources-source-map    | 外部     | 源文件        | 无          |
| cheap-source-map        | 外部     | 源文件        | 源文件(1行) |
| cheap-module-source-map | 外部     | 源文件        | 源文件(1行) |

开发环境推荐：eval-source-map

生产环境推荐：source-map / cheap-source-map / hidden-source-map

## oneOf

> 只匹配一个loader，不用全部都匹配，优化打包构建速度

```js
rules: [
  {
    // 在package.json中eslintConfig->standard
    test: /\.js$/,
    exclude: /node_modules/,
    // 优先执行
    enforce: 'pre',
    loader: 'eslint-loader',
    options: {
      fix: true
    }
  },
  {
    // 只匹配其中一个loader
    oneOf: [
      {
        test: /\.css$/,
        use: [...commonCssLoader]
      },
      {
        // 在package.json中设置浏览器列表browserslist
        test: /\.less$/,
        use: [...commonCssLoader, 'less-loader']
      }
    ]
  }
]
```

## 缓存

* babel缓存（第二次打包构建速度更快）

  ```js
  // 修改js-loader中的options
  {
  	test: /\.js$/,
  	exclude: /node_modules/,
  	loader: 'babel-loader',
  	options: {
  	// 开启babel缓存，第二次构建时读取缓存
  		cacheDirectory: true
  	}
  }
  ```
```
  
* 文件资源缓存（让上线运行缓存更好使用）

  * hash 每次webpack会生成唯一的hash值，如果只改动一个文件，打包后会导致所有缓存失效
  * chunkhash 如果打包来自同一个chunk，则hash值相同
  * contenthash 根据内容生成hash值。

  ```js
  // 在生成的文件名中加上不同hash值
  output: {
      filename: 'js/built.[contenthash:10].js',
      path: resolve(__dirname, 'build')
    }
  
  new MiniCssExtractPlugin({
        filename: 'css/built.[contenthash:10].css'
      })
```

## tree-shaking

> 去除无用代码，前提：使用es6模块化，开启production环境

默认已经开启了，不过可能会去除css等其他文件

```json
"sideEffects": ["*.css", "*.less"]
```

## 代码分割

* 多入口

  ```js
  entry: {
      // 多入口
      index: './src/js/index.js',
      test: './src/js/test.js'
    }
  ```

* optimization

  ```js
  // file: webpack.config.js
  // 1.将node_modules中的代码单独打包一个chunk输出
  // 2.自动提取多入口chunk 的公共文件
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    }
  ```

* import动态导入，能将某文件单独打包

  ```js
  // file: ./src/index.js
  import(/* webpackChunkName: 'test' */'./test')
    .then(({ mul, sub }) => {
      console.log(mul(2, 3))
    })
    .catch(() => {
      console.log('加载失败')
    })
  ```

## lazy loading

> 懒加载：文件需要使用时才加载
>
> 预加载： 会在使用之前空闲时提前加载js

```js
// file: ./src/js/index.js
document.getElementById('btn').onclick = function () {
  import(/* webpackChunkName: 'test', webpackPrefetch: true */'./test').then(({ mul }) => {
    console.log(mul(1, 3))
  })
}
```

## PWA

> 渐进式网络开发应用程序（离线可访问）

安装

```shell
npm i workbox-webpack-plugin -D
```

引入

```js
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
```

配置

```js
// file: webpack.config.js
  plugins: [
    new WorkboxWebpackPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true
    }),
  ],
```

使用

```js
// file: ./src/js/index.js
// 注册serviceworker
// 处理兼容性问题
if ('serviceworker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceworker
      .register('/service-worker.js')
      .then(() => {
        console.log('sw注册成功')
      })
      .catch(() => {
        console.log('注册失败')
      })
  })
}
```

服务器搭建（serviceWorker只能在服务器中使用）

```shell
# 安装全局serve
npm i serve -g
# 启动服务器，将build目录下所有资源作为静态资源暴露出去
serve -s build
```

## 多进程打包

> 只有工作消耗时间比较长，才需要多进程打包

安装

```shell
npm i thread-loader -D
```

配置

```js
// file: webpack.config.js  ->添加loader
{
    loader: 'thread-loader',
        options: {
            workers: 2
        }
}
```

## externals

>忽略文件的打包

配置

```js
// file: webpack.config.js
externals: {
    // 忽略库名 -- npm包名
    jquery: 'jQuery'
}
```

重新引入

```html
<!-- file: index.html -->
<script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.js"></script>
```

## DLL

> 动态连接库,将库打包单独打包

安装

```shell
npm i add-asset-html-webpack-plugin -D
```

新建dll配置文件

```js
// file: webpack.dll.js
const { resolve } = require('path')
const webpack = require('webpack')
module.exports = {
  entry: {
    jquery: ['jquery']
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'dll'),
    library: '[name]_[hash:8]'
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]_[hash:8]',
      path: resolve(__dirname, 'dll/manifest.json')
    })
  ],
  mode: 'production'
}
```

引入

```js
// file: webpack.config.js
const webpack = require('webpack')
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
```

配置

```js
// file: webpack.config.js
plugins: [
    new webpack.DllReferencePlugin({
      manifest: resolve(__dirname, 'dll/manifest.json')
    }),
    new AddAssetHtmlWebpackPlugin({
      filepath: resolve(__dirname, 'dll/jquery.js')
    })
  ]
```

运行

```shell
# 先生成单独打包的文件
webpack --config webpack.dll.js
# 再进行打包构建
webpack
```

## 优化性能总结

**开发环境性能优化**

* 优化打包构建速度
  * HMR
* 优化代码调试
  * source-map

**生产环境性能优化**

* 优化打包构建速度
  * oneOf
  * babel缓存
  * 多进程打包
  * externals 忽略打包
  * dll 单独打包
* 优化代码运行的性能
  * 缓存（hash-chunkhash-contenthash)
  * tree shaking 树摇，去除无用
  * code split 代码分割
  * 懒加载/预加载
  * pwa 离线访问

## entry

> 入口起点

* string `'./src/index.js'`

  * 打包形成一个chunk ，输出一个bundle文件
  * 此时chunk的名称模式是main

* array `['./src/index.js', './src/add.js']`

  * 多入口
  * 所有入口文件最终形成一个chunk ，输出一个bundle文件
  * 作用只有在HMR功能中让html热更新生效

* object`{index: './src/index.js',add: './src/add.js'}`

  * 多入口
  * 有几个入口就有几个chunk，输出几个bundle文件
  * chunk的名称是key

* 特殊用法(复用性)

  ```js
  {
      index: ['./src/index.js', './src/add.js'],
      count: './src/count.js'
  }
  ```

## output

```js
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
  }
```

## module

```js
module: {
  rules: [
    {
      test: /.\css$/,
      // 多个loader用use
      use: ['style-loader', 'css-loader']
    },
    {
      test: /\.js$/,
      // 排除node_modules下的js文件
      exclude: /node_modules/,
      // 只检查src下的js文件
      include: resolve(__dirname, 'src'),
      // 优先执行
      enforce: 'pre',
      // 延后执行
      enforce: 'post',
      // 单个loader用loader
      loader: 'eslint-loader',
      options: {}
    },
    {
      // 以下配置只会生效一个
      oneOf: []
    }
  ]
}
```

## resolve

```js
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
```

## optimization

```js
optimization: {
  splitChunks: {
    chunks: 'all'
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
```

