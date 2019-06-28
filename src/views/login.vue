<template>
  <el-row type="flex" class="row-bg rowbox" justify="center" align="middle">
    <el-col :xs="14" :sm="12" :md="10" :lg="8" :xl="6">
      <el-form ref="form" :model="form" label-width="80px" label-position="top">
        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">登录</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "admin",
        password: "123456"
      }
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>

<style lang="less">
  .el-form {
    min-width: 400px;
    padding: 30px 20px;
    background-color: #fff;
    border-radius: 10px;
  }

  .rowbox {
    height: 100%;
    width: 100%;
    background-color: #2D434C;
  }
</style>
