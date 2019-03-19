<script>
export default {
  data () {
    return {
      rules: {
        password: [
          { required: true, trigger: 'blur' }
        ],
        name: [
          { required: true, message: '必填项！', trigger: 'blur' },
          { pattern: /[\u4E00-\u9FA5]|\d/, message: '格式有误！' }
        ],
        phone: [
          { required: true, trigger: 'blur' },
          { pattern: /^1[34578]\d{9}$/, message: '手机号格式有误！' }
        ],
        must: [
          { required: true, trigger: 'blur' }
        ]
      }
    }
  }
}
</script>
