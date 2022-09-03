## Select 选择器

y-select 组件扩展了 props 和 options 属性。

### 基础用法

:::demo 通过设置 `options` 属性，可以进行自动渲染。

```html
<y-select v-model="value" :options="options" />

<script>
  export default {
    data() {
      return {
        options: [
          {
            value: 'Shanghai',
            label: '上海'
          },
          {
            value: 'Beijing',
            label: '北京'
          },
          {
            value: 'Chengdu',
            label: '成都'
          },
          {
            value: 'Shenzhen',
            label: '深圳'
          },
          {
            value: 'Guangzhou',
            label: '广州'
          },
          {
            value: 'Dalian',
            label: '大连'
          }
        ],
        value: undefined
      }
    }
  }
</script>
```

:::

### 分组

:::demo 如果需要分组，在选项下面嵌套另外一个 `options` 即可。

```html
<y-select v-model="value" :options="options" />

<script>
  export default {
    data() {
      return {
        options: [
          {
            label: '热门城市',
            options: [
              {
                value: 'Shanghai',
                label: '上海'
              },
              {
                value: 'Beijing',
                label: '北京'
              }
            ]
          },
          {
            label: '城市名',
            options: [
              {
                value: 'Chengdu',
                label: '成都'
              },
              {
                value: 'Shenzhen',
                label: '深圳'
              },
              {
                value: 'Guangzhou',
                label: '广州'
              },
              {
                value: 'Dalian',
                label: '大连'
              }
            ]
          }
        ],
        value: undefined
      }
    }
  }
</script>
```

:::

### 自定义展示

:::demo 如果提供 `props` 属性，`y-select` 会根据 `props` 属性自定义展示。

```html
<y-select v-model="value" :props="{ value: 'code', label: 'name' }" :options="options" />

<script>
  export default {
    data() {
      return {
        options: [
          {
            code: 'Shanghai',
            name: '上海'
          },
          {
            code: 'Beijing',
            name: '北京'
          },
          {
            code: 'Chengdu',
            name: '成都'
          },
          {
            code: 'Shenzhen',
            name: '深圳'
          },
          {
            code: 'Guangzhou',
            name: '广州'
          },
          {
            code: 'Dalian',
            name: '大连'
          }
        ],
        value: undefined
      }
    }
  }
</script>
```

:::

:::tip
y-select 支持 el-select 的所有属性、事件以及方法，完整的 API 请参考[官方网站](https://element.eleme.cn/2.13/#/zh-CN/component/select#select-attributes)。
:::

### Attributes

| 参数    | 说明                                            | 类型   | 可选值 | 默认值 |
| ------- | ----------------------------------------------- | ------ | ------ | ------ |
| props   | 配置选项，具体见下表                            | object | —      | —      |
| options | 数据源。分组模式时，键名可通过 `props` 属性配置 | array  | —      | —      |

### Props

| 参数    | 说明                                                        | 类型   | 可选值 | 默认值  |
| ------- | ----------------------------------------------------------- | ------ | ------ | ------- |
| value   | 指定每一项的唯一 key 对应的属性名                           | string | —      | value   |
| label   | 指定每一项的显示名称对应的属性名                            | string | —      | label   |
| options | 分组模式时可选。当嵌套数的据源名称不为 options 时，需要指定 | string | —      | options |
