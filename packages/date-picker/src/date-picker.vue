<template>
  <div
    :class="{ 'y-date-editor-wrapper': true, 'y-date-editor-icon-hide-wrapper': hideIcon }"
    @mouseenter="isMouseEnter = true"
    @mouseleave="isMouseEnter = false"
  >
    <el-date-picker v-bind="{ valueFormat, placeholder: '请选择', ...$attrs }" v-on="$listeners" />
  </div>
</template>

<script>
import { TYPE } from './constant'

export default {
  inheritAttrs: false,
  data() {
    return {
      isMouseEnter: false
    }
  },
  computed: {
    hideIcon() {
      const { disabled, clearable, value } = this.$attrs
      if (disabled || disabled === '') {
        return false
      }
      return (clearable || clearable === undefined || clearable === '') && this.isMouseEnter && value
    },
    valueFormat() {
      return (
        {
          [TYPE.year]: 'yyyy',
          [TYPE.month]: 'yyyy-MM',
          [TYPE.date]: 'yyyy-MM-dd',
          [TYPE.dates]: 'yyyy-MM-dd',
          [TYPE.datetime]: 'yyyy-MM-dd HH:mm:ss'
        }[this.$attrs.type] || 'yyyy-MM-dd'
      )
    }
  }
}
</script>
