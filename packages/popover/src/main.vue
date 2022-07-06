<template>
  <el-popover ref="popover" v-bind="$attrs" v-on="$listeners">
    <slot />
    <template #reference>
      <slot name="reference" />
    </template>
  </el-popover>
</template>

<script>
export default {
  name: 'YPopover',
  inheritAttrs: false
}
</script>
