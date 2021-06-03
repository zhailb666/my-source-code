/*
 * @Author: your name
 * @Date: 2021-06-03 22:05:32
 * @Description: file content
 */
module.exports = {
  output: {
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  // mode: 'production',
  mode: 'development',
  resolve: {
    extensions: ['.json', '.js'],
  },
  // module: {
  //   rules: [
  //     {
  //       test: /\.jsx?$/,
  //       use: {
  //         loader: 'babel-loader',
  //       },
  //     }
  //   ],
  // },
  externals: [
    {
      react: 'React',
      'react-router': 'react-router'
    },
  ],
};
