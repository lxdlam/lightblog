<template>
  <div id="infoArea">
    <template v-if="random">
      <RandomInformation />
    </template>
    <template v-else-if="author">
      <AuthorInformation :author_id="this.author_id" />
    </template>
    <template v-else-if="label">
      <LabelInformation :keyword="keyword" />
    </template>
    <template v-else-if="search">
      <SearchInformation :keyword="keyword" />
    </template>
  </div>
</template>

<script>
import RandomInformation from "@/components/Article/RandomInformation";
import AuthorInformation from "@/components/Article/AuthorInformation";
import LabelInformation from "@/components/Article/LabelInformation";
import SearchInformation from "@/components/Article/SearchInfomation";

export default {
  name: "InfoArea",
  props: {
    random: {
      type: Boolean
    },
    author: {
      type: Boolean
    },
    label: {
      type: Boolean
    },
    search: {
      type: Boolean
    },
    keyword: {
      type: String,
      default: ""
    },
    author_id: {
      type: Number
    }
  },
  data() {
    return {
      account: "123"
    };
  },
  components: {
    RandomInformation,
    AuthorInformation,
    LabelInformation,
    SearchInformation
  },
  methods: {
    fetchInfo() {}
  },
  mounted: function() {
    console.log("step2---" + this.author_id);
    this.author_id = this.$route.query.author_id;
    if (this.random != undefined) {
      this.randomLoad = true;
    } else {
      this.randomLoad = false;
    }
    if (this.author != undefined) {
      this.authorLoad = true;
    } else {
      this.authorLoad = false;
    }
    if (this.label != undefined) {
      this.labelLoad = true;
    } else {
      this.labelLoad = false;
    }
    if (this.search != undefined) {
      this.searchLoad = true;
    } else {
      this.searchLoad = false;
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.author_id = this.$route.query.author_id;
    console.log("step2-------" + this.author_id);
    // console.log("userid" + this.author_id);
    this.loadArticleList(this.author_id);
    next();
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.author_id = this.$route.query.author_id;
      vm.loadArticleList(vm.author_id);
    });
  }
};
</script>
<style scoped>
#infoArea {
  max-width: 1280px;
  width: 960px;
  height: 140px;
  margin: 0 auto;
  margin-bottom: 20px;
  /* background-color: #f2f6fc; */
}
</style>
