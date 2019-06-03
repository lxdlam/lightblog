import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import Cookies from "js-cookie";

import User from "./user";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user: User
  },
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => Cookies.get(key),
        setItem: (key, value) => Cookies.set(key, value, { expires: 0.25 }),
        removeItem: key => Cookies.remove(key)
      }
    })
  ]
});
