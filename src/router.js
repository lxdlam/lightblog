import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  // TODO: Ensure enabled proper server option
  // Read: https://router.vuejs.org/zh/guide/essentials/history-mode.html
  mode: "history",
  routes: [
    {
      path: "*",
      name: "404",
      component: () =>
        import(/* webpackChunkName: "404View" */ "./views/Meta/404.vue")
    },
    {
      path: "/na",
      name: "notAuthorized",
      component: () =>
        import(
          /* webpackChunkName: "NAView" */ "./views/Meta/NotAuthorized.vue"
        )
    },
    {
      path: "/",
      name: "index",
      component: () =>
        import(/* webpackChunkName: "indexView" */ "./views/Meta/Index.vue")
    },
    {
      path: "/test",
      name: "test",
      component: () => import(/* webpackChunkName: "test" */ "./views/Test.vue")
    },
    {
      path: "/test1",
      name: "test1",
      component: () =>
        import(/* webpackChunkName: "test" */ "./views/Test1.vue")
    },
    {
      path: "/register",
      name: "register",
      component: () =>
        import(
          /* webpackChunkName: "registerView" */ "./views/Auth/Register.vue"
        )
    },
    {
      path: "/login",
      name: "login",
      component: () =>
        import(/* webpackChunkName: "loginView" */ "./views/Auth/Login.vue")
    },
    {
      path: "/article/edit/:id",
      name: "edit_article",
      component: () =>
        import(
          /* webpackChunkName: "editArticleView" */ "./views/Article/EditArticle.vue"
        )
    },
    {
      path: "/search/:keyword",
      name: "search",
      component: () =>
        import(/* webpackChunkName: "searchView" */ "./views/Meta/Search.vue")
    }
  ]
});
