<template>
  <div id="article-list">
    <ul class="article-line">
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
      />
    </ul>
    <!-- <el-row id="container">
      <el-col :xs="40" :sm="25" :md="25" :lg="25" :xl="50">
        <div id="item-bar">
          <ArticleListItem
            :title="this.arr.title"
            :author="this.arr.author_nickname"
            :date="this.arr.date"
            :digest="this.arr.digest"
            :praiseNum="this.arr.thumb"
            :commentNum="this.arr.reading"
            :imgName="this.arr.imgName"
          ></ArticleListItem>
        </div>
      </el-col>
    </el-row> -->
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
      date: 121212412,
      arr: [
        {
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
            title: "今天，昨天，前天",
            author_id: 1,
            author_nickname: "z臧博浩",
            cover: "http://img3m6.ddimg.cn/46/1/24144166-1_u_30016.jpg",
            content: "今天我很开心，昨天我也很开心，前天我依然很开心，沙雕吗",
            articleAbstract: "123123",
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
            title: "今天，昨天，前天2",
            author_id: 1,
            author_nickname: "z臧博浩",
            cover: "http://img3m6.ddimg.cn/46/1/24144166-1_u_30016.jpg",
            content: "今天我很开心，昨天我也很开心，前天我依然很开心，沙雕吗2",
            articleAbstract: "111111111",
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
  width: 1200px;
}
</style>
