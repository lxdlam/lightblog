<template>
  <div id="list-by-search">
    <ArticleList :arr="arr"></ArticleList>
  </div>
</template>

<script>
import ArticleList from "@/components/Article/ArticleList";
export default {
  name: "ListBySearch",
  props: {
    keyword: {
      type: String,
      required: true
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
    loadArticleList(title) {
      const vm = this;
      console.log("In loadArticleList " + title);
      this.$api.article
        .searchTitle(title, this.startNum, this.endNum)
        .then(data => {
          vm.arr = data.data.arr;
          vm.date = data.response_time;
          console.log(vm.arr);
        })
        // eslint-disable-next-line no-unused-vars
        .catch(err => {
          vm.$message.error("Oops，确认一下文章 ID 吧！");
          // vm.$router.push("/"); // redirect to the index
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
    console.log("here");
    console.log(this.keyword);
    this.loadArticleList(this.keyword);
    // this.loadArticleList(this.$route.params["keyword"]);
  },
  beforeRouteUpdate(to, from, next) {
    this.loadArticleList(this.keyword);
    next();
  }
};
</script>
<style scoped></style>
