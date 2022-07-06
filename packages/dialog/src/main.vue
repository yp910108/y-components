<template>
  <el-dialog v-bind="$attrs" v-on="$listeners">
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
export default {
  name: 'YDialog',
  inheritAttrs: false
}
</script>
