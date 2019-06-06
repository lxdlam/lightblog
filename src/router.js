import Vue from "vue";
import Router from "vue-router";
// import IndexView from "./views/Index.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "index",
      component: () =>
        import(/* webpackChunkName: "indexView" */ "./views/Index.vue")
    },
    {
      path: "/test",
      name: "test",
      component: () => import(/* webpackChunkName: "test" */ "./views/Test.vue")
    },
    {
      path: "/register",
      name: "register",
      component: () =>
        import(/* webpackChunkName: "registerView" */ "./views/Register.vue")
    },
    {
      path: "/article/:id/view",
      name: "view-article",
      component: () => import("./views/ReadArticle.vue")
    }
  ]
});
