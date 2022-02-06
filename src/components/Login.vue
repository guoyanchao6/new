<template>
    <div class="login-container">
        <!-- 头像区 -->
        <div class="login-box">
            <div class="avatar-box">
                <img src="../assets/logo.png" alt="">
            </div>
            <!-- 登录表单区 -->
            <div class="form">
                <el-form :model="loginForm" ref="loginFormRef" :rules="loginFormRules">
                    <el-form-item prop="username">
                        <el-input v-model="loginForm.username" prefix-icon="iconfont icon-yonghu"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" v-model="loginForm.password" prefix-icon="iconfont icon-mima"></el-input>
                    </el-form-item>
                    <el-form-item class="btns">
                        <el-button type="primary">登录</el-button>
                        <el-button type="info" @click="resetLoginForm">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        
    </div>
</template>
<script>
export default {
    data(){
        return{
            // 登录表单数据绑定对象
            loginForm:{
                username:'',
                password:''
            },
            loginFormRules:{
                username:[
                    {required:true,message:'请输入用户名',trigger:'blur'},
                    {min:2,max:10,message:'长度为2-10个字符',trigger:'blur'}
                ],
                password:[
                    {required:true,message:'请输入密码',trigger:'blur'},
                    {min:6,max:15,message:'长度为6-15个字符',trigger:'blur'}

                ]
            }
        }
    },
    methods:{
        resetLoginForm(){
            console.log(this)
            this.$refs.loginFormRef.resetFields()
        }
    }
}
</script>
<style lang="less" scoped>
.login-container{
    height: 100%;
    background: rgb(55, 150, 238);
    .login-box{
        width: 450px;
        height: 300px;
        background-color: #fff;
        border-radius: 3px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        .avatar-box{
            height: 130px;
            width: 130px;
            border: 1px solid #aaa;
            border-radius: 50%;
            padding: 10px;
            box-shadow: 0 0 10px #ddd;
            position: absolute;
            left: 50%;
            transform: translate(-50%,-50%);
            background-color: white;
            img{
                height: 100%;
                width: 100%;
                border-radius: 50%;
                background-color: #ddd;
            }
        }
        .form{
            position: absolute;
            bottom: 0;
            width: 100%;
            padding: 0 10px;
            box-sizing: border-box;
            .btns{
                display: flex;
                justify-content: end;
            }
        }
        
    }
}
</style>