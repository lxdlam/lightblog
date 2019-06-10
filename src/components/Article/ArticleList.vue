<template>
  <div id="article-list">
    <!-- <ul v-for="(arti, index) in arti_object">
      <li :key="index" :title="arti.title" ........ />
    </ul> -->
  </div>
</template>

<script>
export default {
  name: "ArticleList",
  props: {
    articles: {
      type: Array // article_id
    }
  },
  data() {
    return {
      arti_object: null
    };
  },
  components: {
    // 在这里加载你的组件
  },
  methods: {
    fetchData() {
      // const acquire_one_article = (id, callback) => {
      //   this.axios.get().then(callback);
      // };
      // for (let item in retArray) {
      //   this.arti_object.push(item);
      // }
    }
  },
  mounted: function() {
    this.fetchData();
  }
};
</script>

}
<style scoped></style>
