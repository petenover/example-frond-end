// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import '@/styles/index.css'

import Axios from './api/index'

import Directive from './common/directives/directive'

import Filter from './common/filters/filter'

import VueCookie from 'vue-cookie'

import global from './components/tool/Global'

/* element-ui */
import Element from 'element-ui'

import App from './App'
import router from './router'

import Print from './plugs/print'
Vue.use(Print)

Vue.use(Element, { size: 'small' })

/* vue-cookis */
Vue.use(VueCookie)

/* vue directive */
Vue.use(Directive)

/* vue filters */
Vue.use(Filter)

/* axios */
Vue.use(Axios)

Vue.prototype.GLOBAL = global

Vue.prototype.goBack = function () {
    router.back(-1)
}

// 路由跳转时进行的一些判断
router.beforeEach((to, from, next) => {
    // 是否清除查询参数
    if (from.path !== '/' && from.matched.length > 0) {
        let listLength = to.matched.length >= from.matched.length ? from.matched.length : to.matched.length
        for (let i = 0; i < listLength - 1; i++) {
            if (from.matched[i].path !== to.matched[i].path) {
                VueCookie.delete('_queryParams')
                break
            }
        }
    } else if (from.path === '/') {
        VueCookie.delete('_queryParams')
    }
    next()
})

// eslint-disable-next-line
/* eslint-disable */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    data: {},
    created () {
        // response响应拦截器
        this.$axios.interceptors.response.use(response => {
            let resData = response.data
            // 对响应数据做点什么
            switch (resData && resData.code) {
                case 401:
                    // 先存储当前访问页面
                    // if (this.$route.path !== '/login') this.temporaryUrl = {path: this.$route.path, query: this.$route.query}
                    // 未登录提示
                    this.$message.warning('请先登录')
                    // 跳转到登录页
                    this.$router.push('/login')
                    break
                case 0:
                    response.config.method === 'post' && this.$notify.success({
                        title: '操作成功'
                    })
                    return resData
                default:
                    this.$notify.error({
                        title: '错误 ' + (resData.code),
                        message: resData.msg || '出错了'
                    })
            }
        }, error => {
            // 对响应错误做点什么
            if (error && error.response) {
                switch (error.response.status) {
                    case 504:
                        this.$notify.error({
                            title: '504错误',
                            message: '请求超时，请稍后重试'
                        })
                        break
                    case 502:
                        this.$notify.error({
                            title: '502错误',
                            message: '服务器异常'
                        })
                        break
                    case 404:
                        this.$router.push('/404')
                        break
                    default:
                        this.$notify.error({
                            title: error.response.status,
                            message: '未知错误'
                        })
                }
            }
            return Promise.reject(error)
        })
    },
    components: { App }
})
