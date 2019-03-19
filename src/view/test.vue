<template>
	<div class="table">
      <el-button class="pull-left" type="primary" @click="dialogFormVisible = true">打 印</el-button>
			<el-dialog title="打印" :visible.sync="dialogFormVisible" width="70%">
				<section ref="print">
					<h2 class="text-center m-sm">安全驾驶培训 培训详情</h2>
					<table class="table">
						<tbody>
							<tr>
								<td class="td-t">企业名称</td><td>云行安</td>
								<td class="td-t">部门</td><td>技术部</td>
								<td rowspan="3" colspan="2"></td>
							</tr>
							<tr>
								<td class="td-t">姓名</td><td>ajin</td>
								<td class="td-t">培训时间</td><td>2018-10-10</td>
							</tr>
							<tr>
								<td class="td-t">培训内容</td>
								<td colspan="3">
									<p class="text-l">xx章  啊发文发违反</p>
									<p class="text-l">xx节  发文发违反</p>
									<p class="text-l">xx章  啊发文发违反</p>
									<p class="text-l">xx节  发文发违反</p>
									<p class="text-l">xx章  啊发文发违反</p>
									<p class="text-l">xx节  发文发违反</p>
								</td>
							</tr>
						</tbody>
						<tbody>
							<tr>
								<td class="td-t">要求时长 / 完成时长</td><td>12/20</td>
								<td class="td-t">培训状态</td><td>进行中</td>
								<td class="td-t">车牌号</td><td>京A00000</td>
							</tr>
							<tr>
								<td class="td-t">考试要求 / 考试分数</td><td>100 / 99</td>
								<td class="td-t">考试状态</td><td colspan="3">已通过</td>
							</tr>
						</tbody>
					</table>
					<table class="table">
						<tbody>
							<tr>
								<td class="td-t" colspan="8">学习详情</td>
							</tr>
							<tr>
								<td class="td-t">序号</td>
								<td class="td-t">IP地址</td>
								<td class="td-t">培训方式</td>
								<td class="td-t">开始时间</td>
								<td class="td-t">结束时间</td>
								<td class="td-t">时长</td>
								<td class="td-t">状态</td>
								<td class="td-t">详情</td>
							</tr>
						</tbody>
						<tbody>
							<tr>
								<td>1</td>
								<td>部门</td>
								<td>远程</td>
								<td>2019-1-4 12:12:12</td>
								<td>2019-1-4 12:20:12</td>
								<td>8</td>
								<td>未提交</td>
								<td>法尔违法违法</td>
							</tr>
							<tr>
								<td>2</td>
								<td>部门</td>
								<td>远程</td>
								<td>2019-1-4 12:12:12</td>
								<td>2019-1-4 12:20:12</td>
								<td>8</td>
								<td>未提交</td>
								<td>法尔违法违法</td>
							</tr>
						</tbody>
					</table>
					<table class="table">
						<tbody>
							<tr>
								<td class="td-t">学习随机验证照片</td>
							</tr>
							<tr>
								<td>
									<div class="img-cell">
										<div class="img"></div>
										<p>2019-1-1 12:12:12</p>
									</div>
									<div class="img-cell">
										<div class="img"></div>
										<p>2019-1-1 12:12:12</p>
									</div>
									<div class="img-cell">
										<div class="img"></div>
										<p>2019-1-1 12:12:12</p>
									</div>
									<div class="img-cell">
										<div class="img"></div>
										<p>2019-1-1 12:12:12</p>
									</div>
									<div class="img-cell">
										<div class="img"></div>
										<p>2019-1-1 12:12:12</p>
									</div>
									<div class="img-cell">
										<div class="img"></div>
										<p>2019-1-1 12:12:12</p>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</section>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible = false">取 消</el-button>
					<el-button type="primary" @click="print">打 印</el-button>
				</div>
			</el-dialog>
  </div>
</template>

<script>
export default {
	data () {
		return {
			dialogFormVisible: false
		}
	},
	created () {

	},
	methods: {
		print () {
			this.dialogFormVisible = false
			this.$print(this.$refs.print)
		}
	}
}
</script>

<style>
	.text-center {
		text-align: center;
	}
	.m-sm {
		margin: 10px;
	}
	.table {
		width: 100%;
		border: 1px solid #ccc;
	}
	.table > tbody > tr > td {
		border: 1px solid #ccc;
		padding: 10px;
		text-align: center;
	}
	.td-t {
		font-weight: bold;
	}
	.text-l {
		text-align: left;
	}
	.img-cell {
		width: 150px;
		height: 200px;
		border: 1px solid #ccc;
		box-sizing: border-box;
		float: left;
		margin: 6px;
	}
	.img{
		margin: 5%;
		width: 90%;
		height: 160px;
		border: 1px solid #ccc;
		box-sizing: border-box;
	}
</style>
