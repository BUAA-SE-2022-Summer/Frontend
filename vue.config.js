const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/app/web/',  // /app/web/ 对应后面`nginx`路径，这里添加的目的是其他静态资源文件统一前缀路径
  // publicPath: process.env.NODE_ENV === 'production'
  //   ? '/app/web/'   // /app/web/ 对应后面`nginx`路径，这里添加的目的是其他静态资源文件统一前缀路径
  //   : '/',
})
