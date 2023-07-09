const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const EslintWebpackPlugin = require('eslint-webpack-plugin');
const StylelintWebpackPlugin = require('stylelint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlInlineScriptWebpackPlugin = require('html-inline-script-webpack-plugin');
const CSSMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');

const mode = process.env.NODE_ENV || 'production';

module.exports = {
  mode: mode,
  entry: {
    main: './src/index.tsx',
    initColorScheme: './src/features/colorScheme/initColorScheme.ts',
    sw: './src/features/serviceWorker/service.worker.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /service\.worker\.ts$/i,
        use: 'ts-loader',
        type: 'asset/resource',
        generator: {
          filename: 'sw.js',
        },
      },
      {
        test: /.webmanifest$/i,
        use: 'webpack-webmanifest-loader',
        type: 'asset/resource',
      },
      {
        test: /\.(svg|jpg|png)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: [/node_modules/, /worker\.ts$/],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      '@components': path.resolve('./src/components'),
      '@features': path.resolve('./src/features'),
      '@app': path.resolve('./src/app'),
      '@images': path.resolve('./src/images'),
    },
  },
  optimization: {
    runtimeChunk: mode === 'production' ? false : 'single',
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [`...`, new CSSMinimizerWebpackPlugin()],
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: './src/images/favicon.ico',
      template: './src/app/index.html',
      excludeChunks: ['sw'],
    }),
    new HtmlInlineScriptWebpackPlugin({ scriptMatchPattern: [/initColorScheme\..+\.js$/] }),
    new StylelintWebpackPlugin({
      files: '{**/*,*}.css',
    }),
    new EslintWebpackPlugin({
      files: '{**/*,*}.{tsx,js,ts}',
    }),
    new MiniCssExtractPlugin({
      filename: 'bundle.[contenthash].css',
    }),
  ],
  devServer: {
    open: true,
    historyApiFallback: {
      disableDotRule: true,
    },
  },
};
