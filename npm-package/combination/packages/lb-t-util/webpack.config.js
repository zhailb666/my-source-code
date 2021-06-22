/*
 * @Author: your name
 * @Date: 2021-06-02 22:07:20
 * @Description: file content
 */
var merge = require('webpack-merge').merge;

var common = require('../../webpack.common.js');

var path = require('path');

module.exports = merge(common, {
  entry: './es/index.js',
  output: {
    filename: 'lb-t-util.js',
    library: {
      name: 'lb-t-util',
      type: 'umd',
    },
    path: path.resolve(__dirname, './dist'),
  },
});
