/*
 * @Author: your name
 * @Date: 2022-07-17 18:57:52
 * @Description: file content
 */
const { name } = require('./package');

module.exports = {
//   publicPath: 'http://localhost:3000',
  webpack: (config) => {
    console.log(config, 'config----')
    config.output.publicPath = 'http://localhost:3000/';
    config.output.library = `${name}-[name]`;
    config.output.libraryTarget = 'umd';
    // config.output.jsonpFunction = `webpackJsonp_${name}`;
    config.output.chunkLoadingGlobal = `webpackJsonp_${name}`; //rename


    config.output.globalObject = 'window';

    return config;
  },

  devServer: (_) => {
    const config = _;

    config.headers = {
      'Access-Control-Allow-Origin': '*',
    };
    config.historyApiFallback = true;
    // config.hot = false;
    // config.watchContentBase = false;
    // config.liveReload = false;

    return config;
  },
};