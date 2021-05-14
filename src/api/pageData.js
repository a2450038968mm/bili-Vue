import request from "./http"


export function getIndexData(params){
  return request({
    // url:"/add",
    url:"/x/web-interface/wx/hot?ps=100",
    // url:"/https://api.bilibili.com/x/web-interface/wx/hot?ps=100",
    // url:"/add",
    method:"get",
    params
  })
}

// 获取板块推荐
export function getRecommend(params){
  return request({
    // url:"/add",
    url:"/x/web-interface/ranking/region",
    // url:"/add",
    method:"get",
    params
  })
}
// 获取板块最新
export function getNewData(params){
  return request({
    // url:"/add",
    url:"/x/web-interface/dynamic/region",
    // url:"/add",
    method:"get",
    params
  })
}


    // /https://api.bilibili.com/x/web-interface