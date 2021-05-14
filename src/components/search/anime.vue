<template>
  <div >
    <div @click="gouanmit(index)" class="item" v-show=list.result v-for="(item,index) in list.result" :key=index>
      <div class="left">
        <img :src="item.cover" alt="">
      </div>
      <div class="right">
        <div class="lable">
          <span class="iconfont icon-fanju"></span>
          番剧
        </div>
        <div class="name" v-html="item.title">
        </div>
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
      list:{},
    }
  },
  methods: {
    getsearchclassify(){
      let obj = {}
      obj.search_type = 'media_bangumi'
      obj.keyword = this.val
      obj.page=this.page
      getClassifySearch(obj).then(data=>{
        this.page +=1
        this.list = data.data 
      })
    },
    gouanmit(index){
      let season_id = this.list.result[index].season_id
      this.$router.push({path:"/playeranime",query:{season_id}})
    }
  },
  mounted() {
    this.getsearchclassify()
  },
}
</script>



<style lang="less" scoped>
.content {
  width: 100%;
  .nofind {
    padding-top:170px ;
    width: 75%;
    margin: 0 auto;
    img {
      display: block;
    }
    p{
      text-align: center;
      font-size: 22;
      color: #757575;
      height: 76px;
      line-height: 76px;
    }
  }
}
.item{
  padding: 20px;
  display: flex;
  background-color: #f4f4f4;
  .left{
    width: 133px;
    height: 177px;
    margin-right: 20px;
    img{
      width: 100%;
      height: 100%;
      border-radius: 5px;

    }
  }
  .right{
    flex: 1;
    .lable{
      font-size: 24px;
      color: #212121;
      span{
        color: #fdde80;
        font-size: 30px;
      }
    }
    .name{
      margin-top: 17px;
      font-size: 24px;
      color: #212121;
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