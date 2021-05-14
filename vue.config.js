module.exports = {
  devServer: {
    proxy: {
      "/x/passport-login": {
        // target:"https://127.0.0.1:3000",  //设置结构域名ip端口
        // target:"https://api.kele8.cn/agent??",  //设置结构域名ip端口
        target: "http://passport.bilibili.com",  //设置结构域名ip端口
        // target:"https://passport.bilibili.com",  //设置结构域名ip端口
        // target:"https://api.bilibili.com/x",  //设置结构域名ip端口
        //   target:"https://api.bilibili.com/x/web-interface",  //设置结构域名ip端口
        changeOrigin: true,
        // pathRewrite: {
        //   "^/a": "" // 去掉接口地址中的api字符串
        // }
      },
      "/x": {
        // target:"https://127.0.0.1:3000",  //设置结构域名ip端口
        // target:"https://api.kele8.cn/agent??",  //设置结构域名ip端口
        // target:"http://passport.bilibili.com",  //设置结构域名ip端口
        target: "https://api.bilibili.com",  //设置结构域名ip端口
        //   target:"https://api.bilibili.com/x/web-interface",  //设置结构域名ip端口
        changeOrigin: true,
        // pathRewrite: {
        //   "^/a": "" // 去掉接口地址中的api字符串
        // }
      },
      "/dynamic_svr": {
        // target:"https://127.0.0.1:3000",  //设置结构域名ip端口
        // target:"https://api.kele8.cn/agent??",  //设置结构域名ip端口
        // target:"http://passport.bilibili.com",  //设置结构域名ip端口
        target: "https://api.vc.bilibili.com",  //设置结构域名ip端口
        //   target:"https://api.bilibili.com/x/web-interface",  //设置结构域名ip端口
        changeOrigin: true,
        // pathRewrite: {
        //   "^/a": "" // 去掉接口地址中的api字符串
        // }
      },
      "/pgc": {
        // target:"https://127.0.0.1:3000",  //设置结构域名ip端口
        // target:"https://api.kele8.cn/agent??",  //设置结构域名ip端口
        // target:"http://passport.bilibili.com",  //设置结构域名ip端口
        target: "https://api.bilibili.com",  //设置结构域名ip端口
        //   target:"https://api.bilibili.com/x/web-interface",  //设置结构域名ip端口
        changeOrigin: true,
        // pathRewrite: {
        //   "^/a": "" // 去掉接口地址中的api字符串
        // }
      },
      "/main": {
        // target:"https://127.0.0.1:3000",  //设置结构域名ip端口
        // target:"https://api.kele8.cn/agent??",  //设置结构域名ip端口
        // target:"http://passport.bilibili.com",  //设置结构域名ip端口
        target: "http://s.search.bilibili.com",  //设置结构域名ip端口
        //   target:"https://api.bilibili.com/x/web-interface",  //设置结构域名ip端口
        changeOrigin: true,
        // pathRewrite: {
        //   "^/a": "" // 去掉接口地址中的api字符串
        // }
      },
      "/web": {
        // target:"https://127.0.0.1:3000",  //设置结构域名ip端口
        // target:"https://api.kele8.cn/agent??",  //设置结构域名ip端口
        target: "http://passport.bilibili.com",  //设置结构域名ip端口
        // target:"https://api.bilibili.com/x",  //设置结构域名ip端口
        //   target:"https://api.bilibili.com/x/web-interface",  //设置结构域名ip端口
        changeOrigin: true,
      },
      "/": {
        // target:"https://127.0.0.1:3000",  //设置结构域名ip端口
        // target:"https://api.kele8.cn/agent??",  //设置结构域名ip端口
        target: "http://passport.bilibili.com",  //设置结构域名ip端口
        // target:"https://api.bilibili.com/x",  //设置结构域名ip端口
        //   target:"https://api.bilibili.com/x/web-interface",  //设置结构域名ip端口
        changeOrigin: true,
      },

    }
  }
}
// https://api.kele8.cn/agent/http://passport.bilibili.com/web/captcha/combine?plat=6