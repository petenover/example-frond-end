<template>
  <div class="table">
    <div class="container">
      <el-form :inline="true"  ref="form" class="demo-form-inline">
        <el-form-item label="地区查询">
          <el-input v-model="address" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="query">查询</el-button>
        </el-form-item>
        <el-form-item label="轨迹名称">
          <el-input v-model="form.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="培训部分">
          <el-select v-model="form.subject" placeholder="请选择" clearable>
            <el-option
              v-for="item in subjectList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="pull-right">
          <el-button type="success" @click="onSubmit">保存</el-button>
        </el-form-item>
        <el-form-item class="pull-right">
          <el-button type="danger" @click="clearOverlays">清除</el-button>
        </el-form-item>
      </el-form>
      <div class="map-cell" id="map"></div>
    </div>
  </div>
</template>

<script>
  import BMap from 'BMap'
  import BMapLib from 'BMapLib'
  import BMAP_ANCHOR_TOP_LEFT from 'BMAP_ANCHOR_TOP_LEFT'
  import BMAP_ANCHOR_TOP_RIGHT from 'BMAP_ANCHOR_TOP_RIGHT'
  import BMAP_DRAWING_POLYLINE from 'BMAP_DRAWING_POLYLINE'

  export default {
    name: 'cars',
    data () {
      return {
        address: '',
        styleOptions: {
          strokeColor: 'red',  // 边线颜色
          fillColor: 'red',    // 填充颜色
          strokeWeight: 3,     // 边线的宽度，以像素为单位
          strokeOpacity: 0.8,  // 边线透明度，取值范围0 - 1
          fillOpacity: 0.6,    // 填充的透明度，取值范围0 - 1
          strokeStyle: 'solid' // 边线的样式，solid或dashed
        },
        map: {},
        pointList: [],
        changePointList: [],
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
        ],
        form: {
          name: '',
          subject: '',
          coordinatings: ''
        }
      }
    },
    created () {
      this.defaultSet()
    },
    mounted () {
      this.baiduMap()
    },
    methods: {
      defaultSet () {
        if (this.$route.query.id) {
          this.$axios.get('/rebuild/track/detail', {
            params: {
              id: this.$route.query.id
            }
          }).then((res) => {
            if (res) {
              this.form = res.data
              if (this.form.coordinatings) {
                var getPointList = this.form.coordinatings.split(';')
                console.log(getPointList)
                var polylineList = []
                getPointList.map((item) => {
                  polylineList.push(new BMap.Point(item.split(',')[1], item.split(',')[0]))
                })
                var polyline = new BMap.Polyline(polylineList, {strokeColor: 'red', strokeWeight: 3, strokeOpacity: 0.8})
                console.log(polylineList)
                this.map.centerAndZoom(polylineList[0], 14)
                this.map.addOverlay(polyline)
              }
            }
          })
        }
      },
      query () {
        var vm = this
        var localSearch = new BMap.LocalSearch(vm.map)
        localSearch.setSearchCompleteCallback(function (searchResult) {
          var poi = searchResult.getPoi(0)
          if (poi) vm.map.centerAndZoom(poi.point, 14)
        })
        localSearch.search(vm.address)
      },
      baiduMap () {
        var vm = this
        this.map = new BMap.Map('map', {enableMapClick: false})    // 创建Map实例
        this.map.addControl(new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_LEFT})) // 添加缩放控件
        this.map.centerAndZoom(new BMap.Point(116.404, 39.915), 14)  // 初始化地图,设置中心点坐标和地图级别
        var drawingManager = new BMapLib.DrawingManager(this.map, {
          isOpen: false, // 是否开启绘制模式
          enableDrawingTool: true, // 是否显示工具栏
          drawingToolOptions: {
            anchor: BMAP_ANCHOR_TOP_RIGHT, // 位置
            offset: new BMap.Size(40, 15), // 偏离值
            scale: 0.8, // 工具栏缩放比例
            drawingModes: [
              BMAP_DRAWING_POLYLINE // rectanglecomplete
            ]
          },
          polylineOptions: vm.styleOptions // 折线的样式
        })
        drawingManager.addEventListener('overlaycomplete', function (e) {
          vm.pointList = e.overlay.getPath()
          // console.log(e.overlay.getPath())
          vm.pointList.forEach((value, index) => {
            vm.changePointList.push(value.lat + ',' + value.lng)
          })
          console.log(vm.changePointList)
          vm.form.coordinatings = vm.changePointList.join(';')
        }) // 绘图监听事件
      },
      clearOverlays () {
        this.map.clearOverlays()
      },
      onSubmit () {
        this.changePointList = []
        if (this.form.name && this.form.subject && this.form.coordinatings) {
          this.$axios.post('/rebuild/track/save', {
            id: this.$route.query.id,
            name: this.form.name,
            subject: this.form.subject,
            coordinatings: this.form.coordinatings
          }).then((res) => {
            this.goBack()
          })
        } else {
          this.$message('请检查信息是否填写完整')
        }
      }
    }
  }
</script>

<style scoped>
  .map-cell {
    width: 100%;
    height: 600px;
  }

  .handle-box {
    margin-bottom: 20px;
  }
  
  .el-input {
    width: 215px;
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

  .thumb-img {
    width: 20px;
    height: 20px;
  }
</style>
