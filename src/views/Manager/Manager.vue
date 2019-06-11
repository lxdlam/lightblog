<template>
  <div id="manager">
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>管理员</span>
      </el-header>

      <el-container style="height: 600px; border: 1px solid #eee">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
          <el-menu :default-openeds="[]">
            <el-menu-item index="1" @click="changeStatus1">
              <template slot="title">
                <i class="el-icon-s-custom"></i>用户管理
              </template>
            </el-menu-item>
            <el-menu-item index="2" @click="changeStatus2">
              <template slot="title">
                <i class="el-icon-message"></i>举报管理
              </template>
            </el-menu-item>
            <el-menu-item index="3" @click="changeStatus3">
              <template slot="title">
                <i class="el-icon-notebook-1"></i>评论管理
              </template>
            </el-menu-item>
            <el-menu-item index="4" @click="changeStatus4">
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
              <CommentManage />
            </template>
            <template v-else-if="status === 4">
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
import CommentManage from "../../components/Manager/Comment";
import LabelManage from "../../components/Manager/Label";
export default {
  name: "Manager",
  components: {
    UsersManage,
    ReportManage,
    CommentManage,
    LabelManage
  },
  data() {
    return {
      status: 1
    };
  },
  methods: {
    changeStatus1: function() {
      this.status = 1;
    },
    changeStatus2: function() {
      this.status = 2;
    },
    changeStatus3: function() {
      this.status = 3;
    },
    changeStatus4: function() {
      this.status = 4;
    }
  }
};
</script>

<style scoped>
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
</style>
