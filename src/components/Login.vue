<template>
  <div id="login-form">
    <el-card shadow="hover" class="login-card">
      <h1>登录</h1>
      <el-form ref="login-form" :model="form_data" :rules="rules">
        <el-form-item prop="user">
          <el-input v-model="form_data.user" placeholder="用户名/手机号/邮箱" />
        </el-form-item>
        <el-form-item prop="passwd">
          <el-input
            v-model="form_data.passwd"
            type="password"
            placeholder="密码"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="login"
            :loading="isLoding"
            :style="{ width: '100%' }"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
      <p :style="{ 'text-align': 'center' }">
        还没有账号吗？点击<router-link to="/register">注册</router-link>
      </p>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Login",
  data: function() {
    return {
      form_data: {
        user: "",
        passwd: ""
      },
      rules: {
        user: [
          {
            required: true,
            message: "用户名/手机号/邮箱必填",
            trigger: "submit"
          }
        ],
        passwd: [{ required: true, message: "密码必填", trigger: "submit" }]
      },
      isLoding: false
    };
  },
  methods: {
    // TODO: No login action performed
    login() {
      this.$refs["login-form"].validate(valid => {
        if (valid) {
          this.$message({
            message: "登录失败，请检查用户信息和密码的组合！",
            type: "error"
          });
        } else {
          this.$message({
            message: "请填写用户信息和密码",
            type: "error"
          });
        }
      });
    }
  }
};
</script>

<style scoped></style>
