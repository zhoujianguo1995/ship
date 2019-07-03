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
            <el-button type="text" @click="delClick" style="color: orange;font-weight: 700; font-size: 16px;">退出</el-button>
          </div>
        </el-col>
      </el-row>
    </el-header>

    <el-container>
      <el-aside width="200px">
          <el-menu
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            :unique-opened="true"
            :router="true"
          >
            <el-submenu  v-for="item in permission" :key="item.id" :index="item.order + ''">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{item.authName}}</span>
              </template>
                <el-menu-item v-for="item2 in item.children" :key="item2.id" :index="'/'+item2.path"><i class="el-icon-menu"></i>{{item2.authName}}</el-menu-item>
            </el-submenu>

          </el-menu>
      </el-aside>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    data() {
      return {
        permission: ''
      }
    },
    created() {
      this.$http({
        url: "menus",
        headers: {"Authorization": localStorage.getItem("token")}
      }).then(res => {
        let {data :{data,meta}} =res
        if (meta.status === 200) {
          this.permission = data                              
        }   
      })
    },
    methods: {
      delClick() {
        this.$confirm('此操作将退出, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          localStorage.removeItem("token")
          this.$router.push("/")
          this.$message({
            type: 'success',
            message: '退出成功!'
          });       
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          });          
        });
        
      }
    },
  }
  
</script>


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
}
.grid-content {
  min-height: 36px;
}
.row-bg,
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
}

.el-menu-vertical-demo.el-menu {
  height: 100%;
}
</style>