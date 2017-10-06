const webpack = require('webpack');
const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  devtool: isProduction ? 'hidden-source-map' : 'eval-source-map',
  entry: {
    app: path.join(__dirname, '..', 'src', 'public', 'js', 'main.tsx'),
  },
  output: {
    path: path.join(__dirname, '..', 'dist', 'public', 'js'),
    publicPath: '/js/',
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      CLIENT: true,
      SERVER: false,
      PRODUCTION: isProduction,
      DEVELOPMENT: !isProduction,
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    isProduction && new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      minChunks: Infinity,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      children: true,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      async: true,
      children: true,
      minChunks: 2,
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
    }),
  ].filter(item => item),
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
            plugins: ['babel-plugin-syntax-dynamic-import'],
          },
        },
      },
    ],
  },
};
