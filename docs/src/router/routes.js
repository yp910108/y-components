const navs = [
  {
    title: '开发指南',
    path: 'guide',
    children: [
      {
        title: '安装',
        path: 'installation'
      },
      {
        title: '快速上手',
        path: 'quickstart'
      }
    ]
  },
  {
    title: '组件',
    path: 'components',
    children: [
      {
        title: 'Icon 图标',
        path: 'icon'
      },
      {
        title: 'Select 选择器',
        path: 'select'
      },
      {
        title: 'DatePicker 日期时间选择器',
        path: 'date-picker'
      },
      {
        title: 'TreeSelect 树选择',
        path: 'tree-select'
      },
      {
        title: 'Upload 上传',
        path: 'upload'
      },
      {
        title: 'Drawer 抽屉',
        path: 'drawer'
      },
      {
        title: 'Table 表格',
        path: 'table'
      },
      {
        title: 'ProTable 高级表格',
        path: 'pro-table'
      },
      {
        title: 'ListSelect 列表选择',
        path: 'list-select'
      },
      {
        title: 'Demo 综合演示',
        path: 'demo'
      }
    ]
  }
]

const routes = []
for (const nav of navs) {
  nav.children.forEach((child) => {
    routes.push(child)
  })
}

export { navs }

export default routes
