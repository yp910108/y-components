<template>
  <el-menu-item v-bind="$attrs" v-on="$listeners">
    <template #title>
      <slot name="title" />
    </template>
    <slot />
  </el-menu-item>
</template>

<script>
export default {
  name: 'YMenuItem',
  inheritAttrs: false
}
</script>
