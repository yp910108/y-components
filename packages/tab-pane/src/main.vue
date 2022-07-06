<template>
  <el-tab-pane v-bind="$attrs" v-on="$listeners">
    <slot />
  </el-tab-pane>
</template>

<script>
export default {
  name: 'YTabPane',
  inheritAttrs: false
}
</script>
