<template>
  <el-submenu ref="menu" v-bind="$attrs" v-on="$listeners">
    <template #title>
      <slot name="title" />
    </template>
    <slot />
  </el-submenu>
</template>

<script>
export default {
  name: 'YSubmenu',
  inheritAttrs: false,
  mounted() {
    // hack for 'Maximum call stack size exceeded.' in file el-submenu on line 201. this.$parent.$el.dispatchEvent(new MouseEvent('mouseenter'));
    const menu = this.$refs.menu
    this.$refs.menu.handleMouseenter = (event, showTimeout = menu.showTimeout) => {
      if (!('ActiveXObject' in window) && event.type === 'focus' && !event.relatedTarget) {
        return
      }
      const { rootMenu, disabled } = menu
      if (
        (rootMenu.menuTrigger === 'click' && rootMenu.mode === 'horizontal') ||
        (!rootMenu.collapse && rootMenu.mode === 'vertical') ||
        disabled
      ) {
        return
      }
      menu.dispatch('ElSubmenu', 'mouse-enter-child')
      clearTimeout(menu.timeout)
      menu.timeout = setTimeout(() => {
        menu.rootMenu.openMenu(menu.index, menu.indexPath)
      }, showTimeout)
      if (menu.appendToBody && menu.$parent.$el !== menu.$el) {
        menu.$parent.$el.dispatchEvent(new MouseEvent('mouseenter'))
      }
    }
  }
}
</script>
