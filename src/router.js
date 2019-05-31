import Vue from "vue";
import Router from "vue-router";
import IndexView from "./views/Index.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "index",
      component: IndexView
    },
    {
      path: "/test",
      name: "test",
      component: () => import(/* webpackChunkName: "test" */ "./views/Test.vue")
    }
  ]
});
