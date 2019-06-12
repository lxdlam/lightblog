<template>
  <div id="test1-view">
    <!-- <InfoArea :author="1" /> -->
    <!-- <InfoArea :search="1" /> -->
    <!-- <ArticleList :authorid="1" :start="0" :end="2"></ArticleList> -->
    <ReadArticle :article_id="1"></ReadArticle>
    <!-- <CommentList></CommentList> -->
    <!-- <Menu></Menu> -->
  </div>
</template>

<script>
// import InfoArea from "@/components/Article/InfoArea";
// import ArticleList from "@/components/Article/ArticleList";
// import CommentList from "@/components/Comment/CommentList";
import ReadArticle from "@/views/Article/ReadArticle";
// import Menu from "@/components/Auth/Personal/Menu";
export default {
  name: "Test1View",
  components: {
    // InfoArea
    // ArticleList
    ReadArticle
    // CommentList
    // Menu
  },
  data: function() {
    return {
      step: 1,
      user: {
        account: "",
        username: "",
        password: "",
        email: "",
        phone: "",
        interest: [],
        img_url: "",
        available: false
      },
      loading: false
    };
  },
  methods: {
    forward() {
      this.step++;
    },
    backward() {
      this.step--;
    },
    do_register() {}
  }
};
</script>

<style scoped>
#inner-container {
  padding-top: 40px;
  text-align: center;
}

#button-container {
  padding-top: 20px;
  text-align: center;
}
</style>
