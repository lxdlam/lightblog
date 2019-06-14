<template>
  <div id="search_container">
    <p>{{ keyword }}</p>
    <InfoArea :search="true" />
    <ArticleList :arr="arr"></ArticleList>
  </div>
</template>

<script>
import InfoArea from "@/components/Article/InfoArea";
import ArticleList from "@/components/Article/ArticleList";
export default {
  name: "SearchView",
  components: {
    InfoArea,
    ArticleList
  },
  data: function() {
    return {
      arr: [{}],
      keyword: null,
      startNum: 0,
      endNum: 10
    };
  },
  methods: {
    loadArticleList(title) {
      const vm = this;
      this.$api.article
        .searchTitle(title, this.startNum, this.endNum)
        .then(data => {
          vm.arr = data.data.arr;
          vm.date = data.response_time;
        })
        // eslint-disable-next-line no-unused-vars
        .catch(err => {
          vm.$message.error("Oops，确认一下文章 ID 吧！");
        });
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.keyword = to.params["keyword"];
    this.loadArticleList(this.keyword);
    next();
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.keyword = to.params["keyword"];
      vm.loadArticleList(vm.keyword);
    });
  }
};
</script>

<style scoped></style>
