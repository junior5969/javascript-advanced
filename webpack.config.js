const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // Importa il plugin

module.exports = {
  entry: './assets/script/app.js', // Il punto di ingresso
  output: {
  path: path.resolve(__dirname, 'dist'), // La cartella di output
  filename: 'bundle.js', // Forza il nome del file
  clean: true,  // Pulizia della cartella dist prima della build
  publicPath: '/javascript-advanced/',
  },
  mode: 'development', // Modalità di sviluppo
  module: {
    rules: [
      {
        test: /\.css$/i, // Regola per i file CSS
        use: [MiniCssExtractPlugin.loader, 'css-loader'], // Usa MiniCssExtractPlugin per estrarre il CSS
      },
      {
      test: /\.(jpg|jpeg|png|gif|svg|ico)$/i,  // Aggiungi anche ico per le icone
      type: 'asset/resource', 
      generator: {
        filename: 'assets/img/[name][hash][ext][query]', // Posiziona correttamente le immagini
        },
      },
      {
        test: /\.html$/i, // Gestione dei file HTML
        loader: 'html-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html', // Usa il template HTML
      filename: 'index.html',   // Specifica il nome del file di output
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css', // Nome del file CSS
    }),
  ],
  devServer: {
    contentBase: './dist',
    open: true,
  },
};