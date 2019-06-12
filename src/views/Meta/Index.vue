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
      >
        Clear
      </el-button>
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
      uid: null,
      article_id: "8869c389281978a6221a9cd46ac15478"
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
      this.$api.article
        .recommendList()
        .then(ret => console.log(ret))
        .catch(err => console.log(`Error: [${err.code}] ${err.message}`));
    }
  }
};
</script>

<style scoped></style>
