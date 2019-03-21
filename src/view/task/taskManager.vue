<template>
  <div class="table">
    <div class="container">
      <el-form :inline="true" :model="queryParams" class="demo-form-inline">
        <el-form-item label="学员编号">
          <el-input v-model="queryParams.studentNo" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="教练编号">
          <el-input v-model="queryParams.coachNo" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="终端编号">
          <el-input v-model="queryParams.terminalNo" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="date"
            type="date"
            @change="dateChange"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getData">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="content-cell">
        <el-table
          :data="tableData.content"
          border
          style="width: 100%">
          <el-table-column
            prop="id"
            label="序号"
            width="60px">
          </el-table-column>
          <el-table-column
            prop="studentNo"
            label="学员编号">
          </el-table-column>
          <el-table-column
            prop="coachNo"
            label="教练编号">
          </el-table-column>
          <el-table-column
            prop="terminalNo"
            label="终端编号">
          </el-table-column>
          <el-table-column
            prop="terminalNo"
            label="终端编号">
          </el-table-column>
          <el-table-column
            prop="date"
            label="日期">
          </el-table-column>
          <el-table-column
            prop="startTime"
            label="任务开始时间">
          </el-table-column>
          <el-table-column
            prop="endTime"
            label="任务结束时间">
          </el-table-column>
          <el-table-column
            prop="duration"
            label="任务时长">
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentNumber"
          :page-sizes="pageSizes"
          :page-size="tableData.size"
          :page-count="tableData.totalPages"
          :layout="layoutStr"
          :total="tableData.totalElements">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import Manager from '@/mixins/manager'
  export default {
    name: 'ent',
    mixins: [Manager],
    data () {
      return {
        username: '',
        date: new Date(),
        tableData: {
          content: []
        }
      }
    },
    created () {
      this.dateChange()
    },
    methods: {
      dateChange () {
        if (this.date) {
          this.queryParams.date = moment(this.date).format('YYYY-MM-DD')
        } else {
          this.queryParams.date = ''
        }
      },
      getData () {
        this.$axios.get('/record/task/log', {params: this.queryParams}).then((res) => {
          if (res && res.data) {
            this.tableData = res.data
          }
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
  .del-dialog-cnt{
    font-size: 16px;
    text-align: center
  }
  .handle-input[data-v-b8cd9fd2] {
    width: 150px;
  }
</style>
