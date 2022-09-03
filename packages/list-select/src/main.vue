<template>
  <div class="y-list-select" @click="handleSelect">
    <y-input v-bind="_attrsInput" @clear="handleClear" />
    <list-select-pane
      v-if="!!_attrs.columns && !!_attrs.columns.length"
      ref="listSelectPane"
      v-bind="_attrs"
      @select-success="handleSelectSuccess"
      @close="handleSelectClose"
    >
      <template v-for="slotHeader of slotsHeader" #[slotHeader]="{ column, $index }">
        <slot :name="slotHeader" :column="column" :$index="$index" />
      </template>
      <template v-for="slotColumn of slotsColumn" #[slotColumn]="{ row, $index }">
        <slot :name="slotColumn" :row="row" :$index="$index" />
      </template>
      <template #append>
        <slot name="append" />
      </template>
    </list-select-pane>
  </div>
</template>

<script>
import { camelize, hasClassName } from 'packages/utils'
import YInput from 'packages/input'
import ListSelectPane from 'packages/list-select-pane'

export default {
  name: 'YListSelect',
  inheritAttrs: false,
  inject: {
    elFormItem: {
      default: () => ({})
    }
  },
  props: {
    props: Object,
    clearable: {
      type: Boolean,
      default: true
    },
    disabled: Boolean,
    placeholder: {
      type: String,
      default: '请选择'
    },
    attrsInput: Object
  },
  components: {
    YInput,
    ListSelectPane
  },
  methods: {
    handleSelectClose() {
      if (!!this.elFormItem && !!this.elFormItem.addValidateEvents) {
        this.elFormItem.addValidateEvents()
        this.elFormItem.validate()
      }
    },
    handleSelect(e) {
      const { disabled } = this._attrsInput
      if (disabled !== undefined && disabled !== false) return
      if (hasClassName(e.target, 'el-icon-circle-close', true)) {
        return
      }
      if (!!this.elFormItem && !!this.elFormItem.removeValidateEvents) {
        this.elFormItem.removeValidateEvents()
      }
      this.$refs.listSelectPane.show(this._attrs.value)
    },
    handleSelectSuccess(selectedRow) {
      this.$emit('input', selectedRow)
      this.$emit('change', selectedRow)
    },
    handleClear() {
      this.$emit('input', this.checkable ? [] : undefined)
      this.$emit('change', this.checkable ? [] : undefined)
    }
  },
  computed: {
    // hack: _props is a attr of vue, so use __props
    __props() {
      return { label: 'name', ...this.props, value: (this.props || {}).value || this.$attrs.rowKey || 'id' }
    },
    _attrs() {
      const _attrs = {}
      for (const key in this.$attrs) {
        _attrs[camelize(key)] = this.$attrs[key]
      }
      return {
        props: this.props,
        ..._attrs
      }
    },
    _attrsInput() {
      const _attrs = {}
      for (const key in this.attrsInput) {
        _attrs[camelize(key)] = this.attrsInput[key]
      }
      let value
      if (this.checkable) {
        value = (this._attrs.value || [])
          .filter((v) => !!v || v === 0) // hack: el-form-item will set array to '[undefined]' when call 'resetField'
          .map((v) => v[this.__props.label])
          .join('，')
      } else {
        value = (this._attrs.value || {})[this.__props.label]
      }
      return {
        suffixIcon: 'el-icon-arrow-down',
        clearable: this.clearable,
        disabled: this.disabled,
        placeholder: this.placeholder,
        ..._attrs,
        value
      }
    },
    checkable() {
      const { checkable } = this._attrs
      return checkable !== undefined && checkable !== false
    },
    slotsHeader() {
      const columns = this._attrs.columns.filter((column) => !!column.slotHeader)
      return columns.map((column) => column.slotHeader)
    },
    slotsColumn() {
      const columns = this._attrs.columns.filter((column) => !!column.slot)
      return columns.map((column) => column.slot)
    }
  },
  mounted() {
    this.$el.querySelector('.el-input__inner').setAttribute('readonly', true)
  }
}
</script>
