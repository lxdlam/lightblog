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
      <el-select
        autocomplete="off"
        v-model="tag"
        multiple
        filterable
        placeholder="文章标签"
        collapse-tags
      >
        <el-option
          v-for="item in available_tags"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <el-button @click="publish" type="primary" class="article-title-button"
        >发布</el-button
      >
    </div>
    <Editor v-model="value" class="article-editor" />
  </div>
</template>

<script>
import Editor from "@/components/Markdown/Editor";
import htmlparser from "htmlparser2";
import instance from "@/components/Markdown/render";

export default {
  name: "EditArticle",
  data: function() {
    return {
      title: null,
      value: "# 在这里写文章吧！",
      article_id: null,
      tag: [],
      cover: null,
      abstract: "",
      available_tags: []
    };
  },
  components: {
    Editor
  },
  methods: {
    publish() {
      if (this.tag.length < 1) {
        this.$message.error("请至少选择一个标签再发布哦！");
        return;
      }

      this.parse();

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
              cover: vm.cover,
              content: vm.value,
              article_abstract: vm.abstract
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
              cover: vm.cover,
              content: vm.value,
              article_abstract: vm.abstract
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
    },
    parse() {
      const vm = this;
      let process = true;
      const parser = new htmlparser.Parser({
        ontext: text => {
          console.log(text);
          if (process && vm.abstract.length < 150) {
            vm.abstract += text;
            vm.abstract = vm.abstract.slice(0, 150);
          }
        },
        onattribute: (name, value) => {
          console.log(name, value);
          if (name === "src" && vm.cover === null) {
            vm.cover = value;
          }
        },
        oncomment: data => {
          if (data === "more") process = false;
        }
      });

      parser.write(instance.render(this.value));
      parser.end();
    },
    loadAllTags() {
      const vm = this;
      this.$api.tag
        .list(0, 1000)
        .then(data => {
          data.data.arr.forEach(row => {
            vm.available_tags.push({
              id: row.labelId,
              name: row.labelName
            });
          });
        })
        .catch(err => {
          vm.$message.error("标签获取错误！请联系管理员！");
          console.log(err);
        });
    }
  },
  mounted() {
    this.loadAllTags();
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
  min-width: 500px;
}
</style>
