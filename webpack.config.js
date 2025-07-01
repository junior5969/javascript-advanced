const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './assets/script/app.js',  // Punto di ingresso del JS
  output: {
    path: path.resolve(__dirname, 'dist'),  // Cartella di output
    filename: 'bundle.js',  // Nome del file finale
  },
  mode: 'development',  // Imposta la modalità (puoi anche usare 'production' per la versione finale)
  module: {
    rules: [
      {
        test: /\.css$/,  // Regola per i file CSS
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',  // Usa il template di index.html
    }),
  ],
  devServer: {
    contentBase: './dist',  // Cartella da servire
    open: true,  // Apre il browser automaticamente
  },
};