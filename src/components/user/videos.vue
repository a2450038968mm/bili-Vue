<template>
  <div>
    <div v-if="length">
      <div
        class="content"
        v-for="(item, index) in videoslist.list.vlist"
        :key="index"
        @click="goplayer(index)"
      >
        <div class="cover">
          <img :src="item.pic" alt="" />
          <div class="time">{{ item.length }}</div>
        </div>
        <div class="right">
          <div class="title">
            {{ item.title }}
          </div>
          <div class="viedomsg">
            <span class="iconfont icon-play-square">{{
              item.play | count
            }}</span>
            <span class="iconfont icon-danmushu">{{
              item.video_review | count
            }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="noup">
      <img src="../../assets/img/noup.png" alt="" />
      <p>他还没投过稿~~</p>
      <p>快去发现新内容吧</p>
    </div>
  </div>
</template>

<script>
import { getuservideo } from "../../api/user";
export default {
  props: ["mid"],
  data() {
    return {
      videoslist: {
        list:{}
      },
      length:0
    };
  },
  methods: {
    goplayer(index) {
      let obj = {};
      obj.oid = this.videoslist.list.vlist[index].aid;
      let avid = this.videoslist.list.vlist[index].avid;
     let bvid = this.videoslist.list.vlist[index].bvid;
      if(avid){
        obj.avid = avid
      }else{
        obj.bvid = bvid
      }
      this.$router.push({ path: "/player", query: obj });
    },
    getvideos() {
      let obj = {};
      obj.mid = this.mid;
      getuservideo(obj).then((data) => {
        this.videoslist = data.data;
        this.length = this.videoslist.list.vlist.length
      });
    },
  },
  mounted() {
    this.getvideos();
  },
  watch:{
    mid(){
       this.videoslist= {
        list:{}
      },
      this.length=0
      this.getvideos()
    }
  }
};
</script>


<style lang="less" scoped>
.noup {
  img {
    display: block;
    margin: 10px auto;
  }
  p {
    text-align: center;
    color: #999;
    font-size: 28px;
  }
}
.content {
  padding: 15px 20px;
  display: flex;
  border-bottom: 1px solid #cccccc;
  .cover {
    position: relative;
    margin-right: 20px;
    flex: 0 0 200px;
    height: 125px;
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
    .viedomsg {
      margin-top: 40px;
      height: 25px;
      width: 55%;
      display: flex;
      justify-content: space-between;
      font-size: 18px;
      color: #999999;
      span::before {
        margin-right: 5px;
        font-size: 20px;
      }
    }
  }
}
</style>