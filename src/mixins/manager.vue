<script>
export default {
  data () {
    return {
      tableData: {},
      queryParams: Object.assign(
        {
          page: 0,
          size: 10
        },
        JSON.parse(this.$cookie.get('_queryParams')) || {}
      ),
      pageSizes: [5, 10, 15, 20, 25, 30],
      layoutStr: 'total, sizes, prev, pager, next, jumper'
    }
  },
  computed: {
    currentNumber () {
      return this.tableData.number + 1
    }
  },
  created () {
    this.getData()
  },
  methods: {
    // 分页导航
    handleCurrentChange (val) {
      this.queryParams.page = val - 1
      this.getData()
    },
    handleSizeChange (val) {
      this.queryParams.size = val
      this.getData()
    }
  },
  watch: {
    queryParams: {
      handler (val, oldVal) {
        var newVal = JSON.stringify(val)
        this.$cookie.set('_queryParams', newVal)
      },
      deep: true
    }
  }
}
</script>