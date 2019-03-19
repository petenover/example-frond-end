<template>
  <div>
    <div class="container">
      <div class="form-box">
        <el-form class="form-ipt" ref="form" :rules="subjectRules" :model="form" label-width="130px">
          <el-row>
            <el-col :span="11">
              <el-form-item label="教练名称" prop="name">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="身份证号" prop="cardCode">
                <el-input v-model="form.cardCode"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="教练编号" prop="cardCode">
                <el-input v-model="form.coachNo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="准教车型" prop="permitType">
                <el-select v-model="form.permitType" placeholder="请选择">
                  <el-option
                    v-for="item in drivingTypeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
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
          name: '',
          cardCode: '',
          coachNo: '',
          permitType: ''
        },
        drivingTypeList: [
          {
            value: 'A1',
            label: 'A1'
          },
          {
            value: 'A2',
            label: 'A2'
          },
          {
            value: 'B1',
            label: 'B1'
          },
          {
            value: 'B2',
            label: 'B2'
          },
          {
            value: 'C1',
            label: 'C1'
          },
          {
            value: 'C2',
            label: 'C2'
          },
          {
            value: 'C3',
            label: 'C3'
          }
        ]
      }
    },
    created () {
      this.defaultSet()
    },
    methods: {
      defaultSet () {
        if (this.$route.query.id) {
          this.$axios.get('/rebuild/coach/detail', {
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
            this.$axios.post('/rebuild/coach/save', this.form).then((res) => {
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
