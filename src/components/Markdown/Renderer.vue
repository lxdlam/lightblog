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
  computed: {
    compiled_html: function() {
      return instance.render(this.content);
    }
  }
};
</script>

<style scoped>
@import "./style.css";

.markdown-body {
  text-align: start;
}
</style>
