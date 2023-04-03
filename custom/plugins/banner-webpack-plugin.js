class BannerWebpackPlugin {
  constructor (options) {
    this.options = options
  }
  apply (compiler) {
    compiler.hooks.emit.tap('BannerWebpackPlugin', (compilation) => {
      // 1. 获取即将输出的资源文件
      // 2. 过滤只保留js和css资源
      // eslint-disable-next-line no-debugger
      const keys = Object.keys(compilation.assets)
      const assetKeys = keys.filter(assetPath => {
        return /(js|css)$/.test(assetPath)
      })
      const prefix = `
/*
* Author: ${this.options.author}
*/
`
      assetKeys.forEach(assetKey => {
        // 获取资源内容
        const source = compilation.assets[assetKey].source()
        // 设置新的内容
        const content = prefix + source
        // 覆盖原有的 source 和 size 方法
        compilation.assets[assetKey] = {
          source () {
            return content
          },
          size () {
            return content.length
          }
        }
      })
    })
  }
}
module.exports = BannerWebpackPlugin