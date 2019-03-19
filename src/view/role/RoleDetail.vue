<template>
  <div>
    <div class="container">
      <div class="form-box">
        <el-form ref="form" :model="form" label-width="80px">
          <el-row>
            <el-col :span="11">
              <el-form-item label="角色名">
                <el-input width="215px" v-model="form.name"></el-input>
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
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button @click="goBack">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'roleDetail',
  data () {
    return {
      form: {
        name: '',
        permissionList: []
      },
      permissionAllList: [],
      defaultProps: {
        label: 'info'
      },
      permissions: []
    }
  },
  created () {
    this.defaultSet()
    this.$axios.get('/system/map/list', { params: {type: 'permissions'} }).then(res => {
      this.permissionAllList = res.data
    })
  },
  methods: {
    defaultSet () {
      if (this.$route.query.id) {
        this.$axios
          .get('/system/role/detail', {
            params: {
              id: this.$route.query.id
            }
          })
          .then(res => {
            this.form = res.data
            this.permissionList = this.form.permissions
            this.$refs.tree.setCheckedKeys(this.permissionList)
          })
      }
    },
    onSubmit () {
      let checkedList = this.$refs.tree.getCheckedKeys()
      console.log(checkedList)
      checkedList.forEach(item => {
        if (item) {
          this.permissions.push(item)
        }
      })
      this.$axios
        .post('/system/role/save', {
          id: this.$route.query.id,
          name: this.form.name,
          permissions: this.permissions.join(',')
        })
        .then(res => {
          this.goBack()
        })
    }
  }
}
</script>
<style>
	.form-box {
		width: 800px;
	}
	.el-input,
	.el-select {
		width: 230px;
	}
	.el-tree {
		width: 100%;
		height: 300px;
		overflow-y: scroll;
		border: 1px solid #ebebeb;
	}
</style>
