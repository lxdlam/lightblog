<template>
  <div id="explore-view">
    <!-- <p>{{ keyword }}</p> -->
    <InfoArea :random="true" />
    <!-- <ListBySearch :keyword="'google'"></ListBySearch> -->
  </div>
</template>

<script>
import InfoArea from "@/components/Article/InfoArea";
// import ListBySearch from "@/views/Article/ArticleList/ListBySearch";
export default {
  name: "ExploreView",
  components: {
    InfoArea
    // ListBySearch
  },
  data: function() {
    return {
      keyword: null,
      startNum: 0,
      endNum: 10
    };
  },
  beforeRouteUpdate(to, from, next) {
    this.keyword = to.params["keyword"];
    next();
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.keyword = to.params["keyword"];
    });
  }
};
</script>

<style scoped></style>
