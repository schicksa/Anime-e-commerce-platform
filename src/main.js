import Vue from 'vue'
import App from './App.vue'
import router from "@/router"

import "nprogress/nprogress.css"

import Toast from "@/components/Toast"
import Preview from "@/components/Preview"

import "@/plugins/vue_lazy_load"

// import { authHook } from "@/hooks/AuthHook"

Vue.config.productionTip = false
Vue.component(Toast.name,Toast);
Vue.component(Preview.name,Preview);
// Vue.prototype.$indexdb = new indexDb("vxm_one");

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
