<template>
  <div>
    <div class="area">
      <div class="title">
        <div class="left" v-if="ranklist.length">热门排行</div>
        <!-- <div class="right" v-if="index==0"><span class="iconfont icon-paihang"></span>排行榜<span class="iconfont icon-you"></span></div> -->
        <!-- <div class="right more" v-else>查看更多<span class="iconfont icon-you"></span></div> -->
      </div>
      <div class="content">
        <ul>
          <li
            v-for="(item, index) in ranklist"
            :key="index"
            @click="goplay({ avid: item.avid || '', bvid: item.bvid || '' ,oid:item.aid})"
          >
            <div class="card">
              <div class="video">
                <img referrer="no-referrer|origin|unsafe-url" v-lazy="item.pic" />
                <div class="count">
                  <span class="iconfont icon-play-square">{{
                    item.play | count
                  }}</span>
                  <span class="iconfont icon-danmushu">{{
                    item.video_review | count
                  }}</span>
                </div>
              </div>
              <p>{{ item.title }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="area">
      <div class="title">
        <div class="left" v-if="newlist.length">最新视频</div>
      </div>
      <div class="content">
        <ul ref="ul">
          <li
            v-for="(item, index) in newlist"
            :key="index"
            @click="goplay({ avid: item.avid || '', bvid: item.bvid || '' ,oid:item.aid})"
          >
            <div class="card">
              <div class="video">
                <img referrer="no-referrer|origin|unsafe-url" v-lazy="item.pic" />
                <div class="count">
                  <span class="iconfont icon-play-square">{{
                    item.stat.view | count
                  }}</span>
                  <span class="iconfont icon-danmushu">{{
                    item.stat.danmaku | count
                  }}</span>
                </div>
              </div>
              <p>{{ item.title }}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="bottom">
        <img src="../../assets/img/isbottom.png" alt="" /><br />
        到底了
      </div>
    </div>
  </div>
</template>

<script>
import { getRecommend, getNewData } from "../../api/pageData";
export default {
  props: ["str"],
  data() {
    return {
      ranklist: [],
      num: 1,
      newlist: [],
    };
  },
  methods: {
    goplay(item) {
      if (item.avid != "") {
        this.$router.push({ path: "/player", query: { avid: item.avid ,oid:item.oid} });
      } else if (item.bvid != "") {
        this.$router.push({ path: "/player", query: { bvid: item.bvid ,oid:item.oid} });
      }
    },
    getRank() {
      let _this = this;
      let obj = {
        rid: this.str,
        day: 7,
      };
      getRecommend(obj).then((data) => {
        _this.ranklist = data.data.slice(0, 4);
      });
    },
    getnewdata() {
      let _this = this;
      let obj = {
        rid: this.str,
        np: this.num,
      };
      getNewData(obj).then((data) => {
        _this.newlist.push(...data.data.archives);
        _this.num += 1;
        window.addEventListener("scroll", this.handScroll);
      });
    },
    handScroll() {
      if (this.num > 8) {
        return;
      }
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.offsetTop;
      if (this.$refs.ul) {
        let lis = this.$refs.ul.getElementsByTagName("li");
        let num = lis.length - 1;
        if (lis[num].offsetTop - this.$refs.ul.offsetTop < scrollTop) {
          window.removeEventListener("scroll", this.handScroll);
          this.getnewdata();
        }
      }
    },
  },
  created() {
    this.getRank();
    this.getnewdata();
    this.$nextTick(() => {});
  },
  watch: {
    str() {
      this.ranklist = [];
      this.newlist = [];
      window.pageYOffset = 0;
      this.num = 1;
      this.getRank();
      this.getnewdata();
    },
  },
  filters: {
    count(val) {
      if (val > 10000) {
        if (val / 10000 > 10) {
          return parseInt(val / 10000) + "万";
        } else {
          return parseInt(val / 10000).toFixed(1) + "万";
        }
      } else {
        return val;
      }
    },
  },
};
</script>




<style lang="less" scoped>
.bottom {
  text-align: center;
  font-size: 30px;
  color: #ccc;
  padding: 0px 0px 20px;
}
.area {
  padding: 17px 8px 0 8px;
  margin-bottom: 34px;

  .title {
    height: 34px;
    line-height: 34px;
    padding: 8px 17px;
    display: flex;
    justify-content: space-between;
    .left {
      font-size: 26px;
    }
    .right {
      color: #ffa726;
      font-size: 24px;
      span {
        display: inline-block;
        margin: 0 5px;
      }
    }
    .more {
      color: #999999;
    }
  }
  .content {
    // margin-bottom: px;
    ul {
      margin-bottom: 20px;
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
          height: 165px;
          img {
            border-radius: 5px;
            width: 100%;
            height: 100%;
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
            background: linear-gradient(
              to top,
              rgba(0, 0, 0, 0.8),
              transparent
            );
            span {
              font-size: 20px;
              display: inline-block;
              line-height: 30px;
              &::before {
                margin-right: 5px;
              }
            }
          }
        }
        p {
          line-height: 20px;
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
}
</style>