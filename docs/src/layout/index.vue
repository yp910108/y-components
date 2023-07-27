<template>
  <y-scrollbar ref="scrollBar" class="layout-wrapper">
    <div class="layout">
      <y-scrollbar class="sidebar-wrapper">
        <ul class="sidebar">
          <li v-for="nav of navs" :key="nav.path" class="item">
            <span class="title">{{ nav.title }}</span>
            <ul class="menu-list">
              <li v-for="route of nav.children" :key="route.path" class="menu-item">
                <router-link :to="route.path">{{ route.title }}</router-link>
              </li>
            </ul>
          </li>
        </ul>
      </y-scrollbar>
      <div class="container">
        <router-view />
        <footer-nav />
      </div>
      <y-backtop target=".layout-wrapper .el-scrollbar__wrap" :right="100" :bottom="150" />
    </div>
  </y-scrollbar>
</template>

<script>
import { navs } from '@/router'
import FooterNav from '@/components/footer-nav'

export default {
  components: {
    FooterNav
  },
  data() {
    return {
      navs
    }
  },
  methods: {
    renderAnchorHref() {
      const els = document.querySelectorAll('h2 a,h3 a,h4 a,h5 a')
      const basePath = location.href.split('#').slice(1, 2)
      for (const el of els) {
        const href = el.getAttribute('href')
        el.href = `/#${basePath}${href}`
      }
    },
    goAnchor() {
      if (location.href.match(/#/g).length > 1) {
        const anchor = location.href.match(/#[^#]+$/g)
        if (!anchor) return
        const elm = document.querySelector(anchor[0])
        if (!elm) return
        setTimeout((_) => {
          this.scrollBox.scrollTop = elm.offsetTop
        }, 50)
      }
    }
  },
  mounted() {
    this.scrollBar = this.$refs.scrollBar
    this.scrollBox = this.$el.querySelector('.el-scrollbar__wrap')
    this.renderAnchorHref()
    this.goAnchor()
  },
  beforeRouteUpdate(to, from, next) {
    next()
    setTimeout(() => {
      const toPath = to.path
      const fromPath = from.path
      if (toPath === fromPath && to.hash) {
        this.goAnchor()
      }
      if (toPath !== fromPath) {
        document.documentElement.scrollTop = document.body.scrollTop = 0
        this.renderAnchorHref()
      }
    }, 100)
  },
  watch: {
    '$route.path'() {
      if (this.$route.hash) {
        this.$nextTick(() => {
          this.goAnchor()
        })
      } else {
        this.scrollBox.scrollTop = 0
        this.scrollBar.update()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.layout-wrapper {
  height: 100%;
  .layout {
    margin: 0 auto;
    max-width: 1140px;
    .sidebar-wrapper {
      position: fixed;
      z-index: 1;
      top: 40;
      width: 250px;
      height: 100%;
      .sidebar {
        list-style: none;
        margin: 0;
        box-sizing: border-box;
        padding: 50px 20px 15px 20px;
        width: 100%;
        font-size: 16px;
        .item {
          .title {
            display: block;
            height: 40px;
            line-height: 40px;
            font-weight: bold;
            font-size: 16px;
            color: #333;
          }
          .menu-list {
            list-style: none;
            margin: 0;
            padding: 0;
            .menu-item a {
              display: block;
              height: 40px;
              line-height: 40px;
              font-size: 14px;
              color: #444;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              &:hover,
              &.router-link-active {
                color: $--color-primary;
              }
            }
          }
        }
      }
    }
    .container {
      padding: 50px 20px 100px 270px;
    }
  }
}
</style>
