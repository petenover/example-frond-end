import axios from 'axios'
import Qs from 'qs'
import { Loading, Message } from 'element-ui'

export default {
	install (Vue, options = {}) {
		// 创建axios实例
		const service = axios.create(Object.assign({
			baseURL: process.env.BASE_ROOT,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			// #transformRequest 允许在向服务器发送前，修改传递参数
			// #这里通过Qs.stringify转换为表单查询参数
			transformRequest: [data => {
				return Qs.stringify(data)
			}],
			// 设置允许跨域
			withCredentials: true,
			timeout: 30000
		}, options))
		var loadinginstace
		service.interceptors.request.use(config => {
			loadinginstace = Loading.service({
				lock: true,
				text: '加载中……',
				background: 'rgba(0, 0, 0, 0.7)'
			})
			return config
		}, error => {
			loadinginstace.close()
			Message.error({
				message: '加载超时'
			})
			return Promise.reject(error)
		})
		service.interceptors.response.use(response => {
			loadinginstace.close()
			return response
		}, error => {
			loadinginstace.close()
			Message.error({
				message: '加载失败'
			})
			return Promise.reject(error)
		})
		Vue.axios = Vue.prototype.$axios = service
	}
}
