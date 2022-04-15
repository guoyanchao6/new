<template>
  <div>
    <!-- 头部面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-button type="primary">添加角色</el-button>
      <el-table :data="rolesList" border stripe>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row
              v-for="(item1, index1) in scope.row.children"
              :key="item1.id"
              :class="[
                index1 === 0 ? 'bodertop' : '',
                'boderbottom',
                'vcenter',
              ]"
            >
              <!-- 一级权限 -->
              <el-col :span="5">
                <el-tag
                  type="success"
                  closable
                  @click="removeRightById(scope.row.id, item1.id)"
                  >{{ item1.authName }}</el-tag
                >
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 二级权限 -->
              <el-col :span="19">
                <el-row
                  v-for="(item2, index2) in item1.children"
                  :key="item2.id"
                  :class="[index2 !== 0 ? 'bodertop' : '', 'vcenter']"
                >
                  <el-col :span="6">
                    <el-tag
                      closable
                      @click="removeRightById(scope.row.id, item2.id)"
                      >{{ item2.authName }}</el-tag
                    >
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-row>
                      <el-tag
                        v-for="item3 in item2.children"
                        :key="item3.id"
                        type="warning"
                        closable
                        @click="removeRightById(scope.row.id, item3.id)"
                        >{{ item3.authName }}</el-tag
                      >
                    </el-row>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDscribe"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <el-row>
              <el-button type="primary" icon="el-icon-edit" size="mini"
                >编辑</el-button
              >
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
                @click="handleSetRight(scope.row)"
                >分配权限</el-button
              >
              <el-button type="danger" icon="el-icon-delete" size="mini"
                >删除</el-button
              >
            </el-row>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
      title="分配权限"
      :visible.sync="setRightDialogVisible"
      width="40%"
      @close="setRightsDialogClose"
    >
      <el-tree
        :props="defRightProps"
        :data="rightsTree"
        show-checkbox
        node-key="id"
        :default-checked-keys="defKeys"
        :default-expanded-keys="defKeys"
        ref="tree"
      >
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setRight">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 角色列表
      rolesList: [
        {
          id: "01",
          roleName: "超级管理员",
          roleDscribe: "可以管理所有用户权限",
          children: [
            // 一级权限
            {
              id: "0101",
              authName: "用户管理",
              path: null,
              children: [
                // 二级权限
                {
                  id: "010101",
                  authName: "用户列表",
                  path: null,
                  children: [
                    // 三级权限
                    {
                      id: "01010101",
                      authName: "添加用户",
                      path: null,
                    },
                    {
                      id: "01010102",
                      authName: "删除用户",
                      path: null,
                    },
                    {
                      id: "01010103",
                      authName: "修改用户",
                      path: null,
                    },
                  ],
                },
                {
                  id: "010102",
                  authName: "用户列表",
                  path: null,
                  children: [
                    // 三级权限
                    {
                      id: "01010201",
                      authName: "添加用户",
                      path: null,
                    },
                    {
                      id: "01010202",
                      authName: "删除用户",
                      path: null,
                    },
                    {
                      id: "01010203",
                      authName: "修改用户",
                      path: null,
                    },
                  ],
                },
              ],
            },
            {
              id: "0103",
              authName: "权限管理",
              path: null,
              children: [
                // 二级权限
                {
                  id: "010301",
                  authName: "权限列表",
                  path: null,
                  children: [
                    // 三级权限
                    {
                      id: "01030101",
                      authName: "添加权限",
                      path: null,
                    },
                    {
                      id: "01030102",
                      authName: "删除权限",
                      path: null,
                    },
                    {
                      id: "01030103",
                      authName: "修改权限",
                      path: null,
                    },
                  ],
                },
                {
                  id: "010302",
                  authName: "权限列表",
                  path: null,
                  children: [
                    // 三级权限
                    {
                      id: "01030201",
                      authName: "添加权限",
                      path: null,
                    },
                    {
                      id: "01030202",
                      authName: "删除权限",
                      path: null,
                    },
                    {
                      id: "01030103",
                      authName: "修改权限",
                      path: null,
                    },
                  ],
                },
              ],
            },
            {
              id: "0102",
              authName: "商品管理",
              path: null,
              children: [
                // 二级权限
                {
                  id: "010201",
                  authName: "商品列表",
                  path: null,
                  children: [
                    // 三级权限
                    {
                      id: "01020101",
                      authName: "添加商品",
                      path: null,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          roleName: "管理员",
          roleDscribe: "可以管理普通用户",
          children: [
            // 一级权限
            {
              id: "0101",
              authName: "用户管理",
              path: null,
              children: [
                // 二级权限
                {
                  id: "010101",
                  authName: "用户列表",
                  path: null,
                  children: [
                    // 三级权限
                    // {
                    //   id: "01010101",
                    //   authName: "添加用户",
                    //   path: null,
                    // }
                  ],
                },
                {
                  id: "010102",
                  authName: "用户列表",
                  path: null,
                  children: [
                    // 三级权限
                  ],
                },
              ],
            },
            {
              id: "0103",
              authName: "权限管理",
              path: null,
              children: [
                // 二级权限
                {
                  id: "010301",
                  authName: "权限列表",
                  path: null,
                  children: [
                    // 三级权限
                    {
                      id: "01030101",
                      authName: "添加权限",
                      path: null,
                    },
                    {
                      id: "01030102",
                      authName: "删除权限",
                      path: null,
                    },
                    {
                      id: "01030103",
                      authName: "修改权限",
                      path: null,
                    },
                  ],
                },
                {
                  id: "010302",
                  authName: "权限列表",
                  path: null,
                  children: [
                    // 三级权限
                    {
                      id: "01030201",
                      authName: "添加权限",
                      path: null,
                    },
                    {
                      id: "01030202",
                      authName: "删除权限",
                      path: null,
                    },
                    {
                      id: "01030103",
                      authName: "修改权限",
                      path: null,
                    },
                  ],
                },
              ],
            },
            {
              id: "0102",
              authName: "商品管理",
              path: null,
              children: [
                // 二级权限
                {
                  id: "010201",
                  authName: "商品列表",
                  path: null,
                  children: [
                    // 三级权限
                    {
                      id: "01020101",
                      authName: "添加商品",
                      path: null,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          roleName: "普通用户",
          roleDscribe: "可以管理商品",
          children: [
            // 一级权限
            {
              id: "0101",
              authName: "用户管理",
              path: null,
              children: [
                // 二级权限
                {
                  id: "010101",
                  authName: "用户列表",
                  path: null,
                  children: [
                    // 三级权限
                    // {
                    //   id: "01010101",
                    //   authName: "添加用户",
                    //   path: null,
                    // }
                  ],
                },
                {
                  id: "010102",
                  authName: "用户列表",
                  path: null,
                  children: [
                    // 三级权限
                  ],
                },
              ],
            },
            {
              id: "0103",
              authName: "权限管理",
              path: null,
              children: [
                // 二级权限
                {
                  id: "010301",
                  authName: "权限列表",
                  path: null,
                  children: [
                    // 三级权限
                    {
                      id: "01030101",
                      authName: "添加权限",
                      path: null,
                    },
                    {
                      id: "01030102",
                      authName: "删除权限",
                      path: null,
                    },
                    {
                      id: "01030103",
                      authName: "修改权限",
                      path: null,
                    },
                  ],
                },
                {
                  id: "010302",
                  authName: "权限列表",
                  path: null,
                  children: [
                    // 三级权限
                    {
                      id: "01030201",
                      authName: "添加权限",
                      path: null,
                    },
                    {
                      id: "01030202",
                      authName: "删除权限",
                      path: null,
                    },
                    {
                      id: "01030103",
                      authName: "修改权限",
                      path: null,
                    },
                  ],
                },
              ],
            },
            {
              id: "0102",
              authName: "商品管理",
              path: null,
              children: [
                // 二级权限
                {
                  id: "010201",
                  authName: "商品列表",
                  path: null,
                  children: [
                    // 三级权限
                    {
                      id: "01020101",
                      authName: "添加商品",
                      path: null,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      setRightDialogVisible: false,
      // 权限列表
      rightsTree: [
        // 一级权限
        {
          id: "0101",
          authName: "用户管理",
          path: null,
          children: [
            // 二级权限
            {
              id: "010101",
              authName: "用户列表",
              path: null,
              children: [
                // 三级权限
                {
                  id: "01010101",
                  authName: "添加用户",
                  path: null,
                },
                {
                  id: "01010102",
                  authName: "删除用户",
                  path: null,
                },
                {
                  id: "01010103",
                  authName: "修改用户",
                  path: null,
                },
              ],
            },
            {
              id: "010102",
              authName: "用户列表",
              path: null,
              children: [
                // 三级权限
                {
                  id: "01010201",
                  authName: "添加用户",
                  path: null,
                },
                {
                  id: "01010202",
                  authName: "删除用户",
                  path: null,
                },
                {
                  id: "01010203",
                  authName: "修改用户",
                  path: null,
                },
              ],
            },
          ],
        },
        {
          id: "0103",
          authName: "权限管理",
          path: null,
          children: [
            // 二级权限
            {
              id: "010301",
              authName: "权限列表",
              path: null,
              children: [
                // 三级权限
                {
                  id: "01030101",
                  authName: "添加权限",
                  path: null,
                },
                {
                  id: "01030102",
                  authName: "删除权限",
                  path: null,
                },
                {
                  id: "01030103",
                  authName: "修改权限",
                  path: null,
                },
              ],
            },
            {
              id: "010302",
              authName: "权限列表",
              path: null,
              children: [
                // 三级权限
                {
                  id: "01030201",
                  authName: "添加权限",
                  path: null,
                },
                {
                  id: "01030202",
                  authName: "删除权限",
                  path: null,
                },
                {
                  id: "01030103",
                  authName: "修改权限",
                  path: null,
                },
              ],
            },
          ],
        },
        {
          id: "0102",
          authName: "商品管理",
          path: null,
          children: [
            // 二级权限
            {
              id: "010201",
              authName: "商品列表",
              path: null,
              children: [
                // 三级权限
                {
                  id: "01020101",
                  authName: "添加商品",
                  path: null,
                },
                {
                  id: "01020102",
                  authName: "删除商品",
                  path: null,
                },
                {
                  id: "01020103",
                  authName: "修改商品",
                  path: null,
                },
              ],
            },
          ],
        },
      ],
      defKeys: [],
      defRightProps: {
        label: "authName",
        children: "children",
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 删除权限
    removeRightById(roleId, rightId) {
      console.log(" 调用接口，删除" + roleId + "角色的" + rightId + "权限");
      // 调用接口，删除角色或权限
    },
    // 获取角色列表
    getList() {
      console.log("调用接口，获取角色列表");
      // 调用接口，获取角色列表
    },
    // 点击分配权限按钮
    handleSetRight(row) {
      console.log("分配权限");
      // 获取权限列表
      // this.data=
      // 获取当前角色的 三级权限id 并选中
      console.log(row);
      console.log(row.children);
      // 嵌套for循环，获取三级节点
      // row.children.forEach((item) => {
      //   // console.log(item.children);
      //   item.children.forEach((item) => {
      //     // console.log(item.children);
      //     item.children.forEach((item) => {
      //       // console.log(item.id);
      //       this.defKeys.push(item.id);
      //     });
      //   });
      // });
      // 递归获取三级节点
      this.setRightDialogVisible = true;
      this.getLeafKeys(row, this.defKeys);
      console.log("选中及半选中的节点");
      console.log(this.defKeys);
    },
    // 递归获取三级节点
    // node 表示当前节点
    // arr 收集三级节点的id
    getLeafKeys(node, arr) {
      if (!node.children) {
        return arr.push(node.id);
      }
      node.children.forEach((item) => {
        this.getLeafKeys(item, arr);
      });
    },
    // 确认分配权限
    setRight() {
      console.log("确认改变选中的权限");
      const Keys = this.$refs.tree.getCheckedKeys();
      console.log("修改后选中及半选中的节点");
      console.log(Keys);
      // 调用接口，改变该角色的权限
      this.setRightDialogVisible = false;
    },
    // 分配权限弹框关闭事件
    setRightsDialogClose() {
      console.log("触发colse事件");
      console.log(this.defKeys);
      console.log("关闭后清空选中及半选中的节点");
      this.defKeys = [];
      console.log(this.defKeys);
      console.log(this.$refs.tree.getCheckedKeys());
      this.$refs.tree.setCheckedKeys([]);
      console.log(this.$refs.tree.getCheckedKeys());
    },
  },
};
</script>

<style>
.el-tag {
  margin: 7px 10px;
}
.boderbottom {
  border-bottom: 1px solid #ccc;
  background: rgb(223, 243, 229);
}
.bodertop {
  border-top: 1px solid #ccc;
}
.vcenter {
  display: flex;
  align-items: center;
}
</style>