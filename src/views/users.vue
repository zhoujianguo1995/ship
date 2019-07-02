<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="navBreadcrumb">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 输入框 -->
    <el-row type="flex" class="row-bg">
      <el-col :span="6">
        <div>
          <el-input
            placeholder="请输入内容"
            v-model="inputModel"
            class="input-with-select"
            @keyup.enter.native="inputKeyup"
          >
            <el-button slot="append" icon="el-icon-search" @click="appClick"></el-button>
          </el-input>
        </div>
      </el-col>
      <el-col :span="6">
        <el-button type="success" plain>添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话号码"></el-table-column>
      <el-table-column prop="address" label="用户状态">
        <template v-slot="{row}">
          <el-switch
            v-model="row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @click="switClick"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template v-slot="{row}">
          <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
          <el-button type="danger" icon="el-icon-delete" plain size="mini" @click="delOpen(row.id)"></el-button>
          <el-button type="success" icon="el-icon-check" plain size="mini">分配角色</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="pagesize"
      :current-page="currentpage"
      @current-change="onPageChange"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      currentpage: 1,
      pagesize: 3,
      query: "",
      total: 0,
      inputModel: ""
    };
  },
  created() {
    this.getAxios();
  },
  methods: {
    //发生axios，拿取数据
    getAxios() {
      this.$http({
        url: "users",
        params: {
          query: this.query,
          pagenum: this.currentpage,
          pagesize: this.pagesize
        }
      }).then(res => {
        let {
          data: { data, meta }
        } = res;
        if (meta.status === 200) {
          this.tableData = data.users
          this.total = data.total
        }
      })
    },
    //改变switch状态的时候
    switClick() {
      this.value = !this.value
    },
    //分页器的改变的时候，重新发送axios，拿取数据
    onPageChange(page) {
      this.currentpage = page
      this.getAxios()
    },
    //查询功能
    appClick() {
      this.query = this.inputModel
      this.getAxios()
    },
    //回车确认
    inputKeyup() {
      this.query = this.inputModel
      this.getAxios()
    },
    //点击删除，弹出提示,删除功能
    delOpen(id) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http({
            url: `users/${id}`,
            method: "delete"
          }).then(res => {
            console.log(res)
            if (res.data.meta.status === 200) {
              this.$message({
                type: "success",
                message: res.data.meta.msg
              })
              this.currentpage = 1
              this.getAxios()
            }
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          })
        })
    }
  }
}
</script>

<style lang="less">
.el-pagination.is-background {
  text-align: left;
}
.el-breadcrumb.navBreadcrumb {
  font-size: 16px;
  height: 50px;
  line-height: 50px;
  background-color: #d4dae0;
  padding-left: 10px;
}
</style>
