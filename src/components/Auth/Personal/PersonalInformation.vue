<template>
  <div id="personal-information">
    <div id="form">
      <el-form ref="form" :model="form" label-width="80px">
        <div id="img-line">
          <el-form-item label="头像">
            <div id="img-border">
              <img id="img-bar" v-bind:src="arr.avatar_md" alt="" />
              <el-button type="primary" @click="dialogVisible = true"
                >更换</el-button
              >
            </div>
          </el-form-item>
        </div>
        <!--  -->

        <!--  -->
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
          <div id="select-bar">
            <el-select
              autocomplete="off"
              v-model="tag"
              multiple
              filterable
              placeholder="文章标签"
              :style="{ width: '100%' }"
              ><el-option
                v-for="item in available_tags"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </div>
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
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="80%"
      :before-close="handleClose1"
    >
      <Crooper :avatar="avatar"></Crooper>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeImg" :loading="loading"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import Crooper from "@/components/Meta/Cropper";
export default {
  name: "PersonalInformation",
  props: {},
  data() {
    return {
      inputVisible: false,
      inputValue: "",
      dialogVisible: false,
      arr: {},
      avatar: {},
      account: "",
      avatar_lg: "",
      avatar_md: "",
      avatar_sm: "",
      loading: false,
      tag: [],
      available_tags: [],
      form: {}
    };
  },
  components: {
    // 在这里加载你的组件
    Crooper
  },
  methods: {
    changeImg() {
      this.loading = true;
      const vm = this;
      // console.log("asasdas----");
      // console.log(this.avatar);
      let register_query = {
        avatar_lg: null,
        avatar_md: null,
        avatar_sm: null
      };
      vm.avatar.small.toBlob(blob => {
        vm.$api.img
          .upload(blob, `${vm.account}_avatar_sm.png`)
          .then(data => {
            register_query.avatar_sm = data.data.url;
            vm.avatar.medium.toBlob(blob => {
              vm.$api.img
                .upload(blob, `${vm.account}_avatar_md.png`)
                .then(data => {
                  register_query.avatar_md = data.data.url;
                  vm.avatar.large.toBlob(blob => {
                    vm.$api.img
                      .upload(blob, `${vm.account}_avatar_lg.png`)
                      .then(data => {
                        register_query.avatar_lg = data.data.url;

                        vm.avatar_lg = register_query.avatar_lg;
                        vm.avatar_md = register_query.avatar_md;
                        vm.avatar_sm = register_query.avatar_sm;

                        vm.loading = false;
                        vm.$message.success("上传成功！");
                        vm.dialogVisible = false;
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
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      // eslint-disable-next-line no-unused-vars
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleClose1(done) {
      done();
    },
    handleInputConfirm() {
      // let inputValue = this.inputValue;
      let label_name = this.inputValue;
      if (label_name) {
        this.dynamicTags.push(label_name);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    loadAllTags() {
      const vm = this;
      this.$api.tag
        .list(0, 1000)
        .then(data => {
          data.data.arr.forEach(row => {
            vm.available_tags.push({
              id: row.labelId,
              name: row.labelName
            });
          });
        })
        .catch(err => {
          vm.$message.error("标签获取错误！请联系管理员！");
          console.log(err);
        });
    },
    onSubmit() {
      let myForm = {
        uid: this.arr.user_id,
        account: this.arr.account,
        nickname: this.arr.nickname,
        email: this.arr.email,
        phone: this.arr.phone,
        avatar_sm: this.avatar_sm,
        avatar_md: this.avatar_md,
        avatar_lg: this.avatar_lg,
        singature: this.arr.singature,
        interest: this.tag
      };
      this.$api.user
        .updateUserInfo(
          this.$store.state.user.uid,
          this.$store.state.user.token,
          myForm
        )
        .then(() => {
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
          vm.arr.interest.forEach(item => {
            vm.tag.push(item.label_id);
          });
        })
        // eslint-disable-next-line no-unused-vars
        .catch(err => {
          vm.$message.error("读取信息出错啦");
          // vm.$router.push("/"); // redirect to the index
        });
    }
  },
  mounted: function() {
    this.loadAllTags();
    this.loadInfo(this.$store.state.user.uid, this.$store.state.user.token);
  }
};
</script>

}

<style scoped>
#select-bar {
  width: 100%;
  background-color: aqua;
}
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
