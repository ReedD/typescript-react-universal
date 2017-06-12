const webpack = require('webpack');
const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  devtool: isProduction ? 'hidden-source-map' : 'eval-source-map',
  entry: [path.join(__dirname, '..', 'src', 'public', 'js', 'main.tsx')],
  output: {
    path: path.join(__dirname, '..', 'dist', 'public', 'js'),
    publicPath: '/assets/',
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      CLIENT: true,
      SERVER: false,
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    isProduction && new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
  ].filter(item => item),
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    modules: ['node_modules', path.join('src', 'common')],
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        query: {
          useBabel: true,
          useCache: true,
          babelOptions: {
            presets: [['es2015', { modules: false }], 'react'],
          },
        },
      },
    ],
  },
};
