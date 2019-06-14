<script>
export default {
  name: "RandomView",
  mounted() {
    const vm = this;
    this.$api.article
      .randomArticle()
      .then(ret => {
        vm.$router.replace(`/article/read/${ret.data.article_id}`);
      })
      .catch(err => {
        console.log(err);
        vm.$router.replace("/");
      });
  }
};
</script>
