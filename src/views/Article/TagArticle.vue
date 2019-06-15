<template>
  <div id="tag-article">
    <InfoArea :label="true" :detail="tag_detail" />
    <ArticleList :arr="arr"></ArticleList>
  </div>
</template>

<script>
import InfoArea from "@/components/Article/InfoArea";
import ArticleList from "@/components/Article/ArticleList";

export default {
  name: "TagArticleView",
  components: {
    InfoArea,
    ArticleList
  },
  data: function() {
    return {
      id: null,
      name: null,
      arr: [{}],
      start: 0,
      offset: 10, // a fixed value but can be changed
      tag_detail: {
        name: "",
        desc: ""
      }
    };
  },
  methods: {
    loadArticleList(tag_id) {
      const vm = this;
      this.$api.tag
        .detail(tag_id)
        .then(ret => {
          vm.tag_detail.name = ret.data.label_name;
          vm.tag_detail.desc = ret.data.description;
          return vm.$api.article.fetchListByTag(
            parseInt(tag_id),
            vm.start,
            vm.start + vm.offset - 1
          );
        })
        .then(data => {
          vm.arr = data.data.arr;
          this.start += this.offset;
        })
        .catch(err => {
          vm.$message.error("获取文章列表失败！请联系管理员！");
          console.log(err);
        });
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.id = to.params["id"];
    this.loadArticleList(this.id);
    next();
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.id = to.params["id"];
      vm.loadArticleList(vm.id);
    });
  }
};
</script>

<style scoped></style>
