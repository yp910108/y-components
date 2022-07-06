<template>
  <el-form ref="form" v-bind="$attrs" v-on="$listeners">
    <slot />
  </el-form>
</template>

<script>
export default {
  name: 'YForm',
  inheritAttrs: false,
  mounted() {
    for (const key in this.$refs.form) {
      if (!(key in this) && typeof this.$refs.form[key] === 'function') {
        this[key] = this.$refs.form[key]
      }
    }
  }
}
</script>
