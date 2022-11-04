<template>
  <div
    :class="{
      'y-date-editor-wrapper': true,
      'y-range-editor-wrapper': true,
      'y-date-editor-icon-hide-wrapper': hideIcon
    }"
    @mouseenter="isMouseEnter = true"
    @mouseleave="isMouseEnter = false"
  >
    <el-date-picker
      v-bind="{ valueFormat, rangeSeparator: '至', startPlaceholder, endPlaceholder, ...$attrs }"
      v-on="$listeners"
    />
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
      return {
        [TYPE.monthrange]: 'yyyy-MM',
        [TYPE.daterange]: 'yyyy-MM-dd',
        [TYPE.datetimerange]: 'yyyy-MM-dd HH:mm:ss'
      }[this.$attrs.type]
    },
    startPlaceholder() {
      return {
        [TYPE.monthrange]: '开始月份',
        [TYPE.daterange]: '开始日期',
        [TYPE.datetimerange]: '开始日期'
      }[this.$attrs.type]
    },
    endPlaceholder() {
      return {
        [TYPE.monthrange]: '结束月份',
        [TYPE.daterange]: '结束日期',
        [TYPE.datetimerange]: '结束日期'
      }[this.$attrs.type]
    }
  }
}
</script>
