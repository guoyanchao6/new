<template>
  <div>
    <!-- 头部面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="7">
          <!-- 搜索与添加 -->
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            class="input-with-select"
            clearable
            @clear="getUserList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUserList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="dialogVisible = true"
            >添加用户</el-button
          >
        </el-col>
      </el-row>
      <el-table :data="userListData" style="width: 100%" border stripe>
        <el-table-column type="index" min-width="50"> </el-table-column>
        <el-table-column
          prop="username"
          label="姓名"
          min-width="100"
        ></el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          min-width="180"
        ></el-table-column>
        <el-table-column
          prop="mobile"
          label="电话"
          min-width="120"
        ></el-table-column>
        <el-table-column prop="role_name" label="角色" min-width="80">
          <template slot-scope="scope">
            {{ scope.row.role_name === "1" ? "管理员" : "普通用户" }}
          </template>
        </el-table-column>
        <el-table-column prop="mg_state" label="状态" min-width="80">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="1"
              inactive-value="0"
              @change="userStateChange(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="180">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="handelUpdataUser(scope.row)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteUser(scope.row)"
            ></el-button>
            <el-tooltip
              class="item"
              effect="dark"
              content="分配角色"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>

      <!-- 添加用户弹框 -->
      <el-dialog
        title="用户信息"
        :visible.sync="dialogVisible"
        width="30%"
        @close="addDialogClosed"
      >
        <el-form
          :model="addForm"
          :rules="addFormRules"
          ref="addFormRef"
          label-width="80px"
        >
          <el-form-item label="用户名" prop="username">
            <el-input
              v-model="addForm.username"
              :disabled="disabledUpdata"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="addForm.password"
              :disabled="disabledUpdata"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="addForm.email"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="mobile">
            <el-input v-model="addForm.mobile"></el-input>
          </el-form-item>
          <el-form-item label="角色" prop="role_name">
            <el-select v-model="addForm.role_name" placeholder="请选择角色">
              <el-option label="管理员" value="1"></el-option>
              <el-option label="普通用户" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUser">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    // 校验邮箱正则
    const checkEmail = (rule, value, callback) => {
      const regEmail = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,4}){1,3})$/;
      if (regEmail.test(value)) {
        return callback();
      }
      callback(new Error("请输入合法的邮箱"));
    };
    // 校验手机号正则
    const checkMobile = (rule, value, callback) => {
      const regEmail =
        /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
      if (regEmail.test(value)) {
        return callback();
      }
      callback(new Error("请输入合法的手机号"));
    };
    return {
      // 获取用户列表的参数信息
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 5,
      },
      userListData: [],
      total: 0,
      dialogVisible: false,
      isUpdata: false,
      disabledUpdata: false,
      // 添加用户表单数据
      addForm: {
        username: "",
        password: "",
        email: "",
        mobile: "",
        role_name: "",
        mg_state: "1",
      },
      addFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "请输入电话", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" },
        ],
        role_name: [{ required: true, message: "请选择角色", trigger: "blur" }],
      },
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    // dialog关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields(); //清空表单
      this.isUpdata = false; // 去除更新标记
      this.addForm = {}; // 清空表单数据
      this.getUserList(); // 刷新列表
    },
    // 添加/修改用户
    addUser() {
      console.log("添加用户");
      this.$refs.addFormRef.validate(async (valid) => {
        console.log(valid);
        if (!valid) {
          return;
        }
        if (this.isUpdata) {
          // 发起修改用户请求
          const { data: res } = await this.$axios.post(
            "/updataUser",
            this.addForm
          );
          console.log(res);
          if (res.code !== 200) {
            return this.$message.error("更新失败！");
          }
          this.$message.success("更新成功！");
        } else {
          // 发起添加用户请求
          const { data: res } = await this.$axios.post(
            "/addUser",
            this.addForm
          );
          console.log(res);
          if (res.code !== 200) {
            return this.$message.error("添加失败！");
          }
          this.$message.success("添加成功！");
        }
        this.dialogVisible = false;
      });
    },
    // 删除用户
    deleteUser(row) {
      console.log("删除用户信息");
      console.log(row);
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data: res } = await this.$axios.post("/deleteUser", row);
          console.log(res.code);
          if (res.code !== 200) {
            return this.$message.error("删除失败！");
          }
          this.$message.success("删除成功！");
          this.getUserList();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 点击修改按钮 的事件
    handelUpdataUser(row) {
      this.dialogVisible = true;
      this.isUpdata = true; // 标记dialog表单是修改，而不是添加
      this.disabledUpdata = true; // 允许更改
      this.addForm = row;
    },
    // 改变state
    async userStateChange(row) {
      console.log(row);
      // 发起修改用户请求
      const { data: res } = await this.$axios.post("/updataUser", row);
      console.log(res);
      if (res.code !== 200) {
        return this.$message.error("更新失败！");
      }
      this.$message.success("更新成功！");
    },
    // 改变pagesize
    handleSizeChange(e) {
      console.log(e);
      this.queryInfo.pagenum = 1;
      this.queryInfo.pagesize = e;
      this.getUserList();
    },
    // 改变Currenpage
    handleCurrentChange(e) {
      console.log(e);
      this.queryInfo.pagenum = e;
      this.getUserList();
    },
    async getUserList() {
      const { data: res } = await this.$axios.get("/getUsers", {
        params: this.queryInfo,
      });
      console.log(res);
      if (res.code !== 200) {
        return this.$message.error("获取用户数据失败");
      }
      this.userListData = res.data;
      console.log(this.userListData);
      this.total = res.total;
    },
  },
};
</script>

<style>
</style>