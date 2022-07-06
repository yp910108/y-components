<template>
  <el-cascader ref="cascader" v-bind="{ clearable: true, ...$attrs }" v-on="$listeners" />
</template>

<script>
export default {
  name: 'YCascader',
  inheritAttrs: false,
  mounted() {
    for (const key in this.$refs.cascader) {
      if (!(key in this) && typeof this.$refs.cascader[key] === 'function') {
        this[key] = this.$refs.cascader[key]
      }
    }
  }
}
</script>
