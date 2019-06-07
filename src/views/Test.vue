<template>
  <div id="test-view">
    <ReadArticle
      article_hash="ac59f05f2d111eca6fc6685333b43998"
      avatar_sm="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
      user_nickname="z臧博浩"
      :release_time="1559627549000"
      :reading="0"
      title="今天，昨天，前天"
    ></ReadArticle>
  </div>
</template>

<script>
import ReadArticle from "@/views/Article/ReadArticle";

export default {
  name: "TestView",
  components: { ReadArticle },
  data: function() {
    return {};
  },
  methods: {}
};
</script>

<style scoped></style>
