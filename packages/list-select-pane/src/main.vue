<template>
  <y-dialog
    v-bind="_attrsDialog"
    :visible.sync="visible"
    class="y-list-select-pane"
    @close="$emit('close')"
    @closed="reset"
  >
    <y-pro-table
      ref="table"
      v-bind="_attrs"
      @row-click="handleRowClick"
      @select="handleSelect"
      @select-all="handleSelect"
    >
      <template #radio="{ row }">
        <y-radio v-model="selectedRow[_attrs.rowKey]" :label="row[_attrs.rowKey]">
          {{ '' }}
        </y-radio>
      </template>
      <template v-for="slotHeader of slotsHeader" #[slotHeader]="{ column, $index }">
        <slot :name="slotHeader" :column="column" :$index="$index" />
      </template>
      <template v-for="slotColumn of slotsColumn" #[slotColumn]="{ row, $index }">
        <slot :name="slotColumn" :row="row" :$index="$index" />
      </template>
      <template #append>
        <slot name="append" />
      </template>
    </y-pro-table>
    <template #footer>
      <y-button plain @click="hide">取 消</y-button>
      <y-button
        type="primary"
        :disabled="checkable ? !checked.length : !Object.keys(selectedRow).length"
        :loading="loadingSave"
        @click="handleConfirm"
      >
        {{
          checkable
            ? `确 定（已选${checked.length}条）`
            : !!Object.keys(selectedRow).length
            ? `确 定（已选${selectedRow[__props.label]}）`
            : '确 定'
        }}
      </y-button>
    </template>
  </y-dialog>
</template>

<script>
import { camelize } from 'packages/utils'
import YDialog from 'packages/dialog'
import YProTable from 'packages/pro-table'
import YRadio from 'packages/radio'
import YCheckbox from 'packages/checkbox'
import YButton from 'packages/button'

function includes(list, item, propValue) {
  const index = list.findIndex((currItem) => currItem[propValue] === item[propValue])
  return index !== -1
}

export default {
  name: 'YListSelectPane',
  inheritAttrs: false,
  props: {
    title: {
      type: String,
      default: '选择'
    },
    props: Object,
    checkable: Boolean,
    defaultSelected: Object | Array,
    methodConfirm: Function,
    attrsDialog: Object
  },
  components: {
    YDialog,
    YProTable,
    YRadio,
    YCheckbox,
    YButton
  },
  data() {
    return {
      visible: false,
      loadingSave: false,
      list: [],
      checked: [],
      selectedRow: {}
    }
  },
  methods: {
    show(defaultSelected) {
      this.visible = true
      if (this.checkable) {
        this.checked = [...(defaultSelected || this.defaultSelected || [])]
      } else {
        this.selectedRow = { ...(defaultSelected || this.defaultSelected) }
      }
      if (this.$refs.table) {
        this.$refs.table.reset()
      }
    },
    hide() {
      this.visible = false
    },
    reset() {
      if (this.checkable) {
        this.checked = []
      } else {
        this.selectedRow = {}
      }
    },
    setChecked() {
      for (const item of this.list) {
        if (includes(this.checked, item, this._attrs.rowKey)) {
          this.$refs.table.toggleRowSelection(item, true)
        } else {
          this.$refs.table.toggleRowSelection(item, false)
        }
      }
    },
    handleSelect(checked) {
      const { rowKey } = this._attrs
      const unchecked = this.list.filter((item) => !includes(checked, item, rowKey))
      for (const item of checked) {
        if (!includes(this.checked, item, rowKey)) {
          this.checked.push(item)
        }
      }
      for (const item of unchecked) {
        const index = this.checked.findIndex((c) => c[rowKey] === item[rowKey])
        if (index !== -1) {
          this.checked.splice(index, 1)
        }
      }
    },
    handleRowClick(row, ...rest) {
      if (this.checkable) {
        const { rowKey } = this._attrs
        const index = this.checked.findIndex((c) => c[rowKey] === row[rowKey])
        if (index !== -1) {
          this.checked.splice(index, 1)
        } else {
          this.checked.push({ ...row })
        }
        this.setChecked()
      } else {
        this.selectedRow = { ...row }
      }
      this.$emit('row-click', ...rest)
    },
    handleConfirm() {
      const result = this.checkable ? this.checked : this.selectedRow
      if (!!this.methodConfirm) {
        this.loadingSave = true
        this.methodConfirm(result)
          .then(() => {
            this.loadingSave = false
            this.$emit('select-success', result)
            this.hide()
          })
          .catch(() => {
            this.loadingSave = false
          })
      } else {
        this.$emit('select-success', result)
        this.hide()
      }
    }
  },
  computed: {
    // hack: _props is a attr of vue, so use __props
    // note: use _attrs.rowKey instead of __props.value
    __props() {
      return { label: 'name', ...this.props }
    },
    _attrs() {
      const _attrs = {}
      for (const key in this.$attrs) {
        _attrs[camelize(key)] = this.$attrs[key]
      }
      const rowKey = this.__props.value || _attrs.rowKey || 'id'
      const columnOperate = this.checkable
        ? { type: 'selection', width: 50, align: 'center', fixed: true }
        : { width: 50, align: 'center', slot: 'radio', hideInSearch: true, fixed: true }
      const request = (params) => {
        return new Promise((resolve, reject) => {
          _attrs
            .request(params)
            .then((res) => {
              const { data, total } = res || {}
              if (this.checkable) {
                this.list = data
                setTimeout(() => {
                  this.setChecked()
                })
              }
              resolve({ data, total })
            })
            .catch((e) => {
              reject(e)
            })
        })
      }
      return {
        showSettings: false,
        ..._attrs,
        rowKey,
        columns: [columnOperate, ..._attrs.columns],
        request: !!_attrs.request ? request : undefined
      }
    },
    _attrsDialog() {
      const _attrs = {}
      for (const key in this.attrsDialog) {
        _attrs[camelize(key)] = this.attrsDialog[key]
      }
      return {
        title: this.title,
        modalAppendToBody: true,
        appendToBody: true,
        width: '950px',
        ..._attrs
      }
    },
    slotsHeader() {
      const columns = this._attrs.columns.filter((column) => !!column.slotHeader)
      return columns.map((column) => column.slotHeader)
    },
    slotsColumn() {
      const columns = this._attrs.columns.filter((column) => !!column.slot && column.slot !== 'radio')
      return columns.map((column) => column.slot)
    }
  }
}
</script>
