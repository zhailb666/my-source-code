let path = require('path');
const webpack = require('webpack');

module.exports ={
    mode: 'development',
    entry: {
      react: ['react', 'react-dom']
    },
    output: {
        filename: '_dll_[name].js',
        path: path.resolve(__dirname, 'dist1', 'dll-react'),
        library: '_dll_[name]',
    },
    devServer: {
      hot: true,
      port: 3000,
      open: true,
      contentBase: './dist1'
    },
    plugins: [
      new webpack.DllPlugin({
        name: '_dll_[name]',
        path:  path.resolve(__dirname, 'dist1', 'dll-react', 'manifast.json'),
      })
    ]
}