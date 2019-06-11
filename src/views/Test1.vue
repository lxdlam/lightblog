<template>
  <div id="test1-view">
    <InfoArea :random="1" />
    <ArticleList :authorid="1" :start="0" :end="2"></ArticleList>
  </div>
</template>

<script>
import InfoArea from "@/components/Article/InfoArea";
import ArticleList from "@/components/Article/ArticleList";
export default {
  name: "Test1View",
  components: {
    InfoArea,
    ArticleList
  },
  data: function() {
    return {
      step: 1,
      user: {
        account: "",
        username: "",
        password: "",
        email: "",
        phone: "",
        interest: [],
        img_url: "",
        available: false
      },
      loading: false
    };
  },
  methods: {
    forward() {
      this.step++;
    },
    backward() {
      this.step--;
    },
    do_register() {}
  }
};
</script>

<style scoped>
#inner-container {
  padding-top: 40px;
  text-align: center;
}

#button-container {
  padding-top: 20px;
  text-align: center;
}
</style>
