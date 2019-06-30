import Vue from "vue";
import Router from "vue-router";
import Login from './views/login.vue'
import Home from './views/home.vue'

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path:"/login",
      component:Login
    },
    {
      path:"/home",
      component:Home
    },

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
