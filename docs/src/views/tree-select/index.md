## TreeSelect 树选择

树型选择控件。

### 何时使用

类似 Select 的选择控件，可选择的数据结构是一个树形结构时，可以使用 TreeSelect，例如公司层级、学科系统、分类目录等等。

### 用法演示

:::demo 需要提供嵌套结构的 `options` 属性。

```html
<y-tree-select v-model="value" :options="options" />

<script>
  export default {
    data() {
      return {
        options: [
          {
            value: 10001,
            label: '1-1',
            children: [
              {
                value: 1000101,
                label: '1-1-1'
              },
              {
                value: 1000102,
                label: '1-1-2',
                disabled: true
              },
              {
                value: 1000103,
                label: '1-1-3'
              },
              {
                value: 1000104,
                label: '测试超出长度测试超出长度'
              },
              {
                value: 1000105,
                label: '1-1-5'
              }
            ]
          },
          {
            value: 10002,
            label: '1-2',
            children: [
              {
                value: 1000201,
                label: '1-2-1'
              },
              {
                value: 1000202,
                label: '1-2-2'
              },
              {
                value: 1000203,
                label: '1-2-3'
              },
              {
                value: 1000204,
                label: '1-2-4'
              },
              {
                value: 1000205,
                label: '1-2-5'
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

### 选择多个

:::demo 通过设置 `show-checkbox` 属性，可以选择多个。

```html
<y-tree-select v-model="value" :options="options" show-checkbox />

<script>
  export default {
    data() {
      return {
        options: [
          {
            value: 10001,
            label: '1-1',
            children: [
              {
                value: 1000101,
                label: '1-1-1'
              },
              {
                value: 1000102,
                label: '1-1-2',
                disabled: true
              },
              {
                value: 1000103,
                label: '1-1-3'
              },
              {
                value: 1000104,
                label: '测试超出长度测试超出长度'
              },
              {
                value: 1000105,
                label: '1-1-5'
              }
            ]
          },
          {
            value: 10002,
            label: '1-2',
            children: [
              {
                value: 1000201,
                label: '1-2-1'
              },
              {
                value: 1000202,
                label: '1-2-2'
              },
              {
                value: 1000203,
                label: '1-2-3'
              },
              {
                value: 1000204,
                label: '1-2-4'
              },
              {
                value: 1000205,
                label: '1-2-5'
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

:::demo 如果提供 `props` 属性，`y-tree-select` 会根据 `props` 属性自定义展示。

```html
<y-tree-select
  v-model="value"
  :props="{
    value: 'code',
    label: 'name',
    children: 'childs'
  }"
  :options="options"
/>

<script>
  export default {
    data() {
      return {
        options: [
          {
            code: 10001,
            name: '1-1',
            childs: [
              {
                code: 1000101,
                name: '1-1-1'
              },
              {
                code: 1000102,
                name: '1-1-2'
              },
              {
                code: 1000103,
                name: '1-1-3'
              },
              {
                code: 1000104,
                name: '测试超出长度测试超出长度'
              },
              {
                code: 1000105,
                name: '1-1-5'
              }
            ]
          },
          {
            code: 10002,
            name: '1-2',
            childs: [
              {
                code: 1000201,
                name: '1-2-1'
              },
              {
                code: 1000202,
                name: '1-2-2'
              },
              {
                code: 1000203,
                name: '1-2-3'
              },
              {
                code: 1000204,
                name: '1-2-4'
              },
              {
                code: 1000205,
                name: '1-2-5'
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

:::tip
y-tree-select 由 el-input 和 el-tree 派生，默认支持 [el-tree](https://element.eleme.cn/2.13/#/zh-CN/component/tree#attributes) 的所有属性、事件以及方法，也可以通过 `attrs-input` 属性支持 [el-input](https://element.eleme.cn/2.13/#/zh-CN/component/input#input-attributes) 的所有属性、事件以及方法。
:::

### Attributes

| 参数            | 说明                                                                                                                                                                                        | 类型           | 可选值 | 默认值 |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- | ------ | ------ |
| value / v-model | 绑定值                                                                                                                                                                                      | string / array | —      | —      |
| props           | 配置选项，具体见下表                                                                                                                                                                        | object         | —      | —      |
| show-checkbox   | 是否多选                                                                                                                                                                                    | boolean        | —      | false  |
| options         | 数据源。键名可通过 `props` 属性配置                                                                                                                                                         | array          | —      | —      |
| filterable      | 是否可搜索                                                                                                                                                                                  | boolean        | —      | true   |
| clearable       | 是否可以清空选项                                                                                                                                                                            | boolean        | —      | true   |
| disabled        | 是否禁用                                                                                                                                                                                    | boolean        | —      | false  |
| placeholder     | 占位符                                                                                                                                                                                      | string         | —      | 请选择 |
| attrs-input     | input 框 [el-input](https://element.eleme.cn/2.13/#/zh-CN/component/input#input-attributes) 对应的属性，当设置该属性时，`clearable`、`disabled`、`placeholder` 属性值会被该属性对应的值覆盖 | object         | —      | —      |

### Props

| 参数     | 说明                                                                              | 类型   | 可选值 | 默认值   |
| -------- | --------------------------------------------------------------------------------- | ------ | ------ | -------- |
| value    | 指定每一项的唯一 key 对应的属性名，当指定该属性时，`nodeKey` 属性对应的值会被覆盖 | string | —      | value    |
| label    | 指定每一项的显示名称对应的属性名                                                  | string | —      | label    |
| children | 指定每一项的子元素对应的属性名                                                    | string | —      | children |
