<template>
  <!-- A pure component what means the markdown will be only rendered once. -->
  <!-- To change the render result, using a new instance with new markdown value. -->
  <div id="markdown-renderer">
    <div id="markdown-container" class="markdown-body" v-html="compiled_html" />
  </div>
</template>

<script>
import instance from "./render";

export default {
  name: "MarkdownRenderer",
  props: {
    content: String
  },
  data() {
    return {
      compiled_html: ""
    };
  },
  mounted: function() {
    this.compiled_html = instance.render(this.content);
  }
};
</script>

<style scoped>
@import "./style.css";
</style>
