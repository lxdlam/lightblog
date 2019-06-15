<template>
  <div id="explore-view">
    <InfoArea :random="true" />
    <ArticleList :arr="arr" />
  </div>
</template>

<script>
import InfoArea from "@/components/Article/InfoArea";
import ArticleList from "@/components/Article/ArticleList";

export default {
  name: "ExploreView",
  components: {
    InfoArea,
    ArticleList
  },
  data: function() {
    return {
      keyword: null,
      startNum: 0,
      endNum: 10,
      arr: null
    };
  },
  methods: {
    loadArticles() {
      const vm = this;
      this.$api.article
        .recommendList()
        .then(ret => {
          vm.arr = ret.data.list;
        })
        .catch(err => {
          vm.$message.error("获取探索列表出现问题");
          console.log(err);
        });
    }
  },
  mounted() {
    this.loadArticles();
  }
};
</script>

<style scoped></style>
