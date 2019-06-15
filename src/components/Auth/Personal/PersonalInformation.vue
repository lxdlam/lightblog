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
        <el-form-item label="关注标签">
          <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
          >
            {{ tag.label_name }}
          </el-tag>

          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button
            v-else
            class="button-new-tag"
            size="small"
            @click="showInput"
            >+ New Tag</el-button
          >
        </el-form-item>

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
      dynamicTags: ["标签一", "标签二", "标签三"],
      inputVisible: false,
      inputValue: "",
      arr: {}
    };
  },
  components: {
    // 在这里加载你的组件
  },
  methods: {
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      // this.$nextTick(_ => {
      //   this.$refs.saveTagInput.$refs.input.focus();
      // });
    },

    handleInputConfirm() {
      // let inputValue = this.inputValue;
      let label_name = this.inputValue;
      if (label_name) {
        this.dynamicTags.push(label_name);
        console.log(this.dynamicTags);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    onSubmit() {
      console.log("this.arr.nickname");
      console.log(this.arr.nickname);
      let interestNumList = [];
      for (let i = 0; i < this.dynamicTags.length; i++) {
        interestNumList.push(this.dynamicTags[i].label_id);
      }
      let form = {
        uid: this.arr.user_id,
        account: this.arr.account,
        nickname: this.arr.nickname,
        email: this.arr.email,
        phone: this.arr.phone,
        avatar_sm: this.arr.avatar_sm,
        avatar_md: this.arr.avatar_md,
        avatar_lg: this.arr.avatar_lg,
        singature: this.arr.singature,
        interest: [4]
      };
      console.log(form);
      this.$api.user
        .updateUserInfo(
          this.$store.state.user.uid,
          this.$store.state.user.token,
          form
        )
        .then(res => {
          console.log(res);
          this.$message({
            message: `更改信息成功！`,
            type: "success"
          });
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
          vm.dynamicTags = vm.arr.interest;
          // vm.date = data.response_time;
          console.log(vm.arr);
        })
        // eslint-disable-next-line no-unused-vars
        .catch(err => {
          vm.$message.error("读取信息出错啦");
          // vm.$router.push("/"); // redirect to the index
        });
    }
  },
  mounted: function() {
    this.loadInfo(this.$store.state.user.uid, this.$store.state.user.token);
    //   let userInfo = {
    //     response_time: 1560310151961,
    //     code: 0,
    //     msg: "success",
    //     data: {
    //       user_id: 1,
    //       account: "liysuzy",
    //       nickname: "yaoyu",
    //       email: "1121899707@qq.com",
    //       phone: "17863110500",
    //       avatar_lg:
    //         "https://vblogstore-1257377207.cos.ap-chengdu.myqcloud.com/image/d5f3357ae0ef7d8fc5787cb3c45dcbe8.png",
    //       avatar_md:
    //         "https://vblogstore-1257377207.cos.ap-chengdu.myqcloud.com/image/d5f3357ae0ef7d8fc5787cb3c45dcbe8.png",
    //       avatar_sm:
    //         "https://vblogstore-1257377207.cos.ap-chengdu.myqcloud.com/image/d5f3357ae0ef7d8fc5787cb3c45dcbe8.png",
    //       signature: "我热爱学习",
    //       interest: [
    //         {
    //           label_id: 1,
    //           label_name: "JAVA"
    //         },
    //         {
    //           label_id: 2,
    //           label_name: "Python"
    //         }
    //       ]
    //     }
    //   };
    //   this.arr = userInfo.data;
    //   this.form.img = this.arr.avatar_md;
    //   this.form.nickname = this.arr.nickname;
    //   this.form.email = this.arr.email;
    //   this.form.phone = this.arr.phone;
    //   this.form.desc = this.arr.signature;
    //   for (let i = 0; i < this.arr.interest.length; i++) {
    //     this.form.label =
    //       this.form.label + "    " + this.arr.interest[i].label_name;
    //   }
    //   console.log(this.nickname);
  }
};
</script>

}

<style scoped>
#register-interest {
  display: table;
  margin: 0 auto;
}

.interest-table {
  max-width: 920px;
  text-align: center;
}
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
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
