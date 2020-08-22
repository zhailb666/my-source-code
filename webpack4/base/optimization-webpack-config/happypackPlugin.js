let path = require('path');
const Happypack = require('happypack')

module.exports ={
    mode: 'development',
    entry: "./src/index.happypack.js",
    output: {
        filename: 'bundle.[hash].js',
        path: path.resolve(__dirname, 'dist1', 'happypack'),
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
            use: 'Happypack/loader?id=js'
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
      new Happypack({
        id: 'js',
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
              ]
            }
          }
        ]
      })
    ]
}

// 只有文件较多的时候才会看出效果；