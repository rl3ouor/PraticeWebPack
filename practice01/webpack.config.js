// 웹팩은 여러개 파일을 하나의 파링로 합쳐주는 번들러
const path = require("path");
const webpack = require("webpack");
const banner = require("./setting/banner.js");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: { main: "./src/app.js" }, // 어플리케이션 진입점
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  // 로더란 타입스크립트 같이 다른 언어를 자바스크립트 문법으로 변환해주거나 이미지를 data URL 형식의 문자열로 변환해준다.
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader", // 바벨 로더를 추가한다
      },
      //CSS 파일을 자바스크립트에서 불러와 사용하려면 CSS를 모듈로 변환
      //style-loader는 자바스크립트로 변경된 스타일을 동적으로 돔에 추가하는 로더
      {
        test: /\.css$/, // .css 확장자로 끝나는 모든 파일
        use: ["style-loader", "css-loader"], // css-loader를 적용
      },
      {
        test: /\.png$/,
        loader: "file-loader", // 파일 로더를 적용한다
        options: {
          publicPath: "./dist/", // prefix를 아웃풋 경로로 지정
          name: "[name].[ext]?[hash]", // 파일명 형식
        },
      },
    ],
  },
  plugins: [
    new webpack.BannerPlugin(banner),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify("v.1.2.3"),
      PRODUCTION: JSON.stringify(false),
      MAX_COUNT: JSON.stringify(999),
      "api.domain": JSON.stringify(
        "[http://dev.api.domain.com](http://dev.api.domain.com)"
      ),
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html", // 템플릿 경로를 지정
      templateParameters: {
        // 템플릿에 주입할 파라매터 변수 지정
        env: process.env.NODE_ENV === "development" ? "(개발용)" : "",
      },
    }),
    new CleanWebpackPlugin(),
  ],
};
