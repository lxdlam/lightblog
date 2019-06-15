<template>
  <div id="manager">
    <el-container class="manager-container">
      <el-header style="text-align: right; font-size: 1rem">
        <el-link @click="$router.push('/')"> 返回首页 </el-link>
      </el-header>

      <el-container style="min-height: 900px; border: 1px solid #eee">
        <el-aside width="200px" style="background-color: white">
          <el-menu default-active="1">
            <el-menu-item index="1" @click="status = 1">
              <template slot="title">
                <i class="el-icon-s-custom"></i>用户管理
              </template>
            </el-menu-item>
            <el-menu-item index="2" @click="status = 2">
              <template slot="title">
                <i class="el-icon-message"></i>举报管理
              </template>
            </el-menu-item>
            <el-menu-item index="3" @click="status = 3">
              <template slot="title">
                <i class="el-icon-collection"></i>标签管理
              </template>
            </el-menu-item>
          </el-menu>
        </el-aside>

        <el-container>
          <el-main class="manage-content">
            <template v-if="status === 1">
              <UsersManage />
            </template>
            <template v-else-if="status === 2">
              <ReportManage />
            </template>
            <template v-else-if="status === 3">
              <LabelManage />
            </template>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import UsersManage from "../../components/Manager/Users";
import ReportManage from "../../components/Manager/Report";
import LabelManage from "../../components/Manager/Label";
export default {
  name: "Manager",
  components: {
    UsersManage,
    ReportManage,
    LabelManage
  },
  data() {
    return {
      status: 1
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!vm.$store.state.user.isAdmin) {
        vm.$router.replace("/na");
      }
    });
  }
};
</script>

<style scoped>
#manager {
  min-height: 900px;
  background-color: white;
}

.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}
.el-aside {
  color: #333;
}
.manage-content {
  padding-top: 0;
}

.manage-container {
  min-height: 900px;
  background-color: white;
}
</style>
