<template>
  <div class="wrapper">
    <y-button type="text" @click="handleClick1">vnode</y-button>
    <y-button type="text" @click="handleClick2">单独引入</y-button>
  </div>
</template>

<script>
import Message from 'packages/message'

export default {
  data() {
    return {}
  },
  methods: {
    handleClick1() {
      const h = this.$createElement
      this.$message({
        message: h('p', null, [h('span', null, '内容可以是 '), h('i', { style: 'color: teal' }, 'VNode')])
      })
    },
    handleClick2() {
      Message.success('恭喜你，这是一条成功消息')
    }
  }
}
</script>
