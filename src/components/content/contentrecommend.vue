<template>
  <div>
    <div class="area" v-for="(item, index) in list" :key="index">
      <div class="title">
        <div class="left">{{ arr[index] }}</div>
        <div class="right" v-if="index == 0">
          <span  class="iconfont icon-paihang" @click="gorank"></span>排行榜<span
            class="iconfont icon-you"
          ></span>
        </div>
        <div class="right more" v-else @click="setnum(index)">
          查看更多<span class="iconfont icon-you"></span>
        </div>
      </div>
      <div class="content">
        <ul>
          <li v-for="(val, key) in item" :key="key" @click="goplay({ avid: val.avid || '', bvid: val.bvid || '' ,oid:val.aid})">
            <div class="card">
              <div class="video">
                <img
                  referrer="no-referrer|origin|unsafe-url"
                  v-lazy="val.pic"
                  alt=""
                />
                <div class="count">
                  <span class="iconfont icon-play-square">{{
                    val.play | count
                  }}</span>
                  <span class="iconfont icon-danmushu">{{
                    val.video_review | count
                  }}</span>
                </div>
              </div>
              <p>{{ val.title }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>


<script>
import { getRecommend } from "../../api/pageData";
// import {mapState} from "../../api/pageData"
export default {
  props: ["arr", "data"],
  data() {
    return {
      list: [],
      rid:null,
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
    gorank(){
      let rid = this.rid
      this.$router.push({path:"/rank",query:{rid}})
    },
    getRank(num) {
      if (num == this.data.length) return;
      if(num == 0){
        this.rid = this.data[num]
      }
      let obj = {
        rid: this.data[num],
        day: 7,
      };
      getRecommend(obj).then((data) => {
        this.list.push(data.data.slice(0, 4));
        num += 1;
        this.getRank(num);
      });
    },
    setnum(num) {
      this.$emit("toggernum", num);
    },
  },
  computed: {},
  mounted() {
    this.getRank(0);
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
  watch: {
    $route() {
      this.list = [];
      this.getRank(0);
    },
  },
};
</script>


<style lang="less" scoped>
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