class TestPlugin {
  constructor () {
    console.log('TestPlugin constructor')
  }
  apply (compiler) { // compiler是webpack创建的
    // eslint-disable-next-line no-debugger
    debugger
    // console.log('TestPlugin apply')
    // 由文档可知environment是同步钩子，所以需要使用tap注册
    compiler.hooks.environment.tap('TestPlugin', function () {
      console.log('TestPlugin environment')
    })

    // 由文档可知emit是异步串行钩子
    compiler.hooks.emit.tap('TestPlugin', (compalation) => {
      console.log('Test Plugin emit 111')
    })
    compiler.hooks.emit.tapAsync('TestPlugin', (compalation, callBack) => {
      setTimeout(() => {
        console.log('Test Plugin emit 222')
        callBack()
      }, 2000)
    })
    compiler.hooks.emit.tapPromise('TestPlugin', (compalation) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('Test Plugin emit 333')
          resolve()
        }, 1000)
      })
    })

    // 由文档可知make是异步并行钩子 AsyncParalleHook
    compiler.hooks.make.tapAsync('TestPlugin', (compilation, callback) => {
      // 需要在compilation hooks触发前注册才能使用
      compilation.hooks.seal.tap('TestPlugin', () => {
        console.log('TestPlugin seal')
      })
      setTimeout(() => {
        console.log('TestPlugin make 111')
        callback()
      }, 3000)
    })
    compiler.hooks.make.tapAsync('TestPlugin', (compilation, callback) => {
      setTimeout(() => {
        console.log('TestPlugin make 222')
        callback()
      }, 1000)
    })
    compiler.hooks.make.tapAsync('TestPlugin', (compilation, callback) => {
      setTimeout(() => {
        console.log('TestPlugin make 333')
        callback()
      }, 2000)
    })
  }
}
module.exports = TestPlugin