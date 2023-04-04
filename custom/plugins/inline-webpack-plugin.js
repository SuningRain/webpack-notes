/*
 * @Descripttion: 将script标签中的引用转为行内，
 * 对一些较短的script文件起到减少网络请求的作用，优化网络带宽
 * @Author: ZhangYu
 * @Date: 2023-04-04 21:46:46
 * @LastEditors: ZhangYu
 * @LastEditTime: 2023-04-04 23:38:52
 */

const HtmlWebpackPlugin = require('safe-require')('html-webpack-plugin')

class InlineWebPackPlugin {
  constructor (options) {
    this.options = options
  }

  apply (compiler) {
    compiler.hooks.compilation.tap('InlineWebPackPlugin', (compilation) => {
      const hooks = HtmlWebpackPlugin.getHooks(compilation)
      hooks.alterAssetTagGroups.tap(
        'InlineWebPackPlugin',
        (assets) => {
          assets.headTags = this.getInlineChunk(assets.headTags, compilation.assets)
          assets.bodyTags = this.getInlineChunk(assets.bodyTags, compilation.assets)
        }
      )
      hooks.afterEmit.tap(
        'InlineWebPackPlugin',
        () => {
          Object.keys(compilation.assets).forEach(filepath => {
            if (this.options.rules.some(rule => rule.test(filepath))) {
              delete compilation.assets[filepath]
              // 如果有map文件也要删掉
              if (`${filepath}.map` in compilation.assets) {
                delete compilation.assets[`${filepath}.map`]
              }
            }
          })
        }
      )
    })
  }
  getInlineChunk (tags, assets) {
    return tags.map(tag => {
      if (tag.tagName !== 'script') return tag
      const filepath = tag.attributes.src
      if (!filepath) return tag
      // 这里把所有包含runtime的都删了，因为开启了source-map后还会有一个.map的文件
      if (!this.options.rules.some(rule => rule.test(filepath))) return tag
      // console.log('资源', assets[filepath].source())
      return {
        tagName: 'script',
        innerHTML: assets[filepath].source(),
        closeTag: true
      }
    })
  }
}

module.exports = InlineWebPackPlugin