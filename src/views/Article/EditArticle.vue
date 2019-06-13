<template>
  <div id="article-edit">
    <div class="article-title">
      <input
        placeholder="输入文章标题……"
        spellcheck="false"
        class="article-title-input"
        maxlength="40"
      /><el-button type="primary" class="article-title-button">发布</el-button>
    </div>
    <Editor v-model="value" class="article-editor" />
  </div>
</template>

<script>
import Editor from "@/components/Markdown/Editor";

export default {
  name: "EditArticle",
  data: function() {
    return {
      value: "# 在这里写文章吧！"
    };
  },
  components: {
    Editor
  },
  methods: {
    loadArticle(article_id) {}
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

<style scoped>
#article-edit {
  padding-top: 20px;
  background-color: white;
  min-height: 600px;
  text-align: start;
}

.article-editor {
  padding: 20px;
}

.article-title {
  display: flex;
  min-width: 840px;
  padding: 0 20px;
  justify-content: space-between;
}

.article-title-input {
  border: none;
  outline: none;
  color: #303133;
  font-size: 2rem;
  min-width: 730px;
}
</style>
