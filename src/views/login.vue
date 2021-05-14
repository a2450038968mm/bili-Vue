<template>
  <div class="body">
    <!-- <div class="header" v-show=ispassword> -->
    <div class="header" v-show="ispassword">
      密码登录
      <span @click="toggerlogintype">短信登录</span>
    </div>
    <div class="header" v-show="!ispassword">
      短信登录
      <span @click="toggerlogintype">密码登录</span>
    </div>

    <passwordcom  v-if="ispassword"></passwordcom>
    <phone  v-else></phone>
    
  </div>
</template>

<script>
import passwordcom from "../components/login/password";
import phone from "../components/login/phone";
export default {
  components: {
    passwordcom,
    phone
  },
  data() {
    return {
      ispassword: true,
    };
  },
  methods:{
    aaa(){
      console.log(11111);
    },
    toggerlogintype(){
      this.ispassword=!this.ispassword
    }
  }
};
</script>

<style lang="less" scoped>
input,
button {
  outline: none;
  border: none;
}
.body {
  height: 100vh;
  background: #f4f4f4;
  width: 100vw;
}
.header {
  background: #fff;
  text-align: center;
  padding: 20px 0;
  font-size: 28px;
  color: #212121;
  position: relative;
  span {
    font-size: 18px;
    position: absolute;
    right: 15px;
    bottom: 25px;
  }
}
</style>