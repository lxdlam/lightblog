<template>
  <div id="test-view">
    <RegisterStepsBar :step="step" />
    <div id="inner-container">
      <keep-alive exclude="RegisterFinish">
        <template v-if="step === 1">
          <RegisterUserInfo :user="user" />
        </template>
        <template v-else-if="step === 2">
          <RegisterAvatar />
        </template>
        <template v-else-if="step === 4">
          <RegisterFinish username="Ramen" account="lxdlam" />
        </template>
      </keep-alive>
      <div id="button-container">
        <template v-if="step < 4" :style="{ 'padding-top': '40px' }">
          <template v-if="step > 1">
            <el-button @click="backward">上一步</el-button>
          </template>
          <template v-if="step < 3">
            <el-button @click="forward" :disabled="!user.available"
              >下一步</el-button
            >
          </template>
          <template v-else>
            <el-button type="primary" @click="do_register" :loading="loading"
              >注册！</el-button
            >
          </template>
        </template>
      </div>
    </div>
    <p>{{ user.account }}</p>
    <p>{{ user.username }}</p>
    <p>{{ user.password }}</p>
    <p>{{ user.phone }}</p>
    <p>{{ user.email }}</p>
  </div>
</template>

<script>
import RegisterStepsBar from "../components/Register/StepsBar";
import RegisterUserInfo from "../components/Register/UserInfo";
import RegisterAvatar from "../components/Register/Avatar";
import RegisterFinish from "../components/Register/Finish";

export default {
  name: "TestView",
  components: {
    RegisterStepsBar,
    RegisterAvatar,
    RegisterUserInfo,
    RegisterFinish
  },
  data: function() {
    return {
      step: 1,
      user: {
        account: "",
        username: "",
        password: "",
        email: "",
        phone: "",
        interest: [],
        img_url: "",
        available: false
      },
      loading: false
    };
  },
  methods: {
    forward() {
      this.step++;
    },
    backward() {
      this.step--;
    },
    do_register() {}
  }
};
</script>

<style scoped>
#inner-container {
  padding-top: 40px;
  text-align: center;
}

#button-container {
  padding-top: 20px;
  text-align: center;
}
</style>
