<template>
  <el-dropdown-menu v-bind="$attrs" v-on="$listeners">
    <slot />
  </el-dropdown-menu>
</template>

<script>
export default {
  name: 'YDropdownMenu',
  inheritAttrs: false
}
</script>
