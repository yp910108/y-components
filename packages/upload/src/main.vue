<template>
  <el-upload
    ref="upload"
    v-bind="{
      name: 'file',
      fileList,
      multiple: true,
      ..._attrs,
      onSuccess: handleSuccess,
      onRemove: handleRemove
    }"
  >
    <template #trigger>
      <slot name="trigger" />
    </template>
    <slot />
    <template #tip>
      <slot name="tip" />
    </template>
  </el-upload>
</template>

<script>
import { camelize } from 'packages/utils'

export default {
  name: 'YUpload',
  props: {
    value: Array
  },
  data() {
    return {
      fileList: undefined
    }
  },
  methods: {
    handleSuccess(response, file, fileList) {
      const newVal = [...(this.value || []), response]
      this.isSetValue = true
      this.$emit('input', newVal)
      const { onSuccess } = this._attrs
      if (!!onSuccess && typeof onSuccess === 'function') {
        onSuccess(response, file, fileList)
      }
    },
    handleRemove(file, fileList) {
      const files = fileList.filter((file) => file.status === 'success')
      const newVal = files.map((file) => {
        if (file.response) {
          return file.response
        } else {
          const { name, url } = file
          return { name, url }
        }
      })
      this.isSetValue = true
      this.$emit('input', newVal)
      const { onRemove } = this._attrs
      if (!!onRemove && typeof onRemove === 'function') {
        onRemove(file, fileList)
      }
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
  watch: {
    value: {
      immediate: true,
      handler(newVal) {
        if (this.isSetValue) {
          return (this.isSetValue = false)
        }
        if (newVal && newVal instanceof Array) {
          this.fileList = newVal
        }
      }
    }
  },
  mounted() {
    for (const key in this.$refs.upload) {
      if (!(key in this) && typeof this.$refs.upload[key] === 'function') {
        this[key] = this.$refs.upload[key]
      }
    }
  }
}
</script>
