<template>
  <div id="heading">
    <template v-if="$store.state.user.logged"
      ><p>OK, Logged</p>
    </template>
    <template v-else
      ><p>Oops, not logged</p>
    </template>
  </div>
</template>

<script>
export default {
  name: "Heading",
  mounted() {
    console.log(this.$store.state.user);
  }
};
</script>

<style scoped></style>
