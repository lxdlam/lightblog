<template>
  <div id="random-information">
    <div id="title">
      <h1>一起看看今天有什么新推荐</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "RandomInformation",
  props: {},
  data() {
    return {};
  },
  components: {
    // 在这里加载你的组件
  },
  methods: {},
  mounted: function() {}
};
</script>

}

<style scoped>
#random-information {
  text-align: start;
  font-size: 20px;

  border-radius: 10px;
  background-repeat: no-repeat;
  background-image: url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1560156534576&di=1e660a8f9c608407dd3a20b90c1ac993&imgtype=0&src=http%3A%2F%2Fimglf0.ph.126.net%2F2OxjSW7ICrsfk4K99Cj33w%3D%3D%2F6608488194911282475.jpg);
  /* background-attachment: fixed; */
  box-shadow: 6px 6px 4px #909399;
  overflow: hidden;
}
#random-information h1 {
  font-size: 30px;
  color: #e9edf5;
  text-shadow: 5px 5px 8px #303133;
}
#title {
  display: flex;
  align-items: center;
  width: 1200px;
  height: 140px;
  margin-left: 20px;
}
</style>
