const HtmlPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './main.js',
  output: {
    publicPath: '/',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [new HtmlPlugin({ template: './index.html' })],
}
