import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from 'axios'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./assets/body.css"

Vue.use(ElementUI);
Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/';
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers.Authorization = localStorage.getItem("token");
    return config;
  });


Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
