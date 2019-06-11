<template>
  <div id="users-manage">
    <el-table :data="tableData" stripe height="578">
      <el-table-column prop="img" label="头像" width="80" align="center">
        <el-image
          class="manage-img"
          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
        ></el-image>
      </el-table-column>
      <el-table-column prop="account" label="账号" width="150" align="center">
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="昵称"
        width="150"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" align="center">
        <el-button type="warning" plain>删除</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "UsersManage",
  components: {},
  data() {
    const item = {
      img: "",
      account: 123456789,
      nickname: "无影の繁华"
    };
    return {
      tableData: Array(15).fill(item)
    };
  },
  methods: {}
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
