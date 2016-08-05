var webpack = require('webpack');

var devFlagPlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
});

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    './client/js/index.js'
  ],
  output: {
		path: __dirname + '/static/',
		publicPath: '/static/',
    filename: 'bundle.js',
    hot: true
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    devFlagPlugin
  ],
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel'], exclude: /node_modules/ },
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json']
  },
  noInfo: true,
  colors: true
};
