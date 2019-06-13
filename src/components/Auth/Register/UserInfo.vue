<template>
  <div id="register-userinfo">
    <h1 :style="{ 'padding-left': '8%' }">用户信息</h1>
    <el-form
      label-position="right"
      label-width="80px"
      :model="form_data"
      :rules="rules"
      ref="user-info"
      class="input-form"
    >
      <el-form-item label="账号" prop="account">
        <el-tooltip
          class="item"
          effect="dark"
          content="仅支持大小写字母（a-z, A-Z），数字（0-9）及下划线（_）。第一位只能为字母。"
          placement="top"
        >
          <el-input v-model="form_data.account" />
        </el-tooltip>
      </el-form-item>
      <el-form-item label="昵称" prop="username">
        <el-input v-model="form_data.username" />
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form_data.phone" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form_data.email" type="email" />
      </el-form-item>
      <el-divider />
      <el-form-item label="密码" prop="password">
        <el-input v-model="form_data.password" show-password />
      </el-form-item>
      <el-form-item prop="check_password" label="确认密码">
        <el-input v-model="form_data.check_password" type="password" />
      </el-form-item>
    </el-form>
    <el-button @click="validate">检查可用性</el-button>
  </div>
</template>

<script>
import md5 from "blueimp-md5";

export default {
  name: "RegisterUserInfo",
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data: function() {
    return {
      form_data: {
        account: "",
        username: "",
        password: "",
        check_password: "",
        phone: "",
        email: ""
      },
      rules: {
        account: [
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            pattern: /^[a-zA-Z]([a-zA-Z0-9_]*)/,
            message: "账号格式不合法",
            trigger: "blur"
          },
          { max: 20, message: "账号长度最长为 20", trigger: "blur" }
        ],
        username: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { max: 50, message: "昵称至多 50 位", trigger: "blur" }
        ],
        phone: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur"
          },
          {
            pattern: /1[0-9]{10}/,
            message: "请输入正确的手机号",
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            type: "email",
            message: "请输入正确的邮箱",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            min: 8,
            max: 32,
            message: "密码长度应在 8-32 位之间",
            trigger: "blur"
          }
        ],
        check_password: [
          {
            required: true,
            message: "请再次输入密码",
            trigger: "blur"
          },
          {
            validator: (rule, value, callback) => {
              if (value !== this.form_data.password) {
                callback(new Error("两次输入的密码不一致"));
              } else {
                callback();
              }
            }
          }
        ]
      }
    };
  },
  methods: {
    validate() {
      this.$refs["user-info"].validate(valid => {
        if (valid) {
          const vm = this;

          this.$api.user
            .testAccount(this.form_data.account)
            .then(data => {
              if (data.data.validate_result === 1) {
                return vm.$api.user.testEmail(vm.form_data.email);
              } else throw new Error("account");
            })
            .then(data => {
              if (data.data.validate_result === 1) {
                return vm.$api.user.testPhone(vm.form_data.phone);
              } else throw new Error("email");
            })
            .then(data => {
              if (data.data.validate_result === 1) {
                vm.success();
              } else throw new Error("phone");
            })
            .catch(err => {
              if (err.message === "account") {
                vm.$message.error("账号不可用！");
              } else if (err.message === "email") {
                vm.$message.error("Email 已经注册过啦！");
              } else if (err.message === "phone") {
                vm.$message.error("手机号已经注册过啦！");
              }
            });
        } else this.failed();
      });
    },
    failed() {
      this.$set(this.user.stage, 0, false);
    },
    success() {
      this.user.account = this.form_data.account;
      this.user.username = this.form_data.username;
      this.user.password = md5(this.form_data.password);
      this.user.phone = this.form_data.phone;
      this.user.email = this.form_data.email;
      this.$set(this.user.stage, 0, true);

      this.$emit("validated");
    }
  }
};
</script>

<style scoped>
#register-userinfo {
  width: 450px;
  display: table;
  margin: 0 auto;
}
</style>
