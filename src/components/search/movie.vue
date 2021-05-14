<template>
  <div>
    <div @click="gouanmit(index)" class="item" v-show=list.result v-for="(item,index) in list.result" :key="index">
      <div class="left">
        <img :src="item.cover" alt="" />
      </div>
      <div class="right">
        <div class="name" v-html="item.title"></div>
        <p>地区：{{item.areas}}</p>

        <p>
          演员：{{item.cv}}
        </p>
        <p>
         {{item.staff}}
        </p>
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
      obj.search_type = 'media_ft'
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
.item {
  padding: 20px;
  background-color: #f4f4f4;
  display: flex;
  .left {
    width: 133px;
    height: 177px;
    margin-right: 20px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }
  }
  .right {
    flex: 1;

    .name {
      font-size: 24px;
      color: #212121;
    }
    p {
      height: 28px;
      margin-top: 14px;
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