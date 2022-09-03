<template>
  <el-form-item ref="formItem" v-bind="$attrs" v-on="$listeners">
    <slot />
    <template #label>
      <slot name="label" />
    </template>
    <template #error="{ error }">
      <slot name="error" :error="error" />
    </template>
  </el-form-item>
</template>

<script>
export default {
  name: 'YFormItem',
  inheritAttrs: false,
  mounted() {
    for (const key in this.$refs.formItem) {
      if (!(key in this) && typeof this.$refs.formItem[key] === 'function') {
        this[key] = this.$refs.formItem[key]
      }
    }
  }
}
</script>
