<template>
  <div class="table">
    <div class="container" v-show="listShow">
      <el-form :inline="true" :model="queryParams" class="demo-form-inline">
        <el-form-item label="登录名">
          <el-input v-model="queryParams.loginName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="queryParams.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getData">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="content-cell">
        <el-table :data="tableData.content" border style="width: 100%">
          <el-table-column
            prop="id"
            label="序号"
            width="60px">
          </el-table-column>
          <el-table-column
            prop="loginName"
            label="用户名">
          </el-table-column>
          <el-table-column
            prop="name"
            label="用户姓名">
          </el-table-column>
          <el-table-column
            prop="expiryDate"
            label="过期时间">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <router-link
                :to="{path: $route.path.replace(/manager/g, 'detail'), query: {id: scope.row.id}}"
                class="pull-left m-r-xm"
              >
                <el-button type="primary" size="small" icon="el-icon-edit" v-permission="'user:edit'"></el-button>
              </router-link>
              <el-button type="primary" size="small" @click="openDialog(scope.row.id)" v-permission="'user:recharge'">充值</el-button>
              <el-button type="warning" size="small" @click="toLogin(scope.row.loginName, scope.row.password)">登录</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog title="提示" :visible.sync="dialogFormVisible">
          <el-form :model="form" ref="form">
            <el-form-item label="充值类型" label-width='80px'>
              <el-select v-model="form.type" placeholder="请选择充值类型" clearable>
                <el-option label="延长有效期" value="prolong"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="form.type === 'prolong' ? '延长天数' : '充值数量'" label-width='80px'>
              <el-input type="number" v-model="form.quota" min="1" max="99999" placeholder="请输入1-99999的正整数" clearable></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="recharge(form.id,form.quota,form.type)">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <div class="pagination">
        <router-link :to="{path: $route.path.replace(/manager/g, 'detail')}">
          <el-button class="pull-left" type="success" v-permission="'user:edit'">添加</el-button>
        </router-link>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentNumber"
          :page-sizes="pageSizes"
          :page-size="tableData.size"
          :page-count="tableData.totalPages"
          :layout="layoutStr"
          :total="tableData.totalElements"
        ></el-pagination>
      </div>
    </div>
    <div class="container" v-show="!listShow">
      <div class="form-box">
        <el-form class="form-ipt" ref="form" :model="form" label-width="100px">
          <el-row>
            <el-col :span="11">
              <el-form-item label="登录名">
                <el-input width="215px" v-model="form.loginName" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="用户名">
                <el-input v-model="form.name" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="密码">
                <el-input width="215px" type="password" v-model="form.password"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11" :offset="1">
              <el-button type="success" @click="changePass">提交</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import Manager from '@/mixins/manager'
export default {
  name: 'user',
  mixins: [Manager],
  data () {
    return {
      username: '',
      tableData: {
        content: []
      },
      districtList: [],
      listShow: null,
      form: {
        loginName: '',
        name: '',
        password: '',
        districtCode: '',
        quota: '',
        theoryQuota: '',
        partTwoQuota: '',
        partThreeQuota: '',
        type: 'rechargeTheory',
        id: ''
      },
      passDis: true,
      dialogFormVisible: false
    }
  },
  created () {
  },
  mounted () {
    setTimeout(() => {
      this.listShow = this.$cookie.get('flag') === 'true'
      if (!this.listShow) this.getDetail()
    }, 100)
  },
  methods: {
    getData () {
      this.$axios.get('/system/user/list', { params: this.queryParams })
			.then(res => {
				if (res && res.data) {
					this.tableData = res.data
				}
			})
    },
    openDialog (id) {
      this.dialogFormVisible = true
      this.form.id = id
    },
    // 名额充值
    recharge (id, value, type) {
        this.$axios.post('/system/user/recharge', {
          id: id,
          count: value,
          type: type
        }).then(res => {
          this.getData()
          this.dialogFormVisible = false
					this.$message({
            type: 'success',
            message: '充值成功'
          })
				}).catch(() => {
        this.dialogFormVisible = false
        this.$message({
          type: 'info',
          message: '取消充值'
        })
      })
    },
    // 用户跳转登录
    toLogin (loginName, password) {
      this.$router.push({
        path: '/login',
        query: {
          loginName: loginName,
          password: password
        }
      })
    },
    getDetail () {
      this.$axios.get('/system/user/detail', {
        params: {
          id: this.$cookie.get('userId')
        }
      }).then(res => {
        if (res) {
          this.form = res.data
        }
      })
    },
    // 修改密码
    changePass () {
      this.$confirm('确定修改吗？', '提示', {
        confirmButtonText: '确定',
        type: 'error'
      }).then(() => {
        this.$axios.post('/system/user/reset', {
          id: this.$cookie.get('userId'),
          password: this.form.password
        }).then(res => {
          this.$message({
            type: 'info',
            message: '修改成功'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消修改'
        })
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
	.del-dialog-cnt {
		font-size: 16px;
		text-align: center;
	}
	.handle-input[data-v-b8cd9fd2] {
		width: 150px;
	}
</style>
