<template>
  <div id="index">
    <p>
      <el-button @click="test" type="success">
        {{ message }}
      </el-button>
    </p>
  </div>
</template>

<script>
export default {
  name: "IndexView",
  data: function() {
    return {
      message: "Before"
    };
  },
  methods: {
    test() {
      this.$api.proxy
        .query("/error_code", {})
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }
  }
};
</script>

<style scoped></style>
