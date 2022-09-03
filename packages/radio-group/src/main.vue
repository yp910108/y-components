<template>
  <el-radio-group v-bind="$attrs" v-on="$listeners">
    <slot />
  </el-radio-group>
</template>

<script>
export default {
  name: 'YRadioGroup',
  inheritAttrs: false
}
</script>
