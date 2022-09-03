<template>
  <el-menu-item-group v-bind="$attrs" v-on="$listeners">
    <template #title>
      <slot name="title" />
    </template>
    <slot />
  </el-menu-item-group>
</template>

<script>
export default {
  name: 'YMenuItemGroup',
  inheritAttrs: false
}
</script>
