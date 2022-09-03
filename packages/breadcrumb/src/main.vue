<template>
  <el-breadcrumb v-bind="$attrs">
    <slot />
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'YBreadcrumb',
  inheritAttrs: false
}
</script>
