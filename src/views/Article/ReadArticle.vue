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
          <router-link
            :to="{
              path: '/article/list/${author_id}',
              query: {
                author_id: this.arr.author_id,
                author_nickname: this.arr.author_nickname,
                author_avatar: this.user_img,
                author_signature: this.arr.signature
              }
            }"
          >
            <div class="username">
              <strong>{{ arr.author_nickname }}</strong>
            </div>
          </router-link>
          <div class="article-info">
            {{ dateStr }} &emsp; 浏览 {{ arr.reading }}
          </div>
        </div>
      </div>
      <div id="right-bar">
        <template v-if="!same_user">
          <template v-if="followed === false">
            <div id="button-bar">
              <el-button @click="focus" plain>+ 关注</el-button>
            </div>
          </template>
          <template v-else-if="followed === true">
            <div id="button-bar">
              <el-button @click="focus" plain>取消关注</el-button>
            </div>
          </template>
        </template>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="article-container">
      <Renderer :content="arr.content"></Renderer>
    </div>
    <div id="button-bar">
      <el-button
        v-if="!liked"
        type="danger"
        icon="el-icon-star-off"
        plain
        @click="thumb"
        >喜 欢</el-button
      >
      <el-button
        v-else-if="liked"
        type="danger"
        icon="el-icon-star-on"
        @click="thumb"
        >喜 欢</el-button
      >
      <el-button
        v-if="$store.state.user.logged"
        type="warning"
        plain
        icon="el-icon-warning-outline"
        @click="reportVisible = true"
      >
        举 报
      </el-button>
    </div>

    <el-divider></el-divider>
    <div id="comment-bar">
      <h1>评论</h1>
      <InputBox :article_id="article_id" />

      <CommentList :article_id="article_id"></CommentList>
    </div>
    <el-dialog title="举报文章" :visible.sync="reportVisible" width="720px">
      <el-form :model="formData">
        <el-form-item label="举报原因" label-width="80px">
          <el-input
            type="textarea"
            placeholder="请输入举报原因……"
            v-model="formData.reason"
            autocomplete="off"
            :autosize="{ minRows: 6, maxRows: 10 }"
          /> </el-form-item
      ></el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="reportVisible = false">取 消</el-button>
        <el-button
          :disabled="formData.reason === ''"
          type="warning"
          @click="report"
          >确 定</el-button
        >
      </div>
    </el-dialog>
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
      liked: false,
      article_id: "0",
      author_id: 0,
      followed: false,
      same_user: false,
      reportVisible: false,
      formData: {
        reason: ""
      }
    };
  },
  methods: {
    focus() {
      if (!this.$store.state.user.logged) {
        return;
      }

      const vm = this;

      if (!this.followed) {
        this.$api.follow
          .makeFollow(
            this.$store.state.user.uid,
            this.$store.state.user.token,
            this.author_id
          )
          .then(() => {
            vm.$message({
              type: "success",
              message: "关注成功！"
            });
            vm.followed = true;
          })
          .catch(err => {
            vm.$message.error("Oops，关注失败！");
            console.log(err);
          });
      } else {
        this.$api.follow
          .cancelFollow(
            this.$store.state.user.uid,
            this.$store.state.user.token,
            this.author_id
          )
          .then(() => {
            vm.$message({
              type: "success",
              message: "取消关注成功！"
            });
            vm.followed = false;
          })
          .catch(err => {
            vm.$message.error("Oops，取消关注失败！");
            console.log(err);
          });
      }
    },
    thumb() {
      if (!this.$store.state.user.logged) {
        return;
      }

      const vm = this;

      if (!this.liked) {
        this.$api.like
          .makeLike(
            this.$store.state.user.uid,
            this.$store.state.user.token,
            this.article_id
          )
          .then(() => {
            vm.liked = true;
          })
          .catch(err => {
            vm.$message.error("Oops，点赞失败！");
            console.log(err);
          });
      } else {
        this.$api.like
          .cancelLike(
            this.$store.state.user.uid,
            this.$store.state.user.token,
            this.article_id
          )
          .then(() => {
            vm.liked = false;
          })
          .catch(err => {
            vm.$message.error("Oops，取消点赞失败！");
            console.log(err);
          });
      }
    },
    loadArticle(article_id) {
      const vm = this;
      this.article_id = article_id;
      this.$api.article
        .fetchDetail(article_id)
        .then(data => {
          Object.assign(vm.arr, data.data);
          // vm.arr = data.data;
          // console.log(vm.arr);
          vm.author_id = data.data.author_id;
          // console.log("id----" + this.arr.author_id);
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
          return vm.$api.user.fetchAvatar(vm.arr.author_id);
        })
        .then(avatar => {
          vm.user_img = avatar.data.avatar_md;
          if (vm.$store.state.user.logged) {
            return vm.$api.like.testLike(
              vm.$store.state.user.uid,
              vm.$store.state.user.token,
              vm.article_id
            );
          } else return { data: { validate_result: false } };
        })
        .then(ret => {
          vm.liked = ret.data.validate_result;
          if (vm.author_id === vm.$store.state.user.uid) {
            vm.same_user = true;
            return { data: { validate_result: false } };
          } else if (vm.$store.state.user.logged) {
            return vm.$api.follow.testFollow(
              vm.$store.state.user.uid,
              vm.$store.state.user.token,
              vm.author_id
            );
          } else return { data: { validate_result: false } };
        })
        .then(ret => (vm.followed = ret.data.validate_result))
        .catch(err => {
          if (err.message !== "Skip") {
            vm.$message.error("Oops，确认一下文章 ID 吧！");
            console.log(err);
          }
        });
    },
    report() {
      if (!this.$store.state.user.logged || this.formData.reason === "") {
        this.reportVisible = false;
      } else {
        const vm = this;
        this.$api.report
          .makeReport(
            this.$store.state.user.uid,
            this.$store.state.user.token,
            this.article_id,
            this.formData.reason
          )
          .then(() => {
            vm.reportVisible = false;
            vm.$message.success("举报成功！社区的维护离不开你的努力！");
          })
          .catch(err => {
            vm.$message.error("举报失败！是不是没有登录呀？");
            console.log(err.code);
          });
      }

      return;
    }
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
