<template>
  <div>
    <y-table :data="tableData" height="300">
      <y-table-column type="selection" width="50" align="center" fixed />
      <y-table-column type="index" label="序号" width="50" align="center" fixed />
      <y-table-column prop="date" label="日期" width="180" align="center" />
      <y-table-column prop="name" label="姓名" width="180" align="center">
        <template slot="header" slot-scope="{ column }">
          <span style="color: red">{{ column.label }}</span>
        </template>
      </y-table-column>
      <y-table-column label="地址" width="280" align="center">
        <template #default="{ row }">{{ row.name }} - {{ row.address }}</template>
      </y-table-column>
      <y-table-column label="详细信息" min-width="400" align="center">
        <template #default="{ row, $index, column }">
          <span style="color: red">
            {{ $index }} - {{ column.label }}{{ row.name }} - {{ row.date }} - {{ row.address }}
          </span>
        </template>
      </y-table-column>
    </y-table>
    <y-table :columns="columns" :data="tableData" height="300" style="margin-top: 20px">
      <template #name-header="{ column }">
        <span style="color: red">
          {{ column.label }}
        </span>
      </template>
      <template #detail-info="{ row, $index, column }">
        <span style="color: red">
          {{ $index }} - {{ column.label }}{{ row.name }} - {{ row.date }} - {{ row.address }}
        </span>
      </template>
    </y-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        {
          type: 'selection',
          width: 50,
          align: 'center',
          fixed: true
        },
        {
          prop: 'date',
          label: '日期',
          width: '180',
          align: 'center'
        },
        {
          type: 'index',
          label: '序号',
          width: 50,
          align: 'center',
          fixed: true
        },
        {
          prop: 'name',
          label: '姓名',
          width: '180',
          align: 'center',
          slotHeader: 'name-header'
        },
        {
          label: '地址',
          width: '280',
          align: 'center',
          render: (_, { name, address }) => `${name} - ${address}`
        },
        {
          label: '详细信息',
          minWidth: '400',
          align: 'center',
          slot: 'detail-info'
        }
      ],
      tableData: [
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ]
    }
  }
}
</script>
