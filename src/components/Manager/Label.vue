<template>
  <div id="users-manage">
    <el-button
      @click="addFormVisible = true"
      type="primary"
      plain
      class="addButton"
      >添加标签</el-button
    >

    <el-table :data="tableData" stripe height="500">
      <el-table-column prop="name" label="标签名" width="120" align="center">
      </el-table-column>
      <el-table-column
        prop="description"
        label="标签描述"
        width="500"
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
      <el-form :model="form">
        <el-form-item label="标签名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="标签描述" :label-width="formLabelWidth">
          <el-input v-model="form.description" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editFinish">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 添加dialog -->
    <el-dialog title="添加标签" :visible.sync="addFormVisible">
      <el-form :model="form">
        <el-form-item label="标签名称" :label-width="formLabelWidth">
          <el-input placeholder="请输入标签名称" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="标签描述" :label-width="formLabelWidth">
          <el-input placeholder="请输入标签描述" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addFinish">确 定</el-button>
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
      tableData: [
        {
          name: "蔡徐坤",
          description: "唱跳rap篮球"
        },
        {
          name: "蔡徐坤",
          description:
            "唱跳rap篮球0000000000000000000000000000000000000000000000000000"
        },
        {
          name: "蔡徐坤",
          description: "唱跳rap篮球"
        },
        {
          name: "蔡徐坤",
          description: "唱跳rap篮球"
        },
        {
          name: "蔡徐坤",
          description: "唱跳rap篮球"
        }
      ],
      tempIndex: -1,
      editFormVisible: false,
      addFormVisible: false,
      form: {
        name: "",
        description: ""
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    handleEdit(index, row) {
      this.editFormVisible = true;
      //alert(index + " " + row);
      this.form = Object.assign({}, row);
      this.tempIndex = index;
    },
    editFinish() {
      this.editFormVisible = false;
      let para = Object.assign({}, this.form);

      //this.tableData[this.tempIndex] = para;
      //Vue.set(vm.items, indexOfItem, newValue)
      this.tableData.splice(this.tempIndex, 1, para);

      //alert(this.tableData[this.tempIndex].description);
    },
    addFinish() {
      this.addFormVisible = false;
      //alert(this.tableData.length);
      let para = Object.assign({}, this.form);
      //alert(para.name);
      this.tableData.splice(this.tableData.length, 0, para);
    }
  }
};
</script>

<style scoped>
.addButton {
  float: left;
  margin: 20px auto 10px 10px;
}
</style>
