<template>
  <div id="login-page">
    <el-card shadow="hover" class="login-card">
      <h1>登录</h1>
      <LoginForm @success="$router.go(-1)" />
    </el-card>
  </div>
</template>

<script>
import LoginForm from "@/components/Auth/Login";

export default {
  name: "LoginPage",
  components: {
    LoginForm
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.$store.state.user.logged) {
        console.log("here");
        vm.$router.replace("/");
      }
    });
  }
};
</script>

<style scoped>
#login-page {
  width: 350px;
  display: table;
  margin: 0 auto;
}
</style>
