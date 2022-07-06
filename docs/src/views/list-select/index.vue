<template>
  <div>
    <y-list-select v-model="val1" :columns="columns" :request="methodRequest" @change="handleChange1">
      <template #id-card="{ row }">
        <span style="font-weight: bold; color: red">{{ row.idCard }}</span>
      </template>
    </y-list-select>
    {{ val1 }}
    <y-list-select
      v-model="val2"
      :columns="columns"
      :request="methodRequest"
      checkable
      style="margin-top: 20px"
      @change="handleChange2"
    >
      <template #id-card="{ row }">
        <span style="font-weight: bold; color: red">{{ row.idCard }}</span>
      </template>
    </y-list-select>
    {{ val2 }}
    <y-list-select-pane
      ref="pane"
      :columns="columns"
      :request="methodRequest"
      :method-confirm="beforeConfirm"
      checkable
      @select-success="handleSelectSuccess"
    />
    <y-button type="primary" style="margin-top: 20px" @click="handleClick">点击出现弹窗</y-button>
  </div>
</template>

<script>
import { sexOptions, sexKeyValue } from './constant'
import { fetchList } from './api'

export default {
  data() {
    return {
      val1: undefined,
      val2: undefined,
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
      const { list, total } = await fetchList(params)
      return { data: list, total }
    },
    handleChange1(item) {
      console.log(item)
    },
    handleChange2(list) {
      console.log(list)
    },
    handleClick() {
      this.$refs.pane.show()
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
