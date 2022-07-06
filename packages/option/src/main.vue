<template>
  <el-option ref="option" v-bind="$attrs" v-on="$listeners">
    <slot />
  </el-option>
</template>

<script>
export default {
  name: 'YOption',
  inheritAttrs: false,
  computed: {
    // hack for option-group, fix issues 'element-ui/packages/select/src/option-group.vue' line 46
    visible() {
      return this.$refs.option.visible
    }
  }
}
</script>
