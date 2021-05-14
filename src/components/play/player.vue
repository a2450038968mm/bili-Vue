<template>
  <div>
    <div>
      <div class="video" ref="videos" @click.self="showprow">
        <img class="img" v-show="isstart" v-lazy="cardlist.View.pic" alt="" />
        <video
          v-show="!isstart && canplay"
          width="100%"
          height="100%"
          ref="video"
          :src="playurl"
        ></video>
        <div class="playmask" v-if="!isstart && !canplay">
          <van-loading vertical>加载中 </van-loading>
        </div>
        <div class="play" @click="control" v-else v-show="isstart || !isplay">
          <span class="iconfont icon-bofangqi-bofangxiaodianshi"></span>
          <!-- <span class="iconfont"></span> -->
        </div>
        <div class="tips" v-show="isstart && !showtips">
          <div class="playcont">{{ cardlist.View.stat.view | count }}观看</div>
          <div class="bullet">{{ cardlist.View.stat.danmaku | count }}弹幕</div>
          <div class="uploading">{{ cardlist.View.ctime | timefor }}</div>
          <div class="time" v-if="'pages' in cardlist.View">
            {{ cardlist.View.pages[p].duration | timeformat }}
          </div>
          <!-- <div class="time">{{ cardlist.View.pages[p].duration | timeformat }}</div> -->
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
      <!-- <div class="pymask" v-else>3333</div> -->
    </div>
    <div class="upuser">
      <div class="title">
        <div :class="['left', { overhid: !describe }]">
          <div class="hot">
            <span class="iconfont icon-remen"></span>
            热门
          </div>
          {{ cardlist.View.title }}
        </div>
        <div class="right" @click="showdescribe">
          <span class="iconfont icon-xiala" v-show="!describe"></span>
          <span class="iconfont icon-shangla" v-show="describe"></span>
        </div>
      </div>
    </div>
    <transition name="describe">
      <div class="xiangqing" v-if="describe">
        <div class="pubisher">
          <div class="userimg" @click="gouser">
            <img :src="cardlist.Card.card.face" alt="" />
          </div>
          <div class="username" @click="gouser">
            <h1>{{ cardlist.Card.card.name }}</h1>
            <h2>{{ cardlist.Card.follower | count }}粉丝</h2>
          </div>
          <div class="attention" @click="attention">
            <div
              v-show="!isattention"
              :class="['button', { red: isattention }]"
            >
              <span class="iconfont icon-jia"> </span>关注
            </div>
            <div v-show="isattention" :class="['button', 'red']">已关注</div>
          </div>
        </div>
        <div class="videodata">
          <div class="watchcount">{{ cardlist.View.stat.view | count }}</div>
          <div class="bullet">{{ cardlist.View.stat.danmaku | count }}弹幕</div>
          <div class="uploading">{{ cardlist.View.ctime | timefor }}</div>
          <div class="bvid">{{ cardlist.View.bvid }}</div>
        </div>
        <div class="copyright">
          <span class="iconfont icon-jinzhi"></span>
          未经作者授权禁止转载
        </div>
        <div class="explain">
          <!-- {{ cardlist.View.desc }} -->
          <p v-for="(item, index) in cardlist.View.desc" :key="index">
            {{ item }}
          </p>
        </div>
        <div class="triplet">
          <div class="dianzan">
            <span
              @click.once="like"
              :class="['iconfont', 'icon-dianzan', { con: islike }]"
              >{{ cardlist.View.stat.like | count }}</span
            >
            <span
              @click.once="deal"
              :class="['iconfont', 'icon-shoucang', { con: isdeal }]"
              >{{ cardlist.View.stat.favorite | count }}</span
            >
            <span
              @click.once="bil"
              :class="['iconfont', 'icon-Bbi', { 'icon-Bbi': isbil }]"
              >{{ cardlist.View.stat.coin | count }}</span
            >
            <span class="triple" @click="triple">一键三连</span>
          </div>
        </div>
      </div>
    </transition>
    <div class="info" v-if="!describe">
      <div class="left" @click="gouser">
        <div class="userimg">
          <img :src="cardlist.Card.card.face" alt="" />
        </div>
        <div class="username">{{ cardlist.Card.card.name }}</div>
      </div>
      <div class="right">
        <div class="playcounts">{{ cardlist.View.stat.view | count }}观看</div>
        <div class="praise">
          <span
            @click.once="like"
            :class="['iconfont', 'icon-dianzan', { con: islike }]"
          ></span>
          {{ cardlist.View.stat.like | count }}
        </div>
        <div class="collect">
          <span
            @click.once="deal"
            :class="['iconfont', 'icon-shoucang', { con: isdeal }]"
          ></span>
          {{ cardlist.View.stat.favorite | count }}
        </div>
      </div>
    </div>
    <div class="episode" v-if="length > 1">
      <div
        @click="onP(key)"
        :class="['item', { con: p == key }]"
        v-for="(val, key) in cardlist.View.pages"
        :key="key"
      >
        {{ val.part }}
      </div>
      <span class="iconfont icon-xiala" @click="showp"></span>
      <van-popup v-model="showP" :style="{ height: '70%' }" position="bottom">
        <div class="title-dateil">
          <div class="left">分集（2）</div>
          <div @click="exitepisode" class="exit iconfont icon-cuo"></div>
        </div>
        <ul>
          <li
            @click="onP(key)"
            :class="p == key ? 'con' : ''"
            v-for="(val, key) in cardlist.View.pages"
            :key="key"
          >
            {{ val.part }}
          </li>
        </ul>
      </van-popup>
    </div>
    <div class="tables">
      <div class="recommend" @click="toggerrecommend">
        <span :class="isrecommend ? 'con' : ''">相关推荐</span>
      </div>
      <div class="comment" @click="toggerrecommend">
        <span :class="!isrecommend ? 'con' : ''"
          >评论{{ commentnum | count }}</span
        >
      </div>
    </div>
    <playrecommend
      :recommendlist="recommendlist"
      v-if="isrecommend"
    ></playrecommend>
    <comment :oid="oid" v-else></comment>
  </div>
</template>

<script>
import playrecommend from "./playrecommend";
import comment from "./comment";
import {
  getPlayerDetail,
  getVideoComment,
  getVideoUrl,
} from "../../api/player";
import { Toast } from "vant";
export default {
  components: {
    playrecommend,
    comment,
  },
  created() {
    this.oid = this.$route.query.oid;
    this.avid = this.$route.query.avid;
    this.bvid = this.$route.query.bvid;
  },
  mounted() {
    console.log("Card" in this.cardlist);
    this.getvideodetail();
    this.getvideocomment();
    this.csrf = this.getCookie("bili_jct");
    console.log("-----------------------------------", this.scrf);
  },
  data() {
    return {
      isbil: false,
      csrf: "",
      canplay: false,
      playurl: "",
      showP: false,
      p: 0,
      avid: null,
      bvid: null,
      oid: null,
      isdeal: false,
      islike: false,
      commentnum: null,
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
      length:0,
    };
  },
  methods: {
    gouser(){
      let mid = this.cardlist.Card.card.mid
      this.$router.push({path:"/user",query:{mid}})
    },
    onP(index) {
      this.p = index;
    },
    exitepisode() {
      this.showP = false;
    },
    showp() {
      this.showP = true;
    },
    triple() {
      if (!this.isdeal && !this.islike && !this.isbil) {
        Toast.success("三连成功");
        this.isdeal = true;
        this.islike = true;
        this.isbil = true;
      } else {
        Toast("已三连");
      }
    },
    deal() {
      Toast.success("收藏成功");
      this.isdeal = !this.isdeal;
    },
    bil() {
      Toast.success("投币成功");
      this.isbil = !this.isbil;
    },
    like() {
      Toast.success("点赞成功");
      this.islike = !this.islike;
    },
    attention() {
      this.isattention = !this.isattention;
    },
    getvideourl() {
      let obj = {};
      if (this.avid) {
        obj.avid = this.avid;
      } else if (this.bvid) {
        obj.bvid = this.bvid;
      }
      obj.cid = this.cardlist.View.pages[this.p].cid;
      this.length = this.cardlist.View.pages.length
      obj.fnval = 1;
      obj.platform = "html5";
      obj.otype = "json";
      obj.qn = 16;
      obj.type = "mp4";
      getVideoUrl(obj).then((data) => {
        this.playurl = data.data.durl[0].url;
        this.$refs.video.addEventListener("canplay", () => {
          this.canplay = true;
          console.log("加载完毕");
          // this.engtime = this.endtime = this.$refs.audio.duration;
          this.loadend = true;
          this.endtime = parseInt(this.$refs.video.duration);
        });
      });
    },
    getvideodetail() {
      let _this = this;
      let obj = {
        aid: _this.oid,
      };
      getPlayerDetail(obj).then((data) => {
        if (data.data.View.redirect_url) {
          this.$router.push({
            path: "/playeranime",
            query: { season_id: 33378 },
          });
        }
        this.cardlist = data.data;
        console.log(this.cardlist);
        
        this.recommendlist = data.data.Related;
        this.detail = data.data.View;
        this.cardlist.View.desc = this.desc(this.cardlist.View.desc);
        this.getvideourl();
      });
    },
    getvideocomment() {
      let _this = this;
      let commentObj = {
        type: 1,
        oid: _this.oid,
      };
      getVideoComment(commentObj).then((data) => {
        this.commentnum = data.data.page.acount;
      });
    },
    clectspeed(speed) {
      this.$refs.video.playbackRate = speed;
      this.speed = speed;
      this.showspeed = false;
    },
    toggerspeed() {
      this.showspeed = true;
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
    showdescribe() {
      this.describe = !this.describe;
    },
    stardrage() {
      this.isdrage = true;
    },
    enddrage() {
      this.isdrage = false;
    },
    end() {
      this.$refs.video.addEventListener("ended", () => {
        //结束
        this.isplay = false;
      });
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
    onChange(value) {
      this.ingtime = value;
      this.$refs.video.currentTime = value;
    },

    change() {
      if (this.activeNames == 1) {
        this.activeNames = 0;
      }
      this.activeNames += 1;
    },
    toggerrecommend() {
      this.isrecommend = !this.isrecommend;
    },
    desc(str) {
      let arr = str.split("\n");
      return arr;
    },
    getCookie(cookieName) {
      var cookieStr = unescape(document.cookie);
      var arr = cookieStr.split("; ");
      var cookieValue = "";
      for (var i = 0; i < arr.length; i++) {
        var temp = arr[i].split("=");
        if (temp[0] == cookieName) {
          cookieValue = temp[1];
          break;
        }
      }
      return cookieValue;
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
  watch: {
    p() {
      this.getvideourl();
    },
    $route() {
      this.oid = this.$route.query.oid;
      this.avid = this.$route.query.avid;
      this.bvid = this.$route.query.bvid;
      this.getvideodetail();
      this.getvideocomment();
    },
  },
};
</script>

<style lang="less" scoped>
.play-enter,
.play-leave-to {
  // opacity: 0;
  transform: translateY(30px);
}
/* .play-enter-active 入场时间段 */
/* .play-leave-active 离场时间段 */
.play-enter-active,
.play-leave-active {
  transition: all 0.5s ease;
}
.playmask {
  position: relative;
  width: 100%;
  height: 400px;
  background: #000;
  .van-loading {
    color: #fff;
    position: absolute;
    top: 45%;
    left: 45%;
    // margin-top: 45%;
  }
}
.van-popup {
  background-color: #f4f4f4;
  .title-dateil {
    display: flex;
    padding: 0 27px;
    justify-content: space-between;
    height: 72px;
    line-height: 75px;
    font-size: 26px;
  }
  .iconfont {
    font-size: 30px;
    color: #bcbcbc;
  }
  ul {
    list-style: none;
    padding: 0 27px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li {
      width: 47%;
      height: 114px;
      box-sizing: border-box;
      padding: 27px 19px;
      font-size: 20px;
      border: 1px solid #ccc;
      background: #fff;
      border-radius: 10px;
      margin-bottom: 20px;
      &.con {
        border-color: #fb6791;
        color: #fb6791;
      }
    }
  }
}

.episode {
  position: relative;
  border-top: 1px solid #e7e7e7;
  padding: 20px;
  height: 115px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  overflow: hidden;
  .item {
    flex: 0 0 220px;
    padding: 8px 15px;
    box-sizing: border-box;
    border-radius: 15px;
    height: 100%;
    font-size: 22px;
    border: 1px solid #ccc;
    margin-right: 14px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    &.con {
      border: 1px solid #fb6791;
      color: #fb6791;
    }
  }
  .icon-xiala {
    font-size: 30px;
    position: absolute;
    right: 20px;
    top: 35%;
  }
}
.icon-dianzan,
.icon-shoucang {
  &.con {
    color: #fb6791;
  }
}
.tables {
  display: flex;
  border-top: 1px solid #f7f7f7;
  text-align: center;
  height: 50px;
  line-height: 50px;
  font-size: 24px;
  color: #4a4a4a;
  border-bottom: 1px solid #f6f6f6;
  .con {
    color: #fb6791;
    border-bottom: 3px solid #fb6791;
  }
  .recommend {
    flex: 1;
  }
  .comment {
    flex: 1;
  }
}
.triplet {
  height: 90px;
  line-height: 90px;
  color: #757575;
  .triple {
    display: inline-block;
    margin-top: 25px;
    padding: 0 15px;
    // background-color: #fb7299;
    border: 1px solid #fb7299;
    border-radius: 10px;
    color: #fb7299;
    height: 40px;
    line-height: 40px;
    &.con {
      color: #fff;
      background: #fb7299;
    }
  }
  span {
    margin-right: 40px;
    font-size: 18px;

    &::before {
      font-size: 38px;
      margin-right: 5px;
    }
    &:nth-child(1)::before {
      font-size: 34px;
    }
    .triple {
      display: block;
      padding: 0 15px;
      // bac
      height: 90px;
      line-height: 90px;
    }
  }
  &.con {
    color: #fb7299;
  }
}
.info {
  display: flex;
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  .left {
    flex: 0 0 250px;
    display: flex;
    .userimg {
      width: 35px;
      height: 35px;
      margin-right: 10px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 1px solid #939393;
      }
    }
    .username {
      font-size: 20px;
      line-height: 35px;
      color: #3f3f3f;
    }
  }
  .right {
    height: 35px;
    line-height: 35px;
    flex: 1;
    display: flex;
    color: #757575;
    font-size: 20px;
    & > div {
      margin-right: 25px;
    }
    span {
      font-size: 32px;
    }
    .collect {
      margin: 0;
      .icon-shoucang {
        font-size: 38px;
      }
    }
  }
}
.custom-button {
  position: relative;
  width: 9px;
  height: 9px;
  // border: 10px solid #fff;
  color: #fff;
  background-color: #ee0a24;
  border-radius: 50%;
  span {
    background: #fff;
    color: #333333;
    position: absolute;
    width: 12px;
    height: 12px;
    text-indent: -1px;
    line-height: 10px;
    text-align: center;
    top: -3px;
  }
}
.video {
  margin-top: -56px;
  position: relative;
  overflow: hidden;
  .img {
    width: 100%;
    height: 100%;
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
.xiangqing {
  padding: 0 20px;
}
.overhid {
  height: 40px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.title {
  width: 100%;
  margin-top: 20px;
  display: flex;
  .left {
    line-height: 40px;
    flex: 1;
    padding-left: 133px;
    position: relative;
    font-size: 27px;
    .hot {
      text-align: center;
      position: absolute;
      left: 20px;
      top: 0;
      color: #fb7299;
      font-size: 20px;
      width: 96px;
      height: 40px;
      line-height: 40px;
      background-color: #f4f4f4;

      border-radius: 30px;
      span {
        font-size: 20px;
      }
    }
  }
  .right {
    color: #979b9b;

    flex: 0 0 60px;
    text-align: center;
    height: 40px;
    line-height: 40px;
    span {
      font-size: 30px;
      line-height: 40px;
      display: block;
    }
  }
}
.pubisher {
  display: flex;
  // padding: 0 20px;

  .userimg {
    flex: 0 0 61px;
    height: 61px;
    margin-right: 20px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 1px solid #828282;
    }
  }
  .username {
    flex: 1;
    h1 {
      font-size: 24px;
      font-weight: normal;
    }
    h2 {
      font-size: 20px;
      font-weight: normal;
      color: #999999;
    }
  }
  .attention {
    flex: 0 0 112px;

    .button {
      width: 100%;
      height: 40px;
      border: 1px solid #fb7299;
      color: #fb7299;
      font-size: 23px;
      line-height: 40px;
      text-align: center;
      border-radius: 10px;
      &.red {
        color: #fff;
        background: #fb6791;
      }
      span {
        font-size: 16px;
        line-height: 40px;
        margin-right: 5px;
        font-weight: 800;
      }
    }
  }
}
.videodata {
  color: #999;
  font-size: 20px;
  display: flex;
  margin-top: 20px;
  & > div {
    margin-right: 14px;
  }
}
.copyright {
  color: #9f9f9f;
  font-size: 24px;
  margin-top: 30px;
  span {
    color: #fb7299;
    font-size: 24px;
    margin-right: 15px;
  }
}
.explain {
  font-size: 24px;
  color: #9f9f9f;
  margin-top: 10px;
  line-height: 35px;
}
</style>