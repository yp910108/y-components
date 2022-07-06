<template>
  <el-input-number v-bind="{ controlsPosition: 'right', placeholder: '请输入 ', ...$attrs }" v-on="$listeners" />
</template>

<script>
export default {
  name: 'YInputNumber',
  inheritAttrs: false
}
</script>
