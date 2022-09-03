<template>
  <el-radio v-bind="$attrs" v-on="$listeners">
    <slot />
  </el-radio>
</template>

<script>
export default {
  name: 'YRadio',
  inheritAttrs: false
}
</script>
