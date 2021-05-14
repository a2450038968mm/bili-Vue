<template>
  <div>
    <div class="content">
      <ul>
        <li
          v-for="(item, index) in recommendlist"
          :key="index"
          @click="goplayer(index)"
        >
          <div class="card">
            <div class="video">
              <img v-lazy="item.pic" />
              <div class="count">
                <div class="left">
                  <span class="iconfont icon-play-square">{{
                    item.stat.view | count
                  }}</span>
                  <span class="iconfont icon-danmushu">4.6万</span>
                </div>
                <span class="time">{{ item.duration | timeformat }}</span>
              </div>
            </div>
            <p>{{ item.title }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: ["recommendlist"],
  methods: {
    goplayer(index) {
      let obj = {};
      obj.oid = this.recommendlist[index].aid;
      let avid = this.recommendlist[index].avid;
     let bvid = this.recommendlist[index].bvid;
      if(avid){
        obj.avid = avid
      }else{
        obj.bvid = bvid
      }
      this.$router.push({ path: "/player", query: obj });
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
    count(val) {
      if (val > 10000) {
        if (val / 10000 > 100) {
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
.content {
  // margin-bottom: px;
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
          background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
          .left {
            flex: 0 0 195px;
            span {
              font-size: 20px;
              display: inline-block;
              line-height: 30px;
              margin-right: 10px;
              &::before {
                margin-right: 5px;
              }
            }
          }
          .time {
            font-size: 20px;
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
</style>