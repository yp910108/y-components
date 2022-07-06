<template>
  <el-checkbox-button v-bind="$attrs" v-on="$listeners">
    <slot />
  </el-checkbox-button>
</template>

<script>
export default {
  name: 'YCheckBoxButton',
  inheritAttrs: false
}
</script>
