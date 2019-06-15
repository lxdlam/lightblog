<template>
  <div id="personal-information">
    <div id="form">
      <el-form ref="form" :model="form" label-width="80px">
        <div id="img-line">
          <el-form-item label="头像">
            <div id="img-border">
              <img id="img-bar" v-bind:src="arr.avatar_md" alt="" />
              <el-button type="primary" @click="changeImg">更换</el-button>
            </div>
          </el-form-item>
        </div>
        <el-form-item label="昵称">
          <el-input v-model="arr.nickname"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="arr.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="arr.phone"></el-input>
        </el-form-item>
        <!-- <el-form-item label="关注标签">
          <el-input v-model="form.label"></el-input>
        </el-form-item> -->
        <el-form-item label="个性标签">
          <el-input type="textarea" v-model="arr.signature"></el-input>
        </el-form-item>
        <el-form-item>
          <div id="btn-bar">
            <el-button type="primary" @click="onSubmit">修改信息</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "PersonalInformation",
  props: {},
  data() {
    return {
      form: {
        img: "",
        nickname: "",
        email: "",
        phone: 0,
        label: "",
        desc: "as"
      },
      arr: {}
    };
  },
  components: {
    // 在这里加载你的组件
  },
  methods: {
    onSubmit() {
      console.log("submit!");

      this.$api.article
        .updateUserInfo(
          this.$store.state.user.uid,
          this.$store.state.user.token,
          this.form
        )
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
    },
    loadInfo(uid, token) {
      const vm = this;
      this.$api.user
        .fetchDetail(uid, token)
        .then(data => {
          // console.log(123);
          vm.arr = data.data;
          // vm.date = data.response_time;
          console.log(vm.arr);
        })
        // eslint-disable-next-line no-unused-vars
        .catch(err => {
          vm.$message.error("出错啦");
          // vm.$router.push("/"); // redirect to the index
        });
    }
  },
  mounted: function() {
    this.loadInfo(this.$store.state.user.uid, this.$store.state.user.token);
    let userInfo = {
      response_time: 1560310151961,
      code: 0,
      msg: "success",
      data: {
        user_id: 1,
        account: "liysuzy",
        nickname: "yaoyu",
        email: "1121899707@qq.com",
        phone: "17863110500",
        avatar_lg:
          "https://vblogstore-1257377207.cos.ap-chengdu.myqcloud.com/image/d5f3357ae0ef7d8fc5787cb3c45dcbe8.png",
        avatar_md:
          "https://vblogstore-1257377207.cos.ap-chengdu.myqcloud.com/image/d5f3357ae0ef7d8fc5787cb3c45dcbe8.png",
        avatar_sm:
          "https://vblogstore-1257377207.cos.ap-chengdu.myqcloud.com/image/d5f3357ae0ef7d8fc5787cb3c45dcbe8.png",
        signature: "我热爱学习",
        interest: [
          {
            label_id: 1,
            label_name: "JAVA"
          },
          {
            label_id: 2,
            label_name: "Python"
          }
        ]
      }
    };
    this.arr = userInfo.data;
    this.form.img = this.arr.avatar_md;
    this.form.nickname = this.arr.nickname;
    this.form.email = this.arr.email;
    this.form.phone = this.arr.phone;
    this.form.desc = this.arr.signature;
    for (let i = 0; i < this.arr.interest.length; i++) {
      this.form.label =
        this.form.label + "    " + this.arr.interest[i].label_name;
    }
    console.log(this.nickname);
  }
};
</script>

}

<style scoped>
#personal-information {
  padding-top: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
}
#form {
  width: 450px;
  /* background-color: aquamarine; */
  padding-right: 20px;
  padding-top: 20px;
}
#img-bar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 3px 3px 5px #e0e4e6;
}
#img-border {
  width: 100%;
  /* background-color: blue; */
  display: flex;
  justify-content: space-around;
  align-items: center;
}
#img-line {
  height: 100px;
  /* background-color: brown; */
  text-align: center;
}
#btn-bar {
  width: 100%;
  display: flex;
  justify-content: center;
  /* background-color: burlywood; */
}
</style>
