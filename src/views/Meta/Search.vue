<template>
  <div id="search_container">
    <p>{{ keyword }}</p>
  </div>
</template>

<script>
export default {
  name: "SearchView",
  data: function() {
    return {
      keyword: null
    };
  },
  beforeRouteUpdate(to, from, next) {
    this.keyword = to.params["keyword"];
    next();
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.keyword = to.params["keyword"];
    });
  }
};
</script>

<style scoped></style>
