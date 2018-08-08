const path = require('path');
const HTMLWebpackPlugin = require("html-webpack-plugin");
const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: __dirname + "/src/index.html",
  filename: "index.html",
  inject: "body"
});

module.exports = {
  entry: {
    main: './src/index.js',
    test: "mocha!./test/test.js"
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.js'
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.js$/,
      include: [
        path.resolve(__dirname, '/src'),
        path.resolve(__dirname, '/test')
      ],
      exclude: [path.resolve(__dirname, '/node_modules')],
      loader: 'babel-loader'
    },
    {

    }]
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'test')
    ],
    extensions: ['.js', '.json', '.css']
  },
  watch: true,
  mode: 'development',
  plugins: [HTMLWebpackPluginConfig]
};
