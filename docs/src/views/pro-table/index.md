## ProTable

y-pro-table 在 y-table 之上扩展了更多便捷易用的功能，内置搜索、筛选、刷新等常用表格行为。

:::tip
pro-table 是由 y-table 派生，建议在使用 pro-table 前先熟悉 [y-table](#/table) 的使用方法。
:::

### 基础用法

:::demo 可以通过设置 `hideInSearch` 以及 `hideInTable` 属性来控制列是否在查询条件以及表格中显示。

```html
<div class="app-content">
  <y-pro-table :columns="columns" :request="methodRequest">
    <template #action="{ row }">
      <y-button type="text" @click="handleEdit(row)">修改</y-button>
      <y-divider direction="vertical" />
      <y-popconfirm title="确定删除该条数据吗？" @onConfirm="handleDelete(row)">
        <y-button slot="reference" type="text">删除</y-button>
      </y-popconfirm>
    </template>
  </y-pro-table>
</div>

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
        columns: [
          {
            type: 'index',
            width: 50,
            align: 'center',
            label: '序号'
          },
          {
            prop: 'name',
            align: 'center',
            label: '用户姓名'
          },
          {
            prop: 'sex',
            align: 'center',
            label: '用户性别',
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
            label: '身份证号'
          },
          {
            prop: 'birthDate',
            align: 'center',
            label: '出生日期',
            searchType: 'daterange'
          },
          {
            prop: 'hidden',
            label: '不显示',
            hideInSearch: true,
            hideInTable: true
          },
          {
            width: 110,
            align: 'center',
            label: '操作',
            slot: 'action',
            hideInSearch: true
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
      handleEdit(item) {
        console.log(item)
      },
      handleDelete(item) {
        console.log(item)
      }
    }
  }
</script>

<style>
  .app-content {
    height: 500px;
  }
</style>
```

:::

### 查询条件

:::demo y-table 查询条件内置了三种控件类型，分别为输入框、下拉框以及日期时间选择器。可以通过 `slotSearch` 属性自定义更加复杂的查询条件。

```html
<div class="app-content">
  <y-pro-table :columns="columns" :request="methodRequest">
    <template #search-is-party-member="{ params, prop }">
      <y-radio-group v-model="params[prop]">
        <y-radio :label="IS_OR_NOT.is">{{ isOrNotKeyValue[IS_OR_NOT.is] }}</y-radio>
        <y-radio :label="IS_OR_NOT.not">{{ isOrNotKeyValue[IS_OR_NOT.not] }}</y-radio>
      </y-radio-group>
    </template>
    <template #action="{ row }">
      <y-button type="text" @click="handleEdit(row)">修改</y-button>
      <y-divider direction="vertical" />
      <y-popconfirm title="确定删除该条数据吗？" class="handleDelete(row)">
        <y-button slot="reference" type="text">删除</y-button>
      </y-popconfirm>
    </template>
  </y-pro-table>
</div>

<script>
  const IS_OR_NOT = {
    is: '1',
    not: '0'
  }
  const isOrNotKeyValue = {
    [IS_OR_NOT.is]: '是',
    [IS_OR_NOT.not]: '否'
  }

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
          birthDate: '2022-07-07',
          isPartyMember: i % 2 === 0 ? IS_OR_NOT.is : IS_OR_NOT.not
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
        IS_OR_NOT,
        isOrNotKeyValue,
        columns: [
          {
            type: 'index',
            width: 50,
            align: 'center',
            label: '序号'
          },
          {
            prop: 'name',
            align: 'center',
            label: '用户姓名'
          },
          {
            prop: 'sex',
            align: 'center',
            label: '用户性别',
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
            label: '身份证号'
          },
          {
            prop: 'birthDate',
            align: 'center',
            label: '出生日期',
            searchType: 'daterange'
          },
          {
            prop: 'isPartyMember',
            align: 'center',
            label: '是否党员',
            slotSearch: 'search-is-party-member',
            render: (text) => isOrNotKeyValue[text]
          },
          {
            width: 110,
            align: 'center',
            label: '操作',
            slot: 'action',
            hideInSearch: true
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
      handleEdit(item) {
        console.log(item)
      },
      handleDelete(item) {
        console.log(item)
      }
    }
  }
</script>

<style>
  .app-content {
    height: 500px;
  }
</style>
```

:::

### 单个查询条件

:::demo 当只有一个查询条件时，该查询条件会出现在表格的右方。

```html
<div class="app-content">
  <y-pro-table :columns="columns" :request="methodRequest">
    <template #search-is-party-member="{ params, prop }">
      <y-radio-group v-model="params[prop]">
        <y-radio :label="IS_OR_NOT.is">{{ isOrNotKeyValue[IS_OR_NOT.is] }}</y-radio>
        <y-radio :label="IS_OR_NOT.not">{{ isOrNotKeyValue[IS_OR_NOT.not] }}</y-radio>
      </y-radio-group>
    </template>
    <template #action="{ row }">
      <y-button type="text" @click="handleEdit(row)">修改</y-button>
      <y-divider direction="vertical" />
      <y-popconfirm title="确定删除该条数据吗？" @onConfirm="handleDelete(row)">
        <y-button slot="reference" type="text">删除</y-button>
      </y-popconfirm>
    </template>
  </y-pro-table>
</div>

<script>
  const IS_OR_NOT = {
    is: '1',
    not: '0'
  }
  const isOrNotKeyValue = {
    [IS_OR_NOT.is]: '是',
    [IS_OR_NOT.not]: '否'
  }

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
        IS_OR_NOT,
        isOrNotKeyValue,
        columns: [
          {
            type: 'index',
            width: 50,
            align: 'center',
            label: '序号'
          },
          {
            prop: 'name',
            align: 'center',
            label: '用户姓名'
          },
          {
            prop: 'sex',
            align: 'center',
            label: '用户性别',
            render: (text) => sexKeyValue[text],
            hideInSearch: true
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
            hideInSearch: true
          },
          {
            prop: 'birthDate',
            align: 'center',
            label: '出生日期',
            hideInSearch: true
          },
          {
            width: 110,
            align: 'center',
            label: '操作',
            slot: 'action',
            hideInSearch: true
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
      handleEdit(item) {
        console.log(item)
      },
      handleDelete(item) {
        console.log(item)
      }
    }
  }
</script>

<style>
  .app-content {
    height: 500px;
  }
</style>
```

:::

### 初始化

:::demo 设置 `initialValue` 属性可以初始化查询条件。

```html
<div class="app-content">
  <y-pro-table :columns="columns" :request="methodRequest">
    <template #action="{ row }">
      <y-button type="text" @click="handleEdit(row)">修改</y-button>
      <y-divider direction="vertical" />
      <y-popconfirm title="确定删除该条数据吗？" @onConfirm="handleDelete(row)">
        <y-button slot="reference" type="text">删除</y-button>
      </y-popconfirm>
    </template>
  </y-pro-table>
</div>

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
        columns: [
          {
            type: 'index',
            width: 50,
            align: 'center',
            label: '序号'
          },
          {
            prop: 'name',
            align: 'center',
            label: '用户姓名'
          },
          {
            prop: 'sex',
            align: 'center',
            label: '用户性别',
            valueEnum: sexOptions,
            render: (text) => sexKeyValue[text],
            initialValue: SEX.man
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
            label: '身份证号'
          },
          {
            prop: 'birthDate',
            align: 'center',
            label: '出生日期',
            searchType: 'daterange'
          },
          {
            width: 110,
            align: 'center',
            label: '操作',
            slot: 'action',
            hideInSearch: true
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
      handleEdit(item) {
        console.log(item)
      },
      handleDelete(item) {
        console.log(item)
      }
    }
  }
</script>

<style>
  .app-content {
    height: 500px;
  }
</style>
```

:::

### 改变即查询

:::demo 如果想要在查询条件改变时立即触发查询操作，可以将 `searchOnFieldChange` 属性设置为 true

```html
<div class="app-content">
  <y-pro-table :columns="columns" :request="methodRequest">
    <template #action="{ row }">
      <y-button type="text" @click="handleEdit(row)">修改</y-button>
      <y-divider direction="vertical" />
      <y-popconfirm title="确定删除该条数据吗？" @onConfirm="handleDelete(row)">
        <y-button slot="reference" type="text">删除</y-button>
      </y-popconfirm>
    </template>
  </y-pro-table>
</div>

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
        columns: [
          {
            type: 'index',
            width: 50,
            align: 'center',
            label: '序号'
          },
          {
            prop: 'name',
            align: 'center',
            label: '用户姓名'
          },
          {
            prop: 'sex',
            align: 'center',
            label: '用户性别',
            valueEnum: sexOptions,
            render: (text) => sexKeyValue[text],
            searchOnFieldChange: true
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
            label: '身份证号'
          },
          {
            prop: 'birthDate',
            align: 'center',
            label: '出生日期',
            searchType: 'daterange'
          },
          {
            width: 110,
            align: 'center',
            label: '操作',
            slot: 'action',
            hideInSearch: true
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
      handleEdit(item) {
        console.log(item)
      },
      handleDelete(item) {
        console.log(item)
      }
    }
  }
</script>

<style>
  .app-content {
    height: 500px;
  }
</style>
```

:::

### Toolbar

:::demo 可以使用 `toolbar-left` 以及 `toolbar-right` 插槽来自定义操作区域以及提示信息。

```html
<div class="app-content">
  <y-pro-table :columns="columns" :request="methodRequest">
    <template #toolbar-left>
      <el-button type="primary">新 建</el-button>
    </template>
    <template #toolbar-right>
      <em style="margin-right: 10px; font-size: 14px; color: teal">这是一段提示信息</em>
    </template>
    <template #action="{ row }">
      <y-button type="text" @click="handleEdit(row)">修改</y-button>
      <y-divider direction="vertical" />
      <y-popconfirm title="确定删除该条数据吗？" @onConfirm="handleDelete(row)">
        <y-button slot="reference" type="text">删除</y-button>
      </y-popconfirm>
    </template>
  </y-pro-table>
</div>

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
        columns: [
          {
            type: 'index',
            width: 50,
            align: 'center',
            label: '序号'
          },
          {
            prop: 'name',
            align: 'center',
            label: '用户姓名'
          },
          {
            prop: 'sex',
            align: 'center',
            label: '用户性别',
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
            label: '身份证号'
          },
          {
            prop: 'birthDate',
            align: 'center',
            label: '出生日期',
            searchType: 'daterange'
          },
          {
            width: 110,
            align: 'center',
            label: '操作',
            slot: 'action',
            hideInSearch: true
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
      handleEdit(item) {
        console.log(item)
      },
      handleDelete(item) {
        console.log(item)
      }
    }
  }
</script>

<style>
  .app-content {
    height: 500px;
  }
</style>
```

:::

### 隐藏分页信息

:::demo 通过设置 `pagination` 属性可以隐藏分页信息。

```html
<div class="app-content">
  <y-pro-table :columns="columns" :request="methodRequest" :pagination="false">
    <template #toolbar-left>
      <el-button type="primary">新 建</el-button>
    </template>
    <template #action="{ row }">
      <y-button type="text" @click="handleEdit(row)">修改</y-button>
      <y-divider direction="vertical" />
      <y-popconfirm title="确定删除该条数据吗？" @onConfirm="handleDelete(row)">
        <y-button slot="reference" type="text">删除</y-button>
      </y-popconfirm>
    </template>
  </y-pro-table>
</div>

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

  function fetchList({ startBirthDate, endBirthDate, ...rest }) {
    return new Promise((resolve) => {
      let list = []
      for (let i = 0; i < 30; i++) {
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
        console.log(prop)
        list = list.filter((item) => item[prop].includes(rest[prop]))
      }
      let result = list
      setTimeout(() => {
        resolve({ list })
      }, 1000)
    })
  }

  export default {
    data() {
      return {
        columns: [
          {
            type: 'index',
            width: 50,
            align: 'center',
            label: '序号'
          },
          {
            prop: 'name',
            align: 'center',
            label: '用户姓名'
          },
          {
            prop: 'sex',
            align: 'center',
            label: '用户性别',
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
            label: '身份证号'
          },
          {
            prop: 'birthDate',
            align: 'center',
            label: '出生日期',
            searchType: 'daterange'
          },
          {
            width: 110,
            align: 'center',
            label: '操作',
            slot: 'action',
            hideInSearch: true
          }
        ]
      }
    },
    methods: {
      async methodRequest(params) {
        if (!!params.birthDate && !!params.birthDate.length) {
          params.startBirthDate = params.birthDate[0]
          params.endBirthDate = params.birthDate[1]
          delete params.birthDate
        }
        const { list } = await fetchList(params)
        return { data: list }
      },
      handleEdit(item) {
        console.log(item)
      },
      handleDelete(item) {
        console.log(item)
      }
    }
  }
</script>

<style>
  .app-content {
    height: 500px;
  }
</style>
```

:::

### request

:::demo `request` 属性是 pro-table 中使用最频繁的 API。`request` 属性应该是一个方法，请确保该方法返回一个 promise，并且该 promise 需要 resolve 一个格式类似于 { data, total } 的对象，如果不需要分页，total 属性可以省略。在查询时 y-table 会将分页信息以及其他查询信息传递给 `request` 所指定的方法，我们一般在这里面对查询条件进行格式化。

```html
<div class="app-content">
  <y-pro-table :columns="columns" :request="methodRequest">
    <template #toolbar-left>
      <el-button type="primary">新 建</el-button>
    </template>
    <template #action="{ row }">
      <y-button type="text" @click="handleEdit(row)">修改</y-button>
      <y-divider direction="vertical" />
      <y-popconfirm title="确定删除该条数据吗？" @onConfirm="handleDelete(row)">
        <y-button slot="reference" type="text">删除</y-button>
      </y-popconfirm>
    </template>
  </y-pro-table>
</div>

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
        columns: [
          {
            type: 'index',
            width: 50,
            align: 'center',
            label: '序号'
          },
          {
            prop: 'name',
            align: 'center',
            label: '用户姓名'
          },
          {
            prop: 'sex',
            align: 'center',
            label: '用户性别',
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
            label: '身份证号'
          },
          {
            prop: 'birthDate',
            align: 'center',
            label: '出生日期',
            searchType: 'daterange'
          },
          {
            width: 110,
            align: 'center',
            label: '操作',
            slot: 'action',
            hideInSearch: true
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
      handleEdit(item) {
        console.log(item)
      },
      handleDelete(item) {
        console.log(item)
      }
    }
  }
</script>

<style>
  .app-content {
    height: 500px;
  }
</style>
```

:::

### Attributes

| 参数         | 说明                                                                                                                                                                                                                                                                                           | 类型                                            | 可选值 | 默认值 |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | ------ | ------ |
| columns      | 表格列的配置描述，具体项见下表                                                                                                                                                                                                                                                                 | array                                           | —      | —      |
| showSearch   | 是否显示搜索栏                                                                                                                                                                                                                                                                                 | boolean                                         | —      | true   |
| showSettings | 是否显示列操作                                                                                                                                                                                                                                                                                 | —                                               | true   |
| pagination   | [el-pagination](https://element.eleme.cn/2.13/#/zh-CN/component/pagination#attributes) 对应的属性，设置为 false 则不显示分页                                                                                                                                                                   | object / boolean                                | —      | true   |
| request      | 获取表格数据对应的方法。该属性应该是一个方法，请确保该方法返回一个 promise，并且该 promise 需要 resolve 一个格式类似于 { data, total } 的对象，如果不需要分页，total 属性可以省略。在查询时 y-table 会将分页信息以及其他查询信息传递给该属性所指定的方法，我们一般在这里面对查询条件进行格式化 | function (currentPage, pageSize, ...restParams) | —      | —      |

### Column

`column` 属性扩展了 `y-table` 的所有[列属性](#/table#attributes)，属性名支持驼峰和中划线两种方式。

| 参数                | 说明                                                                          | 类型    | 可选值                                                   | 默认值 |
| ------------------- | ----------------------------------------------------------------------------- | ------- | -------------------------------------------------------- | ------ |
| searchType          | 查询条件控件类型，当不设置时                                                  | string  | input 或[日期控件类型](#/date-picker#attributes)中的一种 | input  |
| valueEnum           | 当提供该属性时，查询条件控件类型变为 select，该属性会覆盖 `searchType` 属性   | array   | —                                                        | —      |
| slotSearch          | 自定义查询条件对应的 slot                                                     | string  | —                                                        | —      |
| searchOnFieldChange | 是否在查询条件改变时立即触发查询操作                                          | boolean | —                                                        | false  |
| searchDebounce      | 当 `searchOnFieldChange` 属性设置为 true 时，该属性用来对查询方法进行截流     | number  | —                                                        | 0      |
| initialValue        | 查询条件初始值                                                                | any     | —                                                        | —      |
| ignoreOnReset       | 如果将 `column` 的该属性设置为 true，则在重置查询条件时，会将该 `column` 忽略 | boolean | —                                                        | false  |

### Events

| 事件名 | 说明                   | 参数                                 |
| ------ | ---------------------- | ------------------------------------ |
| search | 当执行查询时触发的事件 | currentPage, pageSize, ...restParams |

### Methods

| 方法名           | 说明                                                         | 参数            |
| ---------------- | ------------------------------------------------------------ | --------------- |
| reload           | 刷新表格                                                     | —               |
| reset            | 重置表格                                                     | —               |
| setInitialValue  | 设置某个查询条件初始值                                       | prop, value     |
| setInitialsValue | 批量设置查询条件初始值                                       | (prop, value)[] |
| getFieldValue    | 获取某个查询条件的值                                         | prop            |
| getFieldsValue   | 批量获取查询条件的值。如果参数不传，则会获取所有查询条件的值 | prop[]          |
| setFieldValue    | 设置某个查询条件的值                                         | prop, value     |
| setFieldsValue   | 批量设置查询条件的值                                         | (prop, value)[] |
| resetFieldValue  | 重置某个查询条件的值                                         | prop            |
| resetFieldsValue | 批量重置查询条件的值。如果参数不传，则会重置所有查询条件的值 | prop[]          |

### Slot

| name          | 说明                                                                     |
| ------------- | ------------------------------------------------------------------------ |
| toolbar       | toolbar 的内容，当提供该属性时，toolbar-left 和 toolbar-right 将会被覆盖 |
| toolbar-left  | toolbar 左侧的内容                                                       |
| toolbar-right | toolbar 右侧的内容                                                       |
