<template>
  <div>
    <div class="content">
      <ul ref="ul">
        <li v-for="(item, index) in showlist" :key="index">
          <div class="card" @click="goplay(index)">
            <div class="video">
              <img referrer="no-referrer|origin|unsafe-url" v-lazy="item.pic" alt="" />
              <div class="count">
                <span class="iconfont icon-play-square">{{item.stat.view |count}}</span>
                <span class="iconfont icon-danmushu">{{item.stat.danmaku |count}}</span>
              </div>
            </div>
            <p>{{ item.title }}</p>
          </div>
        </li>
      </ul>

      <div class="bottom">到底了</div>
    </div>
  </div>
</template>

<script>
import { getIndexData } from "../../api/pageData.js";
export default {
  // 生命周期视图渲染完毕
  data() {
    return {
      list: null,
      showlist: null,
      offset: 1,
    };
  },
  created() {
    this.$nextTick(() => {
      window.addEventListener("scroll", this.handScroll);
    });
  },
  methods: {
    goplay(index) {
      let oid = this.showlist[index].aid;
      if(this.showlist[index].bvid){
        let bvid = this.showlist[index].bvid
        this.$router.push({ path: "/player",query:{oid:oid,bvid:bvid} });
      }else if(this.showlist[index].avid){
         let avid = this.showlist[index].avid
      this.$router.push({ path: "/player",query:{oid:oid,avid:avid}});
      }
    },
    handScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop; //滚动条偏移量
      if (this.$refs.ul) {
        let lis = this.$refs.ul.getElementsByTagName("li");
        let num = lis.length - 8;
        if (lis[num].offsetTop < scrollTop) {
          this.offset += 1;
          this.showlist = this.list.slice(0, this.offset * 10 + 10);
        }
      }
    },
  },
  mounted() {
    getIndexData().then((data) => {
      this.list = data.data;
      this.showlist = this.list.slice(0, this.offset * 10 + 10);
    });
  },
  filters:{
    count(val){
      if(val>10000){
        if(val/10000 >10){
          return parseInt(val/10000) +"万"
        }else{
          return  parseInt(val/10000).toFixed(1) +"万"

        }
      }else{
       return  val
      }
    },
  }
};
</script>

<style lang="less" scoped>
.content {
  position: absolute;
  top: 143px;
  margin-bottom: 50px;
  ul {
    margin-bottom: 20px;
    padding: 0 8px;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
  }
  li {
    width: 50%;
    padding: 0 8px;
    box-sizing: border-box;
    display: flex;

    font-size: 12px;
    justify-content: space-between;

    // width: 100%;
    .card {
      width: 100%;
      padding: 18px 0;
      box-sizing: border-box;
      .video {
        position: relative;
        background-color: #000;
        // height: 165px;
        img {
          border-radius: 5px;
          width: 100%;
          // height: 100%;
        }
        .count {
          position: absolute;
          bottom: 0px;
          // height: 30px;
          line-height: 30px;
          display: flex;
          justify-content: space-between;
          padding: 8px 10px;
          box-sizing: border-box;
          width: 100%;
          color: white;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
          span {
            font-size: 20px;
            display: inline-block;
            line-height: 30px;
            &::before{
              margin-right: 5px;
            }
          }
          
        }
      }
      p {
        line-height: 23px;
        width: 100%;
        margin-top: 6px;
        font-size: 20px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
}
.bottom {
  text-align: center;
  font-size: 30px;
  color: #ccc;
  padding: 0px 0px 20px;
}
</style>