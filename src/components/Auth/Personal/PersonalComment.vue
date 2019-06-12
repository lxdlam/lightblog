<template>
  <div id="personal-comment">
    <!-- <div id="left"> -->
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      @select="handleSelect"
      :collapse="isCollapse"
    >
      <el-menu-item index="1">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title"><strong>我收到的评论</strong></span>
        </template>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title"><strong>我发送的评论</strong></span>
      </el-menu-item>
    </el-menu>
    <!-- </div> -->
    <div id="right">
      <div id="receive" v-if="receiveLoad">
        <p id="title-bar">我收到的评论</p>
        <ul
          class="article-line"
          v-infinite-scroll="load"
          infinite-scroll-disabled="disabled"
          infinite-scroll-distance="30px"
        >
          <!-- <li v-for="i in count" class="list-item">{{ i }}</li> -->
          <PersonalCommentItem
            v-for="(item, index) in this.receiveArr"
            :key="index"
            :avatar_sm="item.avatar_sm"
            :user_nickname="item.user_nickname"
            :comment="item.comment"
            :comment_time="item.comment_time"
            :article_title="item.title"
          ></PersonalCommentItem>
        </ul>
        <p v-if="loading">加载中...</p>
        <p v-if="noMore">没有更多了</p>
      </div>
      <div id="send" v-else-if="sendLoad">
        <p id="title-bar">我发送的评论</p>
        <!-- <CommentList></CommentList> -->
        <ul
          class="article-line"
          v-infinite-scroll="load"
          infinite-scroll-disabled="disabled"
          infinite-scroll-distance="30px"
        >
          <!-- <li v-for="i in count" class="list-item">{{ i }}</li> -->
          <PersonalCommentItem
            v-for="(item, index) in this.sendArr"
            :key="index"
            :avatar_sm="item.avatar_sm"
            :user_nickname="item.user_nickname"
            :comment="item.comment"
            :comment_time="item.comment_time"
            :article_title="item.title"
          ></PersonalCommentItem>
        </ul>
        <p v-if="loading">加载中...</p>
        <p v-if="noMore">没有更多了</p>
      </div>
    </div>
  </div>
</template>

<script>
import PersonalCommentItem from "@/components/Auth/Personal/PersonalCommentItem";
// import CommentList from "@/components/Comment/CommentList";
export default {
  name: "PersonalComment",
  props: {},
  data() {
    return {
      receiveLoad: true,
      sendLoad: false,
      sendArr: {},
      receiveArr: {}
    };
  },
  components: {
    // 在这里加载你的组件
    PersonalCommentItem
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key) {
      console.log(key);
      if (key == 1) {
        this.receiveLoad = true;
        this.sendLoad = false;
      } else if (key == 2) {
        this.receiveLoad = false;
        this.sendLoad = true;
      }
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
      return this.count >= 3;
    },
    disabled() {
      return this.loading || this.noMore;
    }
  },
  mounted: function() {
    let receiveList = {
      response_time: 1560322641434,
      code: 0,
      msg: "success",
      data: [
        {
          article_id: 1,
          comment: "dddddddddddd",
          user_id: 1,
          user_nickname: "yuasdyuas",
          parent_comment_id: 15,
          comment_time: 1560321595000,
          avatar_sm:
            "https://vblogstore-1257377207.cos.ap-chengdu.myqcloud.com/image/d5f3357ae0ef7d8fc5787cb3c45dcbe8.png",
          title: "面向对象"
        },
        {
          article_id: 1,
          comment: "dddddddddddd",
          user_id: 1,
          user_nickname: "yuasdyuas",
          parent_comment_id: 14,
          comment_time: 1560321496000,
          avatar_sm:
            "https://vblogstore-1257377207.cos.ap-chengdu.myqcloud.com/image/d5f3357ae0ef7d8fc5787cb3c45dcbe8.png",
          title: "面向对象"
        },
        {
          article_id: 1,
          comment: "dddddddddddd",
          user_id: 1,
          user_nickname: "yuasdyuas",
          parent_comment_id: 13,
          comment_time: 1560321355000,
          avatar_sm:
            "https://vblogstore-1257377207.cos.ap-chengdu.myqcloud.com/image/d5f3357ae0ef7d8fc5787cb3c45dcbe8.png",
          title: "面向对象"
        },
        {
          article_id: 1,
          comment: "阴阳师",
          user_id: 1,
          user_nickname: "yuasdyuas",
          parent_comment_id: 10,
          comment_time: 1560307527000,
          avatar_sm:
            "https://vblogstore-1257377207.cos.ap-chengdu.myqcloud.com/image/d5f3357ae0ef7d8fc5787cb3c45dcbe8.png",
          title: "面向对象"
        },
        {
          article_id: 1,
          comment: "真的很不错",
          user_id: 1,
          user_nickname: "yuasdyuas",
          parent_comment_id: 9,
          comment_time: 1560307525000,
          avatar_sm:
            "https://vblogstore-1257377207.cos.ap-chengdu.myqcloud.com/image/d5f3357ae0ef7d8fc5787cb3c45dcbe8.png",
          title: "面向对象"
        },
        {
          article_id: 1,
          comment: "不错",
          user_id: 1,
          user_nickname: "yuasdyuas",
          parent_comment_id: 8,
          comment_time: 1560307522000,
          avatar_sm:
            "https://vblogstore-1257377207.cos.ap-chengdu.myqcloud.com/image/d5f3357ae0ef7d8fc5787cb3c45dcbe8.png",
          title: "面向对象"
        },
        {
          article_id: 1,
          comment: "comment",
          user_id: 1,
          user_nickname: "yuasdyuas",
          parent_comment_id: 7,
          comment_time: 1560268385000,
          avatar_sm:
            "https://vblogstore-1257377207.cos.ap-chengdu.myqcloud.com/image/d5f3357ae0ef7d8fc5787cb3c45dcbe8.png",
          title: "面向对象"
        },

        {
          article_id: 5,
          comment: "comment",
          user_id: 1,
          user_nickname: "yuasdyuas",
          parent_comment_id: 6,
          comment_time: 1560268322000,
          avatar_sm:
            "https://vblogstore-1257377207.cos.ap-chengdu.myqcloud.com/image/d5f3357ae0ef7d8fc5787cb3c45dcbe8.png",
          title: "test"
        },
        {
          article_id: 5,
          comment: "政治不正确",
          user_id: 4,
          user_nickname: "admin",
          parent_comment_id: 5,
          comment_time: 1560168804000,
          avatar_sm: null,
          title: "test"
        },
        {
          article_id: 5,
          comment: "无意义的评论",
          user_id: 4,
          user_nickname: "admin",
          parent_comment_id: 4,
          comment_time: 1560168781000,
          avatar_sm: null,
          title: "test"
        },
        {
          article_id: 5,
          comment: "third",
          user_id: 4,
          user_nickname: "admin",
          parent_comment_id: 3,
          comment_time: 1560168769000,
          avatar_sm: null,
          title: "test"
        },
        {
          article_id: 5,
          comment: "第二条评论",
          user_id: 4,
          user_nickname: "admin",
          parent_comment_id: 2,
          comment_time: 1560168754000,
          avatar_sm: null,
          title: "test"
        },
        {
          article_id: 5,
          comment: "wryyyyyy",
          user_id: 4,
          user_nickname: "admin",
          parent_comment_id: 1,
          comment_time: 1560168711000,
          avatar_sm: null,
          title: "test"
        }
      ]
    };
    let sendList = {
      response_time: 1560315665828,
      code: 0,
      msg: "success",
      data: {
        start: 0,
        end: 4,
        sum: 5,
        arr: [
          {
            article_id: 5,

            title: "面向对象",

            comment: "comment",
            user_id: 1,
            user_nickname: "yuasdyuas",
            parent_comment_id: 6,
            comment_time: 1560268322,
            avatar_sm:
              "https://vblogstore-1257377207.cos.ap-chengdu.myqcloud.com/image/d5f3357ae0ef7d8fc5787cb3c45dcbe8.png"
          },
          {
            article_id: 1,
            title: "面向对象",
            comment: "comment",
            user_id: 1,
            user_nickname: "yuasdyuas",
            parent_comment_id: 7,
            comment_time: 1560268385,
            avatar_sm:
              "https://vblogstore-1257377207.cos.ap-chengdu.myqcloud.com/image/d5f3357ae0ef7d8fc5787cb3c45dcbe8.png"
          },
          {
            article_id: 1,
            title: "面向对象",
            comment: "不错",
            user_id: 1,
            user_nickname: "yuasdyuas",
            parent_comment_id: 8,
            comment_time: 1560307522,
            avatar_sm:
              "https://vblogstore-1257377207.cos.ap-chengdu.myqcloud.com/image/d5f3357ae0ef7d8fc5787cb3c45dcbe8.png"
          },
          {
            article_id: 1,
            title: "面向对象",
            comment: "真的很不错",
            user_id: 1,
            user_nickname: "yuasdyuas",
            parent_comment_id: 9,
            comment_time: 1560307525,
            avatar_sm:
              "https://vblogstore-1257377207.cos.ap-chengdu.myqcloud.com/image/d5f3357ae0ef7d8fc5787cb3c45dcbe8.png"
          },
          {
            article_id: 1,
            title: "面向对象",
            comment: "阴阳师",
            user_id: 1,
            user_nickname: "yuasdyuas",
            parent_comment_id: 10,
            comment_time: 1560307527,
            avatar_sm:
              "https://vblogstore-1257377207.cos.ap-chengdu.myqcloud.com/image/d5f3357ae0ef7d8fc5787cb3c45dcbe8.png"
          },
          {
            article_id: 1,
            title: "面向对象",
            comment: "阴阳师",
            user_id: 1,
            user_nickname: "yuasdyuas",
            parent_comment_id: 10,
            comment_time: 1560307527,
            avatar_sm:
              "https://vblogstore-1257377207.cos.ap-chengdu.myqcloud.com/image/d5f3357ae0ef7d8fc5787cb3c45dcbe8.png"
          },
          {
            article_id: 1,
            title: "面向对象",
            comment: "阴阳师",
            user_id: 1,
            user_nickname: "yuasdyuas",
            parent_comment_id: 10,
            comment_time: 1560307527,
            avatar_sm:
              "https://vblogstore-1257377207.cos.ap-chengdu.myqcloud.com/image/d5f3357ae0ef7d8fc5787cb3c45dcbe8.png"
          },
          {
            article_id: 1,
            title: "面向对象",
            comment: "阴阳师",
            user_id: 1,
            user_nickname: "yuasdyuas",
            parent_comment_id: 10,
            comment_time: 1560307527,
            avatar_sm:
              "https://vblogstore-1257377207.cos.ap-chengdu.myqcloud.com/image/d5f3357ae0ef7d8fc5787cb3c45dcbe8.png"
          }
        ]
      }
    };
    this.sendArr = sendList.data.arr;
    this.receiveArr = receiveList.data;
  }
};
</script>

}

<style scoped>
/* .el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
} */
#title-bar {
  color: #606266;
  font-size: 15px;
  width: 100%;
  /* background-color: blue; */
  margin-bottom: -10px;
  margin-top: 10px;
}
#personal-comment {
  width: 100%;
  min-height: 600px;
  /* background-color: bisque; */
  display: flex;
  justify-content: space-around;
  padding-top: 10px;
  padding-bottom: 10px;
}
#left {
  width: 200px;
  /* height: 100%; */
  /* background-color: coral; */
}
#right {
  width: 800px;
  min-height: 620px;
  /* background-color: darkseagreen; */
}
#send {
  width: 100%;
  min-height: 600px;
  /* background-color: blueviolet; */
}
</style>
