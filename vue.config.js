module.exports = {
  devServer: {
port:8000,
    proxy: {
      "/x/passport-login": {
        target: "http://passport.bilibili.com",  //设置结构域名ip端口
        changeOrigin: true,
      },
      "/x": {
        target: "https://api.bilibili.com",  //设置结构域名ip端口
        changeOrigin: true,
      },
      "/dynamic_svr": {
        target: "https://api.vc.bilibili.com",  //设置结构域名ip端口
        changeOrigin: true,
      },
      "/pgc": {
        target: "https://api.bilibili.com",  //设置结构域名ip端口
        changeOrigin: true,
      },
      "/main": {
        target: "http://s.search.bilibili.com",  //设置结构域名ip端口
        changeOrigin: true,
      },
      "/web": {
        target: "http://passport.bilibili.com",  //设置结构域名ip端口
        changeOrigin: true,
      },
      "/": {
        target: "http://passport.bilibili.com",  //设置结构域名ip端口
        changeOrigin: true,
      },

    }
  },
  chainWebpack: config => {
    config.module
      .rule('less')
      .test(/\.less$/)
      .oneOf('vue')
      .use('px2rem-loader')
      .loader('px2rem-loader')
      .before('postcss-loader') // this makes it work.
      .options({ remUnit: 64, remPrecision: 8 })
      .end()
  }
}
// https://api.kele8.cn/agent/http://passport.bilibili.com/web/captcha/combine?plat=6