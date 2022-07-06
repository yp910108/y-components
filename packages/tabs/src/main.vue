<template>
  <el-tabs v-bind="$attrs" v-on="$listeners">
    <slot />
  </el-tabs>
</template>

<script>
export default {
  name: 'YTabs',
  inheritAttrs: false
}
</script>
