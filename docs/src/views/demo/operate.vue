<template>
  <y-dialog
    :visible.sync="visible"
    :modal-append-to-body="true"
    :append-to-body="true"
    :title="isEdit ? '修改用户' : '添加用户'"
    width="550px"
    @closed="reset"
  >
    <y-form ref="form" v-loading="spinning" :model="form" :rules="rules" label-width="90px">
      <y-form-item prop="name" label="用户姓名">
        <y-input v-model.trim="form.name" />
      </y-form-item>
      <y-form-item prop="sex" label="用户性别">
        <y-select v-model="form.sex" :options="sexOptions" />
      </y-form-item>
      <y-form-item prop="age" label="年龄">
        <y-input-number v-model="form.age" :min="1" :precision="0" />
      </y-form-item>
      <y-form-item prop="birthDate" label="出生日期">
        <y-date-picker v-model="form.birthDate" />
      </y-form-item>
      <y-form-item prop="politicsStatus" label="政治面貌">
        <y-select v-model="form.politicsStatus" :options="politicsStatusOptions" />
      </y-form-item>
      <y-form-item prop="addressId" label="家庭住址">
        <y-cascader v-model="form.addressId" :props="{ value: 'code', label: 'name' }" :options="addressOptions" />
      </y-form-item>
      <y-form-item prop="deptId" label="所属组织">
        <y-tree-select v-model="form.deptId" :props="{ value: 'code', label: 'name' }" :options="deptOptions" />
      </y-form-item>
      <y-form-item prop="leader" label="上级领导">
        <y-list-select v-model="form.leader" :columns="columns" :request="methodRequestLeader" />
      </y-form-item>
      <y-form-item prop="remark" label="备注">
        <y-input v-model="form.remark" type="textarea" maxlength="100" />
      </y-form-item>
    </y-form>
    <template #footer>
      <y-button plain @click="hide">取 消</y-button>
      <y-button :loading="loadingSave" :disabled="!ableSave" type="primary" @click="handleSave">确 定</y-button>
    </template>
  </y-dialog>
</template>

<script>
import {
  SEX,
  sexOptions,
  sexKeyValue,
  politicsStatusOptions,
  politicsStatusKeyValue,
  addressOptions,
  deptOptions
} from './constant'
import { fetchList as fetchLeaderList, fetchDetail, add, edit } from './api'

const form = {
  name: undefined,
  sex: undefined,
  age: undefined,
  birthDate: undefined,
  politicsStatus: undefined,
  addressId: undefined,
  deptId: undefined,
  leader: undefined,
  remark: undefined
}

export default {
  data() {
    return {
      sexOptions,
      politicsStatusOptions,
      addressOptions,
      deptOptions,
      visible: false,
      spinning: false,
      loadingSave: false,
      ableSave: true,
      form: { ...form, sex: SEX.man, age: 18 },
      rules: {
        name: [{ required: true, message: '请输入' }],
        sex: [{ required: true, message: '请选择' }],
        age: [{ required: true, message: '请输入' }],
        birthDate: [{ required: true, message: '请选择' }],
        politicsStatus: [{ required: true, message: '请选择' }],
        addressId: [{ required: true, message: '请选择' }],
        deptId: [{ required: true, message: '请选择' }],
        leader: [{ required: true, message: '请选择' }]
      },
      isEdit: false,
      record: undefined,
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
        }
      ]
    }
  },
  methods: {
    show(record, { isEdit } = {}) {
      this.visible = true
      this.isEdit = isEdit
      this.record = record
      if (this.isEdit) {
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
      this.form.leader = { id: detail.leaderId, name: detail.leaderName }
    },
    async methodRequestLeader(params) {
      params = { ...params, pageNo: params.currentPage }
      delete params.currentPage
      const { list, total } = await fetchLeaderList(params)
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
      const params = {
        ...this.form,
        leaderId: (this.form.leader || {}).id,
        leaderName: (this.form.leader || {}).name
      }
      delete params.leader
      if (this.isEdit) {
        params.id = this.record.id
      }
      try {
        this.loadingSave = true
        const method = this.isEdit ? edit : add
        await method(params)
        this.loadingSave = false
        this.$message.success(this.isEdit ? '修改用户成功' : '添加用户成功')
        this.$emit('refresh')
        this.hide()
      } catch (e) {
        this.loadingSave = false
      }
    }
  }
}
</script>
