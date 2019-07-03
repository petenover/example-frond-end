<template>
    <div class="el-form-item el-form-item--small">
      <label class="el-form-item__label">启用状态</label>
      <el-select @change="selectChange" :value="value" clearable placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
</template>

<script>
    export default {
      name: 'EnableStatus',
      data () {
        return {
          value: '',
          options: [
            {
              value: 0,
              label: '启用'
            },
            {
              value: 1,
              label: '禁用'
            }
          ]
        }
      },
      methods: {
        selectChange (value) {
          this.value = value
          this.$emit('change', value)
        }
      }
    }
</script>

<style scoped>

</style>
