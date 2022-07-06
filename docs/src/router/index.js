import Vue from 'vue'
import Router from 'vue-router'
import { combineURL, toUpperCase } from '@/utils'
import Layout from '@/layout'
import NotFound from '@/views/404'
import routes from './routes'

Vue.use(Router)

// vue-router3.0+ 版本返回 promise，要求增加 catch 函数 此处进行 hack
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

function generateRoutes(originRoutesData) {
  const routes = []
  const generate = (routesData, parentPageUrl = '') => {
    for (const { path, children, ...restProps } of routesData || []) {
      const pageUrl = combineURL(parentPageUrl, path || '')
      const name = pageUrl
        .split('/')
        .map((s) => toUpperCase(s))
        .join('')
      if (!!children && !!children.length) {
        generate(children, pageUrl)
      } else {
        const page = () =>
          import('@/views/' + pageUrl)
            .then((res) => {
              res.default.name = name
              return res
            })
            .catch((e) => {
              console.error(e)
              return NotFound
            })
        routes.push({ path: pageUrl, name, component: page, meta: restProps })
      }
    }
  }
  generate(originRoutesData)
  return routes
}

const children = generateRoutes(routes)

export { default as routes } from './routes'

export default new Router({
  mode: 'hash',
  base: '/',
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      redirect: children && children.length ? `/${children[0].path}` : undefined,
      children
    },
    {
      path: '/404',
      component: () => import('@/views/404')
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
