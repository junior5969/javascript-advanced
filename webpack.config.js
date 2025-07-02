const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isGitHubPages = process.env.DEPLOY_ENV === 'GH_PAGES'; // Variabile di ambiente per GitHub Pages

module.exports = {
  entry: './assets/script/app.js', // Il punto di ingresso del tuo JS
  output: {
    filename: 'bundle.js', // Il nome del file bundle che verrà generato
    path: path.resolve(__dirname, 'dist'), // La cartella di output
    publicPath: isGitHubPages ? '/javascript-advanced/' : '/', // Se su GitHub Pages, usa un percorso relativo
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
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './assets/index.html', // Usa il file index.html come template
      filename: 'index.html', // Salva il file HTML nella cartella dist
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css', // Estrae il CSS in un file separato
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'), // Serve il contenuto dalla cartella dist
    open: true, // Apre il browser automaticamente durante lo sviluppo
  },
};