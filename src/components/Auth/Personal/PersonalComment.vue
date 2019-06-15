<template>
  <div id="personal-comment">
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
          <span slot="title"><strong>我发送的评论</strong></span>
        </template>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title"><strong>我收到的评论</strong></span>
      </el-menu-item>
    </el-menu>
    <div id="right">
      <div id="receive" v-if="receiveLoad">
        <p id="title-bar">我收到的评论</p>
        <ul
          class="article-line"
          v-infinite-scroll="load"
          infinite-scroll-disabled="disabled"
          infinite-scroll-distance="30px"
        >
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
        <ul
          class="article-line"
          v-infinite-scroll="load"
          infinite-scroll-disabled="disabled"
          infinite-scroll-distance="30px"
        >
          <PersonalCommentItem
            v-for="(item, index) in this.sendArr"
            :key="index"
            :avatar_sm="item.avatar_sm"
            :user_nickname="item.user_nickname"
            :comment="item.comment"
            :comment_time="item.comment_time"
            :article_title="item.title"
            :article_id="item.article_id"
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
export default {
  name: "PersonalComment",
  props: {},
  data() {
    return {
      receiveLoad: true,
      sendLoad: false,
      isCollapse: false,
      loading: false,

      sendSum: 0,
      receiveSum: 0,
      endNum1: 10,
      endNum2: 10,
      sendArr: [],
      receiveArr: {}
      //status: 0
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
      if (key == 2) {
        this.receiveLoad = true;
        this.sendLoad = false;
        this.loadCommentReceive(
          this.$store.state.user.uid,
          this.$store.state.user.token
        );
      } else if (key == 1) {
        this.receiveLoad = false;
        this.sendLoad = true;
        this.loadCommentSend(this.$store.state.user.uid, 0, this.endNum1);
      }
    },
    loadCommentSend(uid, start, end) {
      const vm = this; // 如果你需要在回调函数内调用 this，请做此绑定并在回调函数内部使用 vm
      this.$api.comment
        .fetchCommentByUser(uid, start, end)
        .then(res => {
          vm.sendArr = res.data.arr;
          console.log(vm.sendArr);
        })
        .catch(err => {
          console.log(err.code);
          console.log(err.msg);
        });
    },
    loadCommentReceive(uid, token) {
      const vm = this; // 如果你需要在回调函数内调用 this，请做此绑定并在回调函数内部使用 vm
      this.$api.comment
        .fetchCommentToUser(uid, token)
        .then(res => {
          vm.receiveArr = res.data.arr;
          console.log(vm.receiveArr);
        })
        .catch(err => {
          console.log(err.code);
          console.log(err.msg);
        });
    },
    load() {
      this.loading = true;

      this.count += 10;
      this.loading = false;
    }
  },
  computed: {
    noMore() {
      if (this.key === 1) {
        return this.count >= this.sendSum;
      } else if (this.key === 2) {
        return this.count >= this.receiveSum;
      } else {
        return true;
      }
    },
    disabled() {
      return this.loading || this.noMore;
    }
  },
  mounted: function() {
    if (this.key === 1) {
      this.loadCommentSend(this.$store.state.user.uid, 0, this.endNum1);
    } else if (this.key === 2) {
      this.loadCommentReceive(
        this.$store.state.user.uid,
        this.$store.state.user.token
      );
    }

    /* this.sendArr = sendList.data.arr;
    this.receiveArr = receiveList.data; */
  },
  beforeRouteUpdate(to, from, next) {
    if (this.key === 1) {
      this.loadCommentSend(this.$store.state.user.uid, 0, this.endNum1);
    } else if (this.key === 2) {
      this.loadCommentReceive(
        this.$store.state.user.uid,
        this.$store.state.user.token
      );
    }

    next();
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
  width: 95%;
  /* max-height: 960px; */
  /* background-color: bisque; */
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
}
#left {
  width: 200px;
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
