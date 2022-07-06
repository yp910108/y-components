<template>
  <el-popconfirm v-bind="$attrs" v-on="$listeners">
    <template #reference>
      <slot name="reference" />
    </template>
  </el-popconfirm>
</template>

<script>
export default {
  name: 'YPopconfirm',
  inheritAttrs: false
}
</script>
