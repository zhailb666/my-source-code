let path = require('path');
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
        ],
    },
    plugins: [
      new POnePlugins(),
      new PTwoPlugins(),
      new SomePluginsLifeCycle(),
      new ClearLog()
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