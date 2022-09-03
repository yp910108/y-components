<template>
  <div>
    <y-input-number v-model="val" />
    {{ val }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      val: undefined
    }
  }
}
</script>
