<template>
  <div class="layout">
    <ul class="sidebar">
      <li v-for="{ title, path } of routes" :key="path" class="item">
        <router-link :to="path">{{ title }}</router-link>
      </li>
    </ul>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import { combineURL } from '@/utils'
import routes from '@/router/routes'

function generateMenus(menuData, parentPath = '') {
  return (menuData || []).map(({ path, title, children }) => {
    const _path = `/${combineURL(parentPath, path || '')}`
    const _children = generateMenus(children, _path)
    return { path: _path, parentPath, title, children: !!_children && !!_children.length ? _children : undefined }
  })
}

export default {
  data() {
    return {
      routes: generateMenus(routes)
    }
  }
}
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  height: 100%;
  .sidebar {
    flex: 0 0 auto;
    border-right: 1px solid #ccc;
    width: 250px;
    font-size: 16px;
    .item {
      padding: 10px 20px;
    }
  }
  .content {
    flex: 1;
    padding: 20px;
    width: 0;
  }
}
</style>
