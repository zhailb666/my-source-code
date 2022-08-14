/*
 * @Author: your name
 * @Date: 2022-08-07 17:12:11
 * @Description: file content
 */
let path = require('path');

module.exports ={
    mode: 'development',
    entry: {
      index: "./src/index.splitChunks.js",
      other: "./src/index.splitChunks.other.js",
    },
    output: {
        // filename: 'bundle.[hash].js',
        path: path.resolve(__dirname, 'dist1', 'splitChunks'),
        filename: '[name].[hash:8].js',
        sourceMapFilename: '[name].[hash:8].map',
        chunkFilename: '[id].[hash:8].js'
    },
    devServer: {
      hot: true,
      port: 3000,
      open: true,
      contentBase: './dist1'
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          common: {
            chunks: 'initial',
            minSize: 0,
            minChunks: 2
          },
          vendor: {
            priority: 1, // 权重更高一点
            test: /node_modules/, // 把node_modules下引入的库抽离出来
            chunks: 'initial', // 主要如果配置为 all的时候 maxSize 无效
            minSize: 0,
            minChunks: 2,
            // maxSize: 1024000 // 1024kb
          }
        }
      }
    },
    module: {
      noParse: /jquery/,
      rules: [
        {
          test: /\.js/,
          exclude: /node_modules/,
          include: path.resolve(__dirname, '..', 'src'),
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
        {
          test: /\.less$/,
          use: [
              path.resolve(__dirname, '..', 'loader', 'style-loader'),
              path.resolve(__dirname, '..', 'loader', 'less-loader')
          ],
        },
      ],
  },
  plugins: []
}