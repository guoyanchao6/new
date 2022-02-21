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
            v-model="search"
            class="input-with-select"
          >
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加用户</el-button>
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
        <el-table-column
          prop="role_name"
          label="角色"
          min-width="80"
        ></el-table-column>
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
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      // 获取用户列表的参数信息
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 5,
      },
      userListData: [],
      total: 0,
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    // 删除用户
    async deleteUser(row) {
      console.log("删除用户信息");
      console.log(row);
      const { data: res } = await this.$axios.post("/deleteUser", row);
      console.log(res.code);
      if (res.code !== 200) {
        return this.$message.error("删除失败！");
      }
      this.$message.success("删除成功！");
      this.getUserList();
    },
    // 更新用户数据
    async updataUser(row) {
      console.log("修改用户信息");
      console.log(row);
      const { data: res } = await this.$axios.post("/updataUser", row);
      console.log(res.code);
      if (res.code !== 200) {
        return this.$message.error("更新失败！");
      }
      this.$message.success("更新成功！");
    },
    // 改变state
    userStateChange(row) {
      console.log(row);
      this.updataUser(row);
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