<template>
    <div class="wrapper">
        <app-header :user-info="userInfo"></app-header>
        <app-aside :nav-list="navList"></app-aside>
        <div class="content-box" :class="{'content-collapse':collapse}">
            <app-main></app-main>
        </div>
    </div>
</template>

<script>
import { AppHeader, AppAside, AppMain, AppFooter } from './components'
import bus from './components/bus'

export default {
    name: 'layout',
    data () {
        return {
            collapse: false,
            userInfo: {},
            permissionList: [],
            navList: [
                {
                    name: '业务管理',
                    icon: 'nav-icon busi-icon',
                    url: 'buss',
                    children: []
                },
                {
                    name: '日志管理',
                    icon: 'el-icon-tickets',
                    url: 'log',
                    children: []
                },
                {
                    name: '系统设置',
                    icon: 'el-icon-setting',
                    url: 'system',
                    children: []
                }
            ],
            bussChildren: [
                {
                    name: '车辆管理',
                    permission: 'car:view',
                    url: '/buss/cars/manager'
                },
                {
                    name: '学员管理',
                    permission: 'student:view',
                    url: '/buss/students/manager'
                },
                {
                    name: '教练管理',
                    permission: 'coach:view',
                    url: '/buss/coach/manager'
                },
                {
                    name: '终端管理',
                    permission: 'terminal:view',
                    url: '/buss/terminal/manager'
                },
                {
                    name: '轨迹管理',
                    permission: 'track:view',
                    url: '/buss/track/manager'
                }
            ],
            platChildren: [
                {
                    name: '充值消费记录',
                    permission: 'recharge:view',
                    url: '/log/recharge/manager'
                },
                {
                    name: '任务记录',
                    permission: 'task:view',
                    url: '/log/task/manager'
                }
            ],
            systemChildren: [
                {
                    name: '系统角色管理',
                    permission: 'role:view',
                    url: '/system/role/manager'
                },
                {
                    name: '系统用户管理',
                    permission: 'user:view',
                    url: '/system/user/manager'
                },
                {
                    name: '平台设置',
                    permission: 'platform:view',
                    url: '/system/platform/manager'
                },
                {
                    name: '任务执行',
                    permission: 'task:view',
                    url: '/system/performTask/manager'
                }
            ]
        }
    },
    created () {
        bus.$on('collapse', msg => {
            this.collapse = msg
        })
        if (this.$cookie.get('isLogin') === 'true') {
            this.$axios.post('/me').then(res => {
                if (res && res.data) {
                    this.userInfo = res.data
                    res.data.permissions.forEach(item => {
                        this.permissionList.push(item.authority)
                    })
                    this.$cookie.set('permissions', this.permissionList)
                    this.filterPermiss(this.bussChildren, this.navList[0].children)
                    this.filterPermiss(this.platChildren, this.navList[1].children)
                    this.filterPermiss(this.systemChildren, this.navList[2].children)
                }
            })
        } else {
            this.$router.push({path: '/login'})
        }
    },
    methods: {
        filterPermiss (childrenList, parentListNum) {
            if (this.permissionList.length > 0) {
                if (this.permissionList.indexOf('*') !== -1) {
                    childrenList.forEach((item3, index3) => {
                        parentListNum.push(item3)
                    })
                } else {
                    childrenList.forEach((item1, index1) => {
                        this.permissionList.forEach((item2, index2) => {
                            if (item1.permission === item2) {
                                parentListNum.push(item1)
                            }
                        })
                    })
                }
            }
        }
    },
    components: {
        AppHeader,
        AppAside,
        AppMain,
        AppFooter
    }
}
</script>

<style rel="stylesheet/scss" lang="less">
    .el-container {
        height: 100%;
    }
</style>
