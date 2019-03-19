<template>
  	<div class="table">
    	<div class="container">
			<div class="content-cell">
				<el-table
					:data="tableData.content"
					border
					style="width: 100%">
					<el-table-column
						prop="id"
						label="序号"
						width="180">
					</el-table-column>
					<el-table-column
						prop="name"
						label="角色名"
						width="180">
					</el-table-column>
					<el-table-column
						prop="permissions"
						label="角色权限">
						<template slot-scope="scope">
							<span v-for="(item, index) in scope.row.permissions" :key="index">
								{{item}}
							</span>
						</template>
					</el-table-column>
					<el-table-column
						label="操作"
						width="100">
						<template slot-scope="scope">
							<router-link :to="{path: $route.path.replace(/manager/g, 'detail'), query: {id: scope.row.id}}">
									<el-button type="primary" class="pull-left" size="small" icon="el-icon-edit" v-permission="'role:edit'"></el-button>
							</router-link>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="pagination clearfix">
				<router-link :to="{path: $route.path.replace(/manager/g, 'detail')}">
					<el-button class="pull-left" type="success" v-permission="'role:edit'">添加</el-button>
				</router-link>
			</div>
		</div>
  	</div>
</template>

<script>
	import Manager from '@/mixins/manager'
  export default {
		name: 'role',
		mixins: [Manager],
		data () {
			return {
				username: '',
				tableData: {
					content: []
				}
			}
		},
		methods: {
			getData () {
				this.$axios.get('/system/role/list').then((res) => {
					this.tableData = res.data
				})
			}
		}
  }
</script>

<style scoped>
  .handle-box {
    margin-bottom: 20px;
  }
  .handle-select {
    width: 120px;
  }
  .handle-input {
    width: 300px;
    display: inline-block;
  }
  .del-dialog-cnt{
    font-size: 16px;
    text-align: center
  }
  .handle-input[data-v-b8cd9fd2] {
    width: 150px;
	}
	.pagination {
		margin-bottom: 0;
	}
</style>
