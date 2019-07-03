<template>
  <div>
    <div class="container">
      <div class="form-box">
        <el-form class="form-ipt" ref="form" :model="form" :rules="rules" label-width="80px">
          <el-row>
            <el-col :span="11">
              <el-form-item label="登录名">
                <el-input width="215px" v-model="form.loginName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="用户名">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="区域" prop="name">
                <el-select v-model="form.districtCode" clearable filterable placeholder="选择您驾校备案所在区域">
                  <el-option
                    v-for="item in districtList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="密码">
                <el-input width="215px" type="password" v-model="form.password"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="平台" prop="name">
                <el-select v-model="form.platformId" placeholder="请选择">
                  <el-option
                    v-for="item in platformList"
                    :key="item.id"
                    :label="item.host + ':' + item.port"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="角色">
                <el-select v-model="roles" multiple placeholder="请选择">
                  <el-option
                    v-for="(item, index) in roleList"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="权限选择">
                <el-tree
                  :data="permissionAllList"
                  show-checkbox
                  node-key="code"
                  ref="tree"
                  :props="defaultProps"
                ></el-tree>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">提交</el-button>
            <el-button @click="goBack">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import Rules from '@/mixins/rules'
export default {
	name: 'userDetail',
	mixins: [Rules],
  data: function () {
    return {
      subtitle: '',
      form: {
        loginName: '',
        name: '',
        districtCode: '',
        districtName: '',
        roles: [],
        roleIds: '',
        permissions: [],
        platformId: '',
        password: ''
      },
      roleList: [],
      roles: [],
      permissionAllList: [],
      permissionList: [],
      defaultProps: {
        label: 'info'
      },
      districtList: [],
      platformList: []
    }
  },
  created () {
    this.defaultSet()
    this.$axios.get('/system/map/list', { params: {type: 'permissions'} }).then(res => {
      this.permissionAllList = res && res.data ? res.data : []
    })
    this.$axios.get('/system/role/list').then(res => {
      this.roleList = res ? res.data.content : []
    })
    this.$axios.get('/system/district/list').then(res => {
      this.districtList = res ? res.data : []
    })
    this.$axios.get('/system/platform/list').then(res => {
      this.platformList = res ? res.data.content : []
    })
  },
  methods: {
    defaultSet () {
      if (this.$route.query.id) {
        this.$axios
          .get('/system/user/detail', {
            params: {
              id: this.$route.query.id
            }
          })
          .then(res => {
            if (res) {
              this.form = res.data
              this.form.roles.forEach(item => {
                this.roles.push(item.id)
              })
              this.$refs.tree.setCheckedKeys(this.form.permissions)
            }
          })
      }
    },
    onSubmit (formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					let checkedList = this.$refs.tree.getCheckedKeys()
					checkedList.forEach(item => {
						if (item) {
							this.permissionList.push(item)
						}
					})
					delete this.form.createdAt
					delete this.form.updatedAt
          delete this.form.roles
          this.districtList.forEach((item) => {
            if (this.form.districtCode === item.code) {
              this.form.districtName = item.name
            }
          })
					this.form.roleIds = this.roles.join(',')
					this.form.permissions = this.permissionList.join(',')
					this.$axios.post('/system/user/save', this.form).then(res => {
						this.goBack()
					})
				} else {
					return false
				}
			})
    }
  }
}
</script>
<style>
	.form-box {
		width: 800px;
	}
	.el-input {
		width: 230px;
	}
	.el-tree {
		width: 100%;
		height: 300px;
		overflow-y: scroll;
		border: 1px solid #ebebeb;
	}
</style>
