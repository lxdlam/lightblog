<template>
  <div id="comment-manage">
    <el-table :data="tableData" stripe height="900">
      <el-table-column
        prop="articleID"
        label="文章ID"
        width="150"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="account"
        label="评论账号"
        width="150"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="content"
        label="评论内容"
        width="350"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" align="center">
        <el-button type="warning" plain>删除评论</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "CommentManage",
  components: {},
  data() {
    const item = {
      articleID: "ac59f05f2d111eca6fc6685333b43998",
      account: 123456789,
      content: "蔡徐坤牛逼！"
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
}
</style>
