<template>
  <div>
    <div class="container">
      <div class="form-box">
        <el-form class="form-ipt" ref="form" :model="form" :rules="rules" label-width="120px">
          <el-form-item label="选择日期" label-width="150px">
            <el-date-picker
              v-model="date"
              type="date"
              @change="timeChange"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="任务开始-结束时间" label-width="150px">
            <el-time-picker
              is-range
              v-model="times"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
              @change="timeChange">
            </el-time-picker>
          </el-form-item>
          <el-form-item label="培训部分" label-width="150px">
            <el-select v-model="form.partType" placeholder="请选择" @change="partCheck">
              <el-option
                v-for="item in partTypeList"
                :key="item.code"
                :label="item.info"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择终端" label-width="150px">
            <el-select v-model="form.terminalNo" placeholder="请选择" @change="terminalCheck">
              <el-option
                v-for="item in terminalList"
                :key="item.no"
                :label="item.no"
                :value="item.no">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择教练" label-width="150px">
            <el-select v-model="form.coachNo" placeholder="请选择" @change="coachCheck" :disabled="coachDis">
              <el-option
                v-for="item in coachList"
                :key="item.id"
                :label="item.name"
                :value="item.coachNo">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择学员" label-width="150px">
            <el-select v-model="form.studentNo" placeholder="请选择" @change="studentCheck" :disabled="studentDis">
              <el-option
                v-for="item in studentList"
                :key="item.id"
                :label="item.name"
                :value="item.studentNo">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="培训车型" label-width="150px">
            <el-select v-model="form.trainType" placeholder="请选择" :disabled="otherDis">
              <el-option
                v-for="item in trainTypeList"
                :key="item.code"
                :label="item.info"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="培训项目" label-width="150px">
            <el-select v-model="form.projectType" placeholder="请选择" filterable :disabled="otherDis">
              <el-option
                v-for="item in projectTypeList"
                :key="item.code"
                :label="item.info"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择轨迹" label-width="150px">
            <el-select v-model="form.trackId" placeholder="请选择" :disabled="otherDis">
              <el-option
                v-for="item in trackList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="压缩包" label-width="150px">
            <el-upload class="avatar-uploader"
                        :action="baseUrl + '/kernel/build/upload/zip'"
                        :data="{'studentNo': form.studentNo}"
                        :show-file-list="true"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
              <i class="el-icon-plus avatar-uploader-icon"></i>
              <div slot="tip" class="el-upload__tip">只能上传zip文件</div>
            </el-upload>
          </el-form-item>
          <el-form-item  label-width="150px">
            <el-button type="primary" @click="onSubmit('form')">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import Rules from '@/mixins/rules'
  export default {
    name: 'entDetail',
    mixins: [Rules],
    data: function () {
      return {
        times: [new Date(), new Date()],
        date: new Date(),    // 任务执行日期
        form: {
          startTime: '',     // 任务开始时间
          endTime: '',       // 任务结束时间
          terminalNo: '',    // 终端编号
          coachNo: '',       // 教练编号
          coachName: '',     // 教练名称
          studentNo: '',     // 学员编号
          studentName: '',   // 学员名称
          trainType: '',     // 培训车型
          partType: '1',      // 培训部分
          projectType: '',   // 培训项目
          trackId: '',       // 轨迹ID
          file: ''           // 学员培训图片压缩包
        },
        coachDis: true,      // 教练是否可选
        studentDis: true,    // 学员是否可选
        otherDis: true,      // 其他是否可选
        terminalList: [],    // 终端列表
        coachList: [],       // 教练列表
        studentList: [],     // 学员列表
        trainTypeList: [],   // 培训车型
        partTypeList: [],    // 培训部分
        projectTypeList: [], // 培训项目
        trackList: []        // 轨迹列表
      }
    },
    created () {
      // 查询终端
      this.partCheck('1')
      // 查询教练
      this.$axios.get('/rebuild/coach/entry').then((res) => {
        this.coachList = res ? res.data : []
      })
      // 查询学员
      this.$axios.get('/rebuild/student/entry').then((res) => {
        this.studentList = res ? res.data : []
      })
      // 查询培训车型
      this.$axios.get('/system/map/list', { params: {type: 'trainType'} }).then((res) => {
        this.trainTypeList = res ? res.data : []
      })
      // 查询培训部分
      this.$axios.get('/system/map/list', { params: {type: 'partType'} }).then((res) => {
        this.partTypeList = res ? res.data : []
      })
      // 查询培训项目
      this.$axios.get('/system/map/list', { params: {type: 'projectType'} }).then((res) => {
        this.projectTypeList = res ? res.data : []
      })
      // 查询轨迹
      this.$axios.get('/rebuild/track/entry').then((res) => {
        this.trackList = res ? res.data : []
      })
      this.timeChange()
      this.baseUrl = process.env.BASE_ROOT === '/api' ? '/api' : ''
    },
    methods: {
      // 时间格式转换
      timeChange (value) {
        var date = moment(this.date).format('YYYY-MM-DD')
        var startTime = moment(this.times[0]).format('HH:mm:ss')
        var endTime = moment(this.times[1]).format('HH:mm:ss')
        this.form.startTime = date + ' ' + startTime
        this.form.endTime = date + ' ' + endTime
      },
      // 培训部份切换刷新终端列表
      partCheck (value) {
        // 查询终端
        this.$axios.get('/rebuild/terminal/entry', {params: {
          carId: value === '2' || value === '3'
        }}).then((res) => {
          this.terminalList = res ? res.data : []
        })
      },
      // 校验终端是否多处登录
      terminalCheck (value) {
        if (this.form.partType === '1' || this.form.partType === '4') {
          this.coachDis = false
        } else {
          this.$axios.get('/kernel/build/checkout/terminal', {params: {
            terminalNo: value,
            startTime: this.form.startTime,
            endTime: this.form.endTime
          }}).then((res) => {
            if (res && res.code === 0) {
              this.coachDis = false
            } else {
              this.$alert('所选终端存在异常，请重新选择！', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  this.form.terminalNo = ''
                }
              })
            }
          })
        }
      },
      // 校验教练是否同时带教
      coachCheck (value) {
        if (this.form.partType === '1' || this.form.partType === '4') {
          this.studentDis = false
        } else {
          this.$axios.get('/kernel/build/checkout/coach', {params: {
            coachNo: value,
            startTime: this.form.startTime,
            endTime: this.form.endTime
          }}).then((res) => {
            if (res && res.code === 0) {
              this.studentDis = false
            } else {
              this.$alert('所选教练存在异常，请重新选择！', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  this.form.coachNo = ''
                }
              })
            }
          })
        }
      },
      // 校验学员是否多处登录
      studentCheck (value) {
        this.$axios.get('/kernel/build/checkout/student', {params: {
          studentNo: value,
          startTime: this.form.startTime,
          endTime: this.form.endTime
        }}).then((res) => {
          if (res && res.code === 0) {
            this.otherDis = false
          } else {
            this.$alert('所选学员存在异常，请重新选择！', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.form.studentNo = ''
              }
            })
          }
        })
      },
      handleAvatarSuccess (res) {
        this.$message({
          message: '压缩包上传成功',
          type: 'success'
        })
      },
      beforeAvatarUpload (file) {
        // let fileName = file.name
        // let pos = fileName.lastIndexOf('.')
        // let lastName = fileName.substring(pos, fileName.length)
        // const isZIP = file.type === 'application/x-zip-compressed'
        // const isLt5M = file.size / 1024 < 500
        if (!this.form.studentNo) {
          // if (!isLt5M) {
          //   this.$message.error('压缩包大小不能超过 5MB!')
          // }
          this.$message.error('请先选择学员')
          return false
        }
      },
      onSubmit (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.coachList.forEach((item) => {
              if (this.form.coachNo === item.coachNo) {
                this.form.coachName = item.name
              }
            })
            this.studentList.forEach((item) => {
              if (this.form.studentNo === item.studentNo) {
                this.form.studentName = item.name
              }
            })
            if (!this.form.trackId) delete this.form.trackId
            if (this.form.coachName && this.form.studentName) {
              this.$axios.post('/kernel/build/task', this.form).then(res => {
                console.log(res)
              })
            }
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
