<template>
  <div>
    <el-container class="container">
      <el-header class="header">
        <div class="right">
          <img src="../assets/logo.png" alt="" style="width: 50px" />
          <h1>Vue2 + elementUI</h1>
        </div>
        <div class="right">
          <h3>欢迎您！{{ username }}</h3>
          <el-button size="mini" style="margin-left: 0.5rem" @click="logout"
            >退出</el-button
          >
        </div>
      </el-header>
      <el-container>
        <el-aside :width="collapse ? '64px' : '200px'" class="aside">
          <div class="collapse" @click="handleCollapse">|||</div>
          <el-col>
            <el-menu
              :default-active="activePath"
              class="el-menu-vertical-demo"
              background-color="#194166"
              text-color="#fff"
              active-text-color="#117ce7"
              unique-opened
              :collapse="collapse"
              :collapse-transition="false"
              router
            >
              <el-menu-item index="/home" @click="saveNavState('/home')">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>首页</span>
                </template>
              </el-menu-item>
              <el-submenu
                :index="item.path"
                v-for="item in menuList"
                :key="item.id"
              >
                <template slot="title">
                  <i :class="item.icon"></i>
                  <span>{{ item.name }}</span>
                </template>
                <el-menu-item
                  :index="subitem.path"
                  v-for="subitem in item.children"
                  :key="subitem.id"
                  @click="saveNavState(subitem.path)"
                >
                  <template slot="title">
                    <i :class="subitem.icon"></i>
                    <span>{{ subitem.name }}</span>
                  </template>
                </el-menu-item>
              </el-submenu>
            </el-menu>
          </el-col></el-aside
        >
        <el-main class="main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      username: "",
      collapse: false,
      activePath: "", //被激活的链接地址
      menuList: [
        {
          id: "0100",
          name: "用户管理",
          icon: "el-icon-location",
          path: "/user",
          children: [
            {
              id: "0101",
              name: "用户列表",
              icon: "el-icon-location",
              path: "/userList",
            },
          ],
        },
        {
          id: "0200",
          name: "权限管理",
          icon: "el-icon-location",
          path: "/permission",
          children: [
            {
              id: "0201",
              name: "权限列表",
              icon: "el-icon-location",
              path: "/permissionList",
            },
          ],
        },
      ],
    };
  },
  methods: {
    saveNavState(activePath) {
      console.log(activePath);
      this.activePath = activePath;
      window.sessionStorage.setItem("activePath", activePath);
    },
    handleCollapse() {
      this.collapse = !this.collapse;
    },
    logout() {
      sessionStorage.removeItem("token");
      this.$message.success("成功退出登录");
      this.activePath = window.sessionStorage.removeItem("activePath");
      this.$router.push("/login");
    },
    getuserinfo() {
      const token = sessionStorage.getItem("token");
      console.log(token);
      const params = {
        token,
      };
      console.log(params);
      this.$axios.post("/userinfor", params).then((res) => {
        console.log(res);
        if (res.data.status === 0) {
          this.username = res.data.userinfo.username;
        } else {
          this.$message.error("获取用户信息失败");
        }
      });
    },
  },
  created() {
    this.getuserinfo();
    this.activePath = window.sessionStorage.getItem("activePath");
  },
};
</script>

<style lang="less" scoped>
.container {
  height: 100vh;
}
.header {
  background: #117ce7;
  display: flex;
  justify-content: space-between;
  padding-left: 10px;
  color: #b4d3f0;
  .right {
    display: flex;
    align-items: center;
  }
}
.aside {
  background: #194166;
  .collapse {
    background: #0c5299;
    letter-spacing: 2px;
    color: #b4d3f0;
    text-align: center;
    padding: 2px;
    cursor: pointer;
  }
  .el-menu {
    border-right: 0px;
  }
}
.main {
  background: #b4d3f0;
}
</style>