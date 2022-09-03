<template>
  <el-checkbox v-bind="$attrs" v-on="$listeners">
    <slot />
  </el-checkbox>
</template>

<script>
export default {
  name: 'YCheckbox',
  inheritAttrs: false
}
</script>
