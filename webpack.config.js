var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [path.resolve(__dirname, './src/client/scripts/client.js')],
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [path.join(__dirname, 'src/')],
        use: [
          {
            loader: 'react-hot-loader'
          },
          {
            loader: 'babel-loader',
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.woff(\d+)?$/,
        use: ['url?prefix=font/&limit=5000&mimetype=application/font-woff']
      },
      {
        test: /\.ttf$/,
        use: ['file?prefix=font/']
      },
      {
        test: /\.eot$/,
        use: ['file?prefix=font/']
      },
      {
        test: /\.svg$/,
        use: ['file?prefix=font/']
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: ["url-loader?limit=10000&minetype=application/font-woff"]
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: ["file-loader"]
      }
    ]
  }
};
