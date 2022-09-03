<template>
  <div class="wrapper">
    <div
      v-loading="fullscreenLoading"
      style="width: 300px; height: 300px; background: #ccc; cursor: pointer"
      @click="handleClick1"
    />
    <y-button plain style="margin-top: 10px" @click="handleClick2">show loading</y-button>
    <y-button plain style="margin-top: 10px" @click="handleClick3">show service</y-button>
  </div>
</template>

<script>
import Loading from 'packages/loading'

export default {
  data() {
    return {
      fullscreenLoading: false
    }
  },
  methods: {
    handleClick1() {
      this.fullscreenLoading = true
      setTimeout(() => {
        this.fullscreenLoading = false
      }, 1000)
    },
    handleClick2() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      setTimeout(() => {
        loading.close()
      }, 1000)
    },
    handleClick3() {
      const loadingInstance = Loading.service({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      loadingInstance.close()
      // this.$nextTick(() => {
      //   loadingInstance.close()
      // })
    }
  }
}
</script>
