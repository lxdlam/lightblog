<template>
  <div id="index">
    <p>
      <el-button @click="test" type="success">Test</el-button>
      <el-button @click="login" type="primary">Login</el-button>
      <el-button
        @click="
          token = null;
          uid = null;
        "
        type="warning"
        >Clear</el-button
      >
    </p>
    <p>Token: {{ this.token }}</p>
    <p>UID: {{ this.uid }}</p>
  </div>
</template>

<script>
export default {
  name: "IndexView",
  data: function() {
    return {
      token: null,
      uid: null
    };
  },
  methods: {
    login() {
      const vm = this;
      this.$api.user
        .login("lxdlam", "e99a18c428cb38d5f260853678922e03")
        .then(ret => {
          vm.token = ret.data.token;
          vm.uid = ret.data.uid;
        })
        .catch(err => console.log(err));
    },
    test() {
      this.$api.user
        .updateUserInfo(this.uid, this.token, {
          uid: this.uid,
          account: "lxdlam",
          nickname: "Ramen_new",
          email: null,
          phone: null,
          avatar_sm: null,
          avatar_md: null,
          avatar_lg: null,
          singature: null,
          interest: null
        })
        .then(ret => console.log(ret))
        .catch(err => console.log(err));
    }
  }
};
</script>

<style scoped></style>
