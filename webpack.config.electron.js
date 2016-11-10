/**
 * Build config for electron 'Main Process' file
 */

import webpack from 'webpack';
import validate from 'webpack-validator';
import merge from 'webpack-merge';
import baseConfig from './webpack.config.base';

export default validate(merge(baseConfig, {
  devtool: 'source-map',

  entry: ['babel-polyfill', './app/main.development'],

  output: {
    path: __dirname,
    filename: './app/main.js'
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ],

  target: 'electron-main',

  node: {
    __dirname: false,
    __filename: false
  },

  externals: []
}));
