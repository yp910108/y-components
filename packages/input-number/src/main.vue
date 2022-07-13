<template>
  <el-input-number v-bind="{ controlsPosition: 'right', placeholder: '请输入 ', ..._attrs }" v-on="$listeners" />
</template>

<script>
import { camelize } from 'packages/utils'

export default {
  name: 'YInputNumber',
  inheritAttrs: false,
  computed: {
    _attrs() {
      const result = {}
      for (const key in this.$attrs) {
        result[camelize(key)] = this.$attrs[key]
      }
      return result
    }
  }
}
</script>
