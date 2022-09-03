<template>
  <el-breadcrumb-item v-bind="$attrs">
    <slot />
  </el-breadcrumb-item>
</template>

<script>
export default {
  name: 'YBreadcrumbItem',
  inheritAttrs: false
}
</script>
