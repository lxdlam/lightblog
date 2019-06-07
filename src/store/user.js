export default {
  namespaced: true,
  state: {
    logged: false,
    uid: null,
    token: null,
    avatar: null,
    nickname: null,
    updateTime: null
  },
  mutations: {
    login(state, payload) {
      if (!state.logged) {
        state.logged = true;
        state.uid = payload.uid;
        state.token = payload.token;
        state.avatar = require("@/assets/default_avatar.jpeg");
        state.nickname = payload.nickname;
        state.updateTime = new Date().getTime();
      }
    },
    logout(state) {
      if (state.logged) {
        state.logged = false;
        state.uid = state.token = state.avatar = state.nickname = null;
        state.updateTime = new Date().getTime();
      }
    },
    renew(state, payload) {
      if (state.logged) {
        state.token = payload.token;
        state.updateTime = new Date().getTime();
      }
    }
  }
};
