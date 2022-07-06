<template>
  <el-tree ref="tree" v-bind="$attrs" v-on="$listeners">
    <template #default="{ node }">
      <slot :node="node">
        {{ node.label }}
      </slot>
    </template>
  </el-tree>
</template>

<script>
export default {
  name: 'YTree',
  inheritAttrs: false,
  mounted() {
    for (const key in this.$refs.tree) {
      if (!(key in this) && typeof this.$refs.tree[key] === 'function') {
        this[key] = this.$refs.tree[key]
      }
    }
  }
}
</script>
