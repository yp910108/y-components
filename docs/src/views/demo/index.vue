<template>
  <div class="app-content">
    <y-pro-table ref="table" :columns="columns" :request="methodRequest">
      <template #toolbar-left>
        <y-button type="primary" @click="handleAdd">新 建</y-button>
      </template>
      <template #toolbar-right>
        <a href="https://github.com/yp910108/y-components/tree/master/docs/src/views/demo/index.vue" class="link">
          <y-icon icon="github" /> 点击查看源码
        </a>
      </template>
      <template #action="{ row }">
        <y-button type="text" @click="handleEdit(row)">修改</y-button>
        <y-divider direction="vertical" />
        <y-popconfirm title="确定删除该条数据吗？" @onConfirm="handleDelete(row)">
          <y-button slot="reference" type="text">删除</y-button>
        </y-popconfirm>
      </template>
    </y-pro-table>
    <operate ref="operate" @refresh="$refs.table.reload()" />
  </div>
</template>

<script>
import { sexOptions, sexKeyValue, politicsStatusOptions, politicsStatusKeyValue } from './constant'
import { fetchList, deleteItem } from './api'
import Operate from './operate'

export default {
  components: {
    Operate
  },
  data() {
    return {
      columns: [
        {
          type: 'index',
          width: 50,
          align: 'center',
          fixed: true,
          label: '序号'
        },
        {
          prop: 'name',
          align: 'center',
          fixed: true,
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
          prop: 'age',
          align: 'center',
          label: '年龄',
          hideInSearch: true
        },
        {
          prop: 'birthDate',
          width: 100,
          align: 'center',
          label: '出生日期',
          searchType: 'daterange'
        },
        {
          prop: 'politicsStatus',
          align: 'center',
          label: '政治面貌',
          valueEnum: politicsStatusOptions,
          render: (text) => politicsStatusKeyValue[text]
        },
        {
          prop: 'addressName',
          width: 120,
          align: 'center',
          label: '家庭住址',
          hideInSearch: true
        },
        {
          prop: 'deptName',
          align: 'center',
          label: '所属组织',
          hideInSearch: true
        },
        {
          prop: 'leaderName',
          align: 'center',
          label: '上级领导',
          hideInSearch: true
        },
        {
          prop: 'remark',
          width: 150,
          align: 'center',
          label: '备注',
          hideInSearch: true
        },
        {
          width: 120,
          align: 'center',
          fixed: 'right',
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
    handleAdd() {
      this.$refs.operate.show()
    },
    handleEdit(row) {
      this.$refs.operate.show(row, { isEdit: true })
    },
    async handleDelete({ id }) {
      try {
        await deleteItem({ id })
        this.$refs.table.reload()
        this.$message.success('删除成功')
      } catch (e) {
        // do nothing
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.app-content {
  height: calc(100vh - 260px);
  .link {
    margin-right: 10px;
    line-height: 1;
    font-weight: 500;
    font-size: 12px;
    .y-icon {
      vertical-align: top;
    }
  }
}
</style>
