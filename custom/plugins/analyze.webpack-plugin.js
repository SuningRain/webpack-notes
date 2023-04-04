/*
 * @Descripttion:
 * @Author: ZhangYu
 * @Date: 2023-04-04 19:23:16
 * @LastEditors: ZhangYu
 * @LastEditTime: 2023-04-04 20:59:28
 */
class AnalyzeWebpackPlugin {
  apply (compiler) {
    compiler.hooks.emit.tap('AnalyzeWebpackPlugin', (compilation) => {
      const assets = Object.entries(compilation.assets)
      let content = `| 资源名称 | 资源大小 |
| --- | --- |`
      assets.forEach(([filename, file]) => {
        content += `\n| ${filename} | ${Math.ceil(file.size() / 1024)}kb |`
      })
      compilation.assets['analyze.md'] = {
        source () {
          return content
        },
        size () {
          return content.length
        }
      }
    })
  }
}

module.exports = AnalyzeWebpackPlugin