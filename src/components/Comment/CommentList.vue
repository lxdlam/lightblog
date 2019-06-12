<template>
  <div id="comment-list">
    <!-- <CommentItem
      avatar_sm="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
      user_nickname="无影の繁华"
      comment="感谢博主分享"
      :comment_time="1559738627000"
    ></CommentItem> -->
    <ul>
      <li v-for="comment in comments" v-bind:key="comment">
        <el-divider></el-divider>
        <CommentItem
          :avatar_sm="comment.avatar_sm"
          :user_nickname="comment.user_nickname"
          :comment="comment.comment"
          :comment_time="comment.comment_time"
        ></CommentItem>
      </li>
    </ul>
  </div>
</template>

<script>
import CommentItem from "@/components/Comment/CommentItem";

export default {
  name: "CommentList",
  components: {
    CommentItem
  },
  data() {
    return {
      endNum: 10,
      comments: [],
      commentNum: 0
    };
  },
  methods: {
    // 一个使用 axios 进行 http 查询的例子
    login() {
      const vm = this; // 如果你需要在回调函数内调用 this，请做此绑定并在回调函数内部使用 vm

      // 下面给出了一个登录 API 的调用例子。
      this.$api.comment
        .fetchCommentByArticle("")
        .then(ret => {
          vm.token = ret.data.token;
          vm.uid = ret.data.uid;
        })
        .catch(err => console.log(err));
    }
  },
  /* created: function() {
    this.query();
  },
  updated: function() {
    if (this.commentNum > this.endNum) {
      this.endNum += 10;
      this.query();
    }
  } */
  mounted: function() {}
};
</script>

<style scoped></style>
