const path = require('path'),
  webpack = require('webpack'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin')

const paths = {
  src: path.resolve(__dirname, 'src'),
}

module.exports = {
  entry: {
    newtab: ['./src/newtab/Newtab.tsx'],
    vendor: ['react', 'react-dom'],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'js/[name].bundle.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: __dirname + '/build/',
    inline: true,
    hot: true,
    open: true,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    alias: {
      actions: path.resolve(paths.src, 'newtab', 'actions'),
      modals: path.resolve(paths.src, 'newtab', 'components', 'ui', 'modals'),
      components: path.resolve(paths.src, 'newtab', 'components'),
      constants: path.resolve(paths.src, 'newtab', 'constants'),
      containers: path.resolve(paths.src, 'newtab', 'containers'),
      models: path.resolve(paths.src, 'newtab', 'models'),
      reducers: path.resolve(paths.src, 'newtab', 'reducers'),
      selectors: path.resolve(paths.src, 'newtab', 'selectors'),
      store: path.resolve(paths.src, 'newtab', 'store'),
      styles: path.resolve(paths.src, 'newtab', 'styles'),
      utils: path.resolve(paths.src, 'utils'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
      },
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre',
      },
      {
        test: /\.(sc|c)ss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {},
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new CopyWebpackPlugin([
      {
        from: 'src/manifest.json',
        transform: function(content, path) {
          return Buffer.from(
            JSON.stringify({
              description: process.env.npm_package_description,
              version: process.env.npm_package_version,
              ...JSON.parse(content.toString()),
            })
          )
        },
      },
      {
        from: 'src/images',
        to: 'images',
      },
    ]),
    new HtmlWebpackPlugin({
      template: path.resolve(paths.src, 'newtab.html'),
      filename: 'index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
}
