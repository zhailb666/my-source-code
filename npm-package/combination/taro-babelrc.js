/*
 * @Author: your name
 * @Date: 2021-06-24 22:19:40
 * @Description: file content
 */
/* eslint-disable import/no-commonjs */
const apis = require('@tarojs/taro-h5/dist/taroApis');

module.exports = {
  presets: [
    [
      '@babel/env',
      {
        spec: false,
        useBuiltIns: false,
        loose: true,
        modules: false,
        targets: {
          esmodules: true,
        },
      },
    ],
  ],
  plugins: [
    // '@babel/plugin-proposal-class-properties',
    // [
    //   '@babel/plugin-transform-typescript',
    //   {
    //     isTSX: true,
    //   },
    // ],
    [
      '@babel/plugin-transform-react-jsx',
      {
        pragma: 'Nerv.createElement',
      },
    ],
    // ['@babel/plugin-proposal-object-rest-spread'],
    // [
    //   'babel-plugin-transform-taroapi',
    //   {
    //     apis,
    //     packageName: '@tarojs/taro-h5',
    //   },
    // ],
  ],
};
