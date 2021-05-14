<template>
  <div>
    <!-- <div class="mask">
      <van-loading color="#fffff" />
    </div> -->
    <div class="navs">
      <div class="content-nav">
        <div class="scroll-wrapper" ref="scroll">
          <div class="scroll-content">
            <div
              :class="['scroll-item', { con: index == num }]"
              ref="item"
              @click="togger(index)"
              v-for="(item, index) in arr"
              :key="index"
            >
              {{ item }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <contentrecommend
      class="cont"
      :arr="arr"
      :data="data"
      @toggernum="toggernum"
      v-if="num == 0"
    ></contentrecommend>
    <contentist class="cont" v-else :str="data[num]"></contentist>
  </div>
</template>




<script>
import contentrecommend from "../components/content/contentrecommend";
import contentist from "../components/content/contentlist";
import { mapState } from "vuex";
import BScroll from "better-scroll";
export default {
  components: {
    contentrecommend,
    contentist,
  },
  data() {
    return {
      num: 0,
      arr: [],
      data: [],
    };
  },
  computed: {
    ...mapState(["parameter", "list"]),
  },
  methods: {
    togger(index) {
      this.num = index;
    },
    init() {
      this.bs = new BScroll(this.$refs.scroll, {
        scrollX: true,
        probeType: 3,
        click: true,
      });
      this.bs.on("scrollStart", () => {
        // console.log('scrollStart-')
      });
      this.bs.on("scroll", ({ x }) => {
        // console.log('scrolling-')
        console.log(x);
      });
      this.bs.on("scrollEnd", () => {
        // console.log('scrollingEnd')
      });
    },
    //禁止滚动
    // stop() {
    //   var mo = function (e) {
    //     console.log(111);
    //     e.preventDefault();
    //   };
    //   document.addEventListener("touchmove", mo, false); //禁止页面滑动
    // },
    // //取消滑动限制
    // move() {
    //   var mo = function (e) {
    //     console.log(222);
    //     e.preventDefault();
    //   };
    //   document.removeEventListener("touchmove", mo, false);
    // },
    gourou(index) {
      console.log();
      if (this.$route.path != this.route[index]) {
        console.log(111);
        this.$router.push({ path: this.route[index] });
      }
    },
    setData() {
      let path = this.$route.path.substr(1);
      console.log(path);
      console.log(this.list[path]);
      let data = this.parameter[path];
      console.log(data);
      for (let key in data) {
        this.data.push(data[key]);
      }
      // console.log(this.data);
      this.arr = this.list[path];
    },
    toggernum(num) {
      this.num = num;
    },
  },
  created() {
    // console.log(this.arr);
    this.setData();
  },
  mounted() {
    this.init();
    // console.log(this.$route.path);
  },
  watch: {
    $route() {
      this.bs.scrollTo(-10, 0);
      this.num = 0
      this.data=[]
      this.setData();
      // this.stop()
    },
  },
};
</script>

<style lang="less" scoped>
.mask {
  position: fixed;
  height: 100vh;
  width: 100vw;
  z-index: 500;
  background: rgba(0, 0, 0, 0.5);
}
.cont {
  margin-top: 55px;
}
.navs {
  height: 66px;
  position: fixed;
  top: 134px;
  width: 100%;
  background-color: #fff;
  z-index: 100;
}
.content-nav {
  z-index: 100;
  background-color: #fff;
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
    .scroll-item :nth-child(1) {
      margin-left: 0;
      padding-left: 0;
    }
    .scroll-item {
      margin: 0 17px;
      height: 65px;
      line-height: 65px;
      font-size: 24px;
      // box-sizing: border-box;
      display: inline-block;
      text-align: center;
      padding: 0 10px;
      margin: 0 17px;
      // width: 71px;

      &.con {
        color: #fb7299;
        border-bottom: 3px solid #fb7299;
      }
    }
  }
}
</style>


