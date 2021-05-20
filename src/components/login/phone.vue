<template>
  <div class="body">
    <div class="cover">
      <img v-show="!changepassword" src="../../assets/img/eye1on.png" alt="" />
      <img v-show="!changepassword" src="../../assets/img/eye2on.png" alt="" />
      <img v-show="changepassword" src="../../assets/img/eye1off.png" alt="" />
      <img v-show="changepassword" src="../../assets/img/eye2off.png" alt="" />
    </div>
    <div class="message">
      <div class="username">
        <span class="text">账号：</span>
        <input
          id="phoneName"
          type="text"
          placeholder="请输入手机号码"
          v-model="uname"
        />
        <span
          class="iconfont icon-cuowu"
          @click="uname = ''"
          v-show="uname.length"
        ></span>
      </div>
      <div class="password">
        <span class="text">验证码：</span>
        <input
          type="text"
          @focus="changepassword = true"
          @blur="changepassword = false"
          placeholder="请输入验证码"
          v-model="phonemsg"
        />
        <span
          class="iconfont icon-cuowu"
          v-show="phonemsg.length"
          @click="phonemsg = ''"
        ></span>
        <p v-show="istime" :class="!highlight ? 'con' : ''" @click="gen">
          获取验证码
        </p>
        <p v-show="!istime" class="con">{{ time }}S</p>
      </div>
    </div>
    <div class="btn">
      <button :class="!canlogin ? 'con' : ''" @click="login">点击登录</button>
    </div>

    <!-- 极验插件 -->
    <div id="captcha" v-show="iscaptcha" ref="test">
      <input type="hidden" name="geetest_challenge" v-model="challenge" />
      <input type="hidden" name="geetest_validate" v-model="validate" />
      <input type="hidden" name="geetest_seccode" v-model="seccode" />
    </div>
  </div>
</template>

<script>
import { getmsgtoken, getTelMsg,phoneLogin } from "../../api/login";
import { Toast } from "vant";
import "../../assets/js/gt.js";
export default {
  directives: {
    clickDown: {
      inserted(el) {
        el.click();
      },
    },
  },
  data() {
    return {
      isresult: true,
      canlogin: false,
      iscaptcha: true,
      istime: true,
      time: 60,
      uname: "",
      phonemsg: "",
      highlight: false,
      changepassword: false,
      gt: "",
      challenge: "",
      key: "",
      geetestObj: {},
      captchaObj: null,
      validate: "",
      seccode: "",
      once: true, //只能校验一次
      timer: null,
    };
  },
  methods: {
    getgt() {
      this.handler = (captchaObj) => {
        captchaObj.appendTo("#captcha");
        captchaObj.onReady(() => {
        });
        this.captchaObj = captchaObj;
      };
    },
    gen() {
      if (!this.highlight) {
        return Toast.fail("请输入正确手机号");
      }
      if (!this.isresult) {
        //判断是否验证完
        this.getroken();
        this.isresult = true;
        return Toast.fail("请重新验证");
      }
      this.isresult = false;
      let _this = this;
      let handler = (captchaObj) => {
        this.captchaObj = captchaObj;
        captchaObj.onReady(() => {
          captchaObj.verify();
        });
        captchaObj.onSuccess(() => {
          this.iscaptcha = false;
          let {
            geetest_seccode: seccode,
            geetest_validate: validate,
          } = captchaObj.getValidate();
          this.validate = validate;
          this.seccode = seccode;
          this.getphonemsg(); //获取手机验证码
        });
      };
      // 调用 initGeetest 进行初始化
      // 参数1：配置参数
      // 参数2：回调，回调的第一个参数验证码对象，之后可以使用它调用相应的接口
      window.initGeetest(
        {
          // 以下 4 个配置参数为必须，不能缺少
          gt: _this.gt,
          challenge: _this.challenge,
          offline: false, // 表示用户后台检测极验服务器是否宕机
          new_captcha: true, // 用于宕机时表示是新验证码的宕机
          product: "bind", // 产品形式，包括：float，popup
          width: "300px",
          https: true,
          hideSuccess: true,
          hideClose: true,
          // 更多前端配置参数说明请参见：http://docs.geetest.com/install/client/web-front/
        },
        handler
      );
    },
    // 获取极验码
    getroken() {
      getmsgtoken().then((res) => {
        this.gt = res.data.geetest.gt;
        this.challenge = res.data.geetest.challenge;
        this.token = res.data.token;
      });
    },
    //监听手机格式
    judge() {
      let reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
      if (reg.test(this.uname)) {
        this.highlight = true;
      } else {
        this.highlight = false;
      }
    },
    getphonemsg() {
      let obj = {};
      let result = this.captchaObj.getValidate();
      if (!result) {
        return Toast.fail("请完成验证");
      }
      obj.source = "main_h5";
      obj.cid = "86";
      obj.tel = this.uname;
      obj.challenge = this.challenge;
      obj.validate = this.validate;
      obj.token = this.token;
      obj.seccode = this.seccode;
      let param = new URLSearchParams();
      for(let key in obj){
         param.append(key, obj[key]);
      }
      getTelMsg(param).then((data) => {
        if (data.code == 0) {
          this.canlogin = true;
          this.istime = false;
          this.captcha_key = data.data.captcha_key
          this.timer = setInterval(() => {
            this.time -= 1;
            if (this.time < 1) {
              clearInterval(this.timer);
              this.istime = true;
              this.timer = null;
              this.time = 60;
            }
          }, 1000);
        }else{
          Toast.fail("验证码获取失败");
        }
        this.isresult = true;
        this.getroken(); //重新获取验证
      });
    },
    login() {
      let _this = this 
      if (!this.canlogin) {
        return Toast.fail("请获取验证码");
      } else if (this.phonemsg == "") {
        return Toast.fail("请输入验证码");
      }
      let param = new URLSearchParams();
      param.append("cid","86");
      param.append("tel",_this.uname);
      param.append("code",_this.phonemsg);
      param.append("source","main_h5");
      param.append("go_url","http://39.105.39.45:8000");
      param.append("keep",true);
      param.append("captcha_key",_this.captcha_key);
      phoneLogin(param).then(data=>{
        if(data.code!=0){
          Toast.fail(data.message)
        }else{
          this.setcookie(data.data.url)
          this.$router.push({path:"/index"})
        }
      })
    },
    setcookie(str) {
      let index = str.indexOf("?");
      // console.log(index);
      str = str.slice(index + 1);
      // console.log(str);
      let arr = str.split("&");
      // console.log(arr);
      let obj = arr.map((item) => {
        return (obj = item.split("="));
      });
      obj.forEach(item=>{
         document.cookie =item[0]+"="+item[1];
        
      })
    },
  },
  mounted() {
    this.getroken();
  },
  watch: {
    uname() {
      this.judge();
    },
  },
};
</script>


<style lang="less" scoped>
.body{
  font-size: 24px;
}
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
      flex: 0 0 100px;
      margin-top: 10px;
      height: 40px;
      background: #f987a8;
      text-align: center;
      border-radius: 10px;
      line-height: 40px;
      color: #fff;
    }
    .con {
      opacity: 0.6;
    }
  }
  .password {
    p{
      font-size: 16px;
    }
    .iconfont {
      right: 105px;
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