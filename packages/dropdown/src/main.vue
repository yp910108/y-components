<template>
  <el-dropdown v-bind="$attrs" v-on="$listeners">
    <slot />
    <template #dropdown>
      <slot name="dropdown" />
    </template>
  </el-dropdown>
</template>

<script>
export default {
  name: 'YDropdown',
  inheritAttrs: false
}
</script>
