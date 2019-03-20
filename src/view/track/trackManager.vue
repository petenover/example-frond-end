<template>
  <div class="table">
    <div class="container">
      <el-form :inline="true" :model="queryParams" class="demo-form-inline">
        <el-form-item label="轨迹名称">
          <el-input v-model="queryParams.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="培训部分">
          <el-select v-model="queryParams.subject" placeholder="请选择" clearable>
            <el-option
              v-for="item in subjectList"
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
            label="轨迹名称">
          </el-table-column>
          <el-table-column
            prop="subject"
            label="培训部分">
            <template slot-scope="scope">
              {{scope.row.subject | changeKeyName(subjectList)}}
            </template>
          </el-table-column>
          <el-table-column
            prop="coordinatings"
            label="坐标点集合">
            <template slot-scope="scope">
              <span slot="reference">{{ scope.row.coordinatings.substr(0,30)+'...' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <router-link :to="{path: $route.path.replace(/manager/g, 'detail'), query: {id: scope.row.id}}"
                           class="pull-left m-r-xm">
                <el-button type="primary" size="small" icon="el-icon-edit" v-permission="'track:edit'"></el-button>
              </router-link>
              <el-button type="danger" size="small" icon="el-icon-delete" @click='remove(scope.row.id)' v-permission="'track:delete'"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <router-link :to="{path: $route.path.replace(/manager/g, 'detail')}">
          <el-button class="pull-left" type="success" v-permission="'track:edit'">添加</el-button>
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
        subjectList: [
          {
            value: 1,
            label: '第一部分'
          },
          {
            value: 2,
            label: '第二部分'
          },
          {
            value: 3,
            label: '第三部分'
          },
          {
            value: 4,
            label: '第四部分'
          }
        ]
      }
    },
    methods: {
      getData () {
        this.$axios.get('/rebuild/track/list', {params: this.queryParams}).then((res) => {
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
          this.$axios.get('/rebuild/track/delete', {params: {id: id}}).then((res) => {
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
