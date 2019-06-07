<template>
  <div id="app">
    <el-container>
      <el-header height="80px">
        <Heading />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Heading from "@/components/Meta/Heading";

export default {
  name: "App",
  components: {
    Heading
  }
};
</script>

<style>
#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.el-header {
  /* position: fixed; */
  z-index: 200; /* ensure always at the top of the page */
}

.el-main {
  padding-top: 20px;
  text-align: center;
}
</style>
