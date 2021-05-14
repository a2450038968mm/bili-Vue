import request from "./http"
// import qs from 'qs';

// 获取极验插件参数
export function getGeeTest(params) {
  return request({
    url: "/web/captcha/combine?plat=6",  //http://passport.bilibili.com/web/captcha/combine?plat=6
    method: "get",
    params
  })
}

// 获取加密公钥
export function getSaltValue(params) {
  return request({
    url: "/login?act=getkey",  //http://passport.bilibili.com/login?act=getkey
    method: "get",
    params
  })
}
// 获取加密公钥
export function exitlogin(params) {
  return request({
    url: "/login?act=exit",  //http://passport.bilibili.com/login?act=exit
    method: "get",
    params
  })
}

// 密码登录
export function login(data) {
  return request({
    url: "/web/login/v2",  //http://passport.bilibili.com/web/login/v2
    method: "post",
    // data: qs.stringify(data)
    data: data,
    headers:{
      "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8",
    }
  })
}

// 短信登录
export function getmsglogin(data) {
  return request({ //https://passport.bilibili.com/x/passport-login/web/sms/send
    url: "/web/sms/general/v2/send",  //http://passport.bilibili.com/web/sms/general/v2/send
    method: "post",
    // data: qs.stringify(data)
    data: data
  })
}
// 获取短信
export function getTelMsg(data) {
  console.log("axios-----------",data);
  return request({ //https://passport.bilibili.com/x/passport-login/web/sms/send
    url: "/x/passport-login/web/sms/send",  //https://passport.bilibili.com/x/passport-login/web/sms/send
    method: "post",
    // data: qs.stringify(data)
    data:data,
    headers:{
      "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8",
    }
  })
}
// 短信token
export function getmsgtoken(params) {
  return request({
    url: "/x/passport-login/captcha?source=main_h5",  //https://passport.bilibili.com/x/passport-login/captcha?source=main_h5
    method: "get",
    // data: qs.stringify(data)
    params
  })
}
// 短信登录
export function phoneLogin(data) {
  return request({
    url: "/web/login/rapid",  //http://passport.bilibili.com/web/login/rapid
    method: "post",
    // data: qs.stringify(data)
    data,
    headers:{
      "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8",
    }
  })
}

// 退出登录

