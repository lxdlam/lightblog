<template>
  <div id="register-userinfo">
    <h1>用户信息</h1>
    <el-form
      label-position="right"
      label-width="80px"
      :model="form_data"
      :rules="rules"
      ref="user-info"
      class="input-form"
    >
      <el-form-item label="账号" prop="account">
        <el-input v-model="form_data.account" />
      </el-form-item>
    </el-form>
    <el-button @click="validate">检查可用性</el-button>
  </div>
</template>

<script>
export default {
  name: "RegisterUserInfo",
  props: {
    user: {
      required: true
    }
  },
  data: function() {
    return {
      form_data: {
        account: "",
        username: "",
        password: "",
        double_check_password: "",
        phone: "",
        email: ""
      },
      rules: {
        account: [{ required: true, message: "请输入账号", trigger: "change" }]
      }
    };
  },
  model: {
    props: "user",
    event: "validate"
  },
  methods: {
    validate() {
      this.$refs["user-info"].validate(valid => {
        if (valid) {
          this.user.account = this.form_data.account;
          this.user.username = this.form_data.username;
          this.user.password = this.form_data.password;
          this.user.phone = this.form_data.phone;
          this.user.email = this.form_data.email;
          this.user.available = true;

          this.$emit("validate");
        } else {
          this.user.account = this.user.username = this.user.password = this.user.phone = this.user.email =
            "";
          this.user.available = false;
        }
      });
    }
  }
};
</script>

<style scoped>
.input-form {
  padding: 0 120px;
}
</style>
