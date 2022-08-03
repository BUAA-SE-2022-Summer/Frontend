const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: '/app/web',  // /app/web/ 对应后面`nginx`路径，这里添加的目的是其他静态资源文件统一前缀路径
  /*
  publicPath: process.env.NODE_ENV === 'production'
    ? '/app/web/'   // /app/web/ 对应后面`nginx`路径，这里添加的目的是其他静态资源文件统一前缀路径
    : '/',
  */
  devServer: {
    // proxy: 'http://127.0.0.1:8000/',
    // 配置代理
    proxy: {
      '/api': {
        target: 'http://horik.cn:8000/',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
  },
})
