var path = require("path")

module.exports = {
  entry: {
          App: "./App/assets/scripts/App.js",
          bootstrap: "./App/assets/scripts/bootstrap.js",
          vendor: "./App/assets/scripts/vendor.js"
        },
  output: {
    path: path.resolve(__dirname, "./App/temp/scripts"),
    filename: "[name].js"
  }
}
