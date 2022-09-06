import Vue from "vue";
import vueRouter from "vue-router";

// First-level routing Home
import Home from "@/pages/Home";

// First-level routing Search
import Search from "@/pages/Search"; //None

// First-level routing Login
import Login from "@/pages/Login";

// First-level routing Register
import Register from "@/pages/Register";

// First-level routing
import Goods from "@/pages/Goods"; //None

// First-level routing
import Banner from "@/pages/Banner";

// First-level routing
import Cart from "@/pages/Cart";

// First-level routing
import Commdity from "@/pages/Commodity";

// First-level routing
import Magnifer from "@/pages/Magnifier"; //None

// First-level routing
import Favorites from "@/pages/Favorites";

// First-level routing
import Profile from "@/pages/Profile"

// First-level routing 404
import NotFound from "@/pages/NotFound";

Vue.use(vueRouter);

const router = new vueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/home/:keyword?",
      name: "home",
      component: Home,
      meta: { isShowFooter: true },
    },
    {
      path: "/search",
      name: "search",
      component: Search,
      meta: { isShowFooter: true },
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/goods/:id?",
      name: "goods",
      component: Goods,
      meta: { isShowFooter: true },
    },
    {
      path: "/banner",
      name: "banner",
      component: Banner,
      meta: { isShowFooter: true },
    },
    {
      path: "/cart",
      name: "cart",
      component: Cart,
      meta: { isShowFooter: true ,isAuth:true },
    },
    {
      path: "/commdity",
      name: "commdity",
      component: Commdity,
      meta: { isShowFooter: true },
    },
    {
      path: "/magnifer",
      name: "magnifer",
      component: Magnifer,
      meta: { isShowFooter: true },
    },
    {
      path:"/favorites",
      name:"favorites",
      component:Favorites,
      meta: { isShowFooter: true ,isAuth:true}
    },
    {
      path:"/profile",
      name:"profile",
      component:Profile,
      meta: { isShowFooter: true ,isAuth:true }
    },
    {
      path: "*",
      name: "notFound",
      component: NotFound,
      meta: { isShowFooter: true },
    },
  ],
});

export default router;
