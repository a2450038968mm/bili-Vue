<template>
  <div>
    <div class="top">
      <div class="header">
        <span class="iconfont icon-zuo" @click="$router.go(-1)"> </span>
        排行榜
      </div>
      <div class="navs">
        <div class="scroll-wrapper" ref="scroll">
          <div class="scroll-content">
            <div class="scroll-item" v-for="(item, index) in navs" :key="index">
              <span @click="setnum(index)" :class="num == index ? 'con' : ''">{{
                item.name
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container" v-if="datalist.length">
      <div
        class="item"
        @click="goplayer(index)"
        v-for="(item, index) in datalist"
        :key="index"
      >
        <div class="rank" v-if="index == 0">
          <img
            referrer="no-referrer|origin|unsafe-url"
            src="//s1.hdslb.com/bfs/static/jinkela/mstation-h5/assets/rank1.png"
            alt=""
          />
        </div>
        <div class="rank" v-else-if="index == 1">
          <img
            referrer="no-referrer|origin|unsafe-url"
            src="https://s1.hdslb.com/bfs/static/jinkela/mstation-h5/assets/rank2.png"
            alt=""
          />
        </div>
        <div class="rank" v-else-if="index == 2">
          <img
            referrer="no-referrer|origin|unsafe-url"
            src="https://s1.hdslb.com/bfs/static/jinkela/mstation-h5/assets/rank3.png"
            alt=""
          />
        </div>
        <div class="rank" v-else>{{ index + 1 }}</div>
        <div class="left">
          <div class="cover">
            <img v-lazy="item.pic" alt="" />
          </div>
          <div class="time">{{ item.duration | timeformat }}</div>
        </div>
        <div class="right">
          <div class="title">
            {{ item.title }}
          </div>
          <div class="upinfo">
            <span class="iconfont icon-UPzhu2">{{ item.owner.name }}</span>
          </div>
          <div class="videoinfo">
            <span class="iconfont icon-play-square">{{
              item.stat.view | count
            }}</span>
            <span class="iconfont icon-danmushu">{{
              item.stat.danmaku | count
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getRanklist } from "../api/rank";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      num: 0,
      rid: 0,
      datalist: [],
      offset: 1,
    };
  },
  methods: {
    goplayer(index) {
      console.log(index);
      console.log(this.datalist[index]);
      let obj = {};
      obj.oid = this.datalist[index].aid;
      let avid = this.datalist[index].avid;
      let bvid = this.datalist[index].bvid;
      if (avid) {
        obj.avid = avid;
      } else {
        obj.bvid = bvid;
      }
      this.$router.push({ path: "/player", query: obj });
    },
    setnum(index) {
      console.log(index);
      this.num = index;
    },
    getdatalist(rid) {
      getRanklist({ rid }).then((data) => {
        console.log(data);
        this.datalist = data.data.list;
        this.init();
      });
    },
    init() {
      this.bs = new BScroll(this.$refs.scroll, {
        click: true,
        scrollX: true,
        probeType: 3, // listening scroll event
      });
      this.bs.on("scrollStart", () => {
        console.log("scrollStart-");
      });
      this.bs.on("scrollEnd", () => {
        console.log("scrollingEnd");
      });
    },
  },
  computed: {
    ...mapState(["navs"]),
  },
  mounted() {
    this.$nextTick(() => {
      console.log(this.$refs.scroll);
    });
    this.rid = this.$route.query.rid;
    console.log(this.rid);
    let index = this.navs.findIndex((item) => {
      return item.rid == this.rid;
    });
    this.num = index;
  },
  created() {},
  watch: {
    num() {
      // console.log(123);
      this.datalist = [];
      let rid = this.navs[this.num].rid;
      console.log(rid);
      window.scrollTo(0, 0);
      this.getdatalist(rid);
    },
  },
  filters: {
    timeformat(val) {
      let min = parseInt(val / 60);
      let s = parseInt(val % 60);
      s = s > 9 ? s : "0" + s;
      min = min > 9 ? min : "0" + min;
      return min + ":" + s;
    },
  },
};
</script>

<style lang="less" scoped>
.top {
  overflow: hidden;
  width: 100%;
  z-index: 100;
  background: #fff;
  position: fixed;
  top: 0;
}
.header {
  height: 37px;
  line-height: 37px;
  padding: 18px 20px;
  text-align: center;
  font-size: 28px;
  color: #fb7299;
  position: relative;
  .iconfont {
    position: absolute;
    top: 18px;
    left: 18px;
    font-size: 22px;
  }
}
.navs {
  .scroll-wrapper {
    position: relative;
    width: 100%;
    // margin: 80px auto;
    white-space: nowrap;
    // border: 3px solid #42b983;
    border-top: 1px solid #f3f3f3;
    border-bottom: 1px solid #f3f3f3;
    border-radius: 5px;
    overflow: hidden;

    .scroll-content {
      display: inline-block;
    }
    .scroll-item {
      height: 68px;
      line-height: 68px;
      font-size: 24px;
      display: inline-block;
      text-align: center;
      // padding: 0 10px;
      span {
        padding: 0 27px;
        &.con {
          position: relative;
          color: #fb7299;
          &::after {
            content: "";
            width: 70%;
            height: 3px;
            background: #fb7299;
            position: absolute;
            bottom: -21px;
            left: 15px;

            // left: -5%;
          }
        }
      }
    }
  }
}
// .navs {
//     border-bottom: 1px solid #f3f3f3;
//     .scroll-wrapper {
//       position: relative;
//       width: 95%;
//       box-sizing: border-box;
//       margin: 0 17px;
//       margin: auto;
//       white-space: nowrap;
//       border-radius: 5px;
//       overflow: hidden;

//       .scroll-content {
//         display: inline-block;
//       }
//       .scroll-item {
//         margin: 0 17px;
//         height: 65px;
//         line-height: 65px;
//         font-size: 24px;
//         // box-sizing: border-box;
//         position: relative;
//         display: inline-block;
//         text-align: center;
//         padding: 0 10px;
//         width: 71px;

//         &.router-link-active {
//           color: #fb7299;
//           border-bottom: 3px solid #fb7299;
//         }
//       }
//     }
//   }
.container {
  margin-top: 143px;
  padding: 10px 8px;
  .item {
    padding: 10px;
    display: flex;
    height: 140px;
    .rank {
      flex: 0 0 54px;
      line-height: 140px;
      text-indent: 3px;
      img {
        width: 70%;
        // line-height: 140px;
        vertical-align: middle;
      }
    }
    .left {
      position: relative;
      flex: 0 0 239px;
      margin-right: 17px;
      // flex: 1;
      .cover {
        height: 100%;
        img {
          height: 100%;
          width: 239px;
          height: 100%;
          border-radius: 10px;
        }
      }
      .time {
        position: absolute;
        padding: 5px;
        right: 10px;
        bottom: 5px;
        background: rgba(0, 0, 0, 0.6);
        border-radius: 5px;
        color: #fff;
        font-size: 20px;
      }
    }
    .right {
      flex: 1;

      .title {
        height: 62px;
        font-size: 24px;
        color: #222;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        margin-bottom: 13px;
      }
      .upinfo {
        line-height: 26px;
      }
      .videoinfo {
        line-height: 26px;
      }
      .iconfont {
        color: #999;
        font-size: 20px;
        margin-right: 17px;
        &::before {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
