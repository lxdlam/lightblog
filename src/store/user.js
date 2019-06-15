export default {
  namespaced: true,
  state: {
    logged: false,
    uid: null,
    token: null,
    avatar_sm: null,
    avatar_md: null,
    avatar_lg: null,
    username: null,
    isAdmin: false,
    updateTime: null
  },
  mutations: {
    login(state, payload) {
      if (!state.logged) {
        state.logged = true;
        state.uid = payload.uid;
        state.token = payload.token;
        state.avatar_sm = payload.avatar_sm;
        state.avatar_md = payload.avatar_md;
        state.avatar_lg = payload.avatar_lg;
        state.username = payload.nickname;
        state.updateTime = new Date().getTime();
        if (payload.allowance !== undefined && payload.allowrance !== null) {
          state.isAdmin = payload.allowance === 0;
        }
      }
    },
    logout(state) {
      if (state.logged) {
        state.isAdmin = state.logged = false;
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
