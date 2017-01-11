module.exports = {
  entry: './assets/js/entry.js',
  output: {
    filename: '.tmp/public/js/bundle.js'
  },
  devtool: "cheap-eval-source-map",
  module: {
    loaders: [
      {
        test: /\.(scss|sass|css)$/,
        loaders: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  }
}