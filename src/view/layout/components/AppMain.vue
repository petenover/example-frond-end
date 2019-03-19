<template>
    <div class="content">
		<app-breadcrumds></app-breadcrumds>
        <router-view></router-view>
    </div>
</template>
<script>
	import bus from './bus'
	import AppBreadcrumds from './AppBreadcrumds'
	export default {
		name: 'AppMain',
		data () {
			return {
				collapse: false
			}
		},
		created () {
			bus.$on('collapse', msg => {
                this.collapse = msg
            })
		},
		components: {
			AppBreadcrumds
		}
	}
</script>
<style rel="stylesheet/less" lang="less">
	.el-main {
		height: calc(100vh - 120px);
	    background-color: #E9EEF3;
	    color: #333;
	    text-align: center;
	}
</style>