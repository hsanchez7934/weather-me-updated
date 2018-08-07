const path = require('path');
const HTMLWebpackPlugin = require("html-webpack-plugin");
const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: __dirname + "/src/index.html",
  filename: "index.html",
  inject: "body"
});

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.js'
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [ 'style-loader', 'css-loader' ]
    }, {
      test: /\.js$/,
      include: [path.resolve(__dirname, '/src')],
      exclude: [path.resolve(__dirname, '/node_modules')],
      loader: 'babel-loader'
    }]
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src')
    ],
    extensions: ['.js', '.json', '.css']
  },
  watch: true,
  mode: 'development',
  plugins: [HTMLWebpackPluginConfig]
};
