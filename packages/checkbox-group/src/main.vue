<template>
  <el-checkbox-group v-bind="$attrs" v-on="$listeners">
    <slot />
  </el-checkbox-group>
</template>

<script>
export default {
  name: 'YCheckboxGroup',
  inheritAttrs: false
}
</script>
