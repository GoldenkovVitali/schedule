/* eslint-disable */
const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

function NothingPlugin() {
  this.apply = function () {};
}

const config = env => ({
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      { enforce: 'pre', test: /\.js?x$/, loader: 'eslint-loader' },
      {
        // test: /\.js?x$/,
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
      {
        test: /\.(s*)css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 8000,
              name: 'images/[hash]-[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|ttf|otf|eot)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'fonts',
            },
          },
        ],
      },
      {
        test: /\.(mp3)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'audio',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
    new HtmlPlugin({
      template: path.join(__dirname, '/src/index.html'),
      // favicon: path.join(__dirname, '/src/assets/1111.png'),
      // favicon: path.join(__dirname, '/src/assets/1111.svg'),
    }),
    env && env.analyze ? new BundleAnalyzerPlugin() : new NothingPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  watch: true,
  mode: 'development',
  devtool: '#source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
  },
});

module.exports = env => config(env);
