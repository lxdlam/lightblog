<template>
  <div id="markdown-editor">
    <textarea id="editor-wrapper" />
  </div>
</template>

<script>
import SimpleMDE from "simplemde";
import instance from "./render";

export default {
  name: "MarkdownEditor",
  props: {
    config: {
      type: Object,
      default: function() {
        return {};
      }
    },
    value: {
      type: String,
      default: ""
    }
  },
  model: {
    prop: "value",
    event: "change"
  },
  methods: {
    initialize() {
      const config = Object.assign(
        {
          element: this.$el.firstElementChild,
          previewRender: md => instance.render(md),
          indentWithTabs: false,
          initialValue: this.value,
          spellChecker: false,
          styleSelectedText: false,
          toolbar: [
            {
              name: "bold",
              action: SimpleMDE.toggleBold,
              className: "fa fa-bold",
              title: "加粗"
            },
            {
              name: "italic",
              action: SimpleMDE.toggleItalic,
              className: "fa fa-italic",
              title: "斜体"
            },
            {
              name: "strikethrough",
              action: SimpleMDE.toggleStrikethrough,
              className: "fa fa-strikethrough",
              title: "删除线"
            },
            "|",
            {
              name: "heading-smaller",
              action: SimpleMDE.toggleHeadingSmaller,
              className: "fa fa-lg fa-header",
              title: "减小标题等级"
            },
            {
              name: "heading-bigger",
              action: SimpleMDE.toggleHeadingBigger,
              className: "fa fa-header",
              title: "增大标题等级"
            },
            "|",
            {
              name: "code",
              action: SimpleMDE.toggleCodeBlock,
              className: "fa fa-code",
              title: "插入代码块"
            },
            {
              name: "quote",
              action: SimpleMDE.toggleBlockquote,
              className: "fa fa-quote-left",
              title: "插入引用"
            },
            "|",
            {
              name: "unordered-list",
              action: SimpleMDE.toggleUnorderedList,
              className: "fa fa-list-ul",
              title: "插入无序列表"
            },
            {
              name: "ordered-list",
              action: SimpleMDE.toggleOrderedList,
              className: "fa fa-list-ol",
              title: "插入有序列表"
            },
            "|",
            {
              name: "link",
              action: SimpleMDE.drawLink,
              className: "fa fa-link",
              title: "插入链接"
            },
            {
              name: "image",
              action: SimpleMDE.drawImage,
              className: "fa fa-picture-o",
              title: "插入图片"
            },
            {
              name: "table",
              action: SimpleMDE.drawTable,
              className: "fa fa-table",
              title: "插入表格"
            },
            {
              name: "horizontal-rule",
              action: SimpleMDE.drawHorizontalRule,
              className: "fa fa-minus",
              title: "插入水平分隔线"
            },
            "|",
            {
              name: "preview",
              action: SimpleMDE.togglePreview,
              className: "fa fa-eye no-disable",
              title: "切换到预览"
            },
            {
              name: "side-by-side",
              action: SimpleMDE.toggleSideBySide,
              className: "fa fa-columns no-disable no-mobile",
              title: "切换到两栏书写模式"
            },
            {
              name: "fullscreen",
              action: SimpleMDE.toggleFullScreen,
              className: "fa fa-arrows-alt no-disable no-mobile",
              title: "切换到全屏书写模式"
            }
          ],
          status: false
        },
        this.config
      );

      this.simplemde = new SimpleMDE(config);

      this.simplemde.codemirror.on("change", () =>
        this.$emit("change", this.simplemde.value())
      );

      const wrapper = this.simplemde.codemirror.getWrapperElement();
      const preview = document.createElement("div");
      wrapper.nextSibling.className += " markdown-body";
      preview.className = "editor-preview markdown-body";
      wrapper.appendChild(preview);
    }
  },
  mounted: function() {
    this.initialize();
  },
  destroyed: function() {
    this.simplemde.toTextArea();
    this.simplemde = null;
  }
};
</script>

<style scoped>
@import "~simplemde/dist/simplemde.min.css";
@import "./style.css";

#markdown-editor {
  text-align: start;
}
</style>
