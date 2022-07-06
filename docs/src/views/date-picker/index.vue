<template>
  <div>
    <y-date-picker v-model="val" />
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
