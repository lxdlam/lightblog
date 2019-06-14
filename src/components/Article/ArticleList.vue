<template>
  <div id="article-list">
    <ul
      class="article-line"
      v-infinite-scroll="load"
      infinite-scroll-disabled="disabled"
      infinite-scroll-distance="30px"
    >
      <ArticleListItem
        v-for="(item, index) in this.arr"
        :key="index"
        :title="item.title"
        :author="item.author_nickname"
        :date="item.release_time"
        :digest="item.articleAbstract"
        :praiseNum="item.thumb"
        :commentNum="item.reading"
        :imgName="item.cover"
      ></ArticleListItem>
    </ul>
    <p v-if="loading">加载中...</p>
    <p v-if="noMore">没有更多了</p>
  </div>
</template>

<script>
import ArticleListItem from "@/components/Article/ArticleListItem";
export default {
  name: "ArticleList",
  props: {
    arr: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      // date: 0,
      count: 10,
      loading: false,

      startNum: 0,
      endNum: 10
    };
  },
  components: {
    // 在这里加载你的组件
    ArticleListItem
  },
  methods: {
    fetchData() {
      // const acquire_one_article = (id, callback) => {
      //   this.axios.get().then(callback);
      // };
      // for (let item in retArray) {
      //   this.arti_object.push(item);
      // }
    },
    load() {
      this.loading = true;
      setTimeout(() => {
        this.count += 2;
        this.loading = false;
      }, 1000);
    },
    loadArticleList(author_id) {
      const vm = this;
      this.$api.article
        .fetchListByAuthor(author_id, this.startNum, this.endNum)
        .then(data => {
          console.log(123);
          vm.arr = data.data.arr;
          vm.date = data.response_time;
          console.log(vm.arr);
        })
        // eslint-disable-next-line no-unused-vars
        .catch(err => {
          vm.$message.error("Oops，确认一下文章 ID 吧！");
          vm.$router.push("/"); // redirect to the index
        });
    },
    fetchListByAuthor(author_id, start, end) {
      const query = {
        author_id: author_id,
        start: start,
        end: end
      };
      return this.proxy.query("/article/query_by_author", query);
    }
  },
  computed: {
    noMore() {
      return this.count >= 15;
    },
    disabled() {
      return this.loading || this.noMore;
    }
  },
  mounted: function() {
    // this.fetchData();
    // this.loadArticleList(this.$route.params["id"]);
    // this.loadArticleList(2);
    if (this.$route.params["id"] === "new") {
      this.msg = "new";
    } else {
      this.msg = "id: " + this.$route.params["id"];
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.loadArticleList(this.$route.params["id"]);
    next();
  }
};
</script>
<style scoped>
#item-bar {
  width: 1200px;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
#article-list {
  max-width: 1280px;
  width: 960px;
  display: table;
  margin: 0 auto;
}
</style>
