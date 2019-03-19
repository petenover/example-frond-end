<template>
  <div>
    <div class="container">
      <div class="form-box">
        <el-form class="form-ipt" ref="form" :model="form" label-width="120px">
          <el-row>
            <el-col :span="11">
              <el-form-item label="Host" label-width="150px">
                <el-input v-model="form.host"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="Port" label-width="150px">
                <el-input v-model="form.port"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="1">
              <el-form-item label="照片上传时间间隔" label-width="150px">
                <el-input v-model="form.photoInterval"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
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
    name: 'entDetail',
    data: function () {
      return {
        form: {
          host: '',
          port: '',
          photoInterval: ''
        }
      }
    },
    created () {
      this.defaultSet()
    },
    methods: {
      defaultSet () {
        if (this.$route.query.id) {
          this.$axios.get('/system/platform/detail', { params: {
              id: this.$route.query.id
            }}).then((res) => {
            if (res) {
              this.form = res.data
            }
          })
        }
      },
      onSubmit () {
        delete this.form.createdAt
        delete this.form.updatedAt
        delete this.form.delFlag
        this.$axios.post('/system/platform/save', this.form).then((res) => {
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
  .el-input {
    width: 230px;
  }
  .el-tree {
    width: 100%;
    height: 300px;
    overflow-y: scroll;
    border: 1px solid #ebebeb;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .el-upload--text {
    width: 180px;
  }
</style>
