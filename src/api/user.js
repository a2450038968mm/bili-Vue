import request from "./http"

// 用户信息
export function getUserinfo(params) {
  return request({
    url: "/x/space/acc/info",  //https://passport.bilibili.com/x/passport-login/captcha?source=main_h5
    method: "get",
    // data: qs.stringify(data)
    params
  })
}
// 用户信息名片
export function getUserinfocard(params) {
  return request({
    url: "/x/web-interface/card",  //http://api.bilibili.com/x/web-interface/card
    method: "get",
    // data: qs.stringify(data)
    params
  })
}
// // 用户视频状态
// export function getUserinfolike(params) {
//   return request({
//     url: "/x/space/upstat",  //https://api.bilibili.com/x/space/upstat?mid=456404164
//     method: "get",
//     // data: qs.stringify(data)
//     params
//   })
// }
// 用户动态
export function getUserstate(params) {
  return request({
    url: "/dynamic_svr/v1/dynamic_svr/space_history",  //https://api.vc.bilibili.com/dynamic_svr/v1/dynamic_svr/space_history?host_uid=381843126&need_top=1
    method: "get",
    // data: qs.stringify(data)
    params
  })
}
// 用户视频
export function getuservideo(params) {
  return request({
    url: "/x/space/arc/search",  //https://api.bilibili.com/x/space/arc/search?pn=1&ps=100&order=click&keyword=&mid=381843126
    method: "get",
    // data: qs.stringify(data)
    params
  })
}

// 自己的用户信息
export function getMyinfo(params) {
  return request({
    url: "/x/space/myinfo",  //http://api.bilibili.com/x/space/myinfo
    method: "get",
    // data: qs.stringify(data)
    params
  })
}