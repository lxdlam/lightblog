<template>
  <div id="infoArea">
    <template v-if="randomLoad">
      <RandomInformation />
    </template>
    <template v-else-if="authorLoad">
      <AuthorInformation :account="account" />
    </template>
    <template v-else-if="labelLoad">
      <LabelInformation :label="label.id" />
    </template>
    <template v-else-if="searchLoad">
      <SearchInformation />
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
    }
  },
  data() {
    return {
      randomLoad: false,
      authorLoad: false,
      labelLoad: false,
      searchLoad: false,
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
