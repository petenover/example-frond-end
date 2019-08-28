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
                    name: '系统设置',
                    icon: 'el-icon-setting',
                    url: 'system',
                    children: []
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
                }
            ]
        }
    },
    created () {
        bus.$on('collapse', msg => {
            this.collapse = msg
        })
        if (this.$cookie.get('isLogin') === 'true') {
            this.$axios.get('/me').then(res => {
                if (res && res.data) {
                    this.userInfo = res.data
                    res.data.permissions.forEach(item => {
                        this.permissionList.push(item.authority)
                    })
                    this.$cookie.set('permissions', this.permissionList)
                    this.$cookie.set('flag', this.userInfo.flag)
                    this.$cookie.set('userId', this.userInfo.id)
                    this.filterPermiss(this.systemChildren, this.navList[0].children)
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
