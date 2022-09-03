<template>
  <el-col v-bind="$attrs" v-on="$listeners">
    <slot />
  </el-col>
</template>

<script>
export default {
  name: 'YCol',
  inheritAttrs: false
}
</script>
