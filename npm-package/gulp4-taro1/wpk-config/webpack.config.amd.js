/*
 * @Author: your name
 * @Date: 2021-06-02 22:07:20
 * @Description: file content
 */
const { merge }  = require('webpack-merge');
const common = require('../webpack.common.js');
const path = require('path');

module.exports = merge(common, {
  entry: './es/index.js',
  output: {
    filename: 'gulp4-and-webpack4-amd.js',
    library: {
      name: 'MyLibrary',
      // type: 'umd', // 很多type|| amd, umd, commonjs, module, jsonp
      type: 'amd', // 很多type|| amd, umd, commonjs, module, jsonp
    },
    path: path.resolve(__dirname, '../dist'),
  },
});
