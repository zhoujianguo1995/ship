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
      <!-- 添加用户 -->
      <el-col :span="6">
        <el-button type="success" plain @click="dialogFormVisible = true">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 添加的模态框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible" @close="$refs.addform.resetFields()">
      <el-form
        :model="addform"
        :rules="addformCheck"
        ref="addform"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户" prop="username">
          <el-input v-model="addform.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addform.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addform.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="addform.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="addFormClick('addform')">确认</el-button>
      </div>
    </el-dialog>
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
            @change="switClick(row.id,row.mg_state)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template v-slot="{row}">
          <el-button type="primary" icon="el-icon-edit" plain size="mini" @click="modifyClick(row)"></el-button>
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
    <!-- 修改的模态框 -->
    <el-dialog title="修改用户信息" :visible.sync="modifyDialogFormVisible">
      <el-form :model="modifyForm" :rules="modifyRules" ref="modifyForm">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-tag type="info">{{modifyForm.username}}</el-tag>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input autocomplete="off" v-model="modifyForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth" prop="mobile">
          <el-input autocomplete="off" v-model="modifyForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="modifyDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="modifySubmitForm('modifyForm')">确 定</el-button>
      </div>
    </el-dialog>
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
      inputModel: "",
      //添加模态框的数据
      dialogFormVisible: false,
      addform: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      formLabelWidth: "100px",
      addformCheck: {
        username: [
          { required: true, message: "请输入用户", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "change" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 11,
            message: "长度在 3 到 11 个字符",
            trigger: "change",
            pattern: /^\w+$/
          }
        ],
        email: [
          {
            pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
            message: "邮箱格式不正确",
            trigger: "change"
          }
        ],
        mobile: [
          {
            pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
            message: "手机号码格式不正确",
            trigger: "change"
          }
        ]
      },
      //修改模态框数据
      modifyDialogFormVisible: false,
      modifyForm: {
        username: "",
        email: "",
        mobile: "",
        id: ""
      },
      modifyRules: {
        email: [
          {
            pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
            message: "邮箱格式不正确",
            trigger: "change"
          }
        ],
        mobile: [
          {
            pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
            message: "手机号码格式不正确",
            trigger: "change"
          }
        ]
      }
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
          this.tableData = data.users;
          this.total = data.total;
        }
      });
    },
    //改变switch状态的时候
    switClick(id, mg_state) {
      this.$http({
        url: `users/${id}/state/${mg_state}`,
        method: "put"
      }).then(res => {
        let {
          data: { meta }
        } = res;
        if (meta.status === 200) {
          this.$message({
            message: meta.msg,
            type: "success",
            duration: 1000
          });
        }
      });
    },
    //分页器的改变的时候，重新发送axios，拿取数据
    onPageChange(page) {
      this.currentpage = page;
      this.getAxios();
    },
    //查询功能
    appClick() {
      this.query = this.inputModel;
      this.getAxios();
    },
    //回车确认
    inputKeyup() {
      this.query = this.inputModel;
      this.getAxios();
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
            console.log(res);
            if (res.data.meta.status === 200) {
              this.$message({
                type: "success",
                message: res.data.meta.msg
              });
              this.currentpage = 1;
              this.getAxios();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //添加用户功能
    addFormClick(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http({
            url: "users",
            method: "post",
            data: this.addform
          }).then(res => {
            let {
              data: { meta }
            } = res;
            if (meta.status === 201) {
              this.$message({
                message: meta.msg,
                type: "success"
              });
              this.getAxios();
              this.dialogFormVisible = false;
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //打开修改模态框
    modifyClick(row) {
      this.modifyDialogFormVisible = true;
      this.modifyForm.username = row.username;
      this.modifyForm.email = row.email;
      this.modifyForm.mobile = row.mobile;
      this.modifyForm.id = row.id;
    },
    //修改功能的实现
    modifySubmitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http({
            url: `users/${this.modifyForm.id}`,
            method: "put",
            data: {
              email: this.modifyForm.email,
              mobile: this.modifyForm.mobile
            }
          }).then(res => {
            let {
              data: { meta }
            } = res;
            if (meta.status === 200) {
              this.$message({
                message: meta.msg,
                type: "success"
              })
              this.modifyDialogFormVisible = false
              this.getAxios()
            }    
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
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
.el-button.el-button--success.is-plain {
  margin-left: 20px;
}
</style>
