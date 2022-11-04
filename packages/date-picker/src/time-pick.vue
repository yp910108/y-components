<template>
  <div
    :class="{ 'y-date-editor-wrapper': true, 'y-date-editor-icon-hide-wrapper': hideIcon }"
    @mouseenter="isMouseEnter = true"
    @mouseleave="isMouseEnter = false"
  >
    <el-time-picker v-bind="{ valueFormat: 'HH:mm:ss', placeholder: '请选择', ...$attrs }" v-on="$listeners" />
  </div>
</template>

<script>
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
    }
  }
}
</script>
