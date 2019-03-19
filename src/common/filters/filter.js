import moment from 'moment'
export default {
    install (Vue) {
        /**
         * 枚举类型转换
         * @param {number} p1 枚举类的value
         * @param {array} p2 枚举类的list
        */
        Vue.filter('changeKeyName', function (value, typeList) {
            let labName = ''
            if (value && typeList) {
                typeList.forEach(function (item) {
                    if (value === item.value) {
                        labName = item.label
                    }
                })
                return labName
            }
        })
        /**
         * 时间戳过滤
         * @param {number} p1 时间戳
         * @param {string} p2 转换格式
        */
        Vue.filter('formatDate', function (value, formatString) {
            if (value) {
                formatString = formatString || 'YYYY-MM-DD HH:mm:ss'
                return moment.unix(value / 1000).format(formatString)
            } else {
                return ''
            }
        })
      /**
       * 将秒转为××分钟××秒
       * @param {number} p1 时间戳
       * @param {string} p2 转换格式
       */
        Vue.filter('formatDuration', function (value) {
          if (value) {
            if (value === 0) {
              return Math.floor(0) + '分' + 0 + '秒'
            }
            return Math.floor(value / 60) + '分' + (value % 60) + '秒'
          } else {
            return 0 + '秒'
          }
        })

        Vue.filter('booleanDuration', function (value) {
          if (value) {
            return '已完成'
          } else {
            return '未完成'
          }
        })
      }
}
