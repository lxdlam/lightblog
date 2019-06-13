<template>
  <div id="register-view">
    <RegisterStepsBar :step="step" :style="{ padding: '0 40px' }" />
    <div id="inner-container">
      <keep-alive exclude="RegisterFinish">
        <template v-if="step === 1">
          <RegisterUserInfo :user="user" />
        </template>
        <template v-else-if="step === 2">
          <RegisterAvatar :user="user" />
        </template>
        <template v-else-if="step === 3">
          <RegisterInterest :user="user" />
        </template>
        <template v-else-if="step === 4">
          <RegisterFinish :username="user.username" :account="user.account" />
        </template>
      </keep-alive>
      <div id="button-container">
        <template v-if="step < 4" :style="{ 'padding-top': '40px' }">
          <template v-if="step > 1">
            <el-button @click="backward">上一步</el-button>
          </template>
          <template v-if="step < 3">
            <el-button @click="forward" :disabled="!user.stage[step - 1]"
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
  </div>
</template>

<script>
import RegisterStepsBar from "@/components/Auth/Register/StepsBar";
import RegisterUserInfo from "@/components/Auth/Register/UserInfo";
import RegisterAvatar from "@/components/Auth/Register/Avatar";
import RegisterInterest from "@/components/Auth/Register/Interest";
import RegisterFinish from "@/components/Auth/Register/Finish";

export default {
  name: "RegisterView",
  components: {
    RegisterStepsBar,
    RegisterAvatar,
    RegisterUserInfo,
    RegisterInterest,
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
        img_files: {}, // base64
        stage: [false, false]
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
    do_register() {
      if (this.user.stage.some(x => !x)) return;

      console.log("Encounter");

      this.loading = true;

      const vm = this;
      let register_query = {
        account: vm.user.account,
        pwd: vm.user.password,
        username: vm.user.username,
        email: vm.user.email,
        phone: vm.user.phone,
        interest: vm.user.interest,
        avatar_lg: null,
        avatar_md: null,
        avatar_sm: null
      };

      // Upload 3 avatars

      vm.user.img_files.small.toBlob(blob => {
        vm.$api.img
          .upload(blob, `${vm.user.account}_avatar_sm.png`)
          .then(data => {
            register_query.avatar_sm = data.data.url;
            vm.user.img_files.medium.toBlob(blob => {
              vm.$api.img
                .upload(blob, `${vm.user.account}_avatar_md.png`)
                .then(data => {
                  register_query.avatar_md = data.data.url;
                  vm.user.img_files.large.toBlob(blob => {
                    vm.$api.img
                      .upload(blob, `${vm.user.account}_avatar_lg.png`)
                      .then(data => {
                        register_query.avatar_lg = data.data.url;
                        return vm.$api.user.register(register_query);
                      })
                      .then(() => {
                        vm.loading = false;
                        vm.step++;
                      })
                      .catch(err => {
                        vm.$message.error(
                          "Oops，遇到了一些问题，请联系管理员！"
                        );
                        console.log(err);
                      });
                  });
                })
                .catch(err => {
                  vm.$message.error("Oops，遇到了一些问题，请联系管理员！");
                  console.log(err);
                });
            });
          })
          .catch(err => {
            vm.$message.error("Oops，遇到了一些问题，请联系管理员！");
            console.log(err);
          });
      });
    }
  }
};
</script>

<style scoped>
#register-view {
  padding-top: 20px;
  background-color: white;
  min-height: 900px;
}

#inner-container {
  padding-top: 40px;
  text-align: center;
}

#button-container {
  padding-top: 40px;
  text-align: center;
}
</style>
