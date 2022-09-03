<template>
  <el-pagination
    v-bind="{
      layout: 'total, sizes, prev, pager, next, jumper',
      background: true,
      pageSizes: [10, 20, 30, 50],
      ...$attrs
    }"
    v-on="$listeners"
  />
</template>

<script>
export default {
  name: 'YPagination',
  inheritAttrs: false
}
</script>
