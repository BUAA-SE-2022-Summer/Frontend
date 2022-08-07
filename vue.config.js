const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: '/',
  /*
  publicPath: process.env.NODE_ENV === 'production'
    ? '/app/web/'   // /app/web/ 对应后面`nginx`路径，这里添加的目的是其他静态资源文件统一前缀路径
    : '/',
  */
  devServer: {  // 开发环境下的配置  本地使用webpack代理
    proxy: {
      '/api': {   // 设置普通的http代理
        target: 'http://horik.cn:8000/',
        changeOrigin: true, // 允许跨域
        pathRewrite: {
          '^/api': '/api' // 重写路径
        }
      },
      '/socket': {// 设置websocket代理
        target: 'http://horik.cn:8000/',
        ws: true, // 开启websocket代理
        changeOrigin: true,
        pathRewrite: {
          '^/socket': ''  // 重写路径
        }
      }
    },
  }
})
