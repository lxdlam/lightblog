<template>
  <div id="register-finish">
    <img src="../../assets/success.svg" />
    <h1>注册成功！</h1>
    <h3>欢迎你，{{ username }}！</h3>
    <h3>
      现在就使用账号
      <span :style="{ color: 'red' }">{{ account }} </span>
      或者手机号、邮箱<router-link to="/login">登录</router-link>吧！
    </h3>
  </div>
</template>

<script>
export default {
  name: "RegisterFinish",
  props: {
    account: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
#register-finish {
  text-align: center;
}
</style>
