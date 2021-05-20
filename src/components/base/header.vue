<template>
  <div>
    <div class="top">
      <div class="header">
        <div class="left">
          <!-- logo -->
          <div class="logo">
            <span class="iconfont icon-bilibili" @click="goindex"></span>
          </div>
        </div>

        <div class="right">
          <!-- 搜索 -->
          <div class="search" @click="goserch">
            <span class="iconfont icon-sousuo"></span>
          </div>
          <!-- 用户 -->
          <div class="user" v-show="!islogin" @click="login">登录</div>
          <div
            class="user"
            v-show="islogin"
            @click="$router.push({ path: '/user' })"
          >
            <img :src="userimg" alt="" />
          </div>
          <!-- 下载 -->
          <div class="download"  v-if="!islogin"></div>
          <div class="download red" @click="exitlogin" v-if="islogin">
            退出登录
          </div>
        </div>
      </div>
      <div class="nav-container" v-show="!$route.meta.show">
        <div class="scroll-wrapper" ref="scroll">
          <div class="scroll-content">
            <router-link
              :to="{ path: rou[index] }"
              class="scroll-item"
              tag="div"
              v-for="(item, index) in left"
              :key="index"
              >{{ item }}</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { getUserinfocard } from "../../api/user";
export default {
  data() {
    return {
      activeNames: ["1"],
      bs: null,
      islogin: false,
      left: [
        "首页",
        "动画",
        "番剧",
        "国创",
        "音乐",
        "舞蹈",
        "游戏",
        "知识",
        "数码",
        "生活",
        "美食",
        "动物圈",
        "鬼畜",
        "时尚",
        "娱乐",
        "影视",
        "纪录片",
        "电影",
        "电视剧",
      ],
      rou: [
        "/index",
        "/animate",
        "/anime",
        "/guochuang",
        "/music",
        "/dance",
        "/game",
        "/technology",
        "/digital",
        "/life",
        "/food",
        "/animal",
        "/kichiku",
        "/fashion",
        "/ent",
        "/cinephile",
        "/documentary",
        "/movie",
        "/tv",
      ],
      open: 0,
      userimg: "",
    };
  },
  methods: {
    getuserimg() {
      if (!this.userimg) {
        let mid = this.getCookie("DedeUserID");
        let cookie = this.getCookie("SESSDATA");
        if (mid && cookie) {
          let obj = {
            mid,
          };
          getUserinfocard(obj).then((data) => {
            this.userimg = data.data.card.face;
            this.islogin = true;
          });
        } else {
          this.islogin = false;
        }
      }
    },
    exitlogin() {
      var myDate = new Date();
      myDate.setTime(-1000); //设置时间
      var data = document.cookie;
      var dataArray = data.split("; ");
      for (var i = 0; i < dataArray.length; i++) {
        var varName = dataArray[i].split("=");
        document.cookie = varName[0] + "=''; expires=" + myDate.toGMTString();
      }
      this.$router.push({path:"/login"})
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
    goindex() {
      this.$router.push({ path: "/" });
    },
    init() {
      this.bs = new BScroll(this.$refs.scroll, {
        scrollX: true,
        probeType: 3,
        click: true,
      });
    },
    login() {
      this.$router.push({ path: "/login" });
    },
    gorou(index) {
      this.open = index;
      this.$router.push({ path: this.rou[index] });
    },
    goserch() {
      this.$router.push({ path: "/search" });
    },
    setcookie(str) {
      let index = str.indexOf("?");
      str = str.slice(index + 1);
      let arr = str.split("&");
      let obj = arr.map((item) => {
        return (obj = item.split("="));
      });
      obj.forEach((item) => {
        document.cookie = item[0] + "=" + item[1] + "; Max-Age=86400";
      });
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  },
  watch: {
    $route() {
      this.getuserimg();
    },
    islogin() {
      this.setcookie(document.cookie);
    },
  },
};
</script>


<style lang="less" scoped>
.body{
  font-size: 24px;
}
.top {
  z-index: 100;
  background-color: #fff;
  position: fixed;
  top: 0;
  width: 100%;
  border-bottom: 1px solid #f3f3f3;
  box-sizing: border-box;
  .header {
    height: 75px;
    padding: 0 20px;
    line-height: 75px;
    display: flex;
    justify-content: space-between;
    .left {
      width: 50%;
      padding-left: 17px;
      box-sizing: border-box;
      .logo {
        height: 100%;
        span {
          font-size: 48px;
          color: #fb7299;
        }
      }
    }
    .right {
      // margin: 16px 0;
      width: 50%;
      // height: 43px;
      height: 100%;
      padding: 16px 0;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      .search {
        line-height: 43px;
        span {
          font-size: 33px;
          color: #cccccc;
        }
      }
      .user {
        width: 43px;
        height: 43px;
        border-radius: 50%;
        background-color: #e8e8e8;
        color: #fb7299;
        text-align: center;
        line-height: 43px;
        font-size: 14px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .download {
        color: #fff;
        width: 122px;
        line-height: 43px;
        height: 43px;
        text-align: center;
        border-radius: 10px;
        font-size: 20px;
      }
      .red {
        background-color: #fb7299;
      }
    }
  }
  .nav-container {
    border-bottom: 1px solid #f3f3f3;
    .scroll-wrapper {
      position: relative;
      width: 95%;
      box-sizing: border-box;
      margin: 0 17px;
      margin: auto;
      white-space: nowrap;
      border-radius: 5px;
      overflow: hidden;

      .scroll-content {
        display: inline-block;
      }
      .scroll-item:nth-child(1) {
        margin-left: 0;
        padding-left: 0;
      }
      .scroll-item {
        margin: 0 17px;
        height: 65px;
        line-height: 65px;
        font-size: 24px;
        // box-sizing: border-box;
        position: relative;
        display: inline-block;
        text-align: center;
        padding: 0 10px;
        width: 71px;

        &.router-link-active {
          color: #fb7299;
          border-bottom: 3px solid #fb7299;
        }
      }
    }
  }
}
</style>