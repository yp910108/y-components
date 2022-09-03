<template>
  <el-radio-button v-bind="$attrs" v-on="$listeners">
    <slot />
  </el-radio-button>
</template>

<script>
export default {
  name: 'YRadioButton',
  inheritAttrs: false
}
</script>
