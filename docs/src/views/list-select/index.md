## ListSelect 列表选择

列表选择控件。

:::tip
y-list-select 是由 y-input 和 y-pro-table 派生，建议在使用 y-list-select 前先熟悉 [y-pro-table](#/pro-table) 的使用方法。
:::

### 何时使用

类似 Select 的选择控件，区别在于数据源往往数据量较多并且需要分页或者查询条件比较复杂。例如选择人员、选择产品等等。

### 用法演示

:::demo 通过 `v-model` 的形式绑定选择的数据。

```html
<y-list-select v-model="value" title="选择人员" :columns="columns" :request="methodRequest">
  <template #id-card="{ row }">
    <em style="color: teal">{{ row.idCard }}</em>
  </template>
</y-list-select>

<script>
  const SEX = {
    man: '1',
    woman: '2'
  }
  const sexOptions = [
    { value: SEX.man, label: '男' },
    { value: SEX.woman, label: '女' }
  ]
  const sexKeyValue = {
    [SEX.man]: '男',
    [SEX.woman]: '女'
  }

  function fetchList({ startBirthDate, endBirthDate, pageNo, pageSize, ...rest }) {
    return new Promise((resolve) => {
      let list = []
      for (let i = 0; i < 100; i++) {
        list.push({
          id: i,
          name: `张三${i + 1}`,
          sex: i % 2 === 0 ? SEX.man : SEX.woman,
          phone: '13812345678',
          idCard: '370181200022222222',
          birthDate: '2022-07-07'
        })
      }
      if (startBirthDate && endBirthDate) {
        list = list.filter(
          (item) =>
            new Date(item.birthDate).getTime() >= new Date(startBirthDate).getTime() &&
            new Date(item.birthDate).getTime() <= new Date(endBirthDate).getTime()
        )
      }
      for (const prop in rest) {
        list = list.filter((item) => item[prop].includes(rest[prop]))
      }
      let result = list
      if (pageNo) {
        result = list.slice((pageNo - 1) * pageSize, pageNo * pageSize)
      }
      setTimeout(() => {
        resolve({ total: list.length, list: result })
      }, 1000)
    })
  }

  export default {
    data() {
      return {
        value: undefined,
        columns: [
          {
            prop: 'name',
            align: 'center',
            label: '姓名'
          },
          {
            prop: 'sex',
            align: 'center',
            label: '性别',
            valueEnum: sexOptions,
            render: (text) => sexKeyValue[text]
          },
          {
            prop: 'phone',
            align: 'center',
            label: '手机号',
            hideInSearch: true
          },
          {
            prop: 'idCard',
            align: 'center',
            label: '身份证号',
            slot: 'id-card'
          },
          {
            prop: 'birthDate',
            align: 'center',
            label: '出生日期',
            searchType: 'daterange'
          }
        ]
      }
    },
    methods: {
      async methodRequest(params) {
        params = { ...params, pageNo: params.currentPage }
        delete params.currentPage
        if (!!params.birthDate && !!params.birthDate.length) {
          params.startBirthDate = params.birthDate[0]
          params.endBirthDate = params.birthDate[1]
          delete params.birthDate
        }
        const { list, total } = await fetchList(params)
        return { data: list, total }
      }
    }
  }
</script>
```

:::

### 选择多个

:::demo 通过设置 `checkable` 属性，可以选择多个。

```html
<y-list-select v-model="value" title="选择人员" :columns="columns" :request="methodRequest" checkable>
  <template #id-card="{ row }">
    <em style="color: teal">{{ row.idCard }}</em>
  </template>
</y-list-select>

<script>
  const SEX = {
    man: '1',
    woman: '2'
  }
  const sexOptions = [
    { value: SEX.man, label: '男' },
    { value: SEX.woman, label: '女' }
  ]
  const sexKeyValue = {
    [SEX.man]: '男',
    [SEX.woman]: '女'
  }

  function fetchList({ startBirthDate, endBirthDate, pageNo, pageSize, ...rest }) {
    return new Promise((resolve) => {
      let list = []
      for (let i = 0; i < 100; i++) {
        list.push({
          id: i,
          name: `张三${i + 1}`,
          sex: i % 2 === 0 ? SEX.man : SEX.woman,
          phone: '13812345678',
          idCard: '370181200022222222',
          birthDate: '2022-07-07'
        })
      }
      if (startBirthDate && endBirthDate) {
        list = list.filter(
          (item) =>
            new Date(item.birthDate).getTime() >= new Date(startBirthDate).getTime() &&
            new Date(item.birthDate).getTime() <= new Date(endBirthDate).getTime()
        )
      }
      for (const prop in rest) {
        list = list.filter((item) => item[prop].includes(rest[prop]))
      }
      let result = list
      if (pageNo) {
        result = list.slice((pageNo - 1) * pageSize, pageNo * pageSize)
      }
      setTimeout(() => {
        resolve({ total: list.length, list: result })
      }, 1000)
    })
  }

  export default {
    data() {
      return {
        value: undefined,
        columns: [
          {
            prop: 'name',
            align: 'center',
            label: '姓名'
          },
          {
            prop: 'sex',
            align: 'center',
            label: '性别',
            valueEnum: sexOptions,
            render: (text) => sexKeyValue[text]
          },
          {
            prop: 'phone',
            align: 'center',
            label: '手机号',
            hideInSearch: true
          },
          {
            prop: 'idCard',
            align: 'center',
            label: '身份证号',
            slot: 'id-card'
          },
          {
            prop: 'birthDate',
            align: 'center',
            label: '出生日期',
            searchType: 'daterange'
          }
        ]
      }
    },
    methods: {
      async methodRequest(params) {
        params = { ...params, pageNo: params.currentPage }
        delete params.currentPage
        if (!!params.birthDate && !!params.birthDate.length) {
          params.startBirthDate = params.birthDate[0]
          params.endBirthDate = params.birthDate[1]
          delete params.birthDate
        }
        const { list, total } = await fetchList(params)
        return { data: list, total }
      }
    }
  }
</script>
```

:::

### ListSelectPane

:::demo `y-list-select-pane` 组件也可以单独引用。如果设置 `method-confirm` 属性，则在选择完成之前会调用该属性对应的方法，并且会把选择的结果或选择的结果集合（当设置 `checkable` 为 true 时）传递给该方法，请确保该方法返回一个 promise。

```html
<y-button type="primary" @click="handleClick">点击选择人员</y-button>
<y-list-select-pane
  ref="listSelectPane"
  title="选择人员"
  :columns="columns"
  :request="methodRequest"
  :method-confirm="beforeConfirm"
  checkable
  @select-success="handleSelectSuccess"
>
  <template #id-card="{ row }">
    <em style="color: teal">{{ row.idCard }}</em>
  </template>
</y-list-select-pane>

<script>
  const SEX = {
    man: '1',
    woman: '2'
  }
  const sexOptions = [
    { value: SEX.man, label: '男' },
    { value: SEX.woman, label: '女' }
  ]
  const sexKeyValue = {
    [SEX.man]: '男',
    [SEX.woman]: '女'
  }

  function fetchList({ startBirthDate, endBirthDate, pageNo, pageSize, ...rest }) {
    return new Promise((resolve) => {
      let list = []
      for (let i = 0; i < 100; i++) {
        list.push({
          id: i,
          name: `张三${i + 1}`,
          sex: i % 2 === 0 ? SEX.man : SEX.woman,
          phone: '13812345678',
          idCard: '370181200022222222',
          birthDate: '2022-07-07'
        })
      }
      if (startBirthDate && endBirthDate) {
        list = list.filter(
          (item) =>
            new Date(item.birthDate).getTime() >= new Date(startBirthDate).getTime() &&
            new Date(item.birthDate).getTime() <= new Date(endBirthDate).getTime()
        )
      }
      for (const prop in rest) {
        list = list.filter((item) => item[prop].includes(rest[prop]))
      }
      let result = list
      if (pageNo) {
        result = list.slice((pageNo - 1) * pageSize, pageNo * pageSize)
      }
      setTimeout(() => {
        resolve({ total: list.length, list: result })
      }, 1000)
    })
  }

  export default {
    data() {
      return {
        value: undefined,
        columns: [
          {
            prop: 'name',
            align: 'center',
            label: '姓名'
          },
          {
            prop: 'sex',
            align: 'center',
            label: '性别',
            valueEnum: sexOptions,
            render: (text) => sexKeyValue[text]
          },
          {
            prop: 'phone',
            align: 'center',
            label: '手机号',
            hideInSearch: true
          },
          {
            prop: 'idCard',
            align: 'center',
            label: '身份证号',
            slot: 'id-card'
          },
          {
            prop: 'birthDate',
            align: 'center',
            label: '出生日期',
            searchType: 'daterange'
          }
        ]
      }
    },
    methods: {
      async methodRequest(params) {
        params = { ...params, pageNo: params.currentPage }
        delete params.currentPage
        if (!!params.birthDate && !!params.birthDate.length) {
          params.startBirthDate = params.birthDate[0]
          params.endBirthDate = params.birthDate[1]
          delete params.birthDate
        }
        const { list, total } = await fetchList(params)
        return { data: list, total }
      },
      handleClick() {
        this.$refs.listSelectPane.show()
      },
      async beforeConfirm(list) {
        await this.$confirm(`已选择${list.length}数据`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
      },
      handleSelectSuccess(list) {
        console.log(list)
      }
    }
  }
</script>
```

:::

:::tip
y-list-select 是由 el-input、el-dialog 和 y-protable 派生，默认支持 [y-pro-table](#/pro-table#attributes) 的所有属性、事件以及方法，也可以通过 `attrs-input` 和 `attrs-dialog` 属性支持 [el-input](https://element.eleme.cn/2.13/#/zh-CN/component/input#input-attributes) 和 [el-dialog](https://element.eleme.cn/2.13/#/zh-CN/component/dialog#attributes) 的所有属性、事件以及方法。而 y-list-select-pane 是由 el-dialog 和 y-pro-table 派生，默认支持 [y-pro-table](#/pro-table#attributes) 的所有属性、事件以及方法，也可以通过 `attrs-dialog` 属性支持 [el-dialog](https://element.eleme.cn/2.13/#/zh-CN/component/dialog#attributes) 的所有属性、事件以及方法。
:::

### Attributes

| 参数            | 说明                                                                                                                                                                                        | 类型                   | 可选值 | 默认值 |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ------ | ------ |
| value / v-model | 绑定值                                                                                                                                                                                      | object / array         | —      | —      |
| title           | dialog 弹窗标题                                                                                                                                                                             | string                 | —      | 请选择 |
| props           | 配置选项，具体见下表                                                                                                                                                                        | object                 | —      | —      |
| checkable       | 是否多选                                                                                                                                                                                    | boolean                | —      | false  |
| clearable       | 是否可以清空选项                                                                                                                                                                            | boolean                | —      | true   |
| disabled        | 是否禁用                                                                                                                                                                                    | boolean                | —      | false  |
| placeholder     | 占位符                                                                                                                                                                                      | string                 | —      | 请选择 |
| method-confirm  | 选择完成之前调用的方法。该方法的参数是选择的结果或选择的结果集合（当设置 `checkable` 为 true 时），请确保该方法返回一个 promise。                                                           | function (selected) {} | —      | —      |
| attrs-input     | input 框 [el-input](https://element.eleme.cn/2.13/#/zh-CN/component/input#input-attributes) 对应的属性，当设置该属性时，`clearable`、`disabled`、`placeholder` 属性值会被该属性对应的值覆盖 | object                 | —      | —      |
| attrs-dialog    | dialog 弹窗 [el-dialog](https://element.eleme.cn/2.13/#/zh-CN/component/dialog#attributes) 对应的属性，当设置该属性时，`title` 属性值会被该属性对应的值覆盖                                 | object                 | —      | —      |

### ListSelectPane Attributes

| 参数            | 说明                                                                                                                                                        | 类型                   | 可选值 | 默认值 |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ------ | ------ |
| title           | dialog 弹窗标题                                                                                                                                             | string                 | —      | 请选择 |
| props           | 配置选项，具体见下表                                                                                                                                        | object                 | —      | —      |
| checkable       | 是否多选                                                                                                                                                    | boolean                | —      | false  |
| defaultSelected | 默认选中的项                                                                                                                                                | object / array         | —      | —      |
| method-confirm  | 选择完成之前调用的方法。该方法的参数是选择的结果或选择的结果集合（当设置 `checkable` 为 true 时），请确保该方法返回一个 promise。                           | function (selected) {} | —      | —      |
| attrs-dialog    | dialog 弹窗 [el-dialog](https://element.eleme.cn/2.13/#/zh-CN/component/dialog#attributes) 对应的属性，当设置该属性时，`title` 属性值会被该属性对应的值覆盖 | object                 | —      | —      |

### ListSelectPane Events

| 事件名         | 说明           | 参数     |
| -------------- | -------------- | -------- |
| select-success | 选择完成的回调 | selected |

### ListSelectPane Methods

| 方法名 | 说明                                                                                            | 参数            |
| ------ | ----------------------------------------------------------------------------------------------- | --------------- |
| show   | 显示弹窗的方法，可以将需要选中的项传入。如果传参，则参数值会覆盖 `defaultSelected` 属性对应的值 | defaultSelected |

### Props

| 参数  | 说明                                                                                       | 类型   | 可选值 | 默认值 |
| ----- | ------------------------------------------------------------------------------------------ | ------ | ------ | ------ |
| value | 指定选择列表中每一项的唯一 key 对应的属性名，当指定该属性时，`rowKey` 属性对应的值会被覆盖 | string | —      | id     |
| label | 指定选择列表中每一项的显示名称对应的属性名                                                 | string | —      | name   |
