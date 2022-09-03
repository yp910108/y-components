<template>
  <el-divider v-bind="$attrs">
    <slot />
  </el-divider>
</template>

<script>
export default {
  name: 'YDivider',
  inheritAttrs: false
}
</script>
