<template>
  <div class="table">
    <div class="container">
      <el-form :inline="true" :model="queryParams" class="demo-form-inline">
        <el-form-item label="车辆牌号">
          <el-input v-model="queryParams.licenceNum" placeholder="请输入"></el-input>
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
            prop="licenceNum"
            label="车辆牌号">
          </el-table-column>
          <el-table-column
            prop="color"
            label="车辆颜色">
            <template slot-scope="scope">
              <span>
                {{scope.row.color | changeKeyName(colorList)}}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <router-link :to="{path: $route.path.replace(/manager/g, 'detail'), query: {id: scope.row.id}}" class="pull-left m-r-xm">
                <el-button type="primary" size="small" icon="el-icon-edit" v-permission="'car:edit'"></el-button>
              </router-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <router-link :to="{path: $route.path.replace(/manager/g, 'detail')}">
          <el-button class="pull-left" type="success" v-permission="'car:edit'">添加</el-button>
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
    name: 'ent',
    mixins: [Manager],
    data () {
      return {
        username: '',
        tableData: {
          content: []
        },
        colorList: [
          {
            value: 1,
            label: '蓝色'
          },
          {
            value: 2,
            label: '黄色'
          },
          {
            value: 3,
            label: '黑色'
          },
          {
            value: 4,
            label: '白色'
          },
          {
            value: 5,
            label: '绿色'
          },
          {
            value: 9,
            label: '其他'
          }
        ]
      }
    },
    methods: {
      getData () {
        this.$axios.get('/rebuild/car/list', {params: this.queryParams}).then((res) => {
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
