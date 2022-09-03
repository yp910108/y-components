<template>
  <el-menu ref="menu" v-bind="$attrs" v-on="$listeners">
    <slot />
  </el-menu>
</template>

<script>
export default {
  name: 'YMenu',
  inheritAttrs: false,
  mounted() {
    for (const key in this.$refs.menu) {
      if (!(key in this) && typeof this.$refs.menu[key] === 'function') {
        this[key] = this.$refs.menu[key]
      }
    }
  }
}
</script>
