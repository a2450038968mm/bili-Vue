<template>
  <div id="app">
    <div class="top" v-show="!$route.meta.topshow">
      <headers></headers>
    </div>
    <router-view />
  </div>
</template>

<script>
// import axios from "axios";
// import {search} from "./api/search"

import headers from "./components/base/header.vue";
export default {
  components: {
    headers,
  },
  data() {
    return {
      a:"111",
      isopen: false,
    };
  },
  methods: {
    togger() {
      this.isopen = !this.isopen;
    },
    
  },
  created() {
    // let rasPw = this.$getRsaCode("5f0d359616cee08dBiShi22332323");
    // console.log(rasPw);
    // axios.get("http://127.0.0.1:8082/list").then(data=>{
    //   console.log(data);
    // })

    // document.cookie ="SESSDATA=b7a30a43%2C1634383859%2Ce8275%2A41;domain=.bilibili.com;path=/";
    // search({
    //   keyword:"人生"
    // }).then(data=>{
    // search({
    //   keyword:"aaa"
    // }).then(data=>{
    //   console.log(data);
    // })
    // axios.get("https://api.kele8.cn/agent/https://api.bilibili.com/x/web-interface/search/all/v2?keyword=aaa").then(data=>{
    // // axios.get("https://api.bilibili.com/x/web-interface/search/all/v2?keyword=aaa").then(data=>{
    //   console.log(data);
    // })
  },
};
</script>
<style lang="less" scoped>
.top {
  height: 131px;
}
.bottom {
  display: flex;
  position: absolute;
  bottom: 0;
  padding: 12px 5px;
  background: #f4f4f4;
  p {
    text-align: center;
    color: #999999;
    height: 24px;
    line-height: 24px;
    font-size: 12px;
  }
  .content {
    position: absolute;
    top: 143px;
    margin-bottom: 50px;
  }
}
</style>
