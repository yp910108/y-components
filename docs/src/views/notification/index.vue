<template>
  <div class="wrapper">
    <y-button type="text" @click="handleClick1">使用 HTML 片段</y-button>
    <y-button type="text" @click="handleClick2">单独引入</y-button>
  </div>
</template>

<script>
import Notification from 'packages/notification'

export default {
  data() {
    return {}
  },
  methods: {
    handleClick1() {
      this.$notify({
        title: 'HTML 片段',
        dangerouslyUseHTMLString: true,
        message: '<strong>这是 <i>HTML</i> 片段</strong>'
      })
    },
    handleClick2() {
      Notification.success('这是一条成功的提示消息')
    }
  }
}
</script>
