<template>
  <div id="user_article">
    <!-- <InfoArea :author="true" :author_id="this.author_id" /> -->
    <AuthorInformation
      :author_id="this.author_id"
      :author_nickname="this.author_nickname"
      :author_avatar="this.author_avatar"
      :author_signature="this.author_signature"
    />
    <ArticleList :arr="arr"></ArticleList>
  </div>
</template>

<script>
// import InfoArea from "@/components/Article/InfoArea";
import ArticleList from "@/components/Article/ArticleList";
import AuthorInformation from "@/components/Article/AuthorInformation";
export default {
  name: "UserArticle",
  components: {
    // InfoArea,
    AuthorInformation,
    ArticleList
  },

  data: function() {
    return {
      arr: [{}],
      keyword: null,
      startNum: 0,
      endNum: 10,
      author_id: 2,
      author_nickname: ""
    };
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
          vm.$message.error("加载出错");
          //   vm.$router.push("/"); // redirect to the index
        });
    }
  },
  mounted: function() {
    this.author_id = this.$route.query.author_id;
    this.author_nickname = this.$route.query.author_nickname;
    this.author_avatar = this.$route.query.author_avatar;
    this.author_signature = this.$route.query.author_signature;
    console.log(
      "step1---" +
        this.$route.query.author_id +
        "------" +
        this.$route.query.author_avatar +
        "------" +
        this.$route.query.author_signature
    );
    this.loadArticleList(this.$route.query.author_id);
  }
  //   beforeRouteUpdate(to, from, next) {
  //     this.author_id = this.$route.query.author_id;
  //     // console.log("userid" + this.author_id);
  //     this.loadArticleList(this.author_id);
  //     next();
  //   },
  //   beforeRouteEnter(to, from, next) {
  //     next(vm => {
  //       vm.author_id = this.$route.query.author_id;
  //       vm.loadArticleList(vm.author_id);
  //     });
  //   }
};
</script>

<style scoped></style>
