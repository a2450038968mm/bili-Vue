import request from "./http"

export function getPlayerDetail(params) {
  return request({
    // url:"/add",
    url: "/x/web-interface/view/detail",
    // url: "/https://api.bilibili.com/x/web-interface/view/detail",
    // url:"/add",
    method: "get",
    params
  })
}

// 获取番剧详情
export function getPlayeranmit(params) {
  return request({
    // url:"/add",
    url: "/pgc/view/web/season",
    // url: "/http://api.bilibili.com/pgc/view/web/season",
    // url:"/add",
    method: "get",
    params
  })
}
export function getPlayeranmitrecomment(params) {
  return request({
    // url:"/add",
    url: "/pgc/season/web/related/recommend",
    // url: "/https://api.bilibili.com/pgc/season/web/related/recommend?season_id=33378",
    // url:"/add",
    method: "get",
    params
  })
}




// 获取评论区明细（有楼层号）
export function getVideoCommentDetail(params) {
  return request({
    url: "x/v2/reply/main",
    // url: "/http://api.bilibili.com/x/v2/reply/main",
    method: "get",
    params
  })
}
// 获取评论区明细（无有楼层号 ）
export function getVideoComment(params) {
  return request({
    url: "/x/v2/reply",
    // url: "/http://api.bilibili.com/x/v2/reply",
    method: "get",
    params
  })
}
// 获取指定评论条目及二级回复明细
export function getFloorReply(params) {
  return request({
    url: "/x/v2/reply/reply",
    // url: "/http://api.bilibili.com/x/v2/reply/reply",
    method: "get",
    params
  })
}
// 获取视频url
export function getVideoUrl(params) {
  return request({
    url: "/x/player/playurl",
    // url: "/http://api.bilibili.com/x/player/playurl",
    method: "get",
    params
  })
}
// https://api.bilibili.com/x/player/playurl?cid=332863047&avid=545384211&platform=html5&otype=json&qn=16&type=mp4
// 判断视频是否点赞
export function getHasLike(params) {
  return request({
    url: "/x/web-interface/archive/has/like",
    // url: "/http://api.bilibili.com/x/web-interface/archive/has/like",
    method: "get",
    params
  })
}
// 视频点赞
export function getSetLike(data) {
  return request({
    url: "/x/web-interface/archive/like",
    // url: "/http://api.bilibili.com/x/web-interface/archive/like
    method: "post",
    data, 
    headers:{
      "Content-Type":"application/x-www-form-urlencoded",
    }
  })
}
// 判断视频是否投币
export function getHasCoin(params) {
  return request({
    url: "/x/web-interface/archive/has/like",
    // url: "/http://api.bilibili.com/x/web-interface/archive/has/like",
    method: "get",
    params
  })
}
// 视频投币
export function getSetCoin(params) {
  return request({
    url: "/x/v2/view/coin/add/application/x-www-form-urlencoded",
    // url: "/http://app.bilibili.com/x/v2/view/coin/add/application/x-www-form-urlencoded",
    method: "post",
    params
  })
}
// 判断视频是否点赞
export function getHasDeal(params) {
  return request({
    url: "/x/v2/fav/video/favoured",
    // url: "/http://api.bilibili.com/x/v2/fav/video/favoured",
    method: "get",
    params
  })
}
// 视频否点赞
export function getdeal(data) {
  return request({
    url: "/x/v3/fav/resource/deal",
    // url: "http://api.bilibili.com/x/v3/fav/resource/deal,
    method: "post",
    data,
    headers:{
      "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8",
    }
  })
}
//https://api.bilibili.com/x/web-interface/view/detail?aid=&bvid=sh411S767&need_hot_share=1