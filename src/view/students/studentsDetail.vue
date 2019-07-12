<template>
  <div>
    <div class="container">
      <div class="form-box">
        <el-form class="form-ipt" ref="form" :model="form" label-width="120px">
          <el-row>
            <el-col :span="11">
              <el-form-item label="学员名称">
                <el-input v-model="form.name" :disabled="defaultInput"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="身份证号">
                <el-input v-model="form.cardCode" :disabled="defaultInput"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="学员编号">
                <el-input v-model="form.studentNo" :disabled="defaultInput"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="13">
              <el-form-item label="执行科目">
                <el-checkbox-group v-model="form.parts">
<!--                  <el-checkbox :label="part" :disabled="checkSelect('123')">全选</el-checkbox>-->
                  <el-checkbox label="1" :disabled="checkSelect('1')">理论</el-checkbox>
                  <el-checkbox label="2" :disabled="checkSelect('2')">科二</el-checkbox>
                  <el-checkbox label="3" :disabled="checkSelect('3')">科三</el-checkbox>
                </el-checkbox-group>
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
    name: 'entDetail',
    data: function () {
      return {
        part: ['1', '2', '3'],
        initialValue: [],
        defaultInput: false,
        form: {
          name: '',
          cardCode: '',
          studentNo: '',
          parts: []
        }
      }
    },
    created () {
      this.defaultSet()
      if (this.$route.query.id) {
        this.defaultInput = true
      }
    },
    methods: {
      checkSelect (value) {
        return this.initialValue.indexOf(value) !== -1
      },
      defaultSet () {
        if (this.$route.query.id) {
          this.$axios.get('/rebuild/student/detail', { params: {
              id: this.$route.query.id
            }}).then((res) => {
            if (res) {
              this.form = res.data
              this.initialValue = JSON.parse(JSON.stringify(this.form.parts))
            }
          })
        }
      },
      onSubmit () {
        delete this.form.createdAt
        delete this.form.updatedAt
        delete this.form.delFlag
        this.$axios.post('/rebuild/student/save', this.form).then((res) => {
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
