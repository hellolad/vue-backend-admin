<template>
  <el-row class="container">

    <!-- header -->
    <el-col :span="24" class="header">
      <el-row>
        <el-col :span="10" class="logo">VUEADMIN</el-col>
        <el-col :span="10">
          <div class="tools">
            <i class="el-icon-more-outline"></i>
          </div>
        </el-col>
        <el-col :span="4" class="userinfo">Amdmin</el-col>
      </el-row>
    </el-col>

    <!-- main -->
    <el-col :span="24" class="main">
      <aside class="menu-expanded">

        <!-- 导航菜单 -->
        <el-menu :default-active="$route.path" router>
          <template v-for="(item, index) in $router.options.routes">
            <template v-if="!item.hidden">
              <el-submenu :key="index" :index="index+''" v-if="!item.leaf">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{ item.name }}</span>
              </template>
              <el-menu-item v-for="(child, index2) in item.children" :index="child.path" :key="child.path">
                <i :class="item.children[index2].icon"></i>
                <span>{{ item.children[index2].name }}</span> 
              </el-menu-item>
            </el-submenu>
            <el-menu-item :index="item.children[0].path" :key="index" v-if="item.leaf&&item.children.length>0">
              <i :class="item.children[0].icon"></i>
              <span>{{ item.children[0].name }}</span>
            </el-menu-item>
            </template>
          </template>
        </el-menu>
      </aside>

      <!-- 主要内容 -->
      <section class="content-container">

        <!-- 名字 面包屑 -->
        <el-col :span="24" class="breadcrumb-container">
          <strong class="title">{{ $route.name }}</strong>
          <el-breadcrumb separator="/" class="breadcrumb-inner">
            <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
              {{ item.name }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>

        <!-- 主模块 -->
        <el-col :span="24" class="content-wrapper">
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </el-col>
      </section>
    </el-col>

  </el-row>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
@import "../styles/vars.less";

.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
  .header {
    height: 60px;
    line-height: 60px;
    background: @primary-color;
    color: #fff;
    .logo {
      width: 230px;
      height: 60px;
      font-size: 22px;
      padding-left: 20px;
      padding-right: 20px;
      border-color: rgba(238, 241, 146, 0.3);
      border-right-width: 1px;
      border-right-style: solid;
      box-sizing: border-box;
    }
    .tools {
      padding: 0px 23px;
      width: 14px;
      height: 60px;
      line-height: 60px;
      cursor: pointer;
      box-sizing: border-box;
    }
    .userinfo {
      text-align: right;
      padding-right: 35px;
      float: right;
      box-sizing: border-box;
    }
  }
  .main {
    display: flex;
    position: absolute;
    top: 60px;
    bottom: 0px;
    overflow: hidden;
    aside {
      flex: 0 0 230px;
      width: 230px;
      .el-menu {
        height: 100%;
      }
    }
    .menu-expanded {
      flex: 0 0 230px;
      width: 230px;
    }
    .content-container {
      flex: 1;
      overflow-y: scroll;
      .breadcrumb-container {
        padding: 20px;
        box-sizing: border-box;
        
        background: #fff;
        .title {
          width: 200px;
          float: left;
          color: #475669;
        }
        .breadcrumb-inner {
          float: right;
        }
      }
      .content-wrapper {
        border-top: 1px solid #e6e6e6;
        background: #fff;
        box-sizing: border-box;
        background: #fff;
        padding: 20px;
        box-sizing: border-box;
      }
    }
  }
}
</style>
