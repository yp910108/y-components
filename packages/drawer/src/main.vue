<template>
  <el-drawer
    ref="drawer"
    v-bind="{
      modalAppendToBody: true,
      appendToBody: true,
      wrapperClosable: false,
      closeOnPressEscape: false,
      ..._attrs
    }"
    v-on="{ ...$listeners, open: handleOpen, close: handleClose }"
  >
    <template #title>
      <slot name="title" />
    </template>
    <el-scrollbar ref="scrollBar" v-loading="loading">
      <div class="el-drawer__content">
        <slot />
      </div>
    </el-scrollbar>
    <div v-if="$slots.footer" class="el-drawer__footer">
      <slot name="footer" />
    </div>
  </el-drawer>
</template>

<script>
import { camelize } from 'packages/utils'

export default {
  name: 'YDrawer',
  inheritAttrs: false,
  props: {
    loading: Boolean
  },
  methods: {
    handleOpen() {
      this.$nextTick(() => {
        this.$emit('open')
      })
    },
    handleClose() {
      setTimeout(() => {
        this.scrollBox = this.$el.querySelector('.el-scrollbar__wrap')
        this.scrollBox.scrollTop = 0
        this.$refs.scrollBar.update()
      }, 200)
      this.$emit('close')
    }
  },
  computed: {
    _attrs() {
      const result = {}
      for (const key in this.$attrs) {
        result[camelize(key)] = this.$attrs[key]
      }
      return result
    }
  },
  mounted() {
    for (const key in this.$refs.drawer) {
      if (!(key in this) && typeof this.$refs.drawer[key] === 'function') {
        this[key] = this.$refs.drawer[key]
      }
    }
  }
}
</script>
