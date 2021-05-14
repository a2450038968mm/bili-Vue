<template>
  <div>
    <div class="item" v-for="(item, index) in replyList.replies" :key="index">
      <div class="left">
        <div class="userimg" v-if="'member' in item">
          <img v-lazy="item.member.avatar" alt="" />
        </div>
      </div>
      <div class="right">
        <div class="top">
          <div class="username" v-if="'member' in item">
            <h1>{{ item.member.uname }}</h1>
            <h2>{{ item.ctime | timefor }}</h2>
            <!-- <h2>{{ item.ctime}}</h2> -->
          </div>
          <div class="good">
            <span class="iconfont icon-zan">{{ item.like | count }}</span>
          </div>
        </div>
        <div class="content" v-if="item.content.message">
          <p
            v-for="(val, key) in item.content.message"
            :key="key"
            v-html="getEmtoe(val, index)"
          ></p>
        </div>
        <div class="reply" v-if="item.replies">
          <div class="replyuser" v-for="(val, key) in item.replies" :key="key">
            <a href="#">{{ val.member.uname }}:</a>
            <p v-html="getEmtoeTwo(val.content.message, index, key)"></p>
          </div>

          <p
            class="show"
            v-show="item.replies.length <= 3"
            @click="replydetail(index, item.rpid)"
          >
            共{{ item.rcount }}条评论
            <span class="iconfont icon-you"></span>
          </p>
          <p
            class="show"
            v-show="item.replies.length > 3"
            @click="shouqi(index)"
          >
            收起
            <span class="iconfont icon-shangla "></span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getVideoCommentDetail, getFloorReply } from "../../api/player";
export default {
  props: ["oid"],
  mounted() {
    this.getReply(this.replyPage);
  },
  data() {
    return {
      replyPage: 0,
      replyList: {},
    };
  },
  methods: {
    shouqi(index) {
      this.replyList.replies[index].replies.splice(3)
    },
    like() {},
    replydetail(index, id) {
      let reply = this.getreply(this.oid, id);
      reply.then((data) => {
        let obj = data.data.replies;

        this.replyList.replies[index].replies = obj;
      });
    },
    getreply(oid, rid) {
      let params = {
        type: 1,
        root: rid,
        oid: oid,
      };
      return getFloorReply(params);
    },
    getReply(num) {
      let _this = this;
      let obj = {
        type: 1,
        oid: _this.oid,
        next: num,
      };
      getVideoCommentDetail(obj).then((data) => {
        this.replyList = data.data;
        this.desc(this.replyList.replies);
      });
    },
    desc(arr) {
      console.log(arr);
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
      arr.splice(arr.length - 1, 1);
      if (arr.length) {
        let text = item.substr(0, firstindex);
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].indexOf("[") != -1) {
            text += arr[i].substr(0, arr[i].indexOf("["));
          }
          arr[i] += "]";
          if (arr[i] in this.replyList.replies[index].content.emote) {
            text +=
              "<img  referrer='no-referrer|origin|unsafe-url' class='emote' src=" +
              this.replyList.replies[index].content.emote[arr[i]].url +
              ">";
          }
        }
        return text;
      } else {
        return item;
      }
    },
    getEmtoeTwo(item, index, key) {
      let firstindex = item.indexOf("[");
      let lastindex = item.lastIndexOf("]");
      let str = item.substr(firstindex, lastindex);
      let arr = str.split("]");
      arr.splice(arr.length - 1, 1);
      if (arr.length) {
        let text = item.substr(0, firstindex);
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].indexOf("[") != -1) {
            text += arr[i].substr(0, arr[i].indexOf("["));
          }
          arr[i] += "]";
          if (
            arr[i] in this.replyList.replies[index].replies[key].content.emote
          ) {
            text +=
              "<img class='emote' src=" +
              this.replyList.replies[index].replies[key].content.emote[arr[i]]
                .url +
              ">";
          }
        }
        return text;
      } else {
        return item;
      }
    },
  },
  filters: {
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
.icon-zan {
  &.con {
    color: #fb6791;
  }
}
.show {
  color: #5a90cd;
  font-size: 22px;
  height: 35px;
  line-height: 35px;
}
.item {
  display: flex;
  padding: 23px;
  width: 100%;
  border-bottom: 1px solid #e7e7e7;
  box-sizing: border-box;
  .left {
    flex: 0 0 91px;
    .userimg {
      width: 60px;
      height: 60px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
  }
  .right {
    flex: 1;
    .top {
      display: flex;
      .username {
        flex: 1;
        h1 {
          font-size: 22px;
          color: #757575;
          font-weight: normal;
        }
        h2 {
          font-weight: normal;
          color: #99a2c2;
          font-size: 20px;
        }
      }
      .good {
        flex: 0 0 73px;
        height: 62px;
        line-height: 62px;
        color: #999999;
        span {
          font-size: 16px;
          &::before {
            margin-right: 9px;
            font-size: 24px;
          }
        }
      }
    }
    .content {
      font-size: 26px;
      margin-bottom: 10px;
      color: #212121;
    }
    .reply {
      padding: 20px;
      width: 100%;
      box-sizing: border-box;
      background-color: #f4f4f4;
      border-radius: 5px;
      .replyuser {
        font-size: 24px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        color: #353534;
        a {
          color: #5a90cd;
          text-decoration: none;
        }
        p {
          display: inline-block;
        }
      }
    }
  }
}
</style>