<template>
  <div id="info">
    <img src="@/assets/404.svg" height="200" width="200" />
    <h1>404 Not Found</h1>
    <p>
      Oops, you have entered a blackhole~
      <br />你要的资源我们没找到，不如去看一篇<router-link to="#"
        >随机文章</router-link
      >吧！
    </p>
  </div>
</template>

<script>
export default {
  name: "NotFoundView"
};
</script>

<style scoped>
#info {
  text-align: center;
}

#info > h1 {
  font-size: 40px;
}

#info > p {
  font-size: 18px;
}
</style>
