import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

import cart from "@/store/cart"
import user from "@/store/user"

export default new Vuex.Store({
    modules:{
        cart,
        user
    }
})