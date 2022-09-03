<template>
  <el-dialog
    v-bind="{
      modalAppendToBody: true,
      appendToBody: true,
      closeOnClickModal: false,
      closeOnPressEscape: false,
      ..._attrs
    }"
    v-on="{ ...$listeners, open: handleOpen }"
  >
    <template #title>
      <slot name="title" />
    </template>
    <slot />
    <template #footer>
      <slot name="footer" />
    </template>
  </el-dialog>
</template>

<script>
import { camelize } from 'packages/utils'

export default {
  name: 'YDialog',
  inheritAttrs: false,
  methods: {
    handleOpen() {
      this.$nextTick(() => {
        this.$emit('open')
      })
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
  }
}
</script>
