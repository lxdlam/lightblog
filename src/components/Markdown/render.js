import renderer from "markdown-it";
import katex from "@iktakahiro/markdown-it-katex";
import hljs from "highlight.js";

const instance = renderer({
  html: true,
  highlight: function(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code>${
          hljs.highlight(lang, str, true).value
        }</code></pre>`;
      } catch (__) {
        return `<pre class="hljs"><code>${instance.utils.escapeHtml(
          str
        )}</code></pre>`;
      }
    }

    return `<pre class="hljs"><code>${instance.utils.escapeHtml(
      str
    )}</code></pre>`;
  }
});
instance.use(katex);

export default instance;
