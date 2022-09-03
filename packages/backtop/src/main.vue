<template>
  <el-backtop v-bind="$attrs" v-on="$listeners">
    <slot />
  </el-backtop>
</template>

<script>
export default {
  name: 'YBacktop',
  inheritAttrs: false
}
</script>
