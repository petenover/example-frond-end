<script>
    import VueCookie from 'vue-cookie'
    
    export default {
        /**
         * 把选择的时间转换成0时区的时间戳
         * @param{string} p1
        */
        timeZone (value) {
            if (value instanceof Object) {
                let hours = null
                if (VueCookie.get('timezone')) {
                    hours = VueCookie.get('timezone').split(',')[0].split('#')[1]
                } else {
                    hours = 0
                }
                let result = new Date(value).getTime()
                let millDiff = hours * 3600000
                let tiemstamp = result - millDiff
                return tiemstamp
            } else {
                return value
            }
        }
    }
</script>
