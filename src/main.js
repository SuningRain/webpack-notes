/*
 * @Descripttion:
 * @Author: ZhangYu
 * @Date: 2023-03-31 22:09:44
 * @LastEditors: ZhangYu
 * @LastEditTime: 2023-04-02 12:37:48
 */
import './css/iconfont.css'
import './css/index.css'
import './less/index.less'
import './sass/index.sass'
import './sass/index.scss'
import count from './js/count'
import sum from './js/sum'

console.log(count(1, 2))
console.log(sum(1, 2 ,3))
document.getElementById('btn').onclick = function () {
  // webpack 魔法命名 打包后的文件名
  import(/* webpackChunkName: "math", webpackPrefetch: true */ './js/math').then(({ mul }) => {
    console.log(mul(2, 3))
  })
}

if (module.hot) { // 开发环境
  // js热模块替换需要单独处理，css开启hot后默认支持热替换
  // 实际vue项目中有 vue-loader自动帮助配置   react有react-hot-loader
  module.hot.accept('./js/count')
  module.hot.accept('./js/sum')
  module.hot.accept('./js/math')
}

// new Promise ((reslove) => {
//   setTimeout(() => {
//     reslove()
//   })
// })

// [1, 2].includes(1)

// 注册离线访问serviceWorker
if ('serviceWorker' in navigator) {
  console.log('serviceWorker')
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./service-worker.js')
      .then((resistration) => {
        console.log('SW registered: ', resistration)
      })
      .catch((registartionError) => {
        console.log("SW registration failed: ", registartionError)
      })
  })
}