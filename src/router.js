import Vue from "vue"
import Router from "vue-router"
import Login from './views/login.vue'
import Home from './views/home.vue'
import Users from './views/users.vue'

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path:"/login",
      component:Login
    },
    {
      path:"/home",
      component:Home,
      children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: '/users',
          component: Users
        },
      ]
    },
    {
      path: "/",
      redirect: "/login"
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.fullPath ==="/login") {
    next()
    return
  }

  if (localStorage.getItem("token")) {
    next()
  }else {
    router.push("/login")
  }
})

export default router
