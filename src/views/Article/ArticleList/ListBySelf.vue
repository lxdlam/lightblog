<template>
  <div id="list-by-self">
    <ArticleList :arr="arr"></ArticleList>
  </div>
</template>

<script>
import ArticleList from "@/components/Article/ArticleList";
export default {
  name: "ListBySelf",
  props: {
    authorid: {
      type: Number
    },
    start: {
      type: Number
    },
    end: {
      type: Number
    }
  },
  data() {
    return {
      arr: [{}],
      startNum: 0,
      endNum: 10
    };
  },
  components: {
    // 在这里加载你的组件
    ArticleList
  },
  methods: {
    loadArticleList(author_id) {
      const vm = this;
      this.$api.article
        .fetchListByAuthor(author_id, this.startNum, this.endNum)
        .then(data => {
          vm.arr = data.data.arr;
          vm.date = data.response_time;
        })
        // eslint-disable-next-line no-unused-vars
        .catch(err => {
          vm.$message.error("Oops，确认一下文章 ID 吧！");
          vm.$router.push("/"); // redirect to the index
        });
    }
  },
  computed: {
    noMore() {
      return this.count >= 15;
    },
    disabled() {
      return this.loading || this.noMore;
    }
  },
  mounted: function() {
    // this.fetchData();
    // this.loadArticleList(this.$route.params["id"]);
    this.loadArticleList(this.$store.state.user.uid);
    if (this.$route.params["id"] === "new") {
      this.msg = "new";
    } else {
      this.msg = "id: " + this.$route.params["id"];
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.loadArticleList(this.$route.params["id"]);
    next();
  }
};
</script>
<style scoped></style>
