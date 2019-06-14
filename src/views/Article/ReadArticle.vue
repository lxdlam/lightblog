<template>
  <div id="read-article">
    <div id="title">
      <h1>{{ arr.title }}</h1>
    </div>
    <el-divider></el-divider>
    <div id="info-bar">
      <div id="left-bar">
        <img id="img-bar" :src="this.user_img" alt="" />
        <div id="word-bar">
          <div class="username">
            <strong>{{ arr.author_nickname }}</strong>
          </div>
          <div class="article-info">
            {{ dateStr }} &emsp; 浏览 {{ arr.reading }}
          </div>
        </div>
      </div>
      <div id="right-bar">
        <template v-if="isOnFocus == false">
          <div id="button-bar">
            <el-button plain>+ 关注</el-button>
          </div>
        </template>
        <template v-else-if="isOnFocus == true">
          <div id="button-bar">
            <el-button plain>取消关注</el-button>
          </div>
        </template>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="article-container">
      <Renderer :content="arr.content"></Renderer>
    </div>
    <div id="thumb-bar">
      <el-button
        v-if="!likeOrNot"
        v-model="likeOrNot"
        type="danger"
        icon="el-icon-star-off"
        plain
        @click="thumb"
        >喜 欢</el-button
      >
      <el-button
        v-else-if="likeOrNot"
        v-model="likeOrNot"
        type="danger"
        icon="el-icon-star-off"
        @click="thumb"
        >喜 欢</el-button
      >
    </div>

    <el-divider></el-divider>
    <div id="comment-bar">
      <h1>评论</h1>
      <InputBox />

      <CommentList :article_id="article_id"></CommentList>
      <!-- <CommentItem
        avatar_sm="https://vblogstore-1257377207.cos.ap-chengdu.myqcloud.com/image/d2d7c57d727f14148d8bf047ccdbedc1.png"
        user_nickname="雨女无瓜"
        comment="评论1"
        :comment_time="time"
      ></CommentItem> -->
    </div>
  </div>
</template>

<script>
import Renderer from "@/components/Markdown/Renderer";
//import CommentItem from "@/components/Comment/CommentItem";
import CommentList from "@/components/Comment/CommentList";
import InputBox from "@/components/Comment/InputBox";
export default {
  name: "ReadArticle",
  components: {
    Renderer,
    //CommentItem,
    CommentList,
    InputBox
  },
  data() {
    return {
      dateStr: "",
      user_img: "",
      arr: {
        content: ""
      },
      isDecrese: false,
      likeOrNot: false,
<<<<<<< HEAD
      article_id: 0,
      author_id: 0
=======
      article_id: 0
      //time: 1559560386501
>>>>>>> ff3dee6c7f7d08c0f80b489dc81a9012d95073c4
    };
  },
  methods: {
    /* increseRows() {
      //alert("点击了");
      this.Rows = 5;
      this.isOnFocus = true;
    },
    decreseRows() {
      if (this.isDecrese === true) {
        this.Rows = 1;
        this.isOnFocus = false;
      }
      this.isDecrese === false;
    }, */
    thumb() {
      this.likeOrNot = !this.likeOrNot;
    },
    submitComment() {},
    loadArticle(article_id) {
      const vm = this;
      this.article_id = article_id;
      this.$api.article
        .fetchDetail(article_id)
        .then(data => {
          Object.assign(vm.arr, data.data);
          // vm.arr = data.data;
          console.log(vm.arr);
          vm.author_id = data.data.author_id;
          //////////////////////获取时间
          const date = new Date(data.data.release_time);
          let month1 = date.getMonth() + 1;
          if (month1 < 10) {
            month1 = "0" + month1;
          }
          let day1 = date.getDate();
          if (day1 < 10) {
            day1 = "0" + day1;
          }
          vm.dateStr = `${date.getFullYear()}年${month1}月${day1}日 ${date.getHours()}:${date.getMinutes()}`;
          return vm.$api.user.fetchAvatar(vm.arr.author_id);
        })
        .then(avatar => {
          console.log(123);
          // console.log(vm.arr.author_id);
          vm.user_img = avatar.data.avatar_md;
          console.log(avatar.data.avatar_md);
        })
        // eslint-disable-next-line no-unused-vars
        .catch(err => {
          vm.$message.error("Oops，确认一下文章 ID 吧！");
          // vm.$router.push("/"); // redirect to the index
        });
    }
    // loadAvatar(uid) {
    //   const vm = this;
    // }
  },
  mounted: function() {
    this.loadArticle(this.$route.params["id"]);
    // this.loadAvatar(this.arr.author_id);
    // this.loadAvatar(2);
    if (this.$route.params["id"] === "new") {
      this.msg = "new";
    } else {
      this.msg = "id: " + this.$route.params["id"];
    }

    // this.user_img =
    //   "http://pic.rmb.bdstatic.com/463add22b252e2f7f0862fd3d2ea77b58239.gif";
  },
  beforeRouteUpdate(to, from, next) {
    this.loadArticle(this.$route.params["id"]);
    next();
  }
};
</script>

<style scoped>
#read-article {
  max-width: 1280px;
  width: 960px;
  /* background-color: #eff8fd; */
  background-color: #ffffff;
  box-shadow: 4px 4px 2px #e3e8f3;
  display: table;
  margin: 0 auto;
}
#title h1 {
  width: 100%;
  height: 40px;
  /* background-color: aquamarine; */
  font-family: "Microsoft YaHei";
  font-size: 35px;
  color: #4a4c4e;
  font-weight: bold;
  text-align: start;
  padding-left: 40px;
  padding-top: 20px;
}
#info-bar {
  width: 100%;
  height: 40px;
  /* background-color: cadetblue; */
  display: flex;
  justify-content: space-between;
}
#left-bar {
  height: 100%;
  width: 350px;
  /* background-color: rgb(171, 124, 214); */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 40px;
}
#word-bar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 280px;
  /* background-color: aqua; */
  text-align: start;
  padding-left: 20px;
}
#right-bar {
  height: 100%;
  width: 160px;
  /* background-color: blueviolet; */

  display: flex;
  align-items: center;
  justify-content: center;
}
#thumb-bar {
  padding-top: 50px;
  width: 100%;
  height: 65px;
  /* background-color: aqua; */
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
.circle-md {
  width: 128px;
  height: 128px;
  border-radius: 50%;
  overflow: hidden;
}
.username {
  width: 100%;
  height: 20px;
  /* background-color: brown; */
  font-size: 16px;
  text-align: start;

  color: #606266;
}
.article-info {
  width: 100%;
  height: 20px;
  /* background-color: chocolate; */
  font-size: 14px;
  text-align: start;
  color: #606266;
}
.article-container {
  padding-left: 20px;
  padding-right: 20px;
}
#comment-bar {
  width: 100%;
  min-height: 100px;
  /* background-color: aquamarine; */
}
#comment-bar h1 {
  text-align: center;
  font-size: 15px;
}
.submit-comment {
  width: 95%;
  background: #eaf0f8;
  margin-bottom: 20px;
  padding: 10px 0 12px 20px;
}
#placeholder {
  width: 40px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
}
#input-comment {
  margin-left: 12px;
}
#submit-button {
  width: 100px;
  float: right;
  margin: 10px 30px auto auto;
}
#img-bar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: #606266;
  box-shadow: 3px 3px 5px #606264;
  /* background-color: aqua; */
}
#icon-bar {
  margin-top: 10px;
}
</style>
