import request from "./http"
// import qs from 'qs';

// 获取极验插件参数
export function getRanklist(params) {
  return request({
    url: "/x/web-interface/ranking/v2",  //https://api.bilibili.com/x/web-interface/ranking/v2?rid=160
    method: "get",
    params
  })
}
