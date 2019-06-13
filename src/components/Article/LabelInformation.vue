<template>
  <div id="label-information">
    <div id="container">
      <!-- 个人信息 -->
      <div id="personal-info">
        <el-row :gutter="10">
          <div id="line1-bar">
            <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
              <!-- 标签名称 -->
              <div id="name-bar">
                <strong
                  ><h1>{{ this.arr.label_name }}</h1></strong
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
            <!-- 标签描述 -->
            <div id="sign-bar">
              <p>{{ this.arr.description }}</p>
            </div></el-col
          >
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LabelInformation",
  props: {},
  data() {
    return {
      focus: true,
      arr: {}
    };
  },
  components: {
    // 在这里加载你的组件
  },
  methods: {},
  mounted: function() {
    let labelInfo = {
      response_time: 1560310151961,
      code: 0,
      msg: "success",
      data: {
        label_id: 1,
        label_name: "科技",
        description:
          "这里有各类电子产品、技术发明相关的内容。这里有各类电子产品、技术发明相关的内容。这里有各类电子产品、技术发明相关的内容。这里有各类电子产品、技术发明相关的内容。"
      }
    };
    this.arr = labelInfo.data;
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
  margin-top: -45px;
  margin-left: 15px;
  /* background-color: aqua; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
#name-bar {
  width: 180px;
  height: 40px;
  display: flex;
  flex: 1;
  /* background-color: blue; */
  overflow: hidden;
  text-align: start;
  line-height: 40px;
}
#name-bar h1 {
  font-size: 30px;
  color: #ffffff;
  text-shadow: 5px 5px 8px #414449;
}
#sign-bar {
  width: 600px;
  height: 50px;
  /* background-color: brown; */
  text-align: start;
  padding-left: 3px;
  margin-top: 5px;
  font-size: 13px;
  color: #f2f6fc;
  text-shadow: 5px 5px 8px #464749;
}
#line1-bar {
  width: 400px;
  height: 50px;
  margin-left: 2px;
  /* background-color: burlywood; */
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
}
#label-information {
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
