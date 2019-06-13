<template>
  <div id="article-edit">
    <div class="article-title">
      <input
        placeholder="输入文章标题……"
        spellcheck="false"
        class="article-title-input"
        maxlength="40"
        v-model="title"
      />
      <el-button @click="publish" type="primary" class="article-title-button"
        >发布</el-button
      >
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
      title: null,
      value: "# 在这里写文章吧！"
    };
  },
  components: {
    Editor
  },
  methods: {
    publish() {
      if (!this.$store.state.user.logged) {
        this.$message.error("没登录不能发文章哦～");
        this.$router.replace("/na");
      }
      const vm = this;
      this.$api.article
        .newArticle(this.$store.state.user.uid, this.$store.state.user.token, {
          title: vm.title,
          type: [1],
          cover: null,
          content: vm.value,
          article_abstract: "abc"
        })
        .then(() => {
          vm.$message({
            type: "success",
            message: "发布成功！快去看看吧！"
          });
        })
        .catch(err => {
          vm.$message.error("Oops，出现了一些错误，请联系管理员！");
          console.log(err);
        });
    }
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
