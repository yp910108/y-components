<template>
  <div class="app-content">
    <y-pro-table :columns="columns" :request="methodRequest">
      <template #toolbar-left>
        <y-button type="primary">新 建</y-button>
      </template>
      <template #id-card="{ row }">
        <span style="font-weight: bold; color: red">{{ row.idCard }}</span>
      </template>
      <template #action="{ row }">
        <y-button type="text" @click="handleEdit(row)">修改</y-button>
        <y-popconfirm title="确定删除该条数据吗？" class="pop-button" @onConfirm="handleDelete(row)">
          <y-button slot="reference" type="text">删除</y-button>
        </y-popconfirm>
      </template>
    </y-pro-table>
  </div>
</template>

<script>
import { sexOptions, sexKeyValue, SEX } from './constant'
import { fetchList } from './api'

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
          label: '姓名'
        },
        {
          prop: 'sex',
          align: 'center',
          label: '性别',
          valueEnum: sexOptions,
          render: (text) => sexKeyValue[text],
          initialValue: SEX.woman
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

<style lang="scss" scoped>
.app-content {
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  padding: 16px;
  height: 100%;
  background: #fff;
}
</style>
