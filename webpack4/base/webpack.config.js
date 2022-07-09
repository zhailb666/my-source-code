/*
 * @Author: your name
 * @Date: 2020-08-17 10:22:28
 * @Description: file content
 */
let path = require('path');
const webpack = require('webpack');
const POnePlugins = require('./plugins/POne');
const PTwoPlugins = require('./plugins/PTwo');
const SomePluginsLifeCycle = require('./plugins/SomePluginsLifeCycle');
const ClearLog = require('./plugins/ClearLog');

module.exports ={
    mode: 'development',
    entry: "./src/index.js",
    output: {
        filename: 'bundle.[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
      hot: true,
      port: 3000,
      open: true,
      contentBase: './dist'
    },
    module: {
        rules: [
          {
            test: /\.less$/,
            use: [
                path.resolve(__dirname, 'loader', 'style-loader'),
                path.resolve(__dirname, 'loader', 'less-loader')
            ],
          },
          {
            test: /\.js/,
            exclude: /node_modules/,
            include: path.resolve(__dirname, 'src'),
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  '@babel/preset-env',
                  '@babel/preset-react',
                ]
              }
            }
          },
        ],
    },
    // 搜索过程优化
    resolve: {
      alias: {
          "react": path.resolve(__dirname, './node_modules/react/index.js'),
          "react-dom": path.resolve(__dirname, './node_modules/react-dom/index.js'),
      },
      extensions: ['.js', '.json']
    },
    plugins: [
      new POnePlugins(),
      new PTwoPlugins(),
      new SomePluginsLifeCycle(),
      new ClearLog(),
      new webpack.IgnorePlugin(/\.\/locale/, /moment/) // moment包中不引用locale文件夹 729kib - 188kib = 541kib
    ]
}

/**
 * 
常用loader
样式：style-loader、css-loader、less-loader、sass-loader等
文件：raw-loader、file-loader 、url-loader等
编译：babel-loader、coffee-loader 、ts-loader等
校验测试：mocha-loader、jshint-loader 、eslint-loader等

plugin
ProvidePlugin：自动加载模块，代替require和import
html-webpack-plugin可以根据模板自动生成html代码，并自动引用css和js文件
extract-text-webpack-plugin 将js文件中引用的样式单独抽离成css文件
webpack.IgnorePlugin
 */

/***
 * 
webpack优化：
一、打包速度优化(文件查找速度)
1、resolve字段告诉webpack怎么去搜索文件，所以首先要重视resolve字段的配置
alias：直接告诉文件资源具体的位置减少路径搜索；
extensions：减少extensions值的配置--extensions:['.js', '.json'],当导入语句没带文件后缀时，Webpack会根据extensions定义的后缀列表进行文件查找
2、module.noParse 字段告诉Webpack不必解析哪些文件 
3、配置loader时，通过test、exclude、include缩小搜索范围

4、使用DllPlugin减少基础模块编译次数
5、使用HappyPack开启多进程Loader转换

二、文件体积优化

1、css压缩
css-minimizer-webpack-plugin 插件 https://webpack.docschina.org/plugins/css-minimizer-webpack-plugin/
2、js压缩
terser-webpack-plugin
3、忽略一些不用的文件
webpack.IgnorePlugin() 

scope Hoisting
Tree-shaking
公共资源分离
图片压缩
动态polyfill
// 分析工具：https://juejin.cn/post/7075309486927249444
*/