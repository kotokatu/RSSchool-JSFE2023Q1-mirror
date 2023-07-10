const path = require("path");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const EslintPlugin = require("eslint-webpack-plugin");
const svgToMiniDataURI = require('mini-svg-data-uri');

const baseConfig = {
  entry: path.resolve(__dirname, "./src/app"),
  mode: "development",
  module: {
    rules: [
        {
            test: /^((?!__inline).)*\.svg$|\.(png|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
            generator: {
              filename: '[name].[hash][ext]',
            },
          },
          {
            test: /(__inline)\.svg$/i,
            type: 'asset/source',
          },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      { test: /\.ts$/i, use: "ts-loader" },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    filename: "[name].js",
    chunkFilename: "[id].[chunkhash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      // favicon: path.resolve(__dirname, './src/favicon.ico'),
      // filename: 'index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: false,
      },
    }),
    new EslintPlugin({ extensions: "ts" }),
  ],
};

module.exports = ({ mode }) => {
  const isProductionMode = mode === "prod";
  const envConfig = isProductionMode
    ? require("./webpack.prod.config")
    : require("./webpack.dev.config");

  return merge(baseConfig, envConfig);
};
