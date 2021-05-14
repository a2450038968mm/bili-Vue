import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

// 相同路由守卫函数复用
// 独享路由守卫
// let beforeEnter = (to, from, next) => {
//   console.log("进入路由==>",to.path);
//   console.log("离开路由==>",from.path);
//   if(flag){ //登录成功
//     next("/");
//   }
//   next();

// }

const routes = [
  {
    path: "/",
    redirect: "/index"
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('../views/index.vue')
  },
  {
    path: '/search',
    name: 'search',
    meta: {
      topshow: true,
    },
    component: () => import('../views/search.vue')
  },
  {
    path: '/player',
    name: 'player',
    meta: {
      show: true,
    },
    component: () => import('../components/play/player')
    // component: () => import('../components/play/playeranime')
  },
  {
    path: '/playeranime',
    name: 'playeranime',
    meta: {
      show: true,
    },
    component: () => import('../components/play/playeranime')
    // component: () => import('../components/play/playeranime')
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      topshow: true,
    },
    component: () => import('../views/login')
  },
  {
    path: '/rank',
    name: 'rank',
    meta: {
      topshow: true,
    },
    component: () => import('../views/rank')
  },
  {
    path: '/user',
    name: 'user',
    meta: {
      show: true,
    },
    component: () => import('../views/user.vue')
  },
  {
    path: '/animate',
    name: 'animate',
    component: () => import('../views/pages.vue'),

  },
  {
    path: '/anime',
    name: 'anime',
    component: () => import('../views/pages.vue'),
  },

  {
    path: '/guochuang',
    name: 'guochuang',
    component: () => import('../views/pages.vue'),
  },

  {
    path: '/music',
    name: 'music',
    component: () => import('../views/pages.vue'),

  },
  {
    path: '/dance',
    name: 'dance',
    component: () => import('../views/pages.vue'),

  },
  {
    path: '/game',
    name: 'game',
    component: () => import('../views/pages.vue'),

  },
  {
    path: '/technology',
    name: 'technology',
    component: () => import('../views/pages.vue'),

  },
  {
    path: '/digital',
    name: 'digital',
    component: () => import('../views/pages.vue'),

  },
  {
    path: '/life',
    name: 'life',
    component: () => import('../views/pages.vue'),

  },
  {
    path: '/food',
    name: 'food',
    component: () => import('../views/pages.vue'),

  },
  {
    path: '/animal',
    name: 'animal',
    component: () => import('../views/pages.vue'),
  },
  {
    path: '/kichiku',
    name: 'kichiku',
    component: () => import('../views/pages.vue'),
  },
  {
    path: '/fashion',
    name: 'fashion',
    component: () => import('../views/pages.vue'),
  },
  {
    path: '/ent',
    name: 'ent',
    component: () => import('../views/pages.vue'),
  },
  {
    path: '/cinephile',
    name: 'cinephile',
    component: () => import('../views/pages.vue'),
  },
  {
    path: '/documentary',
    name: 'documentary',
    component: () => import('../views/pages.vue'),

  },
  {
    path: '/movie',
    name: 'movie',
    component: () => import('../views/pages.vue'),

  },
  {
    path: '/tv',
    name: 'tv',
    component: () => import('../views/pages.vue'),

  },


]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  console.log(document.cookie);
  var cookieStr = unescape(document.cookie);
  var arr = cookieStr.split("; ");
  var cookieValue = "";
  for (var i = 0; i < arr.length; i++) {
    var temp = arr[i].split("=");
    if (temp[0] == "SESSDATA") {
      console.log(123123123132);
      cookieValue = temp[1];
      break;
    }
  }
  console.log(cookieValue);
  if(!cookieValue){
    console.log(123);
    if(to.path=="/player"||to.path=='/playeranime'){
      next("/login")
      return
    }
  }else{
    if(to.path=="/login"){
      next("/user")
      return
    }
  }
  next()
})

// var flag = true; //登录成功
// 全局路由守卫
// to 即将进入目标路由
// from 当前导航要离开路由
// next() 方法执行一个路由，注意如果添加路由守卫必须添加next方法
// next("/login") 或 next({path:"/login"}) 指定跳转路由 
// next(false);  //中断当前路由跳转，退回上一个路由
// 注意：全局路由守卫没有this
// 前置路由
// router.beforeEach((to,from,next)=>{
//     console.log("-----------beforeEach-----------");
//     // console.log(this);
//     console.log("进入路由==>",to);
//     console.log("离开路由==>",from);

//     // if(to.path == "/nav2" && !flag){
//     if(to.path == "/nav2"){
//       next({path:"/login"});
//     }
//     console.log("next-------");
//     next(); //执行下一个路由

// })

// 后置钩子
// 注意：没有next()方法
// router.afterEach((to,from)=>{
//   console.log("---------afterEach-----------");
//   console.log("进入路由==>",to);
//   console.log("离开路由==>",from);
// })

export default router
