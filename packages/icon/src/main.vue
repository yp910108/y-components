<template>
  <svg v-on="$listeners" aria-hidden="true" class="y-icon">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  name: 'YIcon',
  inheritAttrs: false,
  props: {
    icon: {
      type: String,
      required: true
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.icon}`
    }
  }
}
</script>
