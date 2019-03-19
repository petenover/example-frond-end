import VueCookie from 'vue-cookie'
export default {
    install (Vue) {
        Vue.directive('permission', {
            bind (el, binding) {
                let permissionList = VueCookie.get('permissions') ? VueCookie.get('permissions') : ''
                if (permissionList && permissionList.length > 0) {
                    if (permissionList.indexOf('*') !== -1) {
                        el.style.display = 'inline-block'
                    } else if (permissionList.indexOf(binding.value) !== -1) {
                        el.style.display = 'inline-block'
                    } else {
                        el.style.display = 'none'
                    }
                }
            }
        })
    }
}
