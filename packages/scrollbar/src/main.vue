<template>
  <el-scrollbar ref="scrollBar" v-bind="$attrs" v-on="$listeners">
    <slot />
  </el-scrollbar>
</template>

<script>
export default {
  name: 'YScrollbar',
  inheritAttrs: false,
  mounted() {
    for (const key in this.$refs.scrollBar) {
      if (!(key in this) && typeof this.$refs.scrollBar[key] === 'function') {
        this[key] = this.$refs.scrollBar[key]
      }
    }
  }
}
</script>
