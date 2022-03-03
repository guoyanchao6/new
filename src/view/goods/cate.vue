<template>
  <div>
    <!-- 头部面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-button type="primary" style="margin-bottom: 10px">添加分类</el-button>
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
            @click="editCate(scope.row)"
            >编辑</el-button
          >
          <el-button
            class="el-icon-delete"
            type="danger"
            size="mini"
            @click="deleteCate(scope.row)"
            >删除</el-button
          >
        </template>
      </zk-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
      data: [
        {
          name: "大家电", //一级
          isOk: "true",
          order: 1,
          children: [
            {
              name: "电视", // 二级
              isOk: "false",
              order: 2,
              children: [
                {
                  name: "曲面电视", // 三级
                  isOk: "false",
                  order: 3,
                },
                {
                  name: "海信",
                  isOk: "true",
                  order: 3,
                },
              ],
            },
            {
              name: "洗衣机",
              isOk: "true",
              order: 2,
              children: [
                {
                  name: "海棠", // 三级
                  isOk: "false",
                  order: 3,
                },
                {
                  name: "海尔",
                  isOk: "true",
                  order: 3,
                },
              ],
            },
          ],
        },
        {
          name: "数码",
          isOk: "true",
          order: 1,
          children: [
            {
              name: "电脑",
              isOk: "false",
              order: 2,
              children: [
                {
                  name: "联想",
                  isOk: "false",
                  order: 3,
                },
                {
                  name: "苹果",
                  isOk: "true",
                  order: 3,
                },
              ],
            },
            {
              name: "手机",
              isOk: "true",
              order: 2,
              children: [
                {
                  name: "小米",
                  isOk: "false",
                  order: 3,
                },
                {
                  name: "iPhon",
                  isOk: "true",
                  order: 3,
                },
              ],
            },
          ],
        },
      ],
      columns: [
        {
          label: "分类名称",
          prop: "name",
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
    };
  },
  methods: {
    editCate(row) {
      console.log(row);
    },
    deleteCate(row) {
      console.log(row);
    },
  },
};
</script>

<style>
</style>