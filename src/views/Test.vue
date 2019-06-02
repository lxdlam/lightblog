<template>
  <div id="test-view">
    <MarkdownEditor v-model="content" />
    <p>{{ content }}</p>
  </div>
</template>

<script>
import MarkdownEditor from "../components/Markdown/Editor";

export default {
  name: "TestView",
  components: {
    MarkdownEditor
  },
  data: function() {
    return {
      content:
        "# Style test\n\n*abc*\n\n$$\na=b+c\n$$\n\n```python\nimport datetime\n```\n"
    };
  }
};
</script>

<style scoped></style>
