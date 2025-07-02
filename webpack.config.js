const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isGitHubPages = process.env.DEPLOY_ENV === 'GH_PAGES'; // Variabile di ambiente per GitHub Pages

module.exports = {
  entry: './assets/script/app.js', // Il punto di ingresso del tuo JS
  output: {
    path: path.resolve(__dirname, 'dist'), // Cartella di destinazione
    filename: '[name].js',
    // Cambia publicPath dinamicamente
    publicPath: isGitHubPages ? '/javascript-advanced/' : '/', // Se su GitHub Pages, aggiungi il nome del repo
  },
  module: {
    rules: [
      {
        test: /\.css$/i, // Riconosce i file CSS
        use: [MiniCssExtractPlugin.loader, 'css-loader'], // Usa MiniCssExtractPlugin per estrarre il CSS
      },
      {
        test: /\.html$/i, // Riconosce i file HTML
        loader: 'html-loader',
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg|ico)$/i, // Riconosce i file immagine
        type: 'asset/resource', // Copia le immagini nella cartella dist
        generator: {
          filename: 'assets/img/[name][ext][query]', // Organizza le immagini nella cartella assets/img
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(), // Pulizia della cartella dist prima di ogni build
    new HtmlWebpackPlugin({
      template: './index.html', // Usa il file index.html come template
      filename: 'index.html', // Salva il file HTML nella cartella dist
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css', // Estrae il CSS in un file separato
    }),
  ],
  devServer: {
    static: path.join(__dirname, 'dist'),
    port: 8080,
  },
};