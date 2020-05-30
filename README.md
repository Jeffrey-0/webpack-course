# webpack入门到精通

* [webpack简介](#webpack%E7%AE%80%E4%BB%8B)
* [webpack初体验](#webpack%E5%88%9D%E4%BD%93%E9%AA%8C)
* [打包样式资源](#%E6%89%93%E5%8C%85%E6%A0%B7%E5%BC%8F%E8%B5%84%E6%BA%90)
* [打包html资源](#%E6%89%93%E5%8C%85html%E8%B5%84%E6%BA%90)
* [打包图片资源](#%E6%89%93%E5%8C%85%E5%9B%BE%E7%89%87%E8%B5%84%E6%BA%90)

教学视频地址： [尚硅谷2020最新版Webpack5实战教程](https://www.bilibili.com/video/BV1e7411j7T5)

[TOC]

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

