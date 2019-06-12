<template>
  <div id="test-view">
    <!-- <Manager></Manager> -->
    <Menu></Menu>
  </div>
</template>

<script>
/* eslint-disable */
import Manager from "./Manager/Manager";
//import ReadArticle from "@/views/Article/ReadArticle";
import Menu from "@/components/Auth/Personal/Menu";

export default {
  name: "TestView",
  components: { Manager, Menu },
  data: function() {
    return {};
  },
  methods: {}
};
</script>

<style scoped></style>
