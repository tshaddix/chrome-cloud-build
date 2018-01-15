module.exports = {
  entry: "./ui/src/index.tsx",

  output: {
    filename: "ui.js",
    path: __dirname + "/../build/"
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },

      // All css files should be passed through 'style-loader' and 'css-loader'
      {
        test: /\.css$/,
        loader: ["style-loader", "css-loader?sourceMap&modules"]
      },

      {
        test: /\.png$/,
        loader: "url-loader",
        query: { mimetype: "image/png" }
      }
    ]
  }
};
