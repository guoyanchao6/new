<template>
  <div>
    <!-- 头部面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-button
        type="primary"
        style="margin-bottom: 10px"
        @click="handleAddCate"
        >添加分类</el-button
      >
      <zk-table
        ref="table"
        sum-text="sum"
        index-text="#"
        :data="data"
        :columns="columns"
        :stripe="props.stripe"
        :border="props.border"
        :show-header="props.showHeader"
        :show-summary="props.showSummary"
        :show-row-hover="props.showRowHover"
        :show-index="props.showIndex"
        :tree-type="props.treeType"
        :is-fold="props.isFold"
        :expand-type="props.expandType"
        :selection-type="props.selectionType"
      >
        <template slot="isOk" slot-scope="scope">
          <i
            class="el-icon-success"
            v-if="scope.row.isOk === 'true'"
            style="color: lightgreen"
          ></i>
          <i class="el-icon-error" v-else style="color: red"></i>
        </template>
        <template slot="order" scope="scope">
          <el-tag type="success" v-if="scope.row.order === 1">一级</el-tag>
          <el-tag type="primary" v-if="scope.row.order === 2">二级</el-tag>
          <el-tag type="warning" v-if="scope.row.order === 3">三级</el-tag>
        </template>
        <template slot="operater" scope="scope">
          <el-button
            class="el-icon-edit"
            type="primary"
            size="mini"
            @click="handelEditCate(scope.row)"
            >编辑</el-button
          >
          <el-button
            class="el-icon-delete"
            type="danger"
            size="mini"
            @click="handleDeleteCate(scope.row)"
            >删除</el-button
          >
        </template>
      </zk-table>
      <!-- 添加分类对话框 -->
      <el-dialog
        title="添加分类"
        :visible.sync="addCateDialogVisible"
        width="30%"
        @close="handleClose"
      >
        <el-form
          :model="addForm"
          label-width="80px"
          ref="formRef"
          :rules="rules"
        >
          <el-form-item label="分类名称" prop="cateName">
            <el-input v-model="addForm.cateName"></el-input>
          </el-form-item>
          <!-- 级联选择器 -->
          <el-form-item label="父级分类" prop="catePid" v-if="isAdd">
            <el-cascader
              v-model="addForm.catePid"
              :options="options"
              :props="cascaderProps"
              @change="handleChange"
            >
            </el-cascader>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addCateDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addCate">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 修改分类对话框 -->
      <el-dialog
        title="修改分类"
        :visible.sync="editCateDialogVisible"
        width="30%"
        @close="handleClose"
      >
        <el-form
          :model="addForm"
          label-width="80px"
          ref="formRef"
          :rules="rules"
        >
          <el-form-item label="分类名称" prop="cateName">
            <el-input v-model="addForm.cateName"></el-input>
          </el-form-item>
          <!-- 级联选择器 -->
          <el-form-item label="父级分类" prop="catePid" v-if="isAdd">
            <el-cascader
              v-model="addForm.catePid"
              :options="options"
              :props="cascaderProps"
              @change="handleChange"
            >
            </el-cascader>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addCateDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addCate">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 展开表格属性控制
      props: {
        stripe: true, // 是否隔行变色
        border: false, // 是否显示边框
        showHeader: true, // 是否显示表头
        showSummary: false, // 是否显示表尾合计行
        showRowHover: false, // 鼠标悬停时，是否高亮当前行
        showIndex: true, // 是否显示数据索引
        treeType: true, // 是否为树形表格
        isFold: true, // 树形表格中父级是否默认折叠
        expandType: false, // 是否为展开行类型表格
        selectionType: false, // 是否为多选类型表格
      },
      // 展开表格的树形数据
      data: [
        {
          cate_id: "01",
          cat_name: "大家电", //一级
          isOk: "true",
          order: 1,
          children: [
            {
              cate_id: "0101",
              cat_name: "电视", // 二级
              isOk: "false",
              order: 2,
              children: [
                {
                  cate_id: "010101",
                  cat_name: "曲面电视", // 三级
                  isOk: "false",
                  order: 3,
                },
                {
                  cate_id: "010102",
                  cat_name: "海信",
                  isOk: "true",
                  order: 3,
                },
              ],
            },
            {
              cate_id: "0102",
              cat_name: "洗衣机",
              isOk: "true",
              order: 2,
              children: [
                {
                  cate_id: "010201",
                  cat_name: "海棠", // 三级
                  isOk: "false",
                  order: 3,
                },
                {
                  cate_id: "010202",
                  cat_name: "海尔",
                  isOk: "true",
                  order: 3,
                },
              ],
            },
          ],
        },
        {
          cate_id: "02",
          cat_name: "数码",
          isOk: "true",
          order: 1,
          children: [
            {
              cate_id: "0201",
              cat_name: "电脑",
              isOk: "false",
              order: 2,
              children: [
                {
                  cate_id: "020101",
                  cat_name: "联想",
                  isOk: "false",
                  order: 3,
                },
                {
                  cate_id: "020102",
                  cat_name: "苹果",
                  isOk: "true",
                  order: 3,
                },
              ],
            },
            {
              cate_id: "0202",
              cat_name: "手机",
              isOk: "true",
              order: 2,
              children: [
                {
                  cate_id: "020201",
                  cat_name: "小米",
                  isOk: "false",
                  order: 3,
                },
                {
                  cate_id: "020202",
                  cat_name: "iPhon",
                  isOk: "true",
                  order: 3,
                },
              ],
            },
          ],
        },
      ],
      // 展开表格配置对象
      columns: [
        {
          label: "分类名称",
          prop: "cat_name",
          minWidth: "100px",
        },
        {
          label: "是否有效",
          prop: "isOk",
          minWidth: "50px",
          //   表示当前列为模板列
          type: "template",
          //   当前模板列的名称
          template: "isOk",
        },
        {
          label: "排序",
          prop: "order",
          minWidth: "50px",
          //   表示当前列为模板列
          type: "template",
          //   当前模板列的名称
          template: "order",
        },
        {
          label: "操作",
          prop: "operater",
          minWidth: "200px",
          //   表示当前列为模板列
          type: "template",
          //   当前模板列的名称
          template: "operater",
        },
      ],
      addCateDialogVisible: false,
      addForm: {
        cateName: "",
        cateId: "",
        cateLevel: "0",
        catePid: [0],
      },
      // 级联选择器的配置对象
      cascaderProps: {
        label: "cat_name",
        value: "cate_id",
        children: "children",
        checkStrictly: true,
        expandTrigger: "hover",
      },
      options: [
        {
          cate_id: "01",
          cat_name: "大家电", //一级
          isOk: "true",
          order: 1,
          children: [
            {
              cate_id: "0101",
              cat_name: "电视", // 二级
              isOk: "false",
              order: 2,
            },
            {
              cate_id: "0102",
              cat_name: "洗衣机",
              isOk: "true",
              order: 2,
            },
          ],
        },
        {
          cate_id: "02",
          cat_name: "数码",
          isOk: "true",
          order: 1,
          children: [
            {
              cate_id: "0201",
              cat_name: "电脑",
              isOk: "false",
              order: 2,
            },
            {
              cate_id: "0202",
              cat_name: "手机",
              isOk: "true",
              order: 2,
            },
          ],
        },
      ],
      rules: {
        cateName: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
        ],
      },
      editCateDialogVisible: false,
    };
  },
  methods: {
    handleAddCate() {
      console.log("添加分类");
      this.addCateDialogVisible = true;
    },
    handelEditCate(row) {
      console.log("编辑分类");
      console.log(row);
      // cat_name: "电视"
      // cate_id: "0101"
      // children: Array(2)
      // isOk: "false"
      // order: 2
      this.addForm = row;
      this.addCateDialogVisible = true;
    },
    handleDeleteCate(row) {
      console.log("删除分类");
      console.log(row);
      console.log(row.cat_name);
    },
    handleClose() {
      console.log("关闭添加对话框");
      this.$refs.formRef.resetFields();
      this.addCateDialogVisible = false;
    },
    addCate() {
      console.log("确认添加分类");
      this.$refs.formRef.validate((valid) => {
        if (!valid) {
          this.$message.warning("请输入分类名");
        } else {
          console.log("发请请求，添加分类");
          this.addForm.cateLevel = this.addForm.catePid.length;
          console.log(this.addForm);
          this.addCateDialogVisible = false;
        }
      });
    },
    handleChange(e) {
      console.log("选择父级分类");
      console.log(e);
    },
  },
};
</script>

<style>
.el-cascader {
  width: 100%;
}
</style>