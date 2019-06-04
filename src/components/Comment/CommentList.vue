<template>
  <div id="comment-list">
    <ul>
      <li v-for="comment in comments" v-bind:key="comment">
        <Comment
          :avatar_sm="comment.avatar_sm"
          :user_nickname="comment.user_nickname"
          :comment="comment.comment"
          :comment_time="comment.comment_time"
        ></Comment>
      </li>
    </ul>
  </div>
</template>

<script>
import Comment from "../components/Comment";

export default {
  name: "CommentList",
  components: {
    Comment
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
    query: function() {
      this.axios
        .post("./comment/article_query", {
          article_id: 0,
          start: 0,
          end: this.endNum
        })
        .then(resp => {
          if (resp.code === 0) {
            this.comments = resp.data.arr;
            this.commentNum = resp.data.sum;
          } else {
            console.log(resp.msg);
          }
        })
        .catch(e => {
          console.log("Query failed. You may encounter a network broken.");
          console.log(e);
        });
    }
  },
  created: function() {
    this.query();
  },
  updated: function() {
    if (this.commentNum > this.endNum) {
      this.endNum += 10;
      this.query();
    }
  }
};
</script>

<style scoped></style>
