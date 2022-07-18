/*
 * @Author: your name
 * @Date: 2022-07-17 18:14:41
 * @Description: file content
 */
const { name } = require('./package');
module.exports = {
  publicPath: 'http://localhost:3001',
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  configureWebpack: {
    output: {
      library: `${name}-[name]`,
      libraryTarget: 'umd', // 把微应用打包成 umd 库格式
      jsonpFunction: `webpackJsonp_${name}`,
    },
  },
};