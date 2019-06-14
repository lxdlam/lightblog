<template>
  <div id="test-view">
    <!-- <Manager></Manager> -->
    <Menu></Menu>
    <Personal></Personal>
  </div>
</template>

<script>
/* eslint-disable */
// import Manager from "./Manager/Manager";
//import ReadArticle from "@/views/Article/ReadArticle";
import Menu from "@/components/Auth/Personal/Menu";
import Personal from "@/views/Auth/Personal";

export default {
  name: "TestView",
  components: { Manager, Menu ,Personal},
  data: function() {
    return {};
  },
  methods: {}
};
</script>

<style scoped></style>
