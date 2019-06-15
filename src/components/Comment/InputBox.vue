<template>
  <div class="submit-comment">
    <el-row>
      <el-col :span="1">
        <i id="icon-bar" class="el-icon-s-custom"></i>
        <!-- <el-image id="placeholder" icon="el-icon-user"></el-image> -->
      </el-col>
      <el-col :span="22">
        <el-input
          type="textarea"
          :rows="Rows"
          placeholder="输入评论..."
          v-model="textarea"
          @focus="increseRows"
          id="input-comment"
        />
      </el-col>
      <el-button
        @click="submitComment()"
        v-show="isOnFocus"
        type="primary"
        id="submit-button"
      >
        发表评论
      </el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "InputBox",
  data() {
    return {
      textarea: "",
      Rows: 1,
      isOnFocus: false,
      endNum: 20,
      data: {
        uid: 0,
        comment: "",
        article_id: "",
        parent_comment_id: ""
      }
    };
  },
  props: {
    article_id: {
      type: String,
      required: true
    }
  },
  methods: {
    increseRows() {
      //alert("点击了");
      if (
        typeof this.$store.state.user.uid === "undefined" ||
        this.$store.state.user.uid === null ||
        this.$store.state.user.uid === ""
      ) {
        this.$message.error("请先登录");
        return;
      }
      this.Rows = 5;
      this.isOnFocus = true;
    },
    decreseRows() {
      this.Rows = 1;
      this.isOnFocus = false;
    },
    thumb() {},
    loadComment(article_id, start, end) {
      const vm = this; // 如果你需要在回调函数内调用 this，请做此绑定并在回调函数内部使用 vm
      this.$api.comment
        .fetchCommentByArticle(article_id, start, end)
        .then(res => {
          vm.comments = res.data.arr;
          vm.commentNum = res.data.sum;
        })
        .catch(err => {
          console.log(err.code);
          console.log(err.msg);
        });
    },
    submitComment() {
      //alert("000000");
      if (
        typeof this.textarea === "undefined" ||
        this.textarea === null ||
        this.textarea === ""
      ) {
        this.$message.error("评论内容不能为空！");
        return;
      }
      this.data.uid = this.$store.state.user.uid;
      this.data.comment = this.textarea;
      this.data.article_id = this.article_id;
      //alert(this.$store.state.user.id);
      const vm = this;
      this.$api.comment
        .newComment(
          this.$store.state.user.uid,
          this.$store.state.user.token,
          this.data
        )
        .then(() => {
          vm.$message("发表评论成功");
          vm.textarea = "";
          vm.decreseRows();
          //vm.loadComment(vm.article_id, 0, vm.endNum);
          // window.scrollTo({ top: document.body.scrollHeight });
          window.location.reload();
          setTimeout(function() {
            window.scrollTo({ top: document.body.scrollHeight });
          }, 1000);
        })
        .catch(error => {
          console.log(error);
        });
    },
    mounted: function() {
      this.loadComment(this.article_id, 0, this.endNum);
    },
    beforeRouteUpdate(to, from, next) {
      this.loadComment(this.article_id, 0, this.endNum);
      next();
    }
  }
};
</script>

<style scoped>
.submit-comment {
  width: 95%;
  background: #eaf0f8;
  margin: auto auto 20px 10px;
  padding: 10px 0 12px 20px;
  border-radius: 7px;
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
