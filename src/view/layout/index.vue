<template>
  <div>
    <el-container class="container">
      <el-header class="header">
        <div class="right">
          <img src="../../assets/logo.png" alt="" style="width: 50px" />
          <h1>Vue2 + elementUI</h1>
        </div>
        <div class="right">
          <div>
            <span class="avator" @click="handleShowBox" v-if="avator === ''">{{
              userInfo.username
            }}</span>
            <img
              :src="avator"
              alt=""
              class="avator"
              @click="handleShowBox"
              v-if="avator !== ''"
            />
          </div>

          <h3>欢迎您！{{ userInfo.username }}</h3>
          <el-button size="mini" style="margin-left: 0.5rem" @click="logout"
            >退出</el-button
          >
        </div>
      </el-header>
      <el-container class="body">
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
          </el-col>
        </el-aside>
        <el-main class="main">
          <router-view></router-view>
        </el-main>
      </el-container>
      <el-dialog title="提示" :visible.sync="showBox" width="30%">
        <div class="uploadAvatorBox">
          <div class="selectBox">
            <label for="file">
              <div class="inputBox">选择图片</div>
            </label>
            <input
              type="file"
              name="file"
              id="file"
              @change="uploadAvator"
              accept="image/*"
              capture="camera"
              style="display: none"
            />
          </div>

          <div class="img" v-if="showUploadImg !== ''">
            <img
              :src="showUploadImg"
              alt=""
              style="width: 200px; height: 200px; margin: 10px auto"
            />
          </div>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button @click="showBox = false">取 消</el-button>
          <el-button type="primary" @click="uploadImg">上传</el-button>
        </span>
      </el-dialog>
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
              name: "角色列表",
              icon: "el-icon-location",
              path: "/rolesList",
            },
            {
              id: "0202",
              name: "权限列表",
              icon: "el-icon-location",
              path: "/rightsList",
            },
          ],
        },
        {
          id: "0300",
          name: "商品管理",
          icon: "el-icon-location",
          path: "/goods",
          children: [
            // {
            //   id: "0301",
            //   name: "商品列表",
            //   icon: "el-icon-location",
            //   path: "/rolesList",
            // },
            {
              id: "0302",
              name: "商品分类",
              icon: "el-icon-location",
              path: "/goodsCategories",
            },
          ],
        },
      ],
      showBox: false,
      avator: "", //服务端头像静态资源地址
      showUploadImg: "", // 本地图片预览
      test: "test",
      test1: "aaaaaaaaa",
      formData: {}, //头像上传的FormData
      userInfo: {},
      type: "", //上传头像/更新头像
    };
  },
  methods: {
    // 点击头像，显示修改头像弹框
    handleShowBox() {
      console.log("显示弹框 上传 修改 下载头像");
      this.showUploadImg = "";
      this.showBox = true;
    },
    // 点击选择头像按钮
    uploadAvator(e) {
      if (this.avator !== "") {
        this.type = "updata";
      } else {
        this.type = "add";
      }
      console.log("选择图片");
      console.log(e.target);
      console.log(e.target.files[0]); // File : File {name: 'avatar.webp', lastModified: 1646204612494, lastModifiedDate: Wed Mar 02 2022 15:03:32 GMT+0800 (中国标准时间), webkitRelativePath: '', size: 12782, type: "image/webp",webkitRelativePath: ""}
      let file = e.target.files[0]; // 从input获取文件

      // 以文件形式上传
      this.formData = new FormData(); // 实例化一个FormData对象
      this.formData.append("avatar", file); // 将文件加入FormData对象中
      this.formData.append("username", this.userInfo.username);
      this.formData.append("id", this.userInfo._id);
      this.formData.append("type", this.type);

      // 文件转base64,预览图片
      let reader = new FileReader(); // 实例化文件读取对象
      // file to Base64
      reader.readAsDataURL(file); // 将文件读取为base64格式
      reader.onload = () => {
        // 读取完成时的回调
        this.showUploadImg = reader.result; // reader.result=e.target.result存储的是文件的base64编码
        const base64Str = reader.result;
        console.log(base64Str); //data:image/webp;base64,UklGRuYxAABXRUJQVlA4IN
      };

      // 文件转为本地访问路径 blob:http://localhost:8080/83c2e21a-08d6-4e22-a662-868e7f64d66e
      // 可用于临时展示获取到的本地图片
      // const url = window.URL.createObjectURL(file);
      // console.log(url);
      // this.showUploadImg = url;
      // setTimeout(() => {
      //   URL.revokeObjectURL(url);
      // }, 100000);
    },

    // 点击确定按钮，上传头像
    uploadImg() {
      console.log("上传头像");
      this.$axios.post("/userAvatar", this.formData).then((res) => {
        if (res.data.code === 200) {
          console.log(res.data.imgPath);
          this.showBox = false;
          // 头像上传成功，从服务器获取静态资源
          this.avator = "http://127.0.0.1:3000/" + res.data.imgPath;
        }
      });
    },

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
      // this.$axios.post("/userinfor", params).then((res) => {
      //   console.log(res);
      //   if (res.data.status === 0) {
      //     this.username = res.data.userinfo.username;
      //   } else {
      //     this.$message.error("获取用户信息失败");
      //   }
      // });
      this.$axios({
        method: "post",
        url: "/userinfor",
        data: params,
      }).then((res) => {
        console.log(res);
        if (res.data.status === 0) {
          this.userInfo = res.data.userinfo;
          if (res.data.userinfo.avatar) {
            //进入页面获取用户头像
            this.avator = "http://127.0.0.1:3000/" + res.data.userinfo.avatar;
          }
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
  .header {
    height: 60px;
    background: #117ce7;
    display: flex;
    justify-content: space-between;
    padding-left: 10px;
    color: #b4d3f0;
    .right {
      display: flex;
      align-items: center;
      .avator {
        display: block;
        text-align: center;
        line-height: 40px;
        font-size: 10px;
        width: 40px;
        height: 40px;
        border-radius: 20px;
        background-color: aliceblue;
        margin-right: 20px;
        cursor: pointer;
      }
    }
  }
  .body {
    height: 90%;
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
      padding: 20px;
      background: #b4d3f0;
    }
  }
  .uploadAvatorBox {
    text-align: center;
    .selectBox {
      display: block;
      margin-bottom: 10px;
      .inputBox {
        display: inline-block;
        padding: 10px 20px;
        color: #fff;
        background-color: #409eff;
        border-color: #409eff;
        border-radius: 5px;
      }
    }
  }
}
</style>