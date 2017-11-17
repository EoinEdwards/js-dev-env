import path from 'path';
import webpack from 'webpack';
import HtmlWebPackPlugin from 'html-webpack-plugin';

export default {
  debug: false,
  devtool: 'source-map',
  noInfo: false,
  entry: [
    path.resolve(__dirname, 'src/index')
  ],
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    // Create HTML file that includes reference to bundle.js
    new HtmlWebPackPlugin({
      template: 'src/index.html',
      inject:true,
      minify:{
        removeComments:true,
        collapseWhitespace:true
      }
    }),

    // Minify JS
    new webpack.optimize.UglifyJsPlugin(),

    //Eliminate Duplicates when generating bundles
    new webpack.optimize.DedupePlugin()
  ],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loaders: ['style','css']}
    ]
  }
}
