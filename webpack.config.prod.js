const webpack = require('webpack');

const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');

const SRC_DIR = path.join(__dirname, '/client/src');
const DIST_DIR = path.join(__dirname, '/public/dist');

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR,
  },
  module: {
    rules: [
      {
        test: [/\.js$/, /\.jsx?$/],
        // 'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
        exclude: /node_modules/,
        include: SRC_DIR,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-react', '@babel/preset-env'],
        },
      },
      {
        test: /\.(css|less)$/,
        use: [{ loader: 'style-loader' }, {
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 1,
            localIdentName: '[sha1:hash:hex:4]',
          },
        }],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({ // <-- key to reducing React's size
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    // new webpack.optimize.DedupePlugin(), // dedupe similar code
    // new webpack.optimize.UglifyJsPlugin(), // minify everything
    new webpack.optimize.AggressiveMergingPlugin(), // Merge chunks
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
};
