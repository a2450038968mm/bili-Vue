import Vue from 'vue'
import Vant from 'vant';
import JSEncrypt from 'jsencrypt';
import VueLazyload from 'vue-lazyload'
import App from './App.vue'
import router from './router'
import store from './store'
import "./assets/font/iconfont.css"
import 'vant/lib/index.css';

Vue.config.productionTip = false
import "amfe-flexible"

Vue.use(Vant);
Vue.use(VueLazyload, {
  preLoad: 1.3,
  attempt: 2,
  loading: require('./assets/img/loading.png'),//加载中图片，一定要有，不然会一直重复加载占位图
  error: require('./assets/img/error.png')  //加载失败图片
});

Vue.filter('timefor', function (val) {
  // console.log(val);
  // console.log(new Date(val));
  let time = new Date(val);
  let y = time.getFullYear();
  let m = time.getMonth() + 1;
  let d = time.getDate();
  let h = time.getHours();
  let mm = time.getMinutes();
  let newtime = new Date();
  let newy = newtime.getFullYear();
  let newm = newtime.getMonth() + 1;
  let newd = newtime.getDate();
  let newh = newtime.getHours();
  let newmm = newtime.getMinutes();
  // console.log(time);
  if (y == newy && m == newm && d == newd && h == newh) {
    let formm = newmm - mm;
    console.log(formm + "分钟前");
    return formm + "分钟前";
  } else if (y == newy && m == newm && d == newd) {
    let forh = h >= 10 ? h : "0" + h;
    let formm = mm >= 10 ? mm : "0" + mm;
    console.log(forh + ":" + formm);
    return forh + ":" + formm;
  } else if (y == newy && m == newm && d == newd - 1) {
    let forh = h >= 10 ? h : "0" + h;
    let formm = mm >= 10 ? mm : "0" + mm;
    console.log("昨天" + forh + ":" + formm);
    return "昨天" + forh + ":" + formm;
  } else {
    // console.log(m + "-" + d);
    return m + "-" + d;
  }
  // 返回处理后的值
})
Vue.filter('count', function (val) {
  if (val > 10000) {
    if (val / 10000 > 10000) {
      return (parseInt(val / 10000000)/10).toFixed(1) + "亿"
    } else if (val / 10000 > 10) {
      return parseInt(val / 10000) + "万"
    } else {
      return (parseInt(val / 1000)/10).toFixed(1) + "万"

    }
  } else {
    return val
  }

  // 返回处理后的值
})

Vue.prototype.$getRsaCode = function (rsa, str) { // 注册方法
  // let pubKey = `-----BEGIN PUBLIC KEY-----
  // MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDjb4V7EidX/ym28t2ybo0U6t0n
  // 6p4ej8VjqKHg100va6jkNbNTrLQqMCQCAYtXMXXp2Fwkk6WR+12N9zknLjf+C9sx
  // /+l48mjUU8RqahiFD1XT/u2e0m2EN029OhCgkHx3Fc/KlFSIbak93EH/XlYis0w+
  // Xl69GV6klzgxW6d2xQIDAQAB
  // -----END PUBLIC KEY-----`;// ES6 模板字符串 引用 rsa 公钥
  // let pubKey =rsa
  let encryptStr = new JSEncrypt();
  encryptStr.setPublicKey(rsa); // 设置 加密公钥
  let data = encryptStr.encrypt(str.toString());  // 进行加密
  // console.log(data);
  return data;
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')