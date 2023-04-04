/*
 * @Descripttion: 自定义清除插件
 * @Author: ZhangYu
 * @Date: 2023-04-03 13:12:43
 * @LastEditors: ZhangYu
 * @LastEditTime: 2023-04-04 19:19:09
 */
class CleanWebpackPlugin {
  apply (compiler) {
    const outputPath = compiler.options.output.path
    const fs = compiler.outputFileSystem
    // 注册钩子，在打包输出前 emit
    compiler.hooks.emit.tap('CleanWebpackPlugin', (compilation) => {
      this.removeFiles(fs, outputPath)
    })
  }

  removeFiles (fs, filePath) {
    // 删除目录下资源和目录
    const files = fs.readdirSync(filePath)
    console.log('文件', files)
    // 遍历该目录下的所有内容
    files.forEach(item => {
      const path = `${filePath}/${item}`
      const file = fs.statSync(path)
      if (file.isDirectory()) {
        this.removeFiles(fs, path)
      } else {
        console.log('路径', path)
        fs.unlinkSync(path)
      }
    })
  }
}

module.exports = CleanWebpackPlugin