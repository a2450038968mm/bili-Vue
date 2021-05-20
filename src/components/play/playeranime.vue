<template>
  <div>
    <div class="video" ref="videos" @click.self="showprow">
      <img class="img" v-show="isstart" v-lazy="imgsrc" alt="" />
      <video
        v-show="!isstart && canplay"
        width="100%"
        ref="video"
        src="../../assets/video.mp4"
      ></video>
      <div class="playmask" v-if="!isstart && !canplay">
        <van-loading vertical>加载中 </van-loading>
      </div>
      <div class="play" @click="control" v-else v-show="isstart || !isplay">
        <span class="iconfont icon-bofangqi-bofangxiaodianshi"></span>
      </div>
      <transition name="play">
        <div class="tips" v-if="!isstart && showtips">
          <div class="playbar">
            <div class="play">
              <span
                class="iconfont icon-bofang"
                @click.stop="togger"
                v-show="isplay"
              ></span>
              <span
                class="iconfont icon-bofang1"
                @click.stop="togger"
                v-show="!isplay"
              ></span>
            </div>
            <div class="ingtime">{{ ingtime | timeformat }}</div>
            <div class="progressbar">
              <van-slider
                v-model="ingtime"
                active-color="#fb7299"
                bar-height="5px"
                :max="endtime"
                @change="onChange"
                @drag-start="stardrage"
                @drag-end="enddrage"
              >
                <template #button>
                  <div class="custom-button">
                    <span class="iconfont icon-bilibili1"></span>
                  </div>
                </template>
              </van-slider>
            </div>
            <div class="endtime">{{ endtime | timeformat }}</div>
            <div class="speed" @click.stop="toggerspeed">
              {{ !showspeed ? this.speed + "x" : "" }}
              <ul v-show="showspeed">
                <li @click.stop="clectspeed(0.5)">0.5x</li>
                <li @click.stop="clectspeed(1)">1x</li>
                <li @click.stop="clectspeed(1.25)">1.25x</li>
                <li @click.stop="clectspeed(1.5)">1.5x</li>
                <li @click.stop="clectspeed(1.75)">1.75x</li>
              </ul>
            </div>
            <div class="fullscreen">
              <span
                class="iconfont icon-quanping"
                @click="magnify"
                v-show="!isfullscreen"
              ></span>
              <span
                class="iconfont icon-quxiaoquanping"
                v-show="isfullscreen"
                @click="magnify"
              ></span>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div class="animeinfo">
      <div class="cover">
        <img v-lazy="anmtedata.cover" alt="" />
      </div>
      <div class="infomsg" v-if="anmtedata.stat">
        <div class="top">
          <div class="left">
            <div class="title">{{ anmtedata.season_title }}</div>
            <div class="infoseason">
              <span class="iconfont icon-play-square">{{
                anmtedata.stat.views | count
              }}</span>
              <span class="iconfont icon-xinaixin">{{
                anmtedata.stat.favorites | count
              }}</span>
            </div>
          </div>
          <div class="right">
            <h1>9.8<span>分</span></h1>
            <h2>1.8万人</h2>
          </div>
        </div>
        <div class="status" v-if="anmtedata.new_ep">
          {{ anmtedata.new_ep.desc }}
        </div>
        <div class="bottom hid">
          {{ anmtedata.evaluate }}
          <span class="iconfont icon-xiala"></span>
        </div>
      </div>
    </div>
    <div class="operation">
      <span class="iconfont icon-forward">分享</span>
      <span class="iconfont icon-xinaixin-fuben">追番</span>
      <span class="iconfont icon-xiazai1">缓存</span>
    </div>
    <div class="episode">
      <div class="title">
        <h1>选集</h1>
        <p>
          更新至第{{ length }}话
          <span class="iconfont icon-you"></span>
        </p>
      </div>
      <div class="episodedetail">
        <div class="content-nav">
          <div class="scroll-wrapper" ref="scroll">
            <div class="scroll-content">
              <div
                :class="['scroll-item', { con: num == index }]"
                ref="item"
                v-for="(item, index) in anmtedata.episodes"
                :key="index"
                @click="num = index"
              >
                <span class="sets">第{{ 1 + index }}话</span>
                <span class="desc">{{ item.long_title }}</span>
                <span class="tip" v-if="item.badge">{{ item.badge }}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="content-nav">
          <div class="scroll-wrapper" ref="scroll1">
            <div class="scroll-content">
              <div
                :class="['scroll-item', { con: num == index }]"
                ref="item"
                v-for="(item, index) in emojis"
                :key="index"
                @click="num = index"
                v-show="index < 20"
              >
              <span class="sets">第{{ 1 + index }}话</span>
                <span class="desc"> {{item.long_title}} </span>
                <span class="tip" > {{item.badge}} </span>
               {{item}}
              </div>
            </div>
          </div>
        </div> -->
      </div>
    </div>
    <!-- <div class="sp">
      <div class="title">{{ anmtedata.section[0].title }}</div>
      <div class="content-nav">
        <div class="scroll-wrapper" ref="scrollsp">
          <div class="scroll-content">
            <div
              @click="goplay(index)"
              :class="['scroll-item']"
              ref="items"
              v-for="(item, index) in anmtedata.section[0].episodes"
              :key="index"
            >
              <div class="cover">
                <img :src="item.cover" alt="" />
              </div>
              <p class="name">{{ item.share_copy }}</p>
            </div>
          </div>
        </div>
      </div>
    </div> -->
    <div class="morerecomment">
      <div class="title">更多推荐</div>
      <div
        @click="goanmit(index)"
        class="item"
        v-for="(item, index) in recommentlist"
        :key="index"
      >
        <div class="cover">
          <img v-lazy="item.new_ep.cover" alt="" />
        </div>
        <div class="info">
          <div class="name">{{ item.title }}</div>
          <div class="infomsg">
            {{ item.stat.view | count }}次观看·{{
              item.stat.follow | count
            }}人追番
          </div>
        </div>
      </div>
    </div>
    <div class="reply">
      <div class="title">评论（{{ commentnum.length }}）</div>
      <div class="item" v-for="(item, index) in commentnum" :key="index">
        <div class="userimg">
          <img v-lazy="item.member.avatar" alt="" />
        </div>
        <div class="info">
          <div class="top">
            <div class="uname">{{ item.member.uname }}</div>
            <div class="ctime">{{ item.ctime | timefor }}</div>
          </div>
          <div class="msg">
            <p
              v-for="(val, key) in item.content.message"
              :key="key"
              v-html="getEmtoe(val, index)"
            >
              {{ val }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="last">到底了</div>
  </div>
</template>

<script>
import {
  getPlayeranmit,
  getPlayeranmitrecomment,
  getVideoComment,
} from "../../api/player";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      // src:
      //   "https://upos-sz-mirrorkodo.bilivideo.com/upgcxcode/94/38/330303894/330303894-1-400.mp4?e=ig8euxZM2rNcNbRM7WdVhoM17wUVhwdEto8g5X10ugNcXBMvNC8xNbLEkF6MuwLStj8fqJ0EkX1ftx7Sqr_aio8_&uipk=5&nbs=1&deadline=1620296038&gen=playurlv2&os=kodobv&oi=1947649570&trid=a7d1fa864f77488fa93f47409b493206p&platform=html5&upsig=c1138d906a1fc423b7830864b459acfc&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,platform&mid=38095853&orderid=0,1&logo=80000000",
      canplay: false,
      playurl: "",
      showP: false,
      p: 0,
      avid: null,
      bvid: null,
      oid: null,
      isdeal: false,
      islike: false,
      detail: {},
      isfullscreen: false,
      isattention: false,
      loadend: false,
      isplay: false,
      activeNames: ["0"],
      describe: false,
      isrecommend: true,
      isstart: true,
      ingtime: 0,
      endtime: 100,
      timer: null,
      isdrage: false,
      timerleve: null,
      showtips: false,
      speed: 1,
      showspeed: false,
      cardlist: {
        Card: {
          card: {
            face: "",
            name: "",
          },
        },
        View: {
          title: "",
          stat: {
            view: "",
            like: "",
          },
        },
      },
      recommendlist: [],
      anmtedata: {},
      recommentlist: [],
      num: 0,
      commentnum: [],
      imgsrc: "",
      length: 0,
    };
  },
  methods: {
    goanmit(index) {
      let season_id = this.recommentlist[index].season_id;
      this.$router.push({ path: "/playeranime", query: { season_id } });
    },
    goplay(index) {
      let oid = this.anmtedata.section[0].episodes[index].aid;
      if (this.anmtedata.section[0].episodes[index].bvid) {
        let bvid = this.anmtedata.section[0].episodes[index].bvid;
        this.$router.push({ path: "/player", query: { oid: oid, bvid: bvid } });
      } else if (this.anmtedata.section[0].episodes[index].avid) {
        let avid = this.anmtedata.section[0].episodes[index].avid;
        this.$router.push({ path: "/player", query: { oid: oid, avid: avid } });
      }
    },
    // 格式化评论
    desc(arr) {
      for (let i = 0; i < arr.length; i++) {
        let str = arr[i].content.message.split("\n");
        arr[i].showreplydetail = true;
        arr[i].content.message = str;
      }
      return arr;
    },
    getEmtoe(item, index) {
      let firstindex = item.indexOf("[");
      let lastindex = item.lastIndexOf("]");
      let str = item.substr(firstindex, lastindex);
      let arr = str.split("]");
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] == "") {
          arr.splice(i, 1);
        }
      }
      if (arr.length) {
        let text = item.substr(0, firstindex);
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].indexOf("[") != -1) {
            text += arr[i].substr(0, arr[i].indexOf("["));
          }
          arr[i] += "]";
          if (arr[i] in this.commentnum[index].content.emote) {
            text +=
              "<img referrer='no-referrer|origin|unsafe-url' class='emote' src=" +
              this.commentnum[index].content.emote[arr[i]].url +
              ">";
          }
        }
        return text;
      } else {
        return item;
      }
    },
    init() {
      this.bs = new BScroll(this.$refs.scroll, {
        scrollX: true,
        probeType: 3,
        click: true,
      });
      this.bs.on("scrollStart", () => {});
      this.bs.on("scroll", ({ x }) => {
        console.log(x);
      });
      this.bs.on("scrollEnd", () => {});
    },
    clectspeed(speed) {
      this.$refs.video.playbackRate = speed;
      this.speed = speed;
      this.showspeed = false;
    },
    showprow() {
      if (this.showspeed) {
        this.showspeed = false;
      } else {
        if (!this.isstart) {
          this.showtips = !this.showtips;
        }
      }
    },
    control() {
      this.isstart = false;
      this.showtips = true;
      this.togger();
    },
    togger() {
      let video = this.$refs.video;
      if (this.loadend) {
        if (this.isplay) {
          clearInterval(this.timer);
          this.timer = null;
          video.pause();
          this.isplay = false;
        } else {
          video.play();
          this.end();
          this.timer = setInterval(() => {
            if (!this.isdrage) {
              this.ingtime = Math.round(video.currentTime);
            }
            if (this.ingtime == this.endtime) {
              clearInterval(this.timer);
            }
          }, this.speed * 1000);
          this.isplay = true;
        }
      }
    },
    end() {
      this.$refs.video.addEventListener("ended", () => {
        //结束
        console.log("播放结束");
        this.isplay = false;
      });
    },
    showdescribe() {
      this.describe = !this.describe;
    },
    stardrage() {
      this.isdrage = true;
    },
    enddrage() {
      this.isdrage = false;
    },
    toggerspeed() {
      this.showspeed = true;
    },
    magnify() {
      let videos = this.$refs.videos;

      if (!this.isfullscreen) {
        videos.requestFullscreen();
        this.isfullscreen = true;
      } else {
        document.exitFullscreen();
        this.isfullscreen = false;
      }
    },
    getplayeranmit() {
      let obj = this.$route.query;
      getPlayeranmit(obj).then((data) => {
        let oid = data.result.episodes[this.num].aid;

        this.anmtedata = data.result;
        this.length = this.anmtedata.episodes.length;
        this.imgsrc = this.anmtedata.episodes[this.num].cover;
        this.season_id = data.result.season_id;
        getPlayeranmitrecomment({ season_id: this.season_id }).then((data) => {
          this.recommentlist = data.data.season;
        });
        getVideoComment({ type: 1, oid }).then((data) => {
          this.commentnum = this.desc(data.data.replies);
          this.init();
        });
      });
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
    });

    this.$refs.video.addEventListener("canplay", () => {
      this.canplay = true;
      console.log("加载完毕");
      this.loadend = true;
      this.endtime = parseInt(this.$refs.video.duration);
    });
    this.getplayeranmit();
  },
  created() {
    this.$nextTick(() => {});
  },
  watch: {
    num() {
      let oid = this.anmtedata.episodes[this.num].aid;
      getVideoComment({ type: 1, oid }).then((data) => {
        this.commentnum = this.desc(data.data.replies);
      });
    },
    $route() {
      this.cardlist = {
        Card: {
          card: {
            face: "",
            name: "",
          },
        },
        View: {
          title: "",
          stat: {
            view: "",
            like: "",
          },
        },
      };
      this.anmtedata={
        cover:""
      }
      this.imgsrc=""
      console.log(this.$route.query.season_id);
      this.season_id = this.$route.query.season_id;
      this.isstart = true;
      this.isattention = false;
      this.canplay = false;
      this.isplay = false;
      this.isdeal = false;
      this.isbil = false;
      this.islike = false;
      window.scrollTo(0, 0);
      this.getplayeranmit();
    },
    $rsef() {},
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
.body {
  font-size: 24px;
}
.horizontal-container {
  .scroll-wrapper {
    position: relative;
    width: 90%;
    margin: 80px auto;
    white-space: nowrap;
    border: 3px solid #42b983;
    border-radius: 5px;
    overflow: hidden;
    .scroll-content {
      display: inline-block;
    }
    .scroll-item {
      height: 50px;
      line-height: 50px;
      font-size: 24px;
      display: inline-block;
      text-align: center;
      padding: 0 10px;
    }
  }
}
.emote {
  width: 34px;
  vertical-align: middle;
  height: 34px;
}
.video {
  margin-top: -56px;
  position: relative;
  overflow: hidden;
  height: 400px;
  .img {
    width: 100%;
    height: 100%;
  }
  .playmask {
    position: absolute;
    top: 40%;
    left: 45%;
  }
  & > .play {
    width: 54px;
    height: 54px;

    color: #fff;
    opacity: 0.8;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    span {
      font-size: 54px;
    }
  }
  .tips {
    width: 100%;
    padding-left: 15px;
    padding-right: 15px;
    box-sizing: border-box;
    height: 68px;
    position: absolute;
    bottom: 0;
    left: 0;
    background-image: linear-gradient(
      180deg,
      transparent 2%,
      rgba(0, 0, 0, 0.7) 98%
    );
    display: flex;
    .playcont,
    .bullet,
    .uploading,
    .time {
      // flex: 0 0 55px;
      display: inline-block;
      color: #fff;
      font-size: 14px;
      height: 20px;
      line-height: 20px;
      margin-top: 40px;
      margin-left: 10px;
    }
    .time {
      flex: 1;
      text-align: right;
      margin-left: 0;
    }
    .playbar {
      width: 100%;
      display: flex;
      height: 20px;
      line-height: 20px;
      margin-top: 40px;
      margin-left: 10px;
      .play {
        flex: 0 0 16px;
        color: #fff;
        span {
          font-size: 20px;
        }
      }
      .ingtime,
      .endtime,
      .fullscreen,
      .speed {
        flex: 0 0 55px;
        text-align: center;
        color: #fff;
        font-size: 14px;
      }
      .speed {
        position: relative;
        ul {
          position: absolute;
          z-index: 100;
          top: -80px;
          left: 12px;
          li {
            height: 20px;
            line-height: 20px;
            font-size: 14px;
          }
        }
      }
      .progressbar {
        z-index: 100;
        flex: 1;
        padding: 7px 10px;
      }
      // .fullscreen{
      //   flex: 0  0;
      // }
    }
  }
}
.animeinfo {
  margin-top: 15px;
  padding: 18px 25px;

  display: flex;
  justify-content: space-between;
  .cover {
    margin-right: 15px;
    // width: 128px;
    flex: 0 0 128px;
    height: 170px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 15px;
    }
  }
  .infomsg {
    flex: 1;
    .top {
      display: flex;
      justify-content: space-between;
      .left {
        flex: 1;
        .title {
          height: 42px;
          font-size: 28px;
          margin-bottom: 8px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        .infoseason {
          display: flex;

          margin-bottom: 8px;
          span {
            font-size: 18px;
            color: #999999;
            margin-right: 10px;
            &::before {
              margin-right: 8px;
              font-size: 22px;
            }
          }
        }
      }
      .right {
        flex: 0 0 120px;
        text-align: center;
        h1 {
          color: #ffa726;
          font-weight: normal;
          font-size: 30px;
          span {
            font-size: 20px;
          }
        }
        h2 {
          font-size: 17px;
          font-weight: normal;
          color: #c0c0c0;
        }
      }
    }
    .status {
      height: 29px;
      line-height: 29px;
      color: #999999;
      font-size: 20px;
      margin-bottom: 8px;
    }
    .bottom {
      padding-right: 20px;
      position: relative;
      font-size: 20px;
      color: #999;
    }
    .hid {
      height: 56px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .icon-xiala {
      position: absolute;
      right: 5px;
      bottom: 15px;
    }
  }
}
.operation {
  padding: 0 25px 40px 25px;
  border-bottom: 1px solid #e7e7e7;
  span {
    font-size: 20px;
    color: #999;
    margin-right: 25px;
    &::before {
      margin-right: 10px;
      color: #757575;
      font-size: 26px;
    }
    &.icon-xiazai1::before {
      font-size: 34px;
    }
    &.icon-forward::before {
      font-size: 34px;
    }
  }
}
.episode {
  padding: 0 20px 30px;
  border-bottom: 1px solid #e7e7e7;
  .title {
    display: flex;
    justify-content: space-between;
    h1 {
      height: 75px;
      color: #000;
      font-size: 26px;
      line-height: 75px;
    }
    p {
      height: 75px;
      line-height: 75px;
      font-size: 22px;
      color: #999;
    }
  }
  .content-nav {
    z-index: 100;
    margin-left: -20px;
    margin-right: -20px;
    background-color: #fff;
    border-bottom: 1px solid #f3f3f3;
    .scroll-wrapper {
      position: relative;
      width: 100%;
      box-sizing: border-box;
      // margin: 0 17px;
      margin: auto;
      white-space: nowrap;
      border-radius: 5px;
      overflow: hidden;

      .scroll-content {
        display: inline-block;
      }
      // .scroll-item :nth-child(1) {
      //   margin-left: 0;
      //   padding-left: 0;
      // }
      .scroll-item {
        height: 57px;
        // margin: 0 17px;
        // height: 65px;
        // line-height: 65px;
        // font-size: 24px;
        // // box-sizing: border-box;
        display: inline-block;
        // text-align: center;
        // padding: 0 10px;
        // margin: 0 17px;
        // width: 71px;
        padding: 10px 17px;
        width: 185px;
        margin-right: 20px;
        position: relative;
        border: 1px solid #cccccc;
        border-radius: 8px;
        .sets {
          // color: #212121;
          font-size: 24px;
        }
        .desc {
          font-size: 20px;
          // color: #505050;
          // width: 100%;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .tip {
          height: 23px;
          width: 47px;
          position: absolute;
          text-align: center;
          font-size: 16px;
          right: 0;
          top: 0;
          color: #fff;
          background: #fb7299;
          border-bottom-left-radius: 5px;
          border-top-right-radius: 5px;
        }
      }
      .con {
        color: #fb7299;
        border: 1px solid #fb7299;
      }
    }
  }
}
.sp {
  padding: 0 20px 27px 20px;
  z-index: 100;
  border-bottom: 1px solid #e7e7e7;
  .title {
    height: 75px;
    line-height: 75px;
    color: #000;
    font-size: 26px;
    // font-family: Microsoft Yahei,Tahoma,Helvetica,Arial,"\5B8B\4F53",sans-serif;
    font-weight: 700;
  }
  .scroll-wrapper {
    position: relative;
    width: 100%;
    box-sizing: border-box;
    // margin: 0 17px;
    margin: auto;
    white-space: nowrap;
    // border-radius: 5px;
    overflow: hidden;
    .scroll-content {
      display: inline-block;
    }
    .scroll-item {
      display: inline-block;
      // padding: 10px 17px;
      width: 200px;
      margin-right: 20px;
      position: relative;
      border-radius: 8px;
      .cover {
        width: 100%;
        img {
          width: 100%;
        }
      }
      .name {
        padding-top: 7px;
        font-size: 20px;
        color: #505050;
        height: 64px;
        line-height: 30px;
        width: 100%;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        // width: 200px;
      }
    }
  }
}
.morerecomment {
  padding: 0 20px;
  border-bottom: 1px solid #e7e7e7;
  .title {
    height: 75px;
    line-height: 75px;
    font-size: 26px;
    color: #212121;
    font-weight: 700;
  }
  .item {
    margin-bottom: 25px;
    display: flex;

    .cover {
      flex: 0 0 200px;
      // width: 200px;
      margin-right: 20px;
      img {
        width: 100%;
      }
    }
    .info {
      flex: 1;
      .name {
        height: 58px;
        font-size: 24px;
        color: #212121;
      }
      .infomsg {
        margin-top: 8px;
        color: #999999;
        font-size: 20px;
      }
    }
  }
}
.reply {
  padding-top: 27px;
  .title {
    font-size: 26px;
    margin-left: 28px;
    color: #212121;
    font-weight: 700;
  }
  .item {
    padding: 23px 20px;
    display: flex;
    border-bottom: 1px solid #e7e7e7;
    .userimg {
      text-align: center;
      flex: 0 0 71px;
      img {
        width: 41px;
        height: 41px;
        border-radius: 50%;
      }
    }
    .info {
      flex: 1;
      .top {
        display: flex;
        justify-content: space-between;
        height: 35px;
        .uname {
          color: #fc7299;
          font-size: 22px;
        }
        .ctime {
          font-size: 17px;
          color: #999999;
        }
      }
      .msg {
        font-size: 24px;
        color: #212121;
      }
    }
  }
}
.last {
  text-align: center;
  color: #999;
  margin-top: 20px;
  font-size: 20px;
  margin-bottom: 40px;
}
</style>