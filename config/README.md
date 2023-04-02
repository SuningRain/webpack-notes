<!--
 * @Descripttion: 配置说明
 * @Author: ZhangYu
 * @Date: 2023-04-01 16:57:05
 * @LastEditors: ZhangYu
 * @LastEditTime: 2023-04-02 13:20:21
-->
#### 基础配置总结

1. 两种开发模式
   - 开发模式：代码能编译自动化运行
   - 生产模式：代码编译优化输出

2. webpack基本功能
   - 开发模式：可以编译ES Module语法
   - 生产模式：可以编译ES Module语法，压缩代码

3. webpack配置文件
   - 5个核心概念
  > entry
  > output
  > loader
  > plugins
  > mode
   - devServe配置

4. webpack脚本指令用法
   - webpack 直接打包输出
   - webpack serve 启用开发服务器，内存编译打包没有输出


#### 优化方式总结
1. 提升开发体验
   - 使用 Source Map 让开发或者上线时代码报错能有更加准确的错误提示

2. 提升webpack打包构建速度
   - 使用 HotModuleReplacement 让开发时只重新编译打包更新变化了的代码，不变的代码使用缓存，从而更新速度更快
   - 使用OneOf让资源文件一旦被某个loader处理了，就不会继续遍历了，打包速度更快
   - 使用Include/Exclude排除或只检测某些文件，处理的文件更少，速度更快
   - 使用Cache对eslint和babel处理的结构进行缓存，让第二次打包速度更快
   - 使用thread多进程处理eslint和babel任务，速度更快。（需要注意的是，进程启动通信都有开销的，要在较多代码处理时使用才有效果）

3. 减少代码体积
   - 使用 Tree Shaking 剔除了没有使用的多余代码，让代码体积更小。
   - 使用 @babel/plugin-transform-runtime 插件对babel进行处理，让辅助代码从中引入，而不是每个文件都生成辅助代码，从而体积更小
   - 使用 Image Miimizer 对项目中图片进行压缩，体积更小，请求速度更快。（需要注意，如果图片都是在线连接，就不需要了。本地项目静态图片才需要进行压缩）

4. 优化代码运行性能
   - 使用 Code Split 对代码分割成多个js文件，从而使单个文件体积更小，并行加载js速度更快。并通过import语法动态导入，按需加载。从而达到性需要使用时才加载资源，不用时不加载资源。
   - 使用 Preload / Prefetch 对代码进行提前加载，等未来需要使用时就能直接使用，从而用户体验更好。
   - 使用 Network Cache 能对输出资源文件更好的命名，将来好做缓存，用户体验更好。
   - 使用 Core-js 对 js 进行兼容性处理，让我们代码能够运行在低版本的浏览器中。
   - 使用 PWA 能让代码离线也能访问，从而提升用户体验。