<template>
  <div>
    <y-cascader v-model="val1" :options="options1" />
    {{ val1 }}
  </div>
</template>

<script>
import { options1 } from './city'

export default {
  data() {
    return {
      val1: undefined,
      options1
    }
  }
}
</script>
