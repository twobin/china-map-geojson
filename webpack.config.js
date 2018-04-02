const path = require('path');
const webpack = require('webpack');

const env = process.env.NODE_ENV;

const config = {
  entry: './src/index.js',

  output: {
    library: 'china-map-geojson',
    libraryTarget: 'umd',
  },

  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      include: [
        path.resolve(__dirname, 'src'),
      ],
      loader: 'babel-loader',
    }],
  },

  devtool: 'source-map',

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
  ],
};

if (env === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false,
      },
      output: {
        comments: false,
      },
      sourceMap: false,
    })
  );
}

module.exports = config;
