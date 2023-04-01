/*
 * @Descripttion: webpack 生产环境 配置文件
 * @Author: ZhangYu
 * @Date: 2023-04-01 00:31:26
 * @LastEditors: ZhangYu
 * @LastEditTime: 2023-04-01 18:06:49
 */
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const ESLintWebpackPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

// 用来获取处理样式的loader
function getStyleLoader (pre) {
  return [ // 执行顺序从后往前
    MiniCssExtractPlugin.loader, // 将js中css通过创建style标签添加到html文件中生效
    'css-loader', // 将css资源编译成commonjs的模块到js中
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [
            'postcss-preset-env' // 能解决大多数样式兼容性问题
          ]
        }
      }
    },
    pre
  ].filter(Boolean)
}

module.exports = {
  mode: 'production',
  // 入口
  entry: {
    path: './src/main.js' // 相对路径
  },
  // 输出 开发环境不需要
  output: {
    // 绝对路径，__dirname表示nodejs变量，代表当前文件夹的文件目录
    path: path.resolve(__dirname, '../dist'),
    // 打包输出，文件名
    filename: 'static/js/main.js',
    // 打包自动清除上一个dist
    clean: true
  },
  // 加载器
  module: {
    rules: [
      {
        oneOf: [ // 使对应的文件只匹配一次，优化性能
          // loader的配置
          {
            test: /\.css$/,
            use: getStyleLoader()
          },
          {
            test: /\.less$/,
            use: getStyleLoader('less-loader')
          },
          {
            test: /\.s[ac]ss$/,
            use: getStyleLoader('sass-loader')
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
            // exclude: /node_modules/, // 排除
            include: path.resolve(__dirname, '../src'),
            loader: 'babel-loader',
            options: {
              // presets: ['@babel/preset-env']
              cacheDirectory: true, // 开启babel缓存
              cacheCompression: false // 关闭缓存文件压缩
            }
          }
        ]
      }
    ]
  },
  // 插件
  plugins: [
    new ESLintWebpackPlugin({
      context: path.resolve(__dirname, '../src'),
      exclude: "node_modules",
      cache: true, // 开启缓存
      cacheLocation: path.resolve(
        __dirname,
        '../node_modules/.cache/eslintcache'
      )
    }),
    new HtmlWebpackPlugin({
      // 模板：以public/index.html文件创建新的html文件
      template: path.resolve(__dirname, '../public/index.html')
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/main.css'
    }), // 单独提取css文件
    new CssMinimizerPlugin()
  ],
  devtool: 'source-map' // 有行和列的映射
}