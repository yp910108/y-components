<template>
  <el-option-group v-bind="$attrs" v-on="$listeners">
    <slot />
  </el-option-group>
</template>

<script>
export default {
  name: 'YOptionGroup',
  inheritAttrs: false
}
</script>
