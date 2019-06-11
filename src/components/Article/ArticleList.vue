<template>
  <div id="article-list">
    <ul
      class="article-line"
      v-infinite-scroll="load"
      infinite-scroll-disabled="disabled"
      infinite-scroll-distance="30px"
    >
      <!-- <li v-for="i in count" class="list-item">{{ i }}</li> -->
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
    authorid: {
      type: Number
    },
    start: {
      type: Number
    },
    end: {
      type: Number
    }
  },
  data() {
    return {
      // date: 0,
      count: 10,
      loading: false,
      arr: [
        {
          // loading: false
          // title: "文章",
          // author_nickname: "琴乡梦",
          // date: 1231234,
          // digest: "摘要",
          // thumb: 10,
          // reading: 20,
          // imgName: "http://img3m6.ddimg.cn/46/1/24144166-1_u_30016.jpg"
        }
      ]
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
    let articles = {
      response_time: 1559636370445,
      code: 0,
      msg: "success",
      data: {
        start: 0,
        end: 2,
        sum: 2,
        arr: [
          {
            article_id: 1,
            virtual_id: "ac59f05f2d111eca6fc6685333b43998",
            title: "Vue Router详解",
            author_id: 1,
            author_nickname: "臧博浩",
            cover:
              "https://cdn.scotch.io/3660/h49pHk3ORDWKylIlU7bE_maxresdefault.jpg",
            content: "今天我很开心，昨天我也很开心，前天我依然很开心，沙雕吗",
            articleAbstract: "在这里你可以学到Vue Router的相关内容",
            release_time: 1559627633000,
            thumb: 1,
            reading: 0,
            labels: [
              {
                label_id: 1,
                label_name: "123"
              },
              {
                label_id: 2,
                label_name: "io"
              }
            ]
          },
          {
            article_id: 2,
            virtual_id: "3674c9cd371671960510cda0370fe5c2",
            title: "React框架基础入门",
            author_id: 1,
            author_nickname: "姚越",
            cover:
              "https://cn.bing.com/th?id=OIP.EntHChgUyirgbZ9A3zTxkAHaFj&pid=Api&rs=1&p=0",
            content: "今天我很开心，昨天我也很开心，前天我依然很开心，沙雕吗2",
            articleAbstract: "在这里你可以学到React框架开发的相关内容",
            release_time: 1559627633000,
            thumb: 2,
            reading: 0,
            labels: [
              {
                label_id: 1,
                label_name: "123"
              }
            ]
          },
          {
            article_id: 2,
            virtual_id: "3674c9cd371671960510cda0370fe5c2",
            title: "AngularJS框架基础入门",
            author_id: 1,
            author_nickname: "李洋",
            cover:
              "http://theblogreaders.com/wp-content/uploads/2015/12/angular-js.png",
            content: "今天我很开心，昨天我也很开心，前天我依然很开心，沙雕吗2",
            articleAbstract: "在这里你可以学到AngularJS框架开发的相关内容",
            release_time: 1559627633000,
            thumb: 2,
            reading: 0,
            labels: [
              {
                label_id: 1,
                label_name: "123"
              }
            ]
          },
          {
            article_id: 2,
            virtual_id: "3674c9cd371671960510cda0370fe5c2",
            title: "AngularJS框架基础入门",
            author_id: 1,
            author_nickname: "李洋",
            cover:
              "http://theblogreaders.com/wp-content/uploads/2015/12/angular-js.png",
            content: "今天我很开心，昨天我也很开心，前天我依然很开心，沙雕吗2",
            articleAbstract: "在这里你可以学到AngularJS框架开发的相关内容",
            release_time: 1559627633000,
            thumb: 2,
            reading: 0,
            labels: [
              {
                label_id: 1,
                label_name: "123"
              }
            ]
          },
          {
            article_id: 2,
            virtual_id: "3674c9cd371671960510cda0370fe5c2",
            title: "AngularJS框架基础入门",
            author_id: 1,
            author_nickname: "李洋",
            cover:
              "http://theblogreaders.com/wp-content/uploads/2015/12/angular-js.png",
            content: "今天我很开心，昨天我也很开心，前天我依然很开心，沙雕吗2",
            articleAbstract: "在这里你可以学到AngularJS框架开发的相关内容",
            release_time: 1559627633000,
            thumb: 2,
            reading: 0,
            labels: [
              {
                label_id: 1,
                label_name: "123"
              }
            ]
          },
          {
            article_id: 2,
            virtual_id: "3674c9cd371671960510cda0370fe5c2",
            title: "AngularJS框架基础入门",
            author_id: 1,
            author_nickname: "李洋",
            cover:
              "http://theblogreaders.com/wp-content/uploads/2015/12/angular-js.png",
            content: "今天我很开心，昨天我也很开心，前天我依然很开心，沙雕吗2",
            articleAbstract: "在这里你可以学到AngularJS框架开发的相关内容",
            release_time: 1559627633000,
            thumb: 2,
            reading: 0,
            labels: [
              {
                label_id: 1,
                label_name: "123"
              }
            ]
          },
          {
            article_id: 2,
            virtual_id: "3674c9cd371671960510cda0370fe5c2",
            title: "AngularJS框架基础入门",
            author_id: 1,
            author_nickname: "李洋",
            cover:
              "http://theblogreaders.com/wp-content/uploads/2015/12/angular-js.png",
            content: "今天我很开心，昨天我也很开心，前天我依然很开心，沙雕吗2",
            articleAbstract: "在这里你可以学到AngularJS框架开发的相关内容",
            release_time: 1559627633000,
            thumb: 2,
            reading: 0,
            labels: [
              {
                label_id: 1,
                label_name: "123"
              }
            ]
          },
          {
            article_id: 2,
            virtual_id: "3674c9cd371671960510cda0370fe5c2",
            title: "AngularJS框架基础入门",
            author_id: 1,
            author_nickname: "李洋",
            cover:
              "http://theblogreaders.com/wp-content/uploads/2015/12/angular-js.png",
            content: "今天我很开心，昨天我也很开心，前天我依然很开心，沙雕吗2",
            articleAbstract: "在这里你可以学到AngularJS框架开发的相关内容",
            release_time: 1559627633000,
            thumb: 2,
            reading: 0,
            labels: [
              {
                label_id: 1,
                label_name: "123"
              }
            ]
          },
          {
            article_id: 2,
            virtual_id: "3674c9cd371671960510cda0370fe5c2",
            title: "AngularJS框架基础入门",
            author_id: 1,
            author_nickname: "李洋",
            cover:
              "http://theblogreaders.com/wp-content/uploads/2015/12/angular-js.png",
            content: "今天我很开心，昨天我也很开心，前天我依然很开心，沙雕吗2",
            articleAbstract: "在这里你可以学到AngularJS框架开发的相关内容",
            release_time: 1559627633000,
            thumb: 2,
            reading: 0,
            labels: [
              {
                label_id: 1,
                label_name: "123"
              }
            ]
          },
          {
            article_id: 2,
            virtual_id: "3674c9cd371671960510cda0370fe5c2",
            title: "AngularJS框架基础入门",
            author_id: 1,
            author_nickname: "李洋",
            cover:
              "http://theblogreaders.com/wp-content/uploads/2015/12/angular-js.png",
            content: "今天我很开心，昨天我也很开心，前天我依然很开心，沙雕吗2",
            articleAbstract: "在这里你可以学到AngularJS框架开发的相关内容",
            release_time: 1559627633000,
            thumb: 2,
            reading: 0,
            labels: [
              {
                label_id: 1,
                label_name: "123"
              }
            ]
          },
          {
            article_id: 2,
            virtual_id: "3674c9cd371671960510cda0370fe5c2",
            title: "AngularJS框架基础入门",
            author_id: 1,
            author_nickname: "李洋",
            cover:
              "http://theblogreaders.com/wp-content/uploads/2015/12/angular-js.png",
            content: "今天我很开心，昨天我也很开心，前天我依然很开心，沙雕吗2",
            articleAbstract: "在这里你可以学到AngularJS框架开发的相关内容",
            release_time: 1559627633000,
            thumb: 2,
            reading: 0,
            labels: [
              {
                label_id: 1,
                label_name: "123"
              }
            ]
          },
          {
            article_id: 2,
            virtual_id: "3674c9cd371671960510cda0370fe5c2",
            title: "AngularJS框架基础入门",
            author_id: 1,
            author_nickname: "李洋",
            cover:
              "http://theblogreaders.com/wp-content/uploads/2015/12/angular-js.png",
            content: "今天我很开心，昨天我也很开心，前天我依然很开心，沙雕吗2",
            articleAbstract: "在这里你可以学到AngularJS框架开发的相关内容",
            release_time: 1559627633000,
            thumb: 2,
            reading: 0,
            labels: [
              {
                label_id: 1,
                label_name: "123"
              }
            ]
          },
          {
            article_id: 2,
            virtual_id: "3674c9cd371671960510cda0370fe5c2",
            title: "AngularJS框架基础入门",
            author_id: 1,
            author_nickname: "李洋",
            cover:
              "http://theblogreaders.com/wp-content/uploads/2015/12/angular-js.png",
            content: "今天我很开心，昨天我也很开心，前天我依然很开心，沙雕吗2",
            articleAbstract: "在这里你可以学到AngularJS框架开发的相关内容",
            release_time: 1559627633000,
            thumb: 2,
            reading: 0,
            labels: [
              {
                label_id: 1,
                label_name: "123"
              }
            ]
          },
          {
            article_id: 2,
            virtual_id: "3674c9cd371671960510cda0370fe5c2",
            title: "AngularJS框架基础入门",
            author_id: 1,
            author_nickname: "李洋",
            cover:
              "http://theblogreaders.com/wp-content/uploads/2015/12/angular-js.png",
            content: "今天我很开心，昨天我也很开心，前天我依然很开心，沙雕吗2",
            articleAbstract: "在这里你可以学到AngularJS框架开发的相关内容",
            release_time: 1559627633000,
            thumb: 2,
            reading: 0,
            labels: [
              {
                label_id: 1,
                label_name: "123"
              }
            ]
          },
          {
            article_id: 2,
            virtual_id: "3674c9cd371671960510cda0370fe5c2",
            title: "AngularJS框架基础入门",
            author_id: 1,
            author_nickname: "李洋",
            cover:
              "http://theblogreaders.com/wp-content/uploads/2015/12/angular-js.png",
            content: "今天我很开心，昨天我也很开心，前天我依然很开心，沙雕吗2",
            articleAbstract: "在这里你可以学到AngularJS框架开发的相关内容",
            release_time: 1559627633000,
            thumb: 2,
            reading: 0,
            labels: [
              {
                label_id: 1,
                label_name: "123"
              }
            ]
          }
        ]
      }
    };
    this.arr = articles.data.arr;
    this.date = articles.response_time;
    // this.arr.title = articles.data.arr.title;
    // this.author_nickname = articles.data.arr.author_nickname;

    // this.arr.digest = articles.data.arr.articleAbstract;
    // this.arr.thumb = articles.data.arr.thumb;
    // this.arr.reading = articles.data.arr.reading;
    // this.arr.imgName = articles.data.arr.cover;
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
  width: 1100px;
  /* box-shadow: 3px 3px 4px #909399; */
}
</style>
