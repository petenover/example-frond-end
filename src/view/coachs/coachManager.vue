<template>
  <div class="table">
    <div class="container">
      <el-form :inline="true" :model="queryParams" class="demo-form-inline">
        <el-form-item label="教练名称">
          <el-input v-model="queryParams.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model="queryParams.cardCode" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="准教车型">
          <el-select v-model="queryParams.drivingType" placeholder="请选择" clearable>
            <el-option
              v-for="item in drivingTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
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
            prop="name"
            label="教练名称">
          </el-table-column>
          <el-table-column
            prop="cardCode"
            label="身份证号">
          </el-table-column>
          <el-table-column
            prop="coachNo"
            label="教练编号">
          </el-table-column>
          <el-table-column
            prop="permitType"
            label="准教车型">
            <template slot-scope="scope">
              {{scope.row.permitType | changeKeyName(drivingTypeList)}}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <router-link :to="{path: $route.path.replace(/manager/g, 'detail'), query: {id: scope.row.id}}"
                           class="pull-left m-r-xm">
                <el-button type="primary" size="small" icon="el-icon-edit" v-permission="'coach:edit'"></el-button>
              </router-link>
              <el-button type="danger" size="small" icon="el-icon-delete" @click='remove(scope.row.id)' v-permission="'coach:delete'"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <router-link :to="{path: $route.path.replace(/manager/g, 'detail')}">
          <el-button class="pull-left" type="success" v-permission="'coach:edit'">添加</el-button>
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
    methods: {
      getData () {
        this.$axios.get('/rebuild/coach/list', {params: this.queryParams}).then((res) => {
          if (res && res.data) {
            this.tableData = res.data
          }
        })
      },
      remove (id) {
        this.$alert('确定删除吗？', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.$axios.get('/rebuild/coach/delete', {params: {id: id}}).then((res) => {
              if (res.code === 0) {
                this.getData()
                this.$message({
                  type: 'info',
                  message: '删除成功'
                })
              }
            })
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

  .del-dialog-cnt {
    font-size: 16px;
    text-align: center
  }

  .handle-input[data-v-b8cd9fd2] {
    width: 150px;
  }
</style>
