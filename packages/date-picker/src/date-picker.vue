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
      isMouseEnter: true
    }
  },
  computed: {
    hideIcon() {
      return this.$attrs.disabled === undefined && this.$attrs.value && this.isMouseEnter
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
