import './css/iconfont.css'
import './css/index.css'
import './less/index.less'
import './sass/index.sass'
import './sass/index.scss'
import count from './js/count'
import sum from './js/sum'

console.log(count(1, 2))
console.log(sum(1, 2 ,3))

if (module.hot) {
  // js热模块替换需要单独处理，css开启hot后默认支持热替换
  // 实际vue项目中有 vue-loader自动帮助配置   react有react-hot-loader
  module.hot.accept('./js/count')
  module.hot.accept('./js/sum')
}