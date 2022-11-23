<template>
  <el-tree ref="tree" v-bind="$attrs" v-on="_listeners">
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
  inject: ['treeSelect'],
  data() {
    return {
      currentKey: undefined
    }
  },
  computed: {
    _listeners() {
      return {
        ...this.$listeners,
        'node-click': (item, ...rest) => {
          if (item.disabled) {
            this.$refs.tree.setCurrentKey(this.currentKey)
            if (this.treeSelect) {
              this.treeSelect.$refs.input.focus()
            }
          } else {
            const currentKey = this.$refs.tree.getCurrentKey()
            this.currentKey = currentKey
            this.$emit('node-click', item, ...rest)
          }
        }
      }
    }
  },
  mounted() {
    for (const key in this.$refs.tree) {
      if (!(key in this) && typeof this.$refs.tree[key] === 'function') {
        this[key] = this.$refs.tree[key]
      }
    }
  }
}
</script>
