import Vue from 'vue'
import App from './App.vue'
import router from "@/router"
import store from "@/store"

import "nprogress/nprogress.css"

import Toast from "@/components/Toast"
import Preview from "@/components/Preview"

import "@/plugins/vue_lazy_load"
import "@/plugins/validate"

import { authHook } from "@/hooks/AuthHook"

Vue.config.productionTip = false
Vue.component(Toast.name,Toast);
Vue.component(Preview.name,Preview);
// Vue.prototype.$indexdb = new indexDb("vxm_one");

// Page Permission Verification
router.beforeEach(async (to,form,next)=>{
     const token = await store.dispatch("user/auth_token_get");
     if(to.meta.isAuth){
        let validateRes = await authHook(token);
        let code = validateRes?.data?.code;
        if(code !== 2){
           store.dispatch("user/cleanToken"); 
           Vue.prototype.$code = code;
           return router.push("/login");
        }else{
          store.dispatch("user/setUserInfo", validateRes.data?.userInfo || {}); 
          next();
        }
    }else{
      if(  token && ( to.path === "/login" || to.path === "/register" )  ){
           return router.push(form.path);
      }else{
        next();
      }
    }
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
