const path = require("path");
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin("[name].css");

const HtmlWebPack = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
})

module.exports = {
  entry: ["babel-polyfill", "./src/app.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "./[name].js"
  },
  devtool: 'source-map',
  devServer: {
    contentBase: "./dist"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          fallback: "style-loader",
          use: [{
              loader: "css-loader",
              options: {
                sourceMap: true,
                minimize: true
              }
          }, {
              loader: "sass-loader",
              options: {
                sourceMap: true
              }
          }]
        })
      }
    ]
  },
  plugins: [
    HtmlWebPack,
    extractSass
  ]
};