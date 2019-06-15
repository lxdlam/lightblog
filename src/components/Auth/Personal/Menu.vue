<template>
  <div id="menu">
    <div id="container">
      <div id="tabs">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          :style="{ 'align-items': 'justify' }"
        >
          <el-menu-item index="1">个人信息</el-menu-item>
          <el-menu-item index="2">我的关注</el-menu-item>
          <el-menu-item index="3">我的评论</el-menu-item>
          <el-menu-item index="4">我的发布</el-menu-item>
        </el-menu>
      </div>
      <template v-if="infoLoad">
        <PersonalInformation />
      </template>
      <template v-else-if="attentionLoad">
        <PersonalAttention />
      </template>
      <template v-else-if="commentLoad">
        <PersonalComment />
      </template>
      <template v-else-if="articleLoad">
        <ListBySelf />
      </template>
    </div>
  </div>
</template>

<script>
import PersonalInformation from "@/components/Auth/Personal/PersonalInformation";
import PersonalAttention from "@/components/Auth/Personal/PersonalAttention";
import PersonalComment from "@/components/Auth/Personal/PersonalComment";
// import PersonalArticle from "@/components/Auth/Personal/PersonalArticle";
import ListBySelf from "@/views/Article/ArticleList/ListBySelf";
export default {
  name: "Menu",
  props: {},
  data() {
    return {
      infoLoad: true,
      attentionLoad: false,
      commentLoad: false,
      articleLoad: false,
      activeIndex: "1"
    };
  },
  components: {
    // 在这里加载你的组件
    PersonalInformation,
    PersonalAttention,
    PersonalComment,
    ListBySelf
  },
  methods: {
    handleSelect(key) {
      if (key == 1) {
        this.infoLoad = true;
        this.attentionLoad = false;
        this.commentLoad = false;
        this.articleLoad = false;
      } else if (key == 2) {
        this.infoLoad = false;
        this.attentionLoad = true;
        this.commentLoad = false;
        this.articleLoad = false;
      } else if (key == 3) {
        this.infoLoad = false;
        this.attentionLoad = false;
        this.commentLoad = true;
        this.articleLoad = false;
      } else if (key == 4) {
        this.infoLoad = false;
        this.attentionLoad = false;
        this.commentLoad = false;
        this.articleLoad = true;
      }
    }
  },
  mounted: function() {}
};
</script>

}

<style scoped>
#menu {
  width: 960px;
  height: 700px;
  max-width: 1280px;
  display: table;
  margin: 0 auto;
}
#tabs {
  width: 100%;
  display: flex;
  justify-content: center;
  /* background-color: aqua; */
  color: Transparent;
}
#tabs h3 {
  color: #303133;
}
#container {
  width: 100%;
  min-height: 680px;
  border-radius: 5px;
  padding-left: -20px;
  /* background-color: #eef3fb; */
  background-color: #ffffff;
  box-shadow: 2px 2px 3px 0px #e0e4e6;
}
</style>
