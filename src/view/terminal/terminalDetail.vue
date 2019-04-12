<template>
  <div>
    <div class="container">
      <div class="form-box">
        <el-form class="form-ipt" ref="form" :rules="rules" :model="form" label-width="130px">
          <el-row>
            <el-col :span="11">
              <el-form-item label="终端编号" prop="no">
                <el-input v-model="form.no"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="序列号" prop="serialNum">
                <el-input v-model="form.serialNum"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="终端型号" prop="model">
                <el-input v-model="form.model"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="imei号" prop="imei">
                <el-input v-model="form.imei"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="手机号" prop="phone">
                <el-input v-model="form.phone"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="绑定车辆">
                <el-select v-model="form.carId" placeholder="请选择" clearable>
                  <el-option
                    v-for="item in carList"
                    :key="item.id"
                    :label="item.licenceNum"
                    :value="item.id">
                  </el-option>
                </el-select>
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
    name: 'sujectDetail',
    mixins: [Rules],
    data: function () {
      return {
        form: {
          no: '',
          serialNum: '',
          model: '',
          imei: '',
          phone: '',
          carId: ''
        },
        carList: [],
        rules: {
          no: [
            { required: true, trigger: 'blur' }
          ],
          serialNum: [
            { required: true, trigger: 'blur' }
          ],
          model: [
            { required: true, trigger: 'blur' }
          ],
          imei: [
            { required: true, trigger: 'blur' }
          ],
          phone: [
            { required: true, trigger: 'blur' },
            { pattern: /^1[345789]\d{9}$/, message: '手机号格式有误！' }
          ]
        }
      }
    },
    created () {
      this.$axios.get('/rebuild/car/list').then((res) => {
        if (res && res.data) {
          console.log(res.data)
          this.carList = res.data.content
        }
      })
      this.defaultSet()
    },
    methods: {
      defaultSet () {
        if (this.$route.query.id) {
          this.$axios.get('/rebuild/terminal/detail', {
            params: {
              id: this.$route.query.id
            }
          }).then((res) => {
            if (res) {
              this.form = res.data
            }
          })
        }
      },
      onSubmit (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            delete this.form.createdAt
            delete this.form.updatedAt
            delete this.form.delFlag
            if (!this.form.carId) delete this.form.carId
            this.$axios.post('/rebuild/terminal/save', this.form).then((res) => {
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
