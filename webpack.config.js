// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
const dotenv = require("dotenv");
const CopyWebpackPlugin = require("copy-webpack-plugin");

dotenv.config();

module.exports = (env, argv) => {
  const prod = argv.mode === "production";

  return {
    mode: "development",
    devtool: "source-map",
    entry: path.resolve(__dirname, "/src/index.js"),
    output: {
      path: path.join(__dirname, "/dist"),
      filename: "main.js",
      publicPath: "/",
    },
    devServer: {
      historyApiFallback: true,
      hot: true,
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      alias: {
        Constants: path.resolve(__dirname, "./src/constants/"),
        Component: path.resolve(__dirname, "/src/component"),
      },
      fallback: {
        // 👇️👇️👇️ add this 👇️👇️👇️
        fs: false,
        os: false,
        path: false,
      },
    },

    module: {
      rules: [
        {
          test: /\.(js|ts)$/,
          use: ["babel-loader"],
        },
        {
          test: /\.(png|jpe?g|gif)$/g,
          loader: "file-loader",
          options: {
            name: "assets/[name].[ext]",
          },
        },
      ],
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [{ from: "public", to: "" }],
      }),
      new webpack.ProvidePlugin({
        React: "react",
      }),
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        minify:
          process.env.NODE_ENV === "production"
            ? {
                collapseWhitespace: true, // 빈칸 제거
                removeComments: true, // 주석 제거
              }
            : false,
      }),
      new CleanWebpackPlugin(),
      new webpack.DefinePlugin({
        "process.env": JSON.stringify(process.env),
      }),
    ],
  };
};
