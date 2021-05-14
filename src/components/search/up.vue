<template>
  <div>
    <div class="item" @click="gouser(index)" v-show=list.result v-for="(item,index) in list.result" :key=index>
      <div class="left">
        <img  :src="item.uface" alt="" />
      </div>
      <div class="right">
        <div class="name" v-html=item.uname></div>
        <div class="fans">粉丝：{{item.fans}} 视频：{{item.videos}}</div>
        <div class="referral">{{item.usign}}</div>
      </div>
    </div>
    <div class="null" v-if="!list.result">
      <img src="../../assets/img/notFound.png" alt="">
      <p>什么也没有</p>
    </div>
  </div>
</template>

<script>
import {getClassifySearch} from "../../api/search"
export default {
   props:["val"],
  data() {
    return {
      page:1,
      list:[]
    }
  },
  methods: {
    gouser(index){
      let mid = this.list.result[index].uid
      this.$router.push({path:"/user",query:{mid}})
    },
    getsearchclassify(){
      let obj = {}
      obj.search_type = 'live_user'
      obj.keyword = this.val
      obj.page=this.page
      getClassifySearch(obj).then(data=>{
        this.page +=1
        this.list = data.data
      })
    },
  },
  mounted() {
    this.getsearchclassify()
  },
}
</script>


<style lang="less" scoped>
.item {
  background-color: #f4f4f4;
  padding: 20px;
  display: flex;
  .left {
    flex: 0 0 102px;
    height: 102px;
    margin-right: 20px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .right {
    flex: 1;
    .name {
      height: 34px;
      font-size: 24px;
    }
    .fans,
    .referral {
      margin-top: 10px;
      height: 25px;
      color: #999999;
      font-size: 20px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
  }
}
.null{
  text-align: center;
  margin-top: 200px;
  p{
    margin-top: 30px;
    font-size: 24px;
    color: #212121;
  }
}
</style>