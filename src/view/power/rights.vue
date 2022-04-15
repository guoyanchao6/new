<template>
  <div>
    <!-- 头部面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-table :data="rightsList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="权限名称" prop="authName"></el-table-column>
        <el-table-column label="权限路径" prop="path"></el-table-column>
        <el-table-column label="权限等级" prop="level">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.level === '1'">一级</el-tag>
            <el-tag v-if="scope.row.level === '2'">二级</el-tag>
            <el-tag type="warning" v-if="scope.row.level === '3'">三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rightsList: [
        {
          authName: "用户管理",
          path: "user",
          level: "1",
        },
        {
          authName: "用户列表",
          path: "user/UserList",
          level: "2",
        },
        {
          authName: "添加用户",
          path: "user/UserList",
          level: "3",
        },
        {
          authName: "删除用户",
          path: "user/UserList",
          level: "3",
        },
        {
          authName: "修改用户",
          path: "user/UserList",
          level: "3",
        },
        {
          authName: "权限管理",
          path: "power",
          level: "1",
        },
        {
          authName: "权限列表",
          path: "power/rights",
          level: "2",
        },
        {
          authName: "角色列表",
          path: "power/roles",
          level: "2",
        },
        {
          authName: "分配权限",
          path: "power/roles",
          level: "3",
        },
        {
          authName: "添加角色",
          path: "power/roles",
          level: "3",
        },
        {
          authName: "删除角色",
          path: "power/roles",
          level: "3",
        },
        {
          authName: "修改角色 ",
          path: "power/roles",
          level: "3",
        },
        {
          authName: "商品管理",
          path: "shop/commodity",
          level: "2",
        },
        {
          authName: "首页",
          path: "home/index",
          level: "3",
        },
      ],
    };
  },
  created() {
    this.getRightsList();
  },
  methods: {
    getRightsList() {
      console.log("获取权限列表");
    },
  },
};
</script>

<style>
</style>