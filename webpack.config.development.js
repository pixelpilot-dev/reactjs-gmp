const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = env => {
  return {
    mode: 'development',
    entry: './src/index.tsx',
    output: {
      publicPath: '/',
      filename: '[name].bundle.js',
      chunkFilename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      assetModuleFilename: 'assets/[hash][ext][query]',
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json', '.ts', '.tsx', '.scss', '.css'],
      modules: [path.resolve(__dirname, './src'), 'node_modules'],
    },
    watch: true,
    devtool: 'source-map',
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      compress: true,
      port: 3030,
      open: true,
      hot: true,
      historyApiFallback: true,
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.scss$/,
          use: [
            { loader: MiniCssExtractPlugin.loader },
            'css-loader',
            'sass-loader',
            {
              loader: 'style-resources-loader',
              options: {
                patterns: ['./src/assets/styles/main.scss'],
              },
            },
            'postcss-loader',
          ],
        },
        {
          test: /\.html$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'html-loader',
            },
          ],
        },
        {
          test: /\.(gif|png|jpe?g|svg|woff|woff2)$/i,
          exclude: [path.join(__dirname, './src/assets/sprites')],
          type: 'asset/resource',
        },
        {
          test: /\.svg$/,
          include: [path.join(__dirname, './src/assets/sprites')],
          use: [
            {
              loader: 'svg-sprite-loader',
              options: {},
            },
          ],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanAfterEveryBuildPatterns: ['dist'],
      }),
      new HtmlWebpackPlugin({
        title: 'React App',
        template: 'src/index.html',
        filename: 'index.html',
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[name].css',
      }),
      new ESLintPlugin({
        exclude: 'node_modules',
      }),
      new Dotenv({
        path: `./.env.${env.file}`
      }),
    ],
  }
};
