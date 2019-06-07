<template>
  <div id="read-article">
    <h1 class="title">{{ title }}</h1>
    <div class="page">
      <el-row>
        <el-col :span="3">
          <el-image class="circle-md" :src="avatar_sm"></el-image>
        </el-col>
        <el-col :span="9">
          <div class="username">
            <strong>{{ user_nickname }}</strong>
          </div>
          <div class="article-info">
            {{ dateStr }} &emsp; 浏览 {{ reading }}
          </div>
        </el-col>
        <el-col :offset="9" :span="2">
          <el-button class="attention" type="primary" plain>关注</el-button>
        </el-col>
      </el-row>
      <Renderer class="article" content="文章内容"></Renderer>
      <h1 id="comment-h1">评论</h1>
      <div class="submit-comment">
        <el-row>
          <el-col :span="1">
            <el-image
              id="placeholder"
              src="https://b-gold-cdn.xitu.io/v3/static/img/default-avatar.e30559a.svg"
            ></el-image>
          </el-col>
          <el-col :span="22">
            <el-input
              type="textarea"
              :rows="Rows"
              placeholder="输入评论..."
              v-model="textarea"
              @focus="increseRows"
              @blur="decreseRows"
              class="input-comment"
            />
          </el-col>
          <el-button v-if="isOnFocus" type="primary" id="submit-button">
            发表评论
          </el-button>
        </el-row>
      </div>
      <CommentItem
        avatar_sm="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
        user_nickname="无影の繁华"
        comment="真尼玛沙雕"
        :comment_time="1559738627000"
      ></CommentItem>
    </div>
  </div>
</template>

<script>
import Renderer from "@/components/Markdown/Renderer";
import CommentItem from "@/components/Comment/CommentItem";

export default {
  name: "ReadArticle",
  props: {
    article_hash: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    user_nickname: {
      type: String,
      required: true
    },
    release_time: {
      type: Number,
      required: true
    },
    reading: {
      type: Number,
      required: true
    },
    avatar_sm: {
      type: String
    }
  },
  components: {
    Renderer,
    CommentItem
  },
  data() {
    return {
      dateStr: "",
      textarea: "",
      Rows: 1,
      isOnFocus: false
    };
  },
  mounted: function() {
    const date = new Date(this.release_time);
    let month1 = date.getMonth() + 1;
    if (month1 < 10) {
      month1 = "0" + month1;
    }
    let day1 = date.getDate();
    if (day1 < 10) {
      day1 = "0" + day1;
    }
    this.dateStr = `${date.getFullYear()}年${month1}月${day1}日 ${date.getHours()}:${date.getMinutes()}`;
  },
  methods: {
    increseRows() {
      //alert("点击了");
      this.Rows = 5;
      this.isOnFocus = true;
    },
    decreseRows() {
      this.Rows = 1;
      this.isOnFocus = false;
    }
  }
};
</script>

<style scoped>
.title {
  font-family: "Microsoft YaHei";
  font-size: 40px;
  color: #303133;
  font-weight: bold;
  margin-left: 20px;
}
.page {
  width: 1000px;
  height: 100%;
  margin-left: 10px;
  margin-bottom: 50px;
}
.circle-md {
  width: 128px;
  height: 128px;
  border-radius: 50%;
  overflow: hidden;
}
.username {
  font-size: 25px;
  margin: 15px 0 20px 20px;
  color: #606266;
}
.article-info {
  font-size: 20px;
  color: #909399;
  margin: 10px 0 0 20px;
}
.article {
  margin: 20px 0 20px 20px;
}
#comment-h1 {
  text-align: center;
  margin-top: 50px;
}
.submit-comment {
  width: 90%;
  background: #eaf0f8;
  margin-bottom: 20px;
  padding: 20px 0 12px 20px;
}
#placeholder {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  /* margin-right: 200px; */
}
.input-comment {
  margin-left: 12px;
}
#submit-button {
  float: right;
  margin: 10px 20px auto auto;
}
</style>
