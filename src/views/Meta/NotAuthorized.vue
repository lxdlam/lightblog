<template>
  <div id="info">
    <img src="@/assets/people.svg" height="200" width="200" />
    <h1>Not Authorized</h1>
    <p>
      Oops, you have entered a blackhole~
      <br />你所想访问的内容需要 <router-link to="/login">登录</router-link>！
      <br />
      {{ count }}s 后自动跳转到登录页面。
    </p>
  </div>
</template>

<script>
import { setInterval, clearInterval } from "timers";
export default {
  name: "NotAuthorizedView",
  data: function() {
    return {
      count: 5,
      interval: null
    };
  },
  mounted() {
    if (this.$store.state.user.logged) {
      this.$router.replace("/");
    } else {
      this.interval = setInterval(this.callback, 1000);
    }
  },
  methods: {
    callback: function() {
      if (this.count > 0) {
        this.count--;
      } else {
        clearInterval(this.interval);
        this.$router.replace("/login");
      }
    }
  }
};
</script>

<style scoped>
#info {
  text-align: center;
}

#info > h1 {
  font-size: 40px;
}

#info > p {
  font-size: 18px;
}
</style>
