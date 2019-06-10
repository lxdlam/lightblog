<template>
  <div id="test1-view">
    <InfoArea :author="1" />
  </div>
</template>

<script>
import InfoArea from "@/components/Article/InfoArea";

export default {
  name: "Test1View",
  components: {
    InfoArea
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
