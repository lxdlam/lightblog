<template>
  <div id="attention-item">
    <div id="container">
      <el-row
        :gutter="10"
        :type="flex"
        :justify="space - between"
        :align="middle"
      >
        <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="1">
          <!-- 头像 -->
          <img id="img-bar" v-bind:src="this.img" alt="" />
        </el-col>
        <el-col :xs="3" :sm="6" :md="8" :lg="9" :xl="11">
          <!-- 个人信息 -->
          <div id="personal-info">
            <el-row :gutter="10">
              <div id="line1-bar">
                <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
                  <!-- 昵称 -->
                  <div id="name-bar">
                    <strong
                      ><h1>{{ arr.user_nickname }}</h1></strong
                    >
                  </div></el-col
                >
              </div>
            </el-row>
            <el-row :gutter="10">
              <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
                <!-- 个人简介 -->
                <div id="sign-bar">
                  <p>{{ arr.signature }}</p>
                </div></el-col
              >
            </el-row>
          </div></el-col
        >
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "AttentionItem",
  props: {
    arr: Array
  },
  data() {
    return {
      focus: true,
      nickname: "蔡徐坤",
      signature: "我喜欢唱、跳、rap还有篮球",
      img:
        "http://pic.rmb.bdstatic.com/463add22b252e2f7f0862fd3d2ea77b58239.gif"
    };
  },
  components: {
    // 在这里加载你的组件
  },
  methods: {
    loadImg(account) {
      const vm = this;
      vm.$api.user
        .fetchAvatar(account)
        .then(avatar => {
          vm.img = avatar.data.avatar_md;
        })
        // eslint-disable-next-line no-unused-vars
        .catch(err => {
          vm.$message.error("未查找到头像");
          console.log(err);
          // vm.$router.push("/"); // redirect to the index
        });
    }
  },
  mounted: function() {
    this.loadImg(this.arr.user_id);
  }
};
</script>

}
<style scoped>
.el-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
#img-bar {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: #606266;
  box-shadow: 5px 5px 8px #303133;
}
#button-bar {
  width: 90px;
  border-radius: 20px;
  box-shadow: 2px 2px 2px #414449;
}
#personal-info {
  width: 1000px;
  height: 60px;
  /* background-color: aqua; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
#name-bar {
  width: 200px;
  height: 40px;
  display: flex;
  flex: 1;
  /* background-color: blue; */
  overflow: hidden;
  text-align: start;
  line-height: 40px;
}
#name-bar h1 {
  font-size: 23px;
  color: #606266;
}
#sign-bar {
  width: 500px;
  height: 30px;
  /* background-color: brown; */
  text-align: start;
  padding-left: 3px;
  font-size: 14px;
  color: #606266;
}
#line1-bar {
  width: 350px;
  height: 50px;
  margin-left: 2px;
  /* background-color: burlywood; */
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
}
#attention-item {
  width: 100%;
  max-width: 960px;
  border-radius: 10px;
  background-repeat: no-repeat;
  background-color: #eeeff6;
  box-shadow: 2px 2px 4px #9c9ea1;
  overflow: hidden;
  margin-bottom: 10px;
}

#container {
  width: 1200px;
  height: 110px;

  position: relative;
  display: block;
  display: flex;
  align-items: center;
}
</style>
