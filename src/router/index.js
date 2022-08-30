import Vue from "vue";
import vueRouter from "vue-router";

//  Home
import Home from "@/pages/Home";

// Banner
import Banner from "@/pages/Banner";

// 404
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
      path: "/banner",
      name: "banner",
      component: Banner,
      meta: { isShowFooter: true },
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
