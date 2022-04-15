<template>
  <div class="login-container">
    <!-- 头像区 -->
    <div class="login-box">
      <div class="avatar-box">
        <img src="../assets/logo.png" alt="" />
      </div>
      <!-- 登录表单区 -->
      <div class="form">
        <el-form :model="loginForm" ref="loginFormRef" :rules="loginFormRules">
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              prefix-icon="iconfont icon-yonghu"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="loginForm.password"
              prefix-icon="iconfont icon-mima"
            ></el-input>
          </el-form-item>
          <el-form-item class="btns">
            <el-button type="primary" @click="register">注册</el-button>
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="info" @click="resetLoginForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 登录表单数据绑定对象
      loginForm: {
        username: "aaa",
        password: "111111",
      },
      loginFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 10, message: "长度为2-10个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度为6-15个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    resetLoginForm() {
      console.log(this);
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        console.log(valid);
        //校验不成功，终止登录
        if (!valid) return;
        //校验成功，发起登录请求
        const res = await this.$axios.post("/login", this.loginForm); //axios请求返回值是promise对象，通过await可以取到promise的回调函数的返回值
        if (res.data.code === 200) {
          // 提示登录成功，路由跳转
          this.$message.success("登录成功");
          // 1. 登录成功之后的token，保存到客户端的sessionstorage中
          //   项目中登录之外的其他接口，必须在登录之后才可以访问
          //   token只应在当前网站打开期间生效，所以将token保存在sessionstorage中
          // 2. 通过编程式导航跳转到后台主页，路由地址是/home
          console.log(res.data);
          sessionStorage.setItem("token", res.data.token);
          this.$router.push("/home");
        } else {
          this.$message.error("登录失败");
        }
      });
    },
    register() {
      this.$refs.loginFormRef.validate(async (valid) => {
        console.log(valid);
        //校验不成功，终止登录
        if (!valid) return;
        //校验成功，发起登录请求
        const res = await this.$axios.post("/register", this.loginForm); //axios请求返回值是promise对象，通过await可以取到promise的回调函数的返回值
        console.log(res);
        if (res.data.code === 200) {
          // 提示注册成功，清空表单
          this.$message.success("注册成功");
        }
        if (res.data.code === 201) {
          // 提示用户名已存在
          this.$message.warning("用户名已存在");
        }
        if (res.data.code === 202) {
          // 提示注册失败
          this.$message.error("注册失败");
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.login-container {
  height: 100%;
  background: rgb(55, 150, 238);
  .login-box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .avatar-box {
      height: 130px;
      width: 130px;
      border: 1px solid #aaa;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 0 10px #ddd;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: white;
      img {
        height: 100%;
        width: 100%;
        border-radius: 50%;
        background-color: #ddd;
      }
    }
    .form {
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 0 10px;
      box-sizing: border-box;
      .btns {
        display: flex;
        justify-content: end;
      }
    }
  }
}
</style>