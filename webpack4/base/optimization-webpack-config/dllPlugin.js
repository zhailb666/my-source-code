let path = require('path');
const webpack = require('webpack');

module.exports ={
    mode: 'development',
    entry: "./src/index.dllPlugin.js",
    output: {
        filename: 'bundle.[hash].js',
        path: path.resolve(__dirname, 'dist1', 'dllPlugin')
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
      new webpack.DllReferencePlugin({
        manifest: path.resolve(__dirname, 'dist1', 'dll-react', 'manifast.json') // 976kb - 6.2kb = 969.8kb
      })
    ]
}