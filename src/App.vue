<template>
  <div id="app">
    <el-container>
      <template v-if="!/^\/admin(\/?)/.test($route.fullPath)">
        <el-header>
          <Heading />
        </el-header>
      </template>
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
  },
  mounted() {
    console.log(this.$route);
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
  background-color: rgb(236, 240, 246);
  min-height: 900px;
}

.el-header {
  position: relative;
  height: 80px;
  padding-top: 10px;
  max-width: 1280px;
  z-index: 2000;
}

.el-main {
  position: relative;
  margin: 0 auto;
  width: 100%;
  /* min-width: 960px; */
  max-width: 1280px;
  padding-top: 100px;
  text-align: center;
  /* background-color: white; */
}
</style>
