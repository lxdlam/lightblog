<template>
  <div id="report-manage">
    <el-table :data="tableData" stripe height="900">
      <el-table-column
        prop="articleID"
        label="文章ID"
        width="150"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="title" label="文章标题" width="150" align="center">
      </el-table-column>
      <el-table-column
        prop="account"
        label="作者账号"
        width="150"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="reason"
        label="举报原因"
        width="150"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" align="center">
        <el-button type="warning" plain>删除文章</el-button>
        <el-button type="primary" plain>忽略举报</el-button></el-table-column
      >
    </el-table>
  </div>
</template>

<script>
export default {
  name: "ReportManage",
  components: {},
  data() {
    const item = {
      articleID: "ac59f05f2d111eca6fc6685333b43998",
      title: "唱跳rap篮球",
      account: 123456789,
      reason: "涉黄"
    };
    return {
      tableData: Array(15).fill(item)
    };
  },
  methods: {
    fetchList() {
      const vm = this;

      this.$api.admin
        .fetchReportList(
          this.$store.state.user.uid,
          this.$store.state.user.token,
          0,
          1000
        )
        .then(data => {
          console.log(data);
        })
        .catch(err => {
          vm.$message.error("Error occured. Check console for more details.");
          console.log(err);
        });
    }
  },
  mounted() {
    this.fetchList();
  }
};
</script>

<style scoped>
.manage-img {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 12px;
}
</style>
