const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const APP_DIR = path.resolve(__dirname, 'src');

module.exports = {
  entry: path.join(APP_DIR, 'index.js'),
  resolve: {
    modules: [APP_DIR, 'node_modules'],
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        //include: APP_DIR,
        use: {
          loader: "babel-loader",
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ]
      },
      {
        test: /\.css$/,
        include: APP_DIR,
        use: [
          { 
            loader: 'style-loader',
            options: { sourceMap: true },
          }, 
          { 
          loader: 'css-loader',
            options: {
              modules: true,
              camelCase: true,
              sourceMap: true,
            }
        }]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
};