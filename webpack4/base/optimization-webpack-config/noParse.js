let path = require('path');

module.exports ={
    mode: 'development',
    entry: "./src/index.noParse.js",
    output: {
        filename: 'bundle.[hash].js',
        path: path.resolve(__dirname, 'dist1', 'noParse')
    },
    devServer: {
      hot: true,
      port: 3000,
      open: true,
      contentBase: './dist1'
    },
    module: {
        noParse: /jquery/, //不去解析jueryz中的依赖库，因为它本身没有啥依赖项； 306ms - 143ms = 160ms 
        rules: [
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