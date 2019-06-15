<template>
  <div id="users-manage">
    <el-button
      @click="addFormVisible = true"
      type="primary"
      plain
      class="addButton"
      >添加标签</el-button
    >

    <el-table :data="tableData" stripe height="900">
      <el-table-column prop="name" label="标签名" width="120" align="center">
      </el-table-column>
      <el-table-column
        prop="description"
        label="标签描述"
        width="700"
        align="center"
      >
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="small"
            @click="handleEdit(scope.$index, scope.row)"
            type="primary"
            plain
            >编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑dialog -->
    <el-dialog title="编辑标签" :visible.sync="editFormVisible">
      <el-form :model="editForm">
        <el-form-item label="标签名称" label-width="80px">
          <el-input v-model="editForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="标签描述" label-width="80px">
          <el-input
            v-model="editForm.description"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeEditDialog">取消</el-button>
        <el-button type="primary" @click="updateTag" :loading="editLoading"
          >确定</el-button
        >
      </div>
    </el-dialog>

    <!-- 添加dialog -->
    <el-dialog title="添加标签" :visible.sync="addFormVisible">
      <el-form :model="addForm">
        <el-form-item label="标签名称" label-width="80px">
          <el-input
            v-model="addForm.name"
            placeholder="请输入标签名称"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="标签描述" label-width="80px">
          <el-input
            v-model="addForm.description"
            placeholder="请输入标签描述"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeAddDialog">取消</el-button>
        <el-button type="primary" @click="addTag" :loding="addLoading"
          >确定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "UsersManage",
  components: {},
  data() {
    return {
      tableData: [],
      editFormVisible: false,
      addFormVisible: false,
      addForm: {
        name: "",
        description: ""
      },
      editForm: {
        name: "",
        description: ""
      },
      addLoading: false,
      editLoading: false,
      visIndex: -1
    };
  },
  methods: {
    handleEdit(index) {
      this.editForm = Object.assign({}, this.tableData[index]);
      this.editFormVisible = true;
      this.visIndex = index;
    },
    addTag() {
      const vm = this;
      this.addLoading = true;

      this.$api.admin
        .addTag(
          this.$store.state.user.uid,
          this.$store.state.user.token,
          this.addForm.name,
          this.addForm.description
        )
        .then(() => {
          vm.tableData.push(Object.assign({}, vm.addForm));

          vm.closeAddDialog();

          vm.$message.success("添加成功！");
        })
        .catch(err => {
          console.log("Error occured. Check console for more details.");
          console.log(err);
        });
    },
    updateTag() {
      const vm = this;
      this.editLoading = true;

      console.log(this.tableData);

      this.$api.admin
        .updateTag(
          this.$store.state.user.uid,
          this.$store.state.user.token,
          this.editForm.id,
          this.editForm.name,
          this.editForm.description
        )
        .then(() => {
          vm.$set(vm.tableData, vm.visIndex, Object.assign({}, vm.editForm));

          vm.closeEditDialog();

          vm.$message.success("更新成功！");
        })
        .catch(err => {
          console.log("Error occured. Check console for more details.");
          console.log(err);
        });
    },
    closeAddDialog() {
      this.addForm.name = this.addForm.description = "";
      this.addFormVisible = this.addLoading = false;
    },
    closeEditDialog() {
      this.editForm.name = this.editForm.description = "";
      this.editFormVisible = this.editLoading = false;
    },
    loadAllTags() {
      const vm = this;
      this.$api.tag
        .list(0, 1000)
        .then(data => {
          data.data.arr.forEach(row => {
            vm.tableData.push({
              id: row.labelId,
              name: row.labelName,
              description: row.description
            });
          });
        })
        .catch(err => {
          vm.$message.error("标签获取错误！请联系管理员！");
          console.log(err);
        });
    }
  },
  mounted() {
    this.loadAllTags();
  }
};
</script>

<style scoped>
.addButton {
  float: left;
  margin: 20px auto 10px 10px;
}
</style>
