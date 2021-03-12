/*
 * @Author: your name
 * @Date: 2021-03-12 13:55:03
 * @Description: file content
 */
// babel-preset-taro 更多选项和默认值：
// https://github.com/NervJS/taro/blob/next/packages/babel-preset-taro/README.md
module.exports = {
  presets: [
    [
      'taro',
      {
        framework: 'react',
        ts: true,
      },
    ],
  ],
};
