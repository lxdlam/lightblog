<template>
  <div id="articleListItem">
    <el-card shadow="hover" id="card-bar">
      <el-row id="container" type="flex" justify="space-between" align="middle">
        <img :v-if="loadOrNot" id="img-bar" v-bind:src="getImg()" alt="" />
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
              :lg="10"
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
                <strong>
                  <router-link :to="`/article/read/${article_id}`"
                    ><h3>{{ title }}</h3></router-link
                  ></strong
                >
              </el-col>
            </el-col>
            <el-col :xs="12" :sm="12" :md="11" :lg="8" :xl="8">
              <div class="grid-content bg-purple" id="multibar">
                <el-col>{{ genDateString() }}</el-col>
              </div>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between" align="middle">
            <el-col :xs="16" :sm="16" :md="17" :lg="15" :xl="16">
              <div class="grid-content bg-purple" id="digestbar">
                {{ digest.slice(0, 40) }}...
              </div>
            </el-col>

            <el-col :xs="12" :sm="12" :md="11" :lg="8" :xl="8">
              <div id="btn-group">
                <el-button-group>
                  <el-button type="primary" icon="el-icon-thumb" plain>{{
                    praiseNum
                  }}</el-button>
                  <el-button
                    type="primary"
                    icon="el-icon-chat-line-square"
                    plain
                    >{{ commentNum }}</el-button
                  >
                </el-button-group>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row></el-card
    >
  </div>
</template>

<script>
export default {
  name: "ArticleListItem",
  props: {
    title: String,
    article_id: String,
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
      loadOrNot: true
    };
  },
  components: {
    // 在这里加载你的组件
  },
  methods: {
    genDateString() {
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
      let hours = date.getHours();
      if (hours < 10) {
        hours = "0" + hours;
      }
      let minutes = date.getMinutes();
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      let seconds = date.getSeconds();
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      this.dateStr = `${date.getFullYear()}/${month1}/${day1} ${hours}:${minutes}:${seconds}`;
      return this.dateStr;
    },
    getImg() {
      if (this.imgName == null) {
        this.imgName =
          "https://vblogstore-1257377207.cos.ap-chengdu.myqcloud.com/image/8335f50df308a0ab7be244e7775a4562.jpg";
        // this.imgName = "@/assets/article.jpg";
      }
      return this.imgName;
    }
  },
  mounted: function() {
    //动态加载封面图
    // eslint-disable-next-line no-undef
  }
};
</script>

}
<style scoped>
.el-row {
  margin-top: 5px;
  margin-bottom: 5px;
  height: 40px;
  /* background-color: #f2f6fc; */
  border-radius: 15px;
}
#container {
  height: 100px;
  width: 90%;
  display: flex;
}
#card-bar {
  width: 100%;
  margin-left: -20px;
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 10px;
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

  text-align: left;
  padding-left: 20px;
  color: #303133;
}
#title-bar h3 {
  font-size: 20px;
}
#title-bar h3:hover {
  color: #000000;
}
#digestbar {
  font-size: 15px;

  text-align: left;
  padding-left: 20px;
  word-wrap: break-word;
  color: #606266;
}
#multibar {
  font-size: 14px;
  display: flex;
  color: #606266;
  justify-content: space-around;
  /* background-color: antiquewhite; */
}
#multibar:hover {
  color: #424447;
}
#func-bar {
  color: #606266;
  display: flex;
  justify-content: space-around;
  padding-right: 20px;
}

#img-bar {
  width: 200px;
  height: 100px;
  margin: 5px, 5px;
  border-radius: 15px;
}

#card-bar:hover {
  background-color: #ebeef5;
}
</style>
