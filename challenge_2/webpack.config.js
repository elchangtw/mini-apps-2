const path = require('path');

module.exports = {
  // mode: "production",
  entry: "./client/app.jsx",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, "client")
        ],
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-react"]
        },
      }
    ]
  }
}