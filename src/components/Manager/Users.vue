<template>
  <div id="users-manage">
    <el-table :data="tableData" stripe height="900">
      <el-table-column label="头像" width="200" align="center">
        <template slot-scope="scope">
          <el-image class="manage-img" :src="scope.row.avatar" />
        </template>
      </el-table-column>
      <el-table-column prop="account" label="账号" width="200" align="center" />
      <el-table-column
        prop="username"
        label="昵称"
        width="200"
        align="center"
      />
      <el-table-column prop="status" label="状态" align="center" width="200">
        <template slot-scope="scope">
          {{ scope.row.banned ? "已禁用" : "正常" }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <template v-if="scope.row.banned">
            <el-button type="warning" @click="unBan(scope.row.user_id)" plain
              >解禁</el-button
            >
          </template>
          <template v-else>
            <el-button type="warning" plain @click="ban(scope.row.user_id)"
              >禁用</el-button
            >
          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "UsersManage",
  components: {},
  data() {
    return {
      tableData: []
    };
  },
  methods: {
    loadUsers() {
      const vm = this;
      this.$api.admin
        .fetchUsersList(
          this.$store.state.user.uid,
          this.$store.state.user.token,
          0,
          1000
        )
        .then(data => {
          data.data.arr.forEach(item => {
            vm.tableData.push({
              user_id: item.user_id,
              avatar: item.avatar_sm,
              banned: item.ban === 1,
              username: item.nickname,
              account: item.account
            });
          });
        })
        .catch(err => {
          vm.$message.error("Error occured. Check console for more details.");
          console.log(err);
        });
    },
    ban(user_id) {
      const vm = this;

      if (this.$store.state.user.uid === user_id) {
        this.$message.error("不能 Ban 自己！");
        return;
      }

      this.$api.admin
        .banUser(
          this.$store.state.user.uid,
          this.$store.state.user.token,
          user_id
        )
        .then(() => {
          let i = 0;

          for (; i < vm.tableData.length; i++) {
            if (vm.tableData[i].user_id === user_id) {
              vm.$set(vm.tableData[i], "banned", true);
            }
          }

          vm.$message.success("成功！");
        })
        .catch(err => {
          vm.$message.error("Error occured. Check console for more details.");
          console.log(err);
        });
    },
    unBan(user_id) {
      // const vm = this;

      console.log("Unban " + user_id);
      this.$message.error("Not valid operation!");
      return;

      // if (this.$store.state.user.uid === user_id) {
      //   this.$message.error("不能 Ban 自己！");
      //   return;
      // }

      // this.$api.admin
      //   .banUser(
      //     this.$store.state.user.uid,
      //     this.$store.state.user.token,
      //     user_id
      //   )
      //   .then(() => {
      //     let i = 0;

      //     for (; i < vm.tableData.length; i++) {
      //       if (vm.tableData[i].user_id === user_id) {
      //         vm.$set(vm.tableData[i], "banned", true);
      //       }
      //     }

      //     vm.$message.success("成功！");
      //   })
      //   .catch(err => {
      //     vm.$message.error("Error occurs, check console!");
      //     console.log(err);
      //   });
    }
  },
  mounted() {
    this.loadUsers();
  }
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
