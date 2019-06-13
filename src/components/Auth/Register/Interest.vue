<template>
  <div id="register-interest">
    <h1>关注几个兴趣吧～</h1>
    <div class="interest-table">
      <el-table
        ref="table"
        :data="table_data"
        max-height="600"
        @selection-change="handleChange"
        v-loading="loading"
        stripe
      >
        <el-table-column type="selection" width="60" fixed />
        <el-table-column prop="name" label="标签" width="180" fixed />
        <el-table-column prop="desc" label="描述" width="540" />
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegisterInterest",
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data: function() {
    return {
      table_data: [],
      loading: false
    };
  },
  methods: {
    handleChange(val) {
      const vm = this;

      vm.user.interest = [];
      val.forEach(row => vm.user.interest.push(row.id));

      vm.$emit("selected");
    },
    loadTags() {
      const vm = this;
      this.loading = true;

      this.$api.tag
        .list(0, 1000)
        .then(data => {
          data.data.arr.forEach(row => {
            vm.table_data.push({
              id: row.labelId,
              name: row.labelName,
              desc: row.description
            });
          });
          vm.loading = false;
        })
        .catch(err => {
          vm.$message.error("出现错误！请联系管理员！");
          console.log(err);
        });
    }
  },
  mounted() {
    this.loadTags();
  }
};
</script>

<style scoped>
#register-interest {
  display: table;
  margin: 0 auto;
}

.interest-table {
  max-width: 920px;
  text-align: center;
}
</style>
