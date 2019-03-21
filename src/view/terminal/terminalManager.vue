<template>
  <div class="table">
    <div class="container">
      <el-form :inline="true" :model="queryParams" class="demo-form-inline">
        <el-form-item label="终端编号">
          <el-input v-model="queryParams.no" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="序列号">
          <el-input v-model="queryParams.serialNum" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="终端型号">
          <el-input v-model="queryParams.model" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="imei号">
          <el-input v-model="queryParams.imei" placeholder="请输入"></el-input>
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
            prop="no"
            label="终端编号">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号">
          </el-table-column>
          <el-table-column
            prop="serialNum"
            label="序列号">
          </el-table-column>
          <el-table-column
            prop="model"
            label="终端型号">
          </el-table-column>
          <el-table-column
            prop="imei"
            label="imei号">
          </el-table-column>
          <el-table-column
            prop="carId"
            label="车辆牌号">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <router-link :to="{path: $route.path.replace(/manager/g, 'detail'), query: {id: scope.row.id}}"
                           class="pull-left m-r-xm">
                <el-button type="primary" size="small" icon="el-icon-edit" v-permission="'terminal:edit'"></el-button>
              </router-link>
              <el-button type="danger" size="small" icon="el-icon-delete" @click='remove(scope.row.id)' v-permission="'terminal:delete'"></el-button>
              <el-button type="success" size="small" style="margin-left:2px" @click='register(scope.row.id)'>注册</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <router-link :to="{path: $route.path.replace(/manager/g, 'detail')}">
          <el-button class="pull-left" type="success" v-permission="'terminal:edit'">添加</el-button>
        </router-link>

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
    name: 'coach',
    mixins: [Manager],
    data () {
      return {
        tableData: {
          content: []
        }
      }
    },
    methods: {
      getData () {
        this.$axios.get('/rebuild/terminal/list', {params: this.queryParams}).then((res) => {
          if (res && res.data) {
            this.tableData = res.data
          }
        })
      },
      remove (id) {
        this.$confirm('确定删除吗？', '提示', {
          confirmButtonText: '确定',
          type: 'error'
        }).then(() => {
          this.$axios.get('/rebuild/terminal/delete', {params: {id: id}}).then((res) => {
            if (res && res.code === 0) {
              this.getData()
              this.$message({
                type: 'info',
                message: '删除成功'
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      register (id) {
        this.$confirm('确定注册吗？', '提示', {
          confirmButtonText: '确定',
          type: 'success'
        }).then(() => {
          this.$axios.get('/rebuild/terminal/register', {params: {id: id}}).then((res) => {
            if (res && res.code === 0) {
              this.getData()
              this.$message({
                type: 'info',
                message: '注册成功'
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消注册'
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
    text-align: center
  }

  .handle-input[data-v-b8cd9fd2] {
    width: 150px;
  }
</style>
