## Table 表格

y-table 支持设置 columns 属性以及 [template 风格](https://element.eleme.cn/2.13/#/zh-CN/component/table)来决定表格列如何渲染。

### 基础用法

:::demo 使用 `columns` 属性渲染表格列。

```html
<y-table :columns="columns" :data="list" />

<script>
  export default {
    data() {
      return {
        columns: [
          {
            type: 'index',
            label: '序号',
            width: 50,
            align: 'center'
          },
          {
            prop: 'date',
            label: '日期',
            align: 'center'
          },
          {
            prop: 'name',
            label: '姓名',
            align: 'center'
          },
          {
            prop: 'address',
            label: '地址',
            align: 'center'
          }
        ],
        list: new Array(5).fill({
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        })
      }
    }
  }
</script>
```

:::

### 自定义列

:::demo 可以通过 `render` 和 `slot` 两种方式自定义列渲染逻辑。

```html
<y-table :columns="columns" :data="list">
  <template #detail-info="{ row, $index, column }">
    <el-tag size="medium"> {{ column.label }} - {{ $index }}：{{ row.name }}，{{ row.address }} </el-tag>
  </template>
</y-table>

<script>
  export default {
    data() {
      return {
        columns: [
          {
            type: 'index',
            label: '序号',
            width: 50,
            align: 'center'
          },
          {
            prop: 'date',
            label: '日期',
            align: 'center'
          },
          {
            prop: 'name',
            label: '姓名',
            align: 'center'
          },
          {
            label: '地址',
            align: 'center',
            render: (_, { name, address }) => `${name} - ${address}`
          },
          {
            label: '详细信息',
            minWidth: '200',
            align: 'center',
            slot: 'detail-info'
          }
        ],
        list: new Array(5).fill({
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        })
      }
    }
  }
</script>
```

:::

### 自定义表头

:::demo 可以通过 `slotHeader` 自定义表头。

```html
<y-table :columns="columns" :data="list">
  <template #name-header="{ column }">
    <em style="color: teal">{{ column.label }}</em>
  </template>
</y-table>

<script>
  export default {
    data() {
      return {
        columns: [
          {
            type: 'index',
            label: '序号',
            width: 50,
            align: 'center'
          },
          {
            prop: 'date',
            label: '日期',
            align: 'center'
          },
          {
            prop: 'name',
            label: '姓名',
            align: 'center',
            slotHeader: 'name-header'
          },
          {
            prop: 'address',
            label: '地址',
            align: 'center'
          }
        ],
        list: new Array(5).fill({
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        })
      }
    }
  }
</script>
```

:::

### template 风格

:::demo template 风格的调用方式和 `el-table` 保持一致。

```html
<y-table :data="list">
  <y-table-column type="index" label="序号" width="50" align="center" />
  <y-table-column prop="date" label="日期" align="center" />
  <y-table-column label="配送信息" align="center">
    <y-table-column prop="name" label="姓名" align="center" />
    <y-table-column label="地址" align="center">
      <y-table-column prop="province" label="省份" align="center" />
      <y-table-column prop="city" label="市区" align="center" />
      <y-table-column prop="address" label="地址" align="center" />
      <y-table-column prop="zip" label="邮编" align="center" />
    </y-table-column>
  </y-table-column>
</y-table>

<script>
  export default {
    data() {
      return {
        list: new Array(5).fill({
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        })
      }
    }
  }
</script>
```

:::

:::tip
y-table 支持 el-table 的所有属性、事件以及方法，完整的 API 请参考[官方网站](https://element.eleme.cn/2.13/#/zh-CN/component/table#table-attributes)。
:::

### Attributes

| 参数    | 说明                           | 类型  | 可选值 | 默认值 |
| ------- | ------------------------------ | ----- | ------ | ------ |
| columns | 表格列的配置描述，具体项见下表 | array | —      | —      |

### Column

`column` 属性扩展了 `el-table` 的所有[列属性](https://element.eleme.cn/2.13/#/zh-CN/component/table#table-column-attributes)，属性名支持驼峰和中划线两种方式。

| 参数       | 说明                                                                                       | 类型                                    | 可选值 | 默认值 |
| ---------- | ------------------------------------------------------------------------------------------ | --------------------------------------- | ------ | ------ |
| render     | 生成复杂数据的渲染函数，参数分别为当前行的值、当前行数据、行索引、列信息，返回渲染后的结果 | function (text, row, $index, column) {} | —      | —      |
| slot       | 自定义列内容对应的 slot                                                                    | string                                  | —      | —      |
| slotHeader | 自定义表头内容对应的 slot                                                                  | string                                  | —      | —      |
