/*
 * @Descripttion:
 * @Author: ZhangYu
 * @Date: 2023-04-01 14:05:32
 * @LastEditors: ZhangYu
 * @LastEditTime: 2023-04-02 11:47:51
 */
module.exports = {
  // 智能预设，能够编译ES6语法
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage', // 按需加载自动引入
        corejs: 3
      }
    ]
  ]
}