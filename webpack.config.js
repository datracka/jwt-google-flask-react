var webpack = require("webpack");
var path = require("path");
const Dotenv = require("dotenv-webpack");

let plugins;
let jsxRules;

if (process.env.NODE_ENV !== "production") {
  console.log("--> loading development plugins");
  plugins = [new Dotenv()];
  jsxRules = ["babel-loader"];
} else {
  console.log("--> loading production plugins");
  plugins = [
    new webpack.DefinePlugin({
      "process.env.EXAMPLE": JSON.stringify(process.env.EXAMPLE),
    }),
  ];
  jsxRules = ["babel-loader", "eslint-loader"];
}

module.exports = {
  entry: "./client/index.js",
  output: {
    path: __dirname + "/server/static",
    filename: "[name].js",
    publicPath: __dirname + "/server/static",
  },
  resolve: {
    extensions: [
      ".ts",
      ".tsx",
      ".js",
      ".jsx",
      ".scss",
      ".gql",
      ".graphql",
    ],
    modules: [path.resolve(__dirname), "node_modules"],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  externals: {
    gapi: "gapi",
  },
  devtool: "source-map",
  devServer: {
    contentBase: path.join(__dirname, "/server/templates"),
    port: 9000,
    proxy: {
      "!(/static/**/**.*)": {
        target: "http://127.0.0.1:5000",
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: jsxRules,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: "graphql-tag/loader",
      },
    ],
  },
  plugins,
};
