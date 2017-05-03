const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: './src/client.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: [
                'react',
                [ 'es2015', { loose: true, modules: false } ],
                'stage-1'
              ],
              plugins: [
                'syntax-async-functions',
                'syntax-dynamic-import'
              ]
            }
          }
        ]
      }
    ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public/'),
    publicPath: '/',
    chunkFilename: 'part-[id].js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
};
