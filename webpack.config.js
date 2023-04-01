/*
 * @Descripttion: webpack配置文件
 * @Author: ZhangYu
 * @Date: 2023-04-01 00:31:26
 * @LastEditors: ZhangYu
 * @LastEditTime: 2023-04-01 14:42:19
 */
const ESLintWebpackPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  mode: 'development',
  // 入口
  entry: {
    path: './src/main.js' // 相对路径
  },
  // 输出
  output: {
    // 绝对路径，__dirname表示nodejs变量，代表当前文件夹的文件目录
    path: path.resolve(__dirname, 'dist'),
    // 打包输出，入口文件路径
    filename: 'static/js/main.js',
    // 打包自动清除上一个dist 开发环境不需要
    // clean: true
  },
  // 加载器
  module: {
    rules: [
      // loader的配置
      {
        test: /\.css$/,
        use: [ // 执行顺序从后往前
          'style-loader', // 将js中css通过创建style标签添加到html文件中生效
          'css-loader' // 将css资源编译成commonjs的模块到js中
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader', 'css-loader', 'less-loader'
        ]
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          'style-loader', 'css-loader', 'sass-loader'
        ]
      },
      { // webpack默认配置了url loader，图片默认会处理，这里处理特性需求
        test: /\.(png|jpe?g|gif|webp|svg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: { // 针对图片大小小于10kb的转成base64，减少资源请求
            maxSize: 10 * 1024
          }
        },
        generator: {
          // 输出图片位置
          filename: 'static/images/[hash:10][ext][query]'
        }
      },
      {
        test: /\.(ttf|woff2?)$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/fonts/[hash:10][ext][query]'
        }
      },
      {
        test: /\.(mp3|mp4|avi)$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/media/[hash:10][ext][query]'
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/, // 排除
        loader: 'babel-loader'
        // use: {
        //   options: {
        //     presets: ['@babel/preset-env']
        //   }
        // }
      }
    ]
  },
  // 插件
  plugins: [
    new ESLintWebpackPlugin({
      context: path.resolve(__dirname, 'src')
    }),
    new HtmlWebpackPlugin({
      // 模板：以public/index.html文件创建新的html文件
      template: path.resolve(__dirname, 'public/index.html')
    })
  ],
  // 不会在dist目录下输出，它是在内存中编译打包的。
  devServer: {
    host: 'localhost',
    port: '8080',
    open: true // 是否自动打开浏览器
  }
}