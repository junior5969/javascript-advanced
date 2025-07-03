const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const isGitHubPages = process.env.DEPLOY_ENV === 'GH_PAGES';

module.exports = {
  entry: './assets/script/app.js', 
  output: {
    path: path.resolve(__dirname, 'dist'), 
    filename: '[name].js',
    publicPath: isGitHubPages ? '/javascript-advanced/' : '', 
  },
  optimization: {
    minimize: true, // Abilita la minimizzazione del codice
    minimizer: [new TerserPlugin()],
    splitChunks: {
      chunks: 'all', // 'all' significa che vengono splittati anche i moduli di terze parti
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/, // I moduli in node_modules verranno separati
          name: 'vendors',
          chunks: 'all', // Questo separa tutto il codice di librerie come React, Lodash, ecc.
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/i, 
        use: [MiniCssExtractPlugin.loader, 'css-loader'], 
      },
      {
        test: /\.html$/i, 
        loader: 'html-loader',
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg|ico)$/i, 
        type: 'asset/resource', 
        generator: {
          filename: 'assets/img/[name][ext][query]', 
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(), 
    new HtmlWebpackPlugin({
      template: './index.html', 
      filename: 'index.html', 
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css', 
    }),
  ],
  devServer: {
    static: path.join(__dirname, 'dist'),
    port: 8080,
  },
};