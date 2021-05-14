import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    parameter: {
      animate: {
        animate: 1,
        mad: 24,
        mmd: 25,
        voice: 47,
        tokusatsu: 86,
        animateother: 27,
      },
      anime: {
        anime: 13,
        serial: 33,
        finish: 32,
        information: 51,
        offical: 152,
      },
      guochuang: {
        guochuang: 167,
        chinese: 153,
        original: 168,
        puppetry: 169,
        motioncomic: 195,
        information: 170,
      },
      music: {
        music: 3,
        original: 28,
        cover: 31,
        vocaloid: 30,
        electronic: 194,
        perform: 59,
        mv: 193,
        live: 29,
        other: 130,
      },
      dance: {
        dance: 129,
        otaku: 20,
        hiphop: 198,
        star: 199,
        china: 200,
        danceother: 154,
        demo: 156,
      },
      game: {
        game: 4,
        standAlone: 17,
        esports: 171,
        mobile: 172,
        online: 65,
        board: 173,
        gmv: 121,
        music: 136,
        mugen: 19,
      },
      technology: {
        technology: 36,
        science: 201,
        fun: 124,
        finance: 207,
        campus: 208,
        carerr: 209,
        wild: 122,
      },
      digital: {
        digital: 188,
        mobile: 95,
        pc: 189,
        photography: 190,
        intelligence_av: 191,
      },
      life: {
        life: 160,
        funny: 138,
        daily: 21,
        handmake: 161,
        painting: 162,
        sports: 163,
        automobile: 176,
        other: 174,
      },
      food: {
        food: 211,
        make: 76,
        detective: 212,
        measurement: 213,
        rural: 214,
        record: 215,
      },
      animal: {
        animal: 217,
        cat: 218,
        dog: 219,
        panda: 220,
        wild_animal: 221,
        reptiles: 222,
        animal_composite: 75,
      },
      kichiku: {
        kichiku: 119,
        guide: 22,
        mad: 26,
        manual_vocaloid: 126,
        theatre: 216,
        course: 127,
      },
      fashion: {
        fashion: 155,
        makeup: 157,
        clothing: 158,
        aerobics: 164,
        catwalk: 159,
        trends: 192,
      },
      ent: {
        ent: 5,
        variety: 71,
        star: 137,
      },
      cinephile: {
        cinephile: 181,
        cinecism: 182,
        montage: 183,
        shortfilm: 85,
        trailer_info: 184,
      },
      documentary: {
        documentary: 177,
        history: 37,
        science: 178,
        military: 179,
        travel: 180,
      },
      movie: {
        moviemain: 23,
        chinese: 147,
        west: 145,
        japan: 146,
        movie: 83, //其他国家
      },
      tv: {
        tv: 11,
        mainland: 185,
        overseas: 187,
      },
    },
    list: {
      animate: [
        "推荐",
        "MAD·AMV",
        "MMD·3D",
        "短片·手书·配音",
        "手办·模玩",
        "特摄",
        "综合",
      ],
      animal: [
        "推荐",
        "喵星人",
        "汪星人",
        "大熊猫",
        "野生动物",
        "爬宠",
        "动物综合",
      ],
      anime: [
        "推荐",
        "连载动画",
        "完结动画",
        "咨询",
        "官方延伸",
      ],
      cinephile: [
        "推荐",
        "影视杂谈",
        "影视剪辑",
        "短片",
        "预告·资讯",
      ],
      dance: [
        "推荐",
        "宅舞",
        "街舞",
        "明星舞蹈",
        "中国舞",
        "舞蹈综合",
        "舞蹈教程",
      ],
      digital: [
        "推荐",
        "手机平板",
        "电脑装机",
        "摄影摄像",
        "影音智能",
      ],
      documentary: [
        "推荐",
        "人文·历史",
        "科学·探索·自然",
        "军事",
        "社会·美食·旅行",
      ],
      ent: [
        "推荐",
        "综艺",
        "明星",
      ],
      fashion: [
        "推荐",
        "美妆",
        "服饰",
        "健身",
        "T台",
        "风尚标",
      ],
      food: [
        "推荐",
        "美食制作",
        "美食侦探",
        "美食测评",
        "田园美食",
        "美食记录",
      ],
      game: [
        "推荐",
        "单机游戏",
        "电子竞技",
        "手机游戏",
        "网络游戏",
        "桌游棋牌",
        "GMV",
        "音游",
        "Mugen",
      ],
      guochuang: [
        "推荐",
        "国产动画",
        "国产原创相关",
        "布袋戏",
        "动态漫·广播剧",
        "咨询",
      ],
      kichiku: [
        "推荐",
        "鬼畜调教",
        "音MAD",
        "人力VOCALOID",
        "鬼畜剧场",
        "教程演示",
      ],
      life: [
        "推荐",
        "搞笑",
        "日常",
        "手工",
        "绘画",
        "运动",
        "其他",
      ],
      movie: [
        "推荐",
        "华语电影",
        "欧美电影",
        "日本电影",
        "其他国家",
      ],
      music: [
        "推荐",
        "原创音乐",
        "翻唱",
        "VOCALOID·UTAU",
        "电音",
        "演奏",
        "MV",
        "音乐现场",
        "音乐综合",
      ],
      technology: [
        "推荐",
        "科学科普",
        "社科人文",
        "财经",
        "校园学习",
        "职业职场",
        "野生技术协会",
      ],
      tv: [
        "推荐",
        "国产剧",
        "海外剧"
      ]
    },
    navs: [
      {
        name:'全站',
        rid:0
      },
      {
        name:'动画',
        rid:1
      },
      {
        name:'国创',
        rid:168
      },
      {
        name:'音乐',
        rid:3
      },
      {
        name:'舞蹈',
        rid:129
      },
      {
        name:'游戏',
        rid:4
      },
      {
        name:'知识',
        rid:36
      },
      {
        name:'数码',
        rid:188
      },
      {
        name:'汽车',
        rid:223
      },
      {
        name:'生活',
        rid:160
      },
      {
        name:'美食',
        rid:211
      },
      {
        name:'动物圈',
        rid:217
      },
      {
        name:'鬼畜',
        rid:119
      },
      {
        name:'时尚',
        rid:155
      },
      {
        name:'娱乐',
        rid:5
      },
      {
        name:'影视',
        rid:181
      },
      {
        name:'纪录片',
        rid:177
      },
      {
        name:'电影',
        rid:23
      },
      {
        name:'电视剧',
        rid:11
      },
    ],
    history: []
  },
  mutations: {
    addhistory(state, data) {
      state.history.unshift(data)
      state.history = [...new Set(state.history)]
    },
    clearhistory(state) {
      state.history = []
    },
    del(state, index) {
      state.history.splice(index, 1)
    },
  },
  actions: {
    addhistory({ commit }, data) {
      console.log(data);
      commit("addhistory", data)
    },
    clearhistory({ commit }) {
      commit("clearhistory")
    },
    del({ commit }, index) {
      commit("del", index)
    }
  },
  modules: {
  }
})
