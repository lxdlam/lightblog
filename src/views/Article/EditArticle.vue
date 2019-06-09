<template>
  <div id="article-edit">{{ msg }}</div>
</template>

<script>
export default {
  name: "EditArticle",
  data: function() {
    return {
      msg: null
    };
  },
  methods: {
    loadArticle() {}
  },
  mounted() {
    if (this.$route.params["id"] === "new") {
      this.msg = "new";
    } else {
      this.msg = "id: " + this.$route.params["id"];
    }
  },
  beforeRouteUpdate(to, from, next) {
    if (to.params["id"] === "new") {
      this.msg = "new";
    } else {
      this.msg = "id: " + to.params["id"];
    }

    next();
  }
};
</script>

<style scoped></style>
