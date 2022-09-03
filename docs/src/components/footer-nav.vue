<template>
  <div class="footer-nav">
    <span v-if="prev" class="footer-nav-link footer-nav-left" @click="handleNavClick('prev')">
      <i class="el-icon-arrow-left" />
      {{ prev.title }}
    </span>
    <span v-if="next" class="footer-nav-link footer-nav-right" @click="handleNavClick('next')">
      {{ next.title }}
      <i class="el-icon-arrow-right" />
    </span>
  </div>
</template>

<script>
import { routes } from '@/router'

export default {
  methods: {
    handleNavClick(direction) {
      this.$router.push(direction === 'prev' ? `/${this.prev.path}` : `/${this.next.path}`)
    }
  },
  computed: {
    prev() {
      const { path } = this.$route
      const index = routes.findIndex((route) => `/${route.path}` === path)
      return routes[index - 1]
    },
    next() {
      const { path } = this.$route
      const index = routes.findIndex((route) => `/${route.path}` === path)
      return routes[index + 1]
    }
  }
}
</script>

<style lang="scss">
.footer-nav {
  padding: 40px 0;
  color: #333;
  font-size: 14px;

  &::after {
    content: '';
    display: block;
    clear: both;
  }

  & i {
    transition: 0.3s;
    color: #999;
    vertical-align: baseline;
  }
}

.footer-nav-link {
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    color: #409eff;

    & i {
      color: #409eff;
    }
  }
}

.footer-nav-left {
  float: left;
  margin-left: -4px;
}

.footer-nav-right {
  float: right;
  margin-right: -4px;
}
</style>
