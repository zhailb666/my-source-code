let path = require('path');
const webpack = require('webpack');
const { locale } = require('moment');

module.exports ={
    mode: 'development',
    entry: "./src/index.ignorePlugin.js",
    output: {
        filename: 'bundle.[hash].js',
        path: path.resolve(__dirname, 'dist1', 'ignorePlugin')
    },
    devServer: {
      hot: true,
      port: 3000,
      open: true,
      contentBase: './dist1'
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
    plugins: [
      new webpack.IgnorePlugin(/\.\/locale/, /moment/) // moment包中不引用locale文件夹 729kib - 188kib = 541kib
    ]
}