<template>
  <el-button v-bind="$attrs" v-on="$listeners">
    <slot />
  </el-button>
</template>

<script>
export default {
  name: 'YButton',
  inheritAttrs: false
}
</script>
