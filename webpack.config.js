const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeJsPlugin = require('optimize-js-plugin');

const plugins = [
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'client/index.html',
    inject: 'body'
  })
];

if (process.env.NODE_ENV !== 'production') {
  plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );
}

module.exports = {
  entry: (process.env.NODE_ENV !== 'production' ? [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
    ] : []).concat(['./client/index.js']),
  output: {
    filename: './bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        options: {
          presets: [
            'es2015',
            'react',
            'stage-2'
          ]
        }
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader'},
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      }
    ]
  },
  plugins
};
