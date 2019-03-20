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
        <el-form-item label="区域">
          <el-select v-model="queryParams.districtCode" placeholder="请选择" clearable>
            <el-option 
              v-for="item in districtList"
              :key="item.id"
              :label="item.name" 
              :value="item.code"
            ></el-option>
          </el-select>
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
            prop="quota" 
            label="剩余名额">
          </el-table-column>
          <el-table-column 
            prop="districtName" 
            label="区域">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <router-link
                :to="{path: $route.path.replace(/manager/g, 'detail'), query: {id: scope.row.id}}"
                class="pull-left m-r-xm"
              >
                <el-button type="primary" size="small" icon="el-icon-edit" v-permission="'user:edit'"></el-button>
              </router-link>
              <el-button type="primary" size="small" @click="recharge(scope.row.id)" v-permission="'user:recharge'">充值</el-button>
              <el-button type="warning" size="small" @click="toLogin(scope.row.loginName, scope.row.password)">登录</el-button>
            </template>
          </el-table-column>
        </el-table>
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
        <el-form class="form-ipt" ref="form" :model="form" label-width="80px">
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
          <el-row>
            <el-col :span="11">
              <el-form-item label="区域">
                <el-select v-model="form.districtCode" placeholder="请选择" disabled>
                  <el-option
                    v-for="item in districtList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="名额">
                <el-input width="215px" v-model="form.quota" readonly></el-input>
              </el-form-item>
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
        quota: ''
      },
      passDis: true
    }
  },
  created () {
    this.$axios.get('/system/district/list').then(res => {
      if (res && res.data) {
        this.districtList = res.data
      }
    })
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
    // 名额充值
    recharge (id) {
      this.$prompt('请输入充值数量', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /\d/,
        inputErrorMessage: '请输入整数'
      }).then(({ value }) => {
        this.$axios.post('/system/user/recharge', {
          id: id,
          count: value
        }).then(res => {
          this.getData()
					this.$message({
            type: 'success',
            message: '充值成功'
          })
				})
      }).catch(() => {
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
