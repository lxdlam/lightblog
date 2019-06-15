<template>
  <div id="heading">
    <div class="nav-container">
      <img id="logo" src="../../assets/logo.png" />
      <div class="nav-bar">
        <ul class="nav-list">
          <li class="nav-item">
            <el-link :underline="false" @click="$router.push('/explore')"
              >探索</el-link
            >
          </li>
          <li class="nav-item">
            <el-link :underline="false" @click="$router.push('/random')"
              >I'm feeling lucky</el-link
            >
          </li>
          <li class="nav-item nav-search">
            <el-input
              v-model="keyword"
              placeholder="搜点什么"
              prefix-icon="el-icon-search"
              @keyup.enter.native="do_search"
              :style="{ width: width + 'px' }"
              @focus="width = 200"
              @blur="width = 130"
              clearable
            />
          </li>
          <li class="nav-item">
            <el-link
              :underline="false"
              @click="$router.push('/article/edit/new')"
              >写文章</el-link
            >
          </li>
          <li class="nav-item nav-divide">
            <el-divider direction="vertical" />
          </li>
          <template v-if="$store.state.user.logged">
            <li class="nav-item">
              <img
                id="avatar"
                v-if="$store.state.user.avatar"
                :src="$store.state.user.avatar"
              />
              <img id="avatar" v-else :src="$store.state.user.avatar_sm" />
            </li>
            <li class="nav-item">
              <el-dropdown
                trigger="click"
                size="medium"
                @command="dispatch"
                placement="top"
              >
                <span class="el-dropdown-link">
                  {{ $store.state.user.username }}
                  <i class="el-icon-arrow-down el-icon--right" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item icon="el-icon-user-solid" command="profile">
                    个人中心
                  </el-dropdown-item>
                  <el-dropdown-item icon="el-icon-document" command="articles">
                    我的文章
                  </el-dropdown-item>
                  <el-dropdown-item
                    v-if="$store.state.user.isAdmin"
                    icon="el-icon-s-tools"
                    command="admin"
                  >
                    管理中心
                  </el-dropdown-item>
                  <el-dropdown-item
                    divided
                    icon="el-icon-error"
                    command="logout"
                  >
                    退出登录
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <el-link type="primary" @click="login_visiable = true"
                >登录</el-link
              >
            </li>
            <li class="nav-item">
              <el-link type="primary" @click="$router.push('/register')"
                >注册</el-link
              >
            </li>
          </template>
        </ul>
      </div>
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
      login_visiable: false,
      width: 130
    };
  },
  methods: {
    handleClose(done) {
      this.login_visiable = false;
      done();
    },
    dispatch(key) {
      if (key === "profile") {
        this.$router.push("/personal");
      } else if (key === "articles") {
        this.$router.push({ name: "personal", params: { key: 4 } });
      } else if (key === "admin") {
        this.$router.push("/admin");
      } else if (key === "logout") {
        this.$message({
          type: "success",
          message: "退出登录成功！即将返回首页……"
        });
        this.$store.commit("user/logout");
        this.$router.push("/");
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
  font-size: 18px;
  text-align: center;
  color: #909399;
}

#heading {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  transition: all 0.2s;
  background-color: white;
}

.nav-container {
  max-width: 1280px;
  margin: auto;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  height: 100%;
}

#avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}

#logo {
  height: 70px;
  width: 160px;
}

ul {
  list-style: none;
  padding: 0;
}

.nav-bar {
  display: block;
  height: 100%;
  flex: 1 0 auto;
}

.nav-list {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  text-align: justify;
  justify-content: flex-end;
  position: relative;
  height: 100%;
  margin: 0;
}

.nav-item {
  padding: 0 8px;
  margin: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  top: 50%;
}

.nav-search {
  flex: 1 1 auto;
  justify-content: flex-end;
  min-width: 220px;
  padding-top: 4px;
}

.nav-divide {
  padding: 0;
}

.el-input {
  transition: width 400ms;
  -moz-transition: width 400ms;
  -webkit-transition: width 400ms;
  -o-transition: width 400ms;
}
</style>
