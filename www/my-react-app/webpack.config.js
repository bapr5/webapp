const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Подключаем плагин
const CopyPlugin = require('copy-webpack-plugin'); // Плагин для копирования файлов

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.jsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', {
          loader: 'css-loader',
          options: {
            modules: true
          }
        }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', 
      filename: 'index.html' 
    }),
    new CopyPlugin({
      patterns: [
        { from: 'public/manifest.json', to: 'manifest.json' },
        { from: 'public/service-worker.js', to: 'service-worker.js' },
        { from: 'public/offline.html', to: 'offline.html' },
        // Для тестирования - можете добавить иконки когда они будут готовы
        // { from: 'public/icons', to: 'icons' }
      ],
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    historyApiFallback: true,
    headers: {
      'Service-Worker-Allowed': '/'
    }
  },
  mode: 'development'
};