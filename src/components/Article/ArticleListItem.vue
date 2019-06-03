<template>
  <div id="articleListItem">
    <!-- 把你的组件放在这来测试！ -->
    <!-- 下面的按钮都是可以删除的，只是占位使用 -->
    <el-row id="container" type="flex" justify="space-between" align="middle">
      <img :v-if="loadOrNot" id="img-bar" v-bind:src="imgName" alt="" />
      <el-col
        id="right-bar"
        :xs="40"
        :sm="25"
        :md="25"
        :lg="25"
        :xl="50"
        type="flex"
        align="middle"
      >
        <el-row type="flex" align="middle" justify="space-between">
          <el-col
            :gutter="1"
            :xs="14"
            :sm="12"
            :md="12"
            :lg="7"
            :xl="20"
            word-wrap="break-word"
          >
            <el-col
              class="grid-content bg-purple"
              id="title-bar"
              type="flex"
              align="middle"
              justify="start"
              word-wrap="break-word"
            >
              <h3>{{ title }}</h3>
            </el-col>
          </el-col>
          <el-col :xs="12" :sm="12" :md="11" :lg="8" :xl="8">
            <div class="grid-content bg-purple" id="multibar">
              <el-col>作者:{{ author }}</el-col>
              <el-col>发布时间：{{ dateStr }}</el-col>
            </div>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between" align="middle">
          <el-col :xs="16" :sm="16" :md="17" :lg="15" :xl="16">
            <div class="grid-content bg-purple" id="digestbar">
              {{ digest }}
            </div>
          </el-col>
          <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
            <div
              class="grid-content bg-purple"
              id="func-bar"
              type="flex"
              justify="space-between"
              align="middle"
            >
              <div height="20px">
                <i class="el-icon-thumb"></i>
                <span>{{ praiseNum }}</span>
              </div>
              <div>
                <i class="el-icon-chat-line-square"></i>
                <span>{{ commentNum }}</span>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "ArticleListItem",
  props: {
    title: String,
    author: String,
    date: Number,
    digest: {
      type: String,
      validator: value => value.length <= 40
    },
    praiseNum: Number,
    commentNum: Number,
    imgName: String
  },
  data() {
    return {
      dateStr: "",
      loadOrNot: false
    };
  },
  components: {
    // 在这里加载你的组件
  },
  methods: {},
  mounted: function() {
    const date = new Date(this.date);
    // eslint-disable-next-line no-unused-vars
    let month1 = date.getMonth() + 1;
    if (month1 < 10) {
      month1 = "0" + month1;
    }
    let day1 = date.getDate();
    if (day1 < 10) {
      day1 = "0" + day1;
    }
    this.dateStr = `${month1}/${day1} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    //动态加载封面图
    // eslint-disable-next-line no-undef
    let a = typeOf(this.imgName);
    console.log(a);
    console.log(123);
    if (this.imgName != undefined) {
      this.loadOrNot = true;
    } else {
      this.loadOrNot = false;
    }
  }
};
</script>

}
<style scoped>
.el-row {
  margin-top: 5px;
  margin-bottom: 5px;
  height: 40px;
  /* background-color: #e5e9f2; */
}
#container {
  margin-top: 5px;
  /* margin-bottom: 1px; */
  height: 100px;
  /* width: 1400px; */
  /* background-color: #e5e9f2; */
  display: flex;
  justify-content: space-between;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  /* background: #99a9bf; */
}
.bg-purple {
  /* background: #d3dce6; */
}
.bg-purple-light {
  /* background: #e5e9f2; */
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.el-icon-thumb {
  margin-right: 10px;
}
.el-icon-chat-line-square {
  margin-right: 10px;
}
#title-bar {
  text-size-adjust: 20px;
  /* width: 450px; */
  text-align: left;
  padding-left: 20px;
  color: #303133;
}
#digestbar {
  font-size: 15px;
  /* width: 800px; */
  text-align: left;
  padding-left: 20px;
  word-wrap: break-word;
  color: #606266;
}
#multibar {
  /* width: 300px; */
  font-size: 14px;
  display: flex;
  color: #606266;
  justify-content: space-around;
}
#func-bar {
  /* width: 160px; */
  color: #606266;
  display: flex;
  justify-content: space-around;
}
#container {
  display: flex;
  justify-content: space-between;
}
#img-bar {
  width: 200px;
  height: 100px;
  margin: 5px, 5px;
}
</style>
