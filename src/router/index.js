import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../view/layout/Layout'

const _import = file => () => import('@/view/' + file + '.vue')
const template = {template: '<router-view></router-view>'}

Vue.use(Router)

/* Layout */

export default new Router({
  routes: [
    {path: '/login', component: _import('login/login'), name: 'login'},
    {path: '/test', component: _import('test'), name: 'test'},
    {path: '/404', component: _import('404/404'), name: '404'},
    {
      path: '',
      redirect: '/login'
    },
    { // 系统设置
      meta: {name: '系统设置'},
      path: '/system',
      redirect: '/system/user/manager',
      component: Layout,
      children: [
        { // 系统用户管理
          meta: {name: '系统用户管理'},
          path: 'user',
          component: template,
          children: [
            {
              path: '/',
              redirect: 'manager'
            },
            {
              meta: {name: '列表'},
              path: 'manager',
              component: _import('user/UserManager')
            },
            {
              meta: {name: '编辑'},
              path: 'detail',
              component: _import('user/UserDetail')
            }
          ]
        },
        { // 系统角色管理
          meta: {name: '系统角色管理'},
          path: 'role',
          component: template,
          children: [
            {
              path: '/',
              redirect: 'manager'
            },
            {
              meta: {name: '列表'},
              path: 'manager',
              component: _import('role/RoleManager')
            },
            {
              meta: {name: '编辑'},
              path: 'detail',
              component: _import('role/RoleDetail')
            }
          ]
        }
      ]
    }
  ]
})
