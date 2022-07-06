<template>
  <y-dialog
    :visible.sync="visible"
    :modal-append-to-body="true"
    :append-to-body="true"
    :title="isDetail ? '详情' : isEdit ? '修改' : '添加'"
    width="550px"
    @closed="reset"
  >
    <y-form ref="form" v-loading="spinning" :model="form" :rules="rules" label-width="100px">
      <y-form-item prop="name" label="姓名：">
        <y-input v-model.trim="form.name" :disabled="isDetail" :placeholder="isDetail ? '' : '请输入'" />
      </y-form-item>
      <y-form-item prop="sex" label="性别：">
        <y-radio-group v-model="form.sex" :disabled="isDetail">
          <y-radio :label="SEX.man">{{ sexKeyValue[SEX.man] }}</y-radio>
          <y-radio :label="SEX.woman">{{ sexKeyValue[SEX.woman] }}</y-radio>
        </y-radio-group>
      </y-form-item>
      <y-form-item prop="brithDay" label="出生日期：">
        <y-date-picker v-model="form.brithDay" :disabled="isDetail" :placeholder="isDetail ? '' : '请选择'" />
      </y-form-item>
      <y-form-item prop="class" label="班级：">
        <y-select
          v-model="form.class"
          :options="classList"
          :disabled="isDetail"
          :placeholder="isDetail ? '' : '请选择'"
        />
      </y-form-item>
      <y-form-item prop="tree1" label="测试树1：">
        <y-tree-select
          v-model="form.tree1"
          :options="tree1"
          :disabled="isDetail"
          :placeholder="isDetail ? '' : '请选择'"
        />
      </y-form-item>
      <y-form-item prop="tree2" label="测试树2：">
        <y-tree-select
          v-model="form.tree2"
          node-key="id"
          :props="{
            label: 'name',
            children: 'childNode'
          }"
          :options="tree2"
          :disabled="isDetail"
          :placeholder="isDetail ? '' : '请选择'"
          show-checkbox
        />
      </y-form-item>
      <y-form-item prop="address" label="小区：">
        <y-cascader
          v-model="form.address"
          :options="tree1"
          :disabled="isDetail"
          :placeholder="isDetail ? '' : '请选择'"
        />
      </y-form-item>
      <y-form-item prop="list1" label="测试列表1：">
        <y-list-select
          v-model="form.list1"
          :columns="columns"
          :request="methodRequest"
          :disabled="isDetail"
          :placeholder="isDetail ? '' : '请选择'"
        >
          <template #id-card="{ row }">
            <span style="font-weight: bold; color: red">{{ row.idCard }}</span>
          </template>
        </y-list-select>
      </y-form-item>
      <y-form-item prop="list2" label="测试列表2：">
        <y-list-select
          v-model="form.list2"
          :columns="columns"
          :request="methodRequest"
          :disabled="isDetail"
          :placeholder="isDetail ? '' : '请选择'"
          checkable
        >
          <template #id-card="{ row }">
            <span style="font-weight: bold; color: red">{{ row.idCard }}</span>
          </template>
        </y-list-select>
      </y-form-item>
      <y-form-item prop="remark" label="备注:">
        <y-input
          v-model="form.remark"
          :disabled="isDetail"
          :placeholder="isDetail ? '' : '请输入'"
          type="textarea"
          maxlength="100"
        />
      </y-form-item>
    </y-form>
    <template v-if="!this.isDetail" #footer>
      <y-button plain @click="hide">取 消</y-button>
      <y-button :loading="loadingSave" :disabled="!ableSave" type="primary" @click="handleSave">确 定</y-button>
    </template>
  </y-dialog>
</template>

<script>
import { SEX, sexOptions, sexKeyValue } from './constant'
import { tree1, tree2 } from './tree'
import { fetchList, fetchDetail, add, edit } from './api'

const form = {
  name: undefined,
  sex: undefined,
  brithDay: undefined,
  class: undefined,
  tree1: undefined,
  tree2: undefined,
  address: undefined,
  list1: undefined,
  list2: undefined,
  remark: undefined
}

export default {
  data() {
    return {
      SEX,
      sexKeyValue,
      tree1,
      tree2,
      visible: false,
      spinning: false,
      loadingSave: false,
      ableSave: true,
      form: { ...form, sex: SEX.man },
      rules: {
        name: [{ required: true, message: '请输入' }],
        sex: [{ required: true, message: '请选择' }],
        brithDay: [{ required: true, message: '请选择' }],
        class: [{ required: true, message: '请选择' }],
        tree1: [{ required: true, message: '请选择' }],
        tree2: [{ required: true, message: '请选择' }],
        address: [{ required: true, message: '请选择' }],
        list1: [{ required: true, message: '请选择' }],
        list2: [{ required: true, message: '请选择' }]
      },
      isDetail: undefined,
      record: undefined,
      classList: [
        { value: 0, label: '小班' },
        { value: 1, label: '中班' },
        { value: 2, label: '大班' }
      ],
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
    show(record, isDetail) {
      this.visible = true
      this.isDetail = isDetail
      this.record = record
      if (this.isDetail || this.isEdit) {
        this.fetchDetail()
      }
    },
    hide() {
      this.visible = false
    },
    reset() {
      this.$refs.form.resetFields()
    },
    setForm(detail) {
      for (const key in this.form) {
        this.form[key] = detail[key] || undefined
      }
    },
    async methodRequest(params) {
      params = { ...params, pageNo: params.currentPage }
      delete params.currentPage
      const { list, total } = await fetchList(params)
      return { data: list, total }
    },
    async fetchDetail() {
      try {
        this.spinning = true
        this.ableSave = false
        const res = await fetchDetail({ id: this.record.id })
        this.spinning = false
        this.ableSave = true
        this.setForm(res)
      } catch (e) {
        this.spinning = false
      }
    },
    validate() {
      let pass = false
      this.$refs.form.validate((valid) => {
        pass = valid
      })
      return pass
    },
    async handleSave() {
      if (!this.validate()) return
      const params = { ...this.form }
      if (this.isEdit) {
        params.id = this.record.id
      }
      try {
        this.loadingSave = true
        const method = this.isEdit ? edit : add
        await method(params)
        this.loadingSave = false
        this.$message.success(this.isEdit ? '修改成功' : '添加成功')
        this.$emit('refresh')
        this.hide()
      } catch (e) {
        this.loadingSave = false
      }
    }
  },
  computed: {
    isEdit() {
      return !this.isDetail && !!this.record
    }
  }
}
</script>
