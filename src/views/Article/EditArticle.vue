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
      value: "# 在这里写文章吧！",
      article_id: null,
      tag: []
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
      if (this.article_id === null) {
        this.$api.article
          .newArticle(
            this.$store.state.user.uid,
            this.$store.state.user.token,
            {
              title: vm.title,
              type: vm.tag,
              cover: null,
              content: vm.value,
              article_abstract: "abc"
            }
          )
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
      } else {
        this.$api.article
          .updateArticle(
            this.$store.state.user.uid,
            this.$store.state.user.token,
            {
              article_id: vm.article_id,
              title: vm.title,
              type: vm.tag,
              cover: null,
              content: vm.value,
              article_abstract: "abc"
            }
          )
          .then(() => {
            vm.$message({
              type: "success",
              message: "更新成功！快去看看吧！"
            });
            vm.$router.push(`/article/read/${vm.article_id}`);
          })
          .catch(err => {
            vm.$message.error("Oops，出现了一些错误，请联系管理员！");
            console.log(err);
          });
      }
    },
    loadArticle(article_id) {
      const vm = this;

      this.$api.article
        .fetchDetail(article_id)
        .then(data => {
          const article = data.data;
          if (article.author_id !== vm.$store.state.user.uid) {
            vm.$message.error("Oops，你不能改别人的文章哦！");
          } else {
            vm.article_id = article.virtual_id;
            vm.value = article.content;
            vm.title = article.title;
            article.labels.forEach(tag => {
              vm.tag.push(tag.label_id);
            });
          }
        })
        .catch(err => {
          vm.$message.error("Oops，出现了一些问题，请联系管理员！");
          console.log(err);
        });
    }
  },
  mounted() {
    if (this.$route.params["id"] !== "new") {
      this.article_id = this.$route.params["id"];
      this.loadArticle(this.article_id);
    }
  },
  beforeRouteUpdate(to, from, next) {
    if (this.$route.params["id"] !== "new") {
      this.article_id = this.$route.params["id"];
      this.loadArticle(this.article_id);
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
