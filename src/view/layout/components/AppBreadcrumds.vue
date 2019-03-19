<template>
<div class="crumbs">
	<el-breadcrumb separator-class="el-icon-arrow-right">
		<i class="el-icon-tickets pull-left m-r-xm"></i>
		<transition-group name="fade-out-left">
			<el-breadcrumb-item
				v-for="(item, index) in breadList"
				:to="item.path"
				:key="index"
			>
				{{item.meta.name}}
			</el-breadcrumb-item>
		</transition-group>
	</el-breadcrumb>
</div>
</template>

<script>
export default {
	data () {
		return {
			breadList: []
		}
	},
	created () {
		this.getBreadList()
	},
	watch: {
		$route (to, from) {
			if (to.path === '/terminal/apparatus/detail') {
				this.breadList = from.matched
			} else {
				this.getBreadList()
			}
		}
	},
	methods: {
		getBreadList () {
			if (this.$route.path.indexOf('/manager')) {
				this.breadList = this.$route.matched
			}
		}
	}
}
</script>

<style scope>
</style>
