<template>
  <div class="body">
    <div class="header">
      <div class="top">
        <input
          type="text"
          :placeholder="defaultsearch"
          v-model.trim="val"
          @keyup.enter="search('', $event)"
        />
        <span class="iconfont icon-sousuo"></span>
        <span class="iconfont icon-cuo" v-show="val" @click="clear"></span>
        <div class="cencel" @click="$router.go(-1)">取消</div>
      </div>
      <div class="recommend" v-if="!searching && !result">
        <div class="title">大家都在搜</div>
        <div class="searhrecommend">
          <div class="reommendlist">
            <div
              v-for="(item, index) in hotlist"
              :key="index"
              @click="search(item.keyword)"
              class="recommend"
            >
              {{ item.keyword }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="searchhis" v-if="!searching && !result">
      <div class="title">历史搜索</div>
      <div class="searchhislist">
        <div class="item" v-for="(item, index) in history" :key="index">
          <span class="iconfont icon-lishi"></span>
          <p @click="gosearch">{{ item }}</p>
          <span class="iconfont icon-cuo" @click="del(index)"></span>
        </div>
      </div>
      <div class="clearhis" @click="clearhistory">清除历史记录</div>
    </div>
    <div class="search" v-if="searching">
      <div
        v-for="(item, index) in suggestlist"
        :key="index"
        @click.capture="search(item.value, $event)"
        class="list"
        v-html="item.name"
      ></div>
    </div>
    <div class="searchresult" v-if="result">
      <div class="resultclassify" v-if="'top_tlist' in searchresultlit">
        <span
          @click="taggerresult('synthesize')"
          :class="type == 'synthesize' ? 'con' : ''"
          >综合</span
        >
        <span
          @click="taggerresult('anime')"
          :class="type == 'anime' ? 'con' : ''"
          >番剧({{ searchresultlit.top_tlist.media_bangumi | counts }})</span
        >
        <span @click="taggerresult('up')" :class="type == 'up' ? 'con' : ''"
          >up主({{ searchresultlit.top_tlist.bili_user | counts }})</span
        >
        <span
          @click="taggerresult('movie')"
          :class="type == 'movie' ? 'con' : ''"
          >影视({{ searchresultlit.top_tlist.media_ft | counts }})</span
        >
      </div>
      <up :val="val" v-if="type == 'up'"></up>
      <movie :val="val" v-if="type == 'movie'"></movie>
      <anime :val="val" v-if="type == 'anime'"></anime>
      <synthesize
        :val="val"
        :videoslist="videoslist"
        v-if="type == 'synthesize'"
      ></synthesize>
    </div>
  </div>
</template>

<script>
import up from "../components/search/up";
import movie from "../components/search/movie";
import anime from "../components/search/anime";
import synthesize from "../components/search/synthesize";
import {
  getHotSearch,
  getDefaultSearch,
  getSuggestSearch,
  getSearch,
} from "../api/search";
import { mapActions, mapState } from "vuex";
export default {
  components: {
    up,
    movie,
    anime,
    synthesize,
  },
  data() {
    return {
      timerout: null,
      defaultsearch: "",
      hotlist: [],
      type: "synthesize",
      searching: false,
      result: false,
      val: "",
      suggestlist: [],
      searchresultlit: {},
      videoslist: {},
      issearch:false
    };
  },
  watch: {
    val(val) {
      if(this.issearch) return 
      console.log(val);
      if (val == "") {
        // console.log(1111);
        this.result = false;
        this.searching = false;
      } else {
        clearTimeout(this.timerout);
        this.searching = true;
        console.log(this.searching);
        let obj = {};
        obj.term = val;
        obj.highlight = true;
        this.timerout = setTimeout(() => {
          getSuggestSearch(obj).then((data) => {
            this.suggestlist = data;
          });
        }, 200);
        // console.log(2222);
      }
    },
  },
  computed: {
    ...mapState(["history"]),
  },
  mounted() {
    this.gethotsearcg();
  },
  methods: {
    ...mapActions(["addhistory", "clearhistory", "del"]),
    gosearch(event){
      // console.log();
      this.search(event.target.innerText)

    },
    gethotsearcg() {
      getHotSearch().then((data) => {
        // console.log(data);
        this.hotlist = data.list;
        console.log(this.hotlist);
      });
      getDefaultSearch().then((data) => {
        console.log(data);
        this.defaultsearch = data.data.show_name;
      });
    },
    hotsearch(event) {
      this.val = event.target.innerText;
      this.search(this.val);
    },
    search(data) {
      this.issearch = true
      // console.log(event);
      // let str = event.target.innerText;
      if (data) {
        console.log(data);
        this.val = data;
      } else if (this.val == "") {
        this.val = this.defaultsearch;
      }
      console.log(data);
      // this.val = str;
      this.result = true;
      this.searching = false;
      let obj = {};
      obj.keyword = this.val;
      this.addhistory(this.val);
      this.getsearchresult(obj);
      // this.searching = false
    },
    getsearchresult(obj) {
      getSearch(obj).then((data) => {
        console.log(data);
        this.searchresultlit = data.data;
        console.log(this.searchresultlit);
        this.videoslist = data.data.result[8].data;
        this.issearch=false
      });
    },
    taggerresult(str) {
      this.type = str;
    },
    clear() {
      this.result = this.searching = false;
      this.val = "";
    },
    exit() {
      this.result = this.searching = false;
      this.val = "";
    },
  },
  filters: {
    counts(val) {
      return val < 100 ? val : 99 + "+";
    },
  },
};
</script>

<style lang="less" scoped>
.body {
  background-color: #f4f4f4;
  height: 100vh;
}
.header {
  background-color: #fff;
  padding: 20px;

  .top {
    display: flex;
    position: relative;

    input {
      flex: 1;
      height: 50px;
      line-height: 50px;
      outline: none;
      border: none;
      background: #f4f4f4;
      text-indent: 60px;
      font-size: 16px;
    }
    .icon-sousuo {
      position: absolute;
      top: 10px;
      left: 24px;
      font-size: 30px;
      color: #a0a0a0;
    }
    .icon-cuo {
      position: absolute;
      top: 10px;
      font-size: 30px;
      color: #a0a0a0;
      right: 70px;
    }
    .cencel {
      width: 52px;
      height: 50px;
      font-size: 24px;
      line-height: 50px;
      text-align: right;
      color: #fb7299;
    }
  }
  .recommend {
    margin-top: 40px;
    .title {
      font-size: 26px;
      color: #9fa19f;
    }
    .searhrecommend {
      padding-bottom: 23px;
      .reommendlist {
        height: 160px;
        overflow: hidden;
        div {
          display: inline-block;
          height: 56px;
          line-height: 56px;
          margin-right: 17px;
          margin-top: 20px;
          padding: 0 20px;
          border: 1px solid #cccccc;
          border-radius: 30px;
          color: #515151;
          font-size: 22px;
        }
      }
    }
  }
}
.searchhis {
  background-color: #f4f4f4;
  padding: 0 20px;
  border-top: 18px solid #fff;
  .title {
    height: 78px;
    line-height: 78px;
    font-size: 22px;
    color: #9f9c99;
  }
  .searchhislist {
    .item {
      height: 75px;
      line-height: 75px;
      font-size: 24px;
      color: #515151;
      border-bottom: 1px solid #cccccc;
      justify-content: space-between;
      display: flex;
      span {
        font-size: 24px;
        color: #999999;
        flex: 0 0 30px;
      }
      p {
        flex: 1;
        padding-left: 15px;
      }
      .icon-cuo {
        flex: 0 0 30;
        text-align: right;
      }
    }
  }
  .clearhis {
    margin-top: 28px;
    color: #9fa19f;
    font-size: 24px;
    text-align: center;
  }
}
.search {
  padding: 0 20px;
  background-color: #f4f4f4;
  .list {
    height: 75px;
    line-height: 75px;
    font-size: 22px;
    color: #212121;
    border-bottom: 1px solid #cccccc;
    em {
      color: #fb7299;
    }
  }
}
.resultclassify {
  background-color: #fff;
  padding: 0 34px;
  border-top: 1px solid #e7e7e7;
  border-bottom: 1px solid #e7e7e7;
  height: 75px;
  display: flex;
  justify-content: space-between;
  span {
    height: 51px;
    margin-top: 12px;
    font-size: 24px;
    line-height: 51px;
  }
  .con {
    color: #fb7299;
    border-bottom: 2px solid #fb7299;
  }
}
</style>