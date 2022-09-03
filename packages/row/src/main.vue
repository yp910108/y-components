<template>
  <el-row v-bind="$attrs" v-on="$listeners">
    <slot />
  </el-row>
</template>

<script>
export default {
  name: 'YRow',
  inheritAttrs: false
}
</script>
