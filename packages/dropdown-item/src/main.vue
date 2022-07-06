<template>
  <el-dropdown-item v-bind="$attrs" v-on="$listeners">
    <slot />
  </el-dropdown-item>
</template>

<script>
export default {
  name: 'YDropdownItem',
  inheritAttrs: false
}
</script>
