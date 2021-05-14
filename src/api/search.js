import request from "./http"

// 搜索
export function getSearch(params){
  return request({
    // url:"/add",
    url:"/x/web-interface/search/all/v2",
    // url:"/add",
    method:"get",
    params
  })
}
// 分类搜索
export function getClassifySearch(params){
  return request({
    // url:"/add",
    url:"/x/web-interface/search/type",
    // url:"/add",
    method:"get",
    params
  })
}
// 热门搜索
export function getHotSearch(params){
  return request({
    // url:"/add",
    url:"/main/hotword",
    // url:"/add",
    method:"get",
    params
  })
}
// 默认搜索
export function getDefaultSearch(params){
  return request({
    // url:"/add",
    url:"/x/web-interface/search/default",
    // url:"/add",
    method:"get",
    params
  })
}
// 搜索建议
export function getSuggestSearch(params){
  return request({
    // url:"/add",
    url:"/main/suggest",
    // url:"/add",
    method:"get",
    params
  })
}
