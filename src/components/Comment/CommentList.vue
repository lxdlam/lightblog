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
