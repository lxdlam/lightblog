<template>
  <div id="heading">
    <div class="left-container">
      <el-image
        id="logo"
        fit="contain"
        :src="require('../../assets/dummy_logo.png')"
      />
      <el-link @click="$router.push('/')">首页</el-link>
      <el-link>探索</el-link>
      <el-link>I'm feeling lucky</el-link>
    </div>
    <div class="right-container">
      <el-input
        v-model="keyword"
        placeholder="搜点什么"
        prefix-icon="el-icon-search"
        @change="do_search"
      />
      <el-link>写文章</el-link>
      <el-divider direction="vertical" />
      <template v-if="$store.state.user.logged">
        <img
          id="avatar"
          v-if="$store.state.user.avatar"
          :src="$store.state.user.avatar"
        />
        <img id="avatar" v-else src="../../assets/default_avatar.jpeg" />
        <el-dropdown trigger="click" @command="dispatch">
          <span class="el-dropdown-link">
            Ramen<i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-user-solid" command="profile">
              个人中心
            </el-dropdown-item>
            <el-dropdown-item icon="el-icon-document" command="articles">
              我的文章
            </el-dropdown-item>
            <el-dropdown-item icon="el-icon-star-on" command="favorites">
              收藏中心
            </el-dropdown-item>
            <el-dropdown-item divided icon="el-icon-error" command="logout">
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
      <template v-else>
        <el-link type="primary" @click="login_visiable = true">登录</el-link>
        <el-link type="primary" @click="$router.push('/register')"
          >注册</el-link
        >
      </template>
    </div>
    <el-dialog
      title="登录"
      :visible.sync="login_visiable"
      :before-close="handleClose"
      append-to-body
      width="350px"
    >
      <LoginForm @success="login_visiable = false" />
    </el-dialog>
  </div>
</template>

<script>
import LoginForm from "@/components/Auth/Login";

export default {
  name: "Heading",
  components: {
    LoginForm
  },
  data: function() {
    return {
      keyword: null,
      login_visiable: false
    };
  },
  methods: {
    handleClose(done) {
      this.login_visiable = false;
      done();
    },
    dispatch(key) {
      if (key === "profile") {
        // Go to profile page
      } else if (key === "articles") {
        // Go to article page
      } else if (key === "favorites") {
        // Go to favorites page
      } else if (key === "logout") {
        this.$store.commit("user/logout");
      }
    },
    do_search() {
      if (this.keyword !== null && this.keyword !== "") {
        const key = this.keyword;
        this.keyword = null;
        this.$router.push({
          name: "search",
          params: { keyword: key }
        });
      }
    }
  },
  watch: {}
};
</script>

<style scoped>
.el-link {
  font-size: 1.33rem;
}

#avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
}

#logo {
  height: 139px;
  width: 60px;
}

#heading > .left-container {
  float: left;
  position: relative;
  top: 50%;
}

#heading > .right-container {
  float: right;
  position: relative;
  top: 50%;
}

#logo {
  width: 139px;
  height: 60px;
}
</style>
