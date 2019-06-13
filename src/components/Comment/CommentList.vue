<template>
  <div id="comment-list">
    <div class="infinite-list-wrapper">
      <ul
        class="list"
        v-infinite-scroll="load"
        infinite-scroll-disabled="disabled"
      >
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
      <p v-if="loading">加载中...</p>
      <p v-if="noMore">没有更多了</p>
    </div>
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
      commentNum: 0,
      loading: false
    };
  },
  methods: {
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
    load() {
      this.loading = true;

      this.loadComment(this.$route.params["id"], 0, this.endNum);
      this.endNum += 10;
      this.loading = false;
    }
    // 一个使用 axios 进行 http 查询的例子
  },
  computed: {
    noMore() {
      return this.count >= this.commentNum;
    },
    disabled() {
      return this.loading || this.noMore;
    }
  },

  mounted: function() {
    this.loadComment(this.$route.params["id"], 0, this.endNum);
  },
  beforeRouteUpdate(to, from, next) {
    this.loadComment(this.$route.params["id"], 0, this.endNum);
    next();
  }
  /* created: function() {
    this.query();
  },
  updated: function() {
    if (this.commentNum > this.endNum) {
      this.endNum += 10;
      this.query();
    }
  } */
};
</script>

<style scoped></style>
