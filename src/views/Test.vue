<template>
  <div id="test-view">
    <!-- 把你的组件放在这来测试！ -->
    <!-- 下面的按钮都是可以删除的，只是占位使用 -->
    <el-button @click="boo" type="primary">Another random button ;)</el-button>
    <el-button @click="query" type="success">Do a http query</el-button>
  </div>
</template>

<script>
export default {
  name: "TestView",
  components: {
    // 在这里加载你的组件
  },
  methods: {
    // 这个方法也是可以删除的
    boo: function() {
      this.$message({
        message: "吓你一跳",
        type: "warning"
      });
    },
    // 一个使用 axios 进行 http 查询的例子
    query: function() {
      this.axios
        .get("http://example.org/")
        .then(resp => {
          console.log(resp);
        })
        .catch(e => {
          console.log("Query failed. You may encounter a network broken.");
          console.log(e);
        });
    }
  }
};
</script>

<style scoped></style>
