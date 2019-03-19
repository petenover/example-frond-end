<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu"
             :default-active="$route.path.indexOf('/detail') !== -1 ? $route.path.replace(/detail/g, 'list') : $route.path"
             :collapse="collapse"
             background-color="#324157"
             text-color="#bfcbd9"
             active-text-color="#20a0ff"
             unique-opened
             router>
      <template v-for="nav in navList">
        <template v-if="nav.children.length > 0">
          <el-submenu :index="nav.url" :key="nav.url">
            <template slot="title">
              <i :class="nav.icon"></i><span class="m-l" slot="title">{{ nav.name }}</span>
            </template>
            <el-menu-item 
              v-for="(subItem,i) in nav.children" 
              :key="i" 
              :index="subItem.url"
              v-permission="subItem.permission">
              {{ subItem.name }}
            </el-menu-item>
          </el-submenu>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
  import bus from './bus'
  export default {
    name: 'AppAside',
    props: {
      navList: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    data () {
      return {
        collapse: false
      }
    },
    created () {
      bus.$on('collapse', msg => {
        this.collapse = msg
      })
    }
  }
</script>

<style scoped lang="less">
  .sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 60px;
    bottom: 0;
    overflow-y: scroll;
  }

  .sidebar::-webkit-scrollbar {
    width: 0;
  }

  .sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
  }

  .sidebar > ul {
    height: 100%;
  }

  .m-l {
    margin-left: 15px;
  }

  .el-submenu__title i::before {
    color: #bfcbd9;
  }

  .el-submenu .el-menu-item {
    padding-left: 65px !important;
  }
</style>
