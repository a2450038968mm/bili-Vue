<template>
  <div v-if="'cards' in dynamiclist">
    <div class="items" v-for="(item, index) in dynamiclist.cards" :key="index">
      <div class="content" v-if="item.card.item.content || item.card.pic">
        <div class="top">
          <div class="userimg">
            <img :src="item.desc.user_profile.info.face" alt="" />
          </div>
          <div class="username">
            <h1>{{ item.desc.user_profile.info.uname }}</h1>
            <h2 v-if="item.card.ctime">{{ item.card.ctime | timefor }}·投稿了视频
            </h2>
            <h2 v-else-if="item.card.origin">
              {{ item.card.origin.ctime | timefor }}·投稿了视频
            </h2>
            <h2 v-else>
              {{ item.card.item.upload_time | timefor }}·投稿了视频
            </h2>
          </div>
        </div>
        <div class="mid">
          <div class="video" v-if="item.card.pic">
            <p>{{ item.card.dynamic }}</p>
            <div class="covermsg">
              <img width="100%" :src="item.card.pic" />
              <div class="tips">
                <div class="playcont">57万播放</div>
                <div class="bullet">3744弹幕</div>
                <div class="uploading">1小时前</div>
                <div class="time">5:45</div>
              </div>
            </div>
            <div class="title">{{ item.card.title }}</div>
          </div>
          <div class="userdynamic" v-if="item.card.item.content">
            <div class="userinfo">
              <p
                v-for="(val, key) in item.card.item.content"
                :key="key"
                v-html="val"
                v-show="val.length"
              ></p>
              <div class="cover" v-if="item.card.item.pictures">
                <img
                  v-for="(val, key) in item.card.item.pictures"
                  :key="key"
                  :src="val.img_src"
                  alt=""
                />
              </div>
            </div>
            <div class="reply" v-if="item.card.origin.item.description">
              <p
                v-for="(val, key) in item.card.origin.item.description"
                :key="key"
                v-html="val"
              ></p>
              <div class="cover">
                <img
                  v-for="(val, key) in item.card.origin.item.pictures"
                  :key="key"
                  :src="val.img_src"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="transmi">
            <span class="iconfont icon-copy">{{ item.desc.repost }}</span>
          </div>
          <div class="comment">
            <span class="iconfont icon-xiaoxi">{{
              (item.card.item.reply || 0) | count
            }}</span>
          </div>
          <div class="like">
            <span class="iconfont icon-zan">{{ item.desc.like | count }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getUserstate } from "../../api/user";
export default {
  props: ["mid"],
  data() {
    return {
      dynamiclist: {},
    };
  },
  methods: {
    getuserinfo() {
      let parms = {};
      parms.host_uid = this.mid;
      getUserstate(parms).then((data) => {
        data.data.cards.reverse();
        data.data.cards.forEach((item) => {
          item.card = JSON.parse(item.card);
        });
        data.data.cards.forEach((item) => {
          if (item.card.item.content) {
            item.card.item.content = this.desc(item.card.item.content);
          }
          if (item.extend_json) {
            item.extend_json = JSON.parse(item.extend_json);
          }
          if (item.card.origin) {
            item.card.origin = JSON.parse(item.card.origin);
            item.card.origin_extend_json = JSON.parse(
              item.card.origin_extend_json
            );
            if (item.card.origin.item.description) {
              item.card.origin.item.description = this.desc(
                item.card.origin.item.description
              );
            }
          }
        });
        this.dynamiclist = data.data;
      });
    },
    desc(str) {
      if (str) {
        let arr = str.split("\n");
        let obj = arr.map((item) => {
          let firstindex = item.indexOf("#");
          let lastindex = item.lastIndexOf("#");
          if (firstindex > -1 && lastindex > -1 && firstindex != lastindex) {
            let length = lastindex - firstindex;
            let statrstr = item.substr(0, firstindex);
            let stritem = item.substr(firstindex, length + 1);
            item = statrstr + this.tospan(stritem) + item.substr(lastindex + 1);
            return item;
          } else {
            return item;
          }
        });
        return obj;
      } 
    },
    tospan(str) {
      if (!str) {
        let firstidnex = str.indexOf("#");
        let data = str.substr(0, firstidnex);
        let index = str.indexOf("#", 1) + 1;
        let lastindex = str.lastIndexOf("#") + 1;
        if (index != lastindex) {
          let strstart =
            data +
            "<span style='color: #5090cc'>" +
            str.substr(firstidnex, index) +
            "</span>";
          let itemindex = str.indexOf("#", index);
          return strstart + this.tospan(str.substr(itemindex));
        } else {
          return (
            data +
            "<span style='color:#5090cc'>" +
            str.slice(firstidnex, lastindex + 1) +
            "</span>"
          );
        }
      }
    },
  },

  mounted() {
    this.getuserinfo();
  },
  watch: {
    mid() {
      this.dynamiclist = {};
      this.getuserinfo();
    },
  },
};
</script>


<style lang="less" scoped>
.content {
  padding: 14px 12px;
  border-bottom: 1px solid #f4f4f4;
  .top {
    display: flex;
    margin-bottom: 26px;
    .userimg {
      margin-right: 7px;
      flex: 0 0 40px;
      height: 40px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .username {
      flex: 1;
      h1 {
        height: 20px;
        line-height: 20px;
        font-size: 14px;
        color: #212121;
        font-weight: normal;
      }
      h2 {
        height: 20px;
        line-height: 20px;
        font-size: 12px;
        color: #9999a6;
        font-weight: normal;
      }
    }
    .attention {
      flex: 0 0 39px;
      height: 40px;
      line-height: 40px;
      color: #fb7299;
      font-size: 14px;
    }
  }
  .mid {
    .video {
      .covermsg {
        position: relative;
      }
      p {
        padding: 10px 0;
      }
      .tips {
        width: 100%;
        padding-left: 15px;
        padding-right: 15px;
        box-sizing: border-box;
        height: 68px;
        position: absolute;
        bottom: 0px;
        left: 0;
        background-image: linear-gradient(
          180deg,
          transparent 2%,
          rgba(0, 0, 0, 0.7) 98%
        );
        display: flex;
        & > div {
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
      }
    }
    .title {
      margin-top: 10px;
      color: #212121;
      font-size: 14px;
      margin-bottom: 20px;
    }
    .userdynamic {
      .blue {
        color: #5090cc;
      }
      .userinfo {
        padding: 5px;
        background: #fff;
        p {
          color: #212121;
          font-size: 16px;
        }
        .cover {
          padding: 15px 0;
          display: flex;
          // justify-content: space-between;
          flex-wrap: wrap;
          img {
            display: block;
            width: 32%;
            margin-bottom: 10px;
          }
        }
      }
      .reply {
        background-color: #f4f4f4;
        color: #757575;
        font-size: 16px;
        margin: 0 -12px;
        padding: 5px 12px;
        padding-bottom: 20px;
        .cover {
          padding: 15px 0;
          display: flex;
          // justify-content: space-between;
          flex-wrap: wrap;
          img {
            display: block;
            width: 32%;
            // margin: 0 5px;
            margin-right: 5px;
            margin-bottom: 10px;

          }
        }
      }
    }
  }
  .bottom {
    margin-top: 10px;
    display: flex;
    // width: 80%;
    padding: 0 10%;
    justify-content: space-between;
    color: #969696;
    span {
      font-size: 14px;
    }
  }
}
</style>