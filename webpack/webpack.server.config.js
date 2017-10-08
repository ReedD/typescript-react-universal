const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const nodeExternals = require('webpack-node-externals');
const path = require('path');
const webpack = require('webpack');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'babel-polyfill',
    path.join(__dirname, '..', 'src', 'server', 'index.ts'),
  ],
  output: {
    path: path.join(__dirname, '..', 'dist', 'server'),
    filename: 'index.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      CLIENT: false,
      SERVER: true,
      PRODUCTION: isProduction,
      DEVELOPMENT: !isProduction,
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new Dotenv({
      path: './.env',
    }),
    new CopyWebpackPlugin([
      { from: './src/server/views', to: './views' },
      { from: './src/public', to: '../public', ignore: ['**/*.{ts,tsx}'] },
    ]),
    new webpack.optimize.OccurrenceOrderPlugin(),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    modules: ['node_modules', path.join('src', 'common')],
    alias: {
      react: 'preact-compat',
      'react-dom': 'preact-compat',
      // Not necessary unless you consume a module using `createClass`
      // 'create-react-class': 'preact-compat/lib/create-react-class',
    },
  },
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: [nodeExternals()],
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        query: {
          babelOptions: {
            plugins: ['dynamic-import-webpack'],
          },
        },
      },
    ],
  },
};
