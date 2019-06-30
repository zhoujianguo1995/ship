<template>
  <el-container>
    <el-header>
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <img src="../assets/img/logo.png" />
          </div>
        </el-col>
        <el-col>
          <div class="grid-content bg-purple-light">
            <h1>品优购后台管理系统</h1>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple header-right">
            欢迎39期星耀会员
            <a href="#">退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>

    <el-container>
      <el-aside width="200px">
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            :unique-opened="true"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>用户管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1">用户管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>权限管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="2-1">角色列表</el-menu-item>
                <el-menu-item index="2-2">权限列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>商品管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="3-1">商品列表</el-menu-item>
                <el-menu-item index="3-2">分类参数</el-menu-item>
                <el-menu-item index="3-3">商品分类</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>订单管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="4-1">订单列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>数据管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="5-1">数据报表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
      </el-aside>

      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<style lang="less">
.el-container .el-header {
  background-color: #b3c1cd;
  padding: 0px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
  height: 100%;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
.grid-content {
  min-height: 36px;
}
.row-bg,
.el-col,
.el-container {
  height: 100%;
}

.grid-content.bg-purple {
  img {
    width: 200px;
  }
}
.grid-content.bg-purple-light h1 {
  font-size: 28px;
  color: #fff;
  margin: 0;
  text-align: center;
}

.grid-content.bg-purple-light {
  padding-top: 10px;
}

.header-right {
  font-weight: bolder;
  text-align: right;
  padding-right: 20px;
  line-height: 36px;
  margin-top: 8px;
  a {
    color: orange;
    text-decoration: none;
    margin-left: 5px;
  }
}

.el-menu-vertical-demo.el-menu {
  height: 100%;
}
</style>