<template>
  <div id="author-information">
    <div id="container">
      <el-row
        :gutter="10"
        :type="flex"
        :justify="space - between"
        :align="middle"
      >
        <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="1">
          <!-- 头像 -->
          <img id="img-bar" v-bind:src="img" alt="" />
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
                      ><h1>{{ nickname }}</h1></strong
                    >
                  </div></el-col
                >
                <el-col :xs="7" :sm="8" :md="8" :lg="9" :xl="11">
                  <!-- 关注按钮 -->
                  <template v-if="focus == true">
                    <div id="button-bar">
                      <el-button round>+ 关注</el-button>
                    </div>
                  </template>
                  <template v-else-if="focus == false">
                    <div id="button-bar">
                      <el-button type="primary" round>取消关注</el-button>
                    </div>
                  </template>
                </el-col>
              </div>
            </el-row>
            <el-row :gutter="10">
              <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
                <!-- 个人简介 -->
                <div id="sign-bar">
                  <p>{{ signature }}</p>
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
  name: "AuthorInformation",
  props: {
    account: Number
  },
  data() {
    return {
      focus: true,
      nickname: "蔡徐坤",
      signature: "我喜欢唱、跳、rap还有篮球",
      img:
        "http://pic.rmb.bdstatic.com/463add22b252e2f7f0862fd3d2ea77b58239.gif",
      arr: {}
    };
  },
  components: {
    // 在这里加载你的组件
  },
  methods: {},
  mounted: function() {
    let userInfo = {
      response_time: 1560310151961,
      code: 0,
      msg: "success",
      data: {
        user_id: 1,
        account: "liysuzy",
        nickname: "yuasdyuas",
        email: "1121899707@qq.com",
        phone: "17863110500",
        avatar_lg:
          "http://pic.rmb.bdstatic.com/463add22b252e2f7f0862fd3d2ea77b58239.gif",
        avatar_md:
          "http://pic.rmb.bdstatic.com/463add22b252e2f7f0862fd3d2ea77b58239.gif",
        avatar_sm:
          "http://pic.rmb.bdstatic.com/463add22b252e2f7f0862fd3d2ea77b58239.gif",
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
    this.img = this.arr.avatar_md;
    this.nickname = this.arr.nickname;
    this.signature = this.arr.signature;
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
  width: 80px;
  height: 80px;
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
  color: #ffffff;
}
#sign-bar {
  width: 500px;
  height: 30px;
  /* background-color: brown; */
  text-align: start;
  padding-left: 3px;
  font-size: 14px;
  color: #f2f6fc;
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
#author-information {
  border-radius: 10px;
  background-repeat: no-repeat;
  background-image: url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1560156534576&di=1e660a8f9c608407dd3a20b90c1ac993&imgtype=0&src=http%3A%2F%2Fimglf0.ph.126.net%2F2OxjSW7ICrsfk4K99Cj33w%3D%3D%2F6608488194911282475.jpg);
  /* background-attachment: fixed; */
  box-shadow: 6px 6px 4px #909399;
  overflow: hidden;
}

#container {
  width: 1200px;
  height: 140px;
  position: relative;
  display: block;
  display: flex;
  align-items: center;
  padding-left: 20px;
}
</style>
