<template>
  <div>
    <div class="cover">
      <img v-show="!changepassword" src="../../assets/img/eye1on.png" alt="" />
      <img v-show="!changepassword" src="../../assets/img/eye2on.png" alt="" />
      <img v-show="changepassword" src="../../assets/img/eye1off.png" alt="" />
      <img v-show="changepassword" src="../../assets/img/eye2off.png" alt="" />
    </div>
    <div class="message">
      <div class="username">
        <span class="text">账号：</span>
        <input type="text" placeholder="请输入账号" v-model="uname" />
        <span
          class="iconfont icon-cuowu"
          @click="uname = ''"
          v-show="uname.length"
        ></span>
      </div>
      <div class="password">
        <span class="text">密码：</span>
        <input
          type="password"
          @focus="changepassword = true"
          @blur="changepassword = false"
          placeholder="请输入密码"
          v-model="password"
        />
        <span
          class="iconfont icon-cuowu"
          v-show="password.length"
          @click="password = ''"
        ></span>
      </div>
    </div>
    <div class="btn">
      <button :class="!highlight ? 'con' : ''" @click="test">点击登录</button>
    </div>

    <!-- 极验插件 -->
    <div id="captcha"></div>
  </div>
</template>


<script>
import { getGeeTest, getSaltValue, login } from "../../api/login";
import { Toast } from "vant";
import "../../assets/js/gt.js";
export default {
  data() {
    return {
      isresult: true,
      ispassword: false,
      uname: "",
      password: "",
      highlight: false,
      changepassword: false,
      gt: "",
      challenge: "",
      key: "",
      geetestObj: {},
      captchaObj: null,
      heandler: null,
      validate: "",
      seccode: "",
      rsapassword: "", //加密密码
    };
  },
  methods: {
    // 获取极验参数
    getgt() {
      this.handler = (captchaObj) => {
        captchaObj.appendTo("#captcha");
        captchaObj.onReady(() => {
          // this.show = false;
        });
        this.captchaObj = captchaObj;
      };
    },
    // 获取插件参数
    gen() {
      getGeeTest().then((res) => {
        this.gt = res.data.result.gt;
        this.challenge = res.data.result.challenge;
        this.key = res.data.result.key;
        this.isresult = true;
      });
    },
    // 点击登录出现极验验证
    test() {
      if (!this.isresult) {
        this.isresult = true;
        this.gen();
        return Toast.fail("请重新登录");
      }
      this.isresult = false;
      let _this = this;
      let handler = (captchaObj) => {
        this.captchaObj = captchaObj;
        captchaObj.onReady(() => {
          captchaObj.verify();
        });
        captchaObj.onSuccess(() => {
          let {
            geetest_seccode: seccode,
            geetest_validate: validate,
          } = captchaObj.getValidate();
          this.validate = validate;
          this.seccode = seccode;
          this.login();
        });
      };
      // 调用 initGeetest 进行初始化
      // 参数1：配置参数
      // 参数2：回调，回调的第一个参数验证码对象，之后可以使用它调用相应的接口
      window.initGeetest(
        {
          gt: _this.gt,
          challenge: _this.challenge,
          offline: false, // 表示用户后台检测极验服务器是否宕机
          new_captcha: true, // 用于宕机时表示是新验证码的宕机
          product: "bind", // 产品形式，包括：float，popup
          width: "300px",
          https: true,
        },
        handler
      );
    },
    judge() {
      let reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
      let reg1 = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$.%^&*]+$/;
      if (
        this.password.length >= 6 &&
        this.password.length < 16 &&
        reg.test(this.uname)
      ) {
        if (reg1.test(this.password)) {
          this.highlight = true;
        } else {
          this.highlight = false;
        }
      } else {
        this.highlight = false;
      }
    },
    login() {
      let obj = {};
      let result = this.captchaObj.getValidate();
      if (!result) {
        Toast.fail("请重新验证");
        return;
      }
      obj.key = this.key;
      obj.captchaType = 6;
      obj.username = this.uname;
      obj.keep = true;
      obj.challenge = this.challenge;
      obj.validate = this.validate;
      obj.seccode = this.seccode;
      this.getsaltvalue((val) => {
        obj.password = val;
        let param = new URLSearchParams();
        for (let key in obj) {
          param.append(key, obj[key]);
        }
        login(param).then((data) => {
          if (data.code != 0) {
            Toast.fail("密码错误");
            this.highlight = false;
          } else {
            this.setcookie(data.data.redirectUrl)
            this.$router.push({path:"/index"})
          }
          this.isresult = true;
          this.gen();
        });
      });
    },
    setcookie(str) {
      let index = str.indexOf("?");
      str = str.slice(index + 1);
      let arr = str.split("&");
      let obj = arr.map((item) => {
        return (obj = item.split("="));
      });
      obj.forEach(item=>{
         document.cookie =item[0]+"="+item[1];
        
      })
    },
    getsaltvalue(callback) {
      getSaltValue().then((data) => {
        let key = data.key;
        let hash = data.hash + this.password;
        let val = this.$getRsaCode(key, hash);
        callback(val);
      });
    },
  },
  mounted() {
    this.gen();
  },
  watch: {
    uname() {
      this.judge();
    },
    password() {
      this.judge();
    },
  },
};
</script>


<style lang="less" scoped>
input,
button {
  outline: none;
  border: none;
}
.cover {
  display: flex;
  justify-content: space-between;
  img {
    width: 100px;
  }
}
.message {
  background: #fff;
  div {
    border-bottom: 1px solid #e8e8e8;
    padding: 0 15px;
    display: flex;
    height: 63px;
    position: relative;
    .text {
      flex: 0 0 110px;
      line-height: 63px;
      font-size: 22px;
    }
    input {
      flex: 1;
      padding: 15px 0;
      font-size: 18px;
    }
    .iconfont {
      color: #d6d6d6;
      font-size: 18px;
      position: absolute;
      right: 20px;
      top: 20px;
    }
    p {
      flex: 0 0 80px;
      line-height: 60px;
      color: #f987a8;
    }
  }
}
.btn {
  margin-top: 20px;
  padding: 0 30px;
  button {
    display: block;
    margin: 0 auto;
    width: 90%;
    color: #fff;
    background: #f987a8;
    height: 60px;
    line-height: 65px;
    border-radius: 15px;
  }
  .con {
    opacity: 0.6;
  }
}
</style>