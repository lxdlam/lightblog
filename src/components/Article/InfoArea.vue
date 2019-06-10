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
  </div>
</template>

<script>
import RandomInformation from "@/components/Article/RandomInformation";
import AuthorInformation from "@/components/Article/AuthorInformation";
import LabelInformation from "@/components/Article/LabelInformation";

export default {
  name: "InfoArea",
  props: {
    random: {
      type: String
    },
    author: {
      type: String
    },
    label: {
      type: String
    }
  },
  data() {
    return {
      randomLoad: false,
      authorLoad: false,
      labelLoad: false,
      account: "123"
      // random: this.$router.params['random'] !== undefined && this.$router.params['random'] !== null;
    };
  },
  components: {
    // 在这里加载你的组件
    RandomInformation,
    AuthorInformation,
    LabelInformation
  },
  methods: {
    fetchInfo() {
      // this.axios.get("").then(response => {
      //   // 信息显示到页面上
      // });
    }
  },
  mounted: function() {
    // console.log(this.random);
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
    // this.fetchInfo();
  }
};
</script>
<style scoped>
#infoArea {
  width: 1200px;
  height: 140px;
  margin: 0 auto;
  /* border-radius: 50%; */
  background-color: #f2f6fc;
}
</style>
