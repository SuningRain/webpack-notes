/*
 * @Descripttion:
 * @Author: ZhangYu
 * @Date: 2023-04-01 12:13:47
 * @LastEditors: ZhangYu
 * @LastEditTime: 2023-04-02 10:57:10
 */
module.exports = {
  // 基础 Eslint 规则
  extends: ["eslint:recommended"],
  env: { // 环境变量
    node: true, // 启用node中全局变量
    browser: true // 启用浏览器中全局变量
  },
  parserOptions: {
    ecmaVersion: 'latest', // es6
    sourceType: 'module' // es module
  },
  rules: {
    "no-var": 2 // 不是用var  0 表示可用  1 表示警告  2 表示报错
  },
  plugins: ['import'] // 解决动态导入语法报错
}