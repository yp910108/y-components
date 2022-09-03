<template>
  <el-card v-bind="$attrs">
    <template #header>
      <slot name="header" />
    </template>
    <slot />
  </el-card>
</template>

<script>
export default {
  name: 'YCard',
  inheritAttrs: false
}
</script>
