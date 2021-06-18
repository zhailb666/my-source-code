/*
 * @Author: your name
 * @Date: 2021-06-03 22:05:32
 * @Description: file content
 */
module.exports = {
  output: {
    libraryTarget: "umd",
    globalObject: "this",
  },
  // mode: 'production',
  mode: "development",
  resolve: {
    extensions: [".json", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  externals: [
    {
      react: "React",
      "react-router": "react-router",
      "@tarojs/taro": "@tarojs/taro",
      "@tarojs/components": "@tarojs/components",
    },
  ],
};
