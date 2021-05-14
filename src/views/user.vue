<template>
  <div>
    <div class="background"></div>
    <div class="usermsg">
      <div class="left">
        <img :src="face" alt="" />
      </div>
      <div class="right">
        <div class="top">
          <div class="fans">
            <h2>{{ userinfo.follower | count }}</h2>
            粉丝
          </div>
          <div class="concern">
            <h2>{{ friend | count }}</h2>
            关注
          </div>
          <div class="getgood">
            <h2>{{ likes | count }}</h2>
            获赞
          </div>
        </div>
        <!-- <div class="bottom">+关注</div> -->
      </div>
    </div>
    <div class="user">
      <div class="username">{{ userinfo.card.name }}</div>
      <div :class="['describe', { hid: hid }]">
        {{ usermsg.sign ? usermsg.sign : "这个人很神秘，什么都没有写" }}
      </div>
      <div class="unfold" @click="hid = !hid">
        {{ hid ? "收起" : "展开" }}
      </div>
    </div>
    <div class="tables">
      <span :class="['dynamic', { con: isopen }]" @click="toggerdynamic('true')"
        >动态</span
      >
      <span
        :class="['videolist', { con: !isopen }]"
        @click="toggerdynamic('false')"
        >详情</span
      >
    </div>
    <dynamic :mid=mid  v-if="isopen"></dynamic>
    <uservideos :mid=mid v-else></uservideos>
  </div>
</template>

<script>
import dynamic from "../components/user/dynamic";
import uservideos from "../components/user/videos";
import {
  getUserinfo,
  getMyinfo,
  getUserinfocard,
  
} from "../api/user";
// import axios from "axios";
export default {
  components: {
    dynamic,
    uservideos,
  },
  data() {
    return {
      hid: false,
      isopen: false,
      userinfo: {
        card:{}
      },
      usermsg:{},
      likes:0,
      face:"",
      friend:"",
    };
  },
  methods: {
    toggerdynamic(str) {
      console.log(123123);
      if (str == "true") {
        this.isopen = true;
      } else {
        this.isopen = false;
      }
    },
    getuserinfo() {
      let obj = {};
      obj.mid = this.$route.query.mid ||this.getCookie("DedeUserID");
      this.mid = obj.mid
      console.log(obj);
      getUserinfo(obj).then((data) => {
        console.log(data);
        this.usermsg = data.data
      });
      getMyinfo().then((data) => {
        console.log(data);
      });
      getUserinfocard(obj).then((data) => {
        console.log(data);
        this.userinfo = data.data;
        this.face = this.userinfo.card.face
        this.friend = this.userinfo.card.friend
      });
      
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
  created() {
    this.getuserinfo();
  },
  watch:{
    $route(){
      this.getuserinfo();
    }
  }
};
</script>

<style lang="less" scoped>
.background {
  height: 152px;
  background: url(../assets/img/userbackground.png) no-repeat center center;
  background-size: 100%;
  margin-top: -55px;
}
.usermsg {
  display: flex;
  padding: 0 20px;
  box-sizing: border-box;
  .left {
    flex: 0 0 143px;
    margin-right: 80px;
    img {
      width: 143px;
      height: 143px;
      border-radius: 50%;
      position: relative;
      top: -11px;
    }
  }
  .right {
    .top {
      padding: 17px 0;
      display: flex;
      & > div {
        flex: 1;
        width: 123px;
        line-height: 23px;
        text-align: center;
        font-size: 22px;
        color: #999999;
        h2 {
          font-weight: normal;
          color: #212121;
          font-size: 24px;
        }
      }
      .concern {
        position: relative;
        &::before {
          content: "";
          display: block;
          width: 1px;
          height: 27px;
          background-color: #e7e7e7;
          position: absolute;
          right: 0;
          top: 9px;
        }
        &::after {
          content: "";
          display: block;
          width: 1px;
          height: 27px;
          background-color: #e7e7e7;
          position: absolute;
          left: 0;
          top: 9px;
        }
      }
    }
    .bottom {
      height: 50px;
      width: 376px;
      line-height: 50px;
      color: #fff;
      text-align: center;
      background-color: #fb7299;
      font-size: 24px;
      border-radius: 10px;
    }
  }
}
.user {
  padding: 22px;
  position: relative;
  .username {
    font-size: 30px;
    color: #212121;
    height: 42px;
    line-height: 42px;
  }
  .describe {
    color: #9999a6;
    margin-top: 17px;
    font-size: 20px;
  }
  .hid {
    height: 29px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .unfold {
    position: absolute;
    right: 32px;
    top: 22px;
    line-height: 42px;
    color: #1389bf;
    font-size: 22px;
  }
}
.tables {
  height: 68px;
  box-sizing: border-box;
  border-top: 1px solid #e7e7e7;
  border-bottom: 1px solid #e7e7e7;
  padding: 20px;
  color: #757575;
  font-size: 22px;
  span {
    margin-right: 56px;
  }
  .con {
    color: #fb7299;
  }
}
</style>