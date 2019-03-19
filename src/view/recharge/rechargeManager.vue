<template>
  <div class="table">
    <div class="container">
      <el-form :inline="true" :model="queryParams" class="demo-form-inline">
        <el-form-item label="充值/消费对象">
          <el-input v-model="queryParams.targetName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="操作人">
          <el-input v-model="queryParams.operationName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="充值类型">
          <el-select v-model="queryParams.type" placeholder="请选择" clearable>
            <el-option label="充值" value="recharge"></el-option>
            <el-option label="消费" value="consume"></el-option>
          </el-select>
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
            prop="targetName"
            label="充值/消费对象">
          </el-table-column>
          <el-table-column
            prop="type"
            label="充值类型">
            <template slot-scope="scope">
              <span>
                {{scope.row.type | changeKeyName(typeList)}}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="count"
            label="充值/消费数量">
          </el-table-column>
          <el-table-column
            prop="operationName"
            label="操作人">
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
  import Manager from '@/mixins/manager'
  export default {
    name: 'ent',
    mixins: [Manager],
    data () {
      return {
        username: '',
        tableData: {
          content: []
        },
        typeList: [
          {
            value: 'recharge',
            label: '充值'
          },
          {
            value: 'consume',
            label: '消费'
          }
        ]
      }
    },
    methods: {
      getData () {
        this.$axios.get('/record/recharge/log', {params: this.queryParams}).then((res) => {
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
