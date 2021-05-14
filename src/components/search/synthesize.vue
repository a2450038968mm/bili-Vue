<template>
  <div>
   <div class="item"  v-for="(item,index) in videoslist" :key="index" @click="goplayer(index)">
      <div class="cover">
        <img :src="item.pic" alt="" />
        <div class="time">{{item.duration}}</div>
      </div>
      <div class="right">
        <div class="title" v-html=item.title>
        </div>
        <div class="up">
          <span class="iconfont icon-UPzhu2"> {{item.author}}</span>
        </div>
        <div class="viedomsg">
          <span class="iconfont icon-play-square">{{item.play | count}}</span>
          <span class="iconfont icon-danmushu">{{item.video_review | count}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:["val","videoslist"],
  data() {
    return {
      page:2,
      list:[]
    }
  },
  methods:{
    goplayer(index){
      let obj = {};
      obj.oid = this.videoslist[index].aid;
      let avid = this.videoslist[index].avid;
     let bvid = this.videoslist[index].bvid;
      if(avid){
        obj.avid = avid
      }else{
        obj.bvid = bvid
      }
      this.$router.push({ path: "/player", query: obj });
    },
  },
  mounted() {
  },
}
</script>


<style lang="less" scoped>

.item {
  padding: 20px 10px;
  display: flex;
  border-bottom: 1px solid #eee;
  background-color: #f4f4f4;
  .cover {
    position: relative;
    margin-right: 20px;
    flex: 0 0 240px;
    height: 135;
    img {
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }
    .time {
      position: absolute;
      bottom: 7px;
      right: 7px;
      height: 27px;
      width: 60px;
      line-height: 27px;
      text-align: center;
      border-radius: 3px;
      background-color: rgba(0, 0, 0, 0.5);
      color: #fff;
      font-size: 20px;
    }
  }
  .right {
    flex: 1;
    .title {
      font-size: 24px;
      color: #212121;
      line-height: 30px;
      height: 60px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .up{
      margin-top: 20px;
      margin-bottom: 14px;
      color: #999999;
      span{
        font-size: 22px;
        
      }
    }
    .viedomsg{
      // margin-top: 40px;
      height: 25px;
      width: 55%;
      display: flex;
      justify-content: space-between;
      font-size: 18px;
      color: #999999;
      span::before{
        margin-right: 5px;
        font-size: 20px;
      }
    }
  }
}
.null{
  text-align: center;
  margin-top: 200px;
  p{
    margin-top: 30px;
    font-size: 24px;
    color: #212121;
  }
}
  
</style>