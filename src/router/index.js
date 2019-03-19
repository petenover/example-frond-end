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
      redirect: '/system/user/manager'
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
        },
        { // 平台设置
          meta: {name: '平台设置'},
          path: 'platform',
          component: template,
          children: [
            {
              path: '/',
              redirect: 'manager'
            },
            {
              meta: {name: '列表'},
              path: 'manager',
              component: _import('platform/platformManager')
            },
            {
              meta: {name: '编辑'},
              path: 'detail',
              component: _import('platform/platformDetail')
            }
          ]
        },
        { // 任务执行
          meta: {name: '任务执行'},
          path: 'performTask',
          component: template,
          children: [
            {
              path: '/',
              redirect: 'manager'
            },
            {
              meta: {name: '列表'},
              path: 'manager',
              component: _import('performTask/performTaskManager')
            }
          ]
        }
      ]
    },
    { // 日志管理
      meta: {name: '日志管理'},
      path: '/log',
      redirect: '/log/recharge/manager',
      component: Layout,
      children: [
        { // 充值消费记录
          meta: {name: '充值消费记录'},
          path: 'recharge',
          component: template,
          children: [
            {
              path: '/',
              redirect: 'manager'
            },
            {
              meta: {name: '列表'},
              path: 'manager',
              component: _import('recharge/rechargeManager')
            }
          ]
        },
        { // 任务记录
          meta: {name: '任务记录'},
          path: 'task',
          component: template,
          children: [
            {
              path: '/',
              redirect: 'manager'
            },
            {
              meta: {name: '列表'},
              path: 'manager',
              component: _import('task/taskManager')
            }
          ]
        }
      ]
    },
    { // 业务
      meta: {name: '业务管理'},
      path: '/buss',
      redirect: '/buss/cars/manager',
      component: Layout,
      children: [
        { // 车辆管理
          meta: {name: '车辆管理'},
          path: 'cars',
          component: template,
          children: [
            {
              path: '/',
              redirect: 'manager'
            },
            {
              meta: {name: '列表'},
              path: 'manager',
              component: _import('cars/carsManager')
            },
            {
              meta: {name: '编辑'},
              path: 'detail',
              component: _import('cars/carsDetail')
            }
          ]
        },
        { // 学员管理
          meta: {name: '学员管理'},
          path: 'students',
          component: template,
          children: [
            {
              path: '/',
              redirect: 'manager'
            },
            {
              meta: {name: '列表'},
              path: 'manager',
              component: _import('students/studentsManager')
            },
            {
              meta: {name: '编辑'},
              path: 'detail',
              component: _import('students/studentsDetail')
            }
          ]
        },
        { // 教练员管理
          meta: {name: '教练员管理'},
          path: 'coach',
          component: template,
          children: [
            {
              path: '/',
              redirect: 'manager'
            },
            {
              meta: {name: '列表'},
              path: 'manager',
              component: _import('coachs/coachManager')
            },
            {
              meta: {name: '编辑'},
              path: 'detail',
              component: _import('coachs/coachDetail')
            }
          ]
        },
        { // 终端管理
          meta: {name: '终端管理'},
          path: 'terminal',
          component: template,
          children: [
            {
              path: '/',
              redirect: 'manager'
            },
            {
              meta: {name: '列表'},
              path: 'manager',
              component: _import('terminal/terminalManager')
            },
            {
              meta: {name: '编辑'},
              path: 'detail',
              component: _import('terminal/terminalDetail')
            }
          ]
        },
        { // 轨迹管理
          meta: {name: '轨迹管理'},
          path: 'track',
          component: template,
          children: [
            {
              path: '/',
              redirect: 'manager'
            },
            {
              meta: {name: '列表'},
              path: 'manager',
              component: _import('track/trackManager')
            },
            {
              meta: {name: '编辑'},
              path: 'detail',
              component: _import('track/trackDetail')
            }
          ]
        }
      ]
    }
  ]
})
