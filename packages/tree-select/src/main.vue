<template>
  <div ref="reference" class="y-tree-select">
    <y-popover
      ref="popover"
      v-model="visible"
      :width="popoverWidth"
      popper-class="y-tree-select-popover"
      transition="el-zoom-in-top"
      placement="bottom-start"
      @show="handleShow"
      @hide="handleHide"
    >
      <y-scrollbar ref="scrollbar">
        <y-tree ref="tree" v-bind="_attrs" v-on="_listeners" :filter-node-method="filterMethod">
          <template #default="{ node }">
            <slot :node="node">
              {{ node.label }}
            </slot>
          </template>
        </y-tree>
      </y-scrollbar>
    </y-popover>
    <y-input
      ref="input"
      v-popover:popover
      v-bind="{
        value: text,
        clearable,
        disabled,
        suffixIcon: 'el-icon-arrow-down',
        ..._attrsInput,
        placeholder: _placeholder
      }"
      :class="{
        'y-tree-select-reference-arrow-up': visible,
        'y-tree-select-reference-is-focus': visible
      }"
      v-on="{
        input: handleInput,
        clear: handleClear
      }"
    />
  </div>
</template>

<script>
import { camelize, getParents } from 'packages/utils'
import YPopover from 'packages/popover'
import YInput from 'packages/input'
import YScrollbar from 'packages/scrollbar'
import YTree from 'packages/tree'

function processData(list, props, parentValue) {
  for (const item of list) {
    item.parentValue = parentValue
    const children = item[props.children]
    if (!!children && !!children.length) {
      item.children = processData(children, props, item[props.value])
    }
  }
  return list
}

export default {
  name: 'YTreeSelect',
  inheritAttrs: false,
  inject: {
    elFormItem: {
      default: () => ({})
    }
  },
  props: {
    value: Number | String | Array,
    filterable: {
      type: Boolean,
      default: true
    },
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
    YPopover,
    YInput,
    YScrollbar,
    YTree
  },
  data() {
    return {
      visible: false,
      popoverWidth: 0,
      filterText: undefined
    }
  },
  methods: {
    scrollToCurrent() {
      const $container = this.$refs.scrollbar.$el.querySelector('.el-scrollbar__wrap')
      if (!this.value) {
        return ($container.scrollTop = 0)
      }
      const { offsetHeight } = $container
      const $target = this.$refs.tree.$el.querySelector(this.checkable ? '.is-checked' : '.is-current')
      if (!$target) return
      const { offsetTop } = $target
      if (offsetTop >= offsetHeight - 30) {
        $container.scrollTop = offsetTop - offsetHeight + 30
      }
    },
    handleShow() {
      if (this._attrsInput.disabled || this.disabled) {
        return (this.visible = false)
      }
      if (!!this.elFormItem && !!this.elFormItem.removeValidateEvents) {
        this.elFormItem.removeValidateEvents()
      }
      this.popoverWidth = this.$refs.reference.clientWidth
      if (this.checkable) {
        this.$refs.tree.setCheckedKeys(this.value || [])
      } else {
        this.$refs.tree.setCurrentKey(this.value)
      }
      this.$nextTick(this.scrollToCurrent)
    },
    handleHide() {
      if (this.elFormItem && this.elFormItem.addValidateEvents) {
        this.elFormItem.addValidateEvents()
      }
    },
    getCurrentNode() {
      const { children: attrChildren } = this._attrs.props
      const inner = (list) => {
        for (const item of list) {
          const currentValue = item[this._attrs.nodeKey]
          const children = item[attrChildren]
          if (currentValue === this.value) {
            const ret = { ...item }
            delete ret[attrChildren]
            return ret
          } else if (children && children.length) {
            const ret = inner(children)
            if (ret) {
              return ret
            }
          }
        }
      }
      return inner(this._attrs.data || [])
    },
    getCheckedNodes() {
      const { children: attrChildren } = this._attrs.props
      const ret = []
      if (!this.value || !this.value.length) {
        return ret
      }
      const inner = (list) => {
        for (const item of list) {
          const currentValue = item[this._attrs.nodeKey]
          const children = item[attrChildren]
          if (this.value.includes(currentValue)) {
            const obj = { ...item }
            delete obj[attrChildren]
            ret.push(obj)
          }
          if (children && children.length) inner(children)
        }
      }
      inner(this._attrs.data || [])
      return ret
    },
    removeCurrentKey() {
      const $target = this.$refs.tree.$el.querySelector('.is-current')
      if ($target) {
        const cls = $target.className
        $target.className = cls.replace('is-current', '')
      }
    },
    updatePopper() {
      setTimeout(this.$refs.popover.updatePopper, 300)
    },
    filterMethod(value, data) {
      if (!value) return true
      const { nodeKey, props, data: options } = this._attrs
      const arr = getParents(options, data[nodeKey], {
        value: nodeKey,
        parentValue: 'parentValue',
        children: props.children
      })
      return arr.some((item) => item[props.label].includes(value))
    },
    handleInput(val) {
      this.text = val
    },
    handleClear() {
      this.$emit('clear')
      this.$emit('input', this.checkable ? [] : undefined)
      if (!this.checkable) {
        this.$emit('change', undefined, undefined)
      }
    }
  },
  computed: {
    _attrs() {
      const _attrs = {}
      for (const key in this.$attrs) {
        _attrs[camelize(key)] = this.$attrs[key]
      }
      const _props = { label: 'label', children: 'children' }
      for (const key in _attrs.props) {
        _props[camelize(key)] = _attrs.props[key]
      }
      _attrs.props = _props
      const nodeKey = _attrs.props.value || _attrs.nodeKey || 'value'
      delete _attrs.props.value
      const data = processData(_attrs.data || _attrs.options || [], { value: nodeKey, children: _attrs.props.children })
      delete _attrs.options
      return {
        defaultExpandAll: true,
        expandOnClickNode: false,
        highlightCurrent: _attrs.showCheckbox === undefined,
        ..._attrs,
        nodeKey,
        data
      }
    },
    _listeners() {
      return {
        ...this.$listeners,
        'node-click': (item, ...rest) => {
          if (this.checkable) return
          this.$emit('node-click', ...rest)
          this.$emit('input', item[this._attrs.nodeKey])
          this.$nextTick(() => {
            this.$emit('change', this.value, this.getCurrentNode())
          })
          this.visible = false
        },
        'check-change': (...args) => {
          this.$emit('check-change', ...args)
          if (this.timer) {
            clearTimeout(this.timer)
          }
          this.timer = setTimeout(() => {
            this.$emit('input', this.$refs.tree.getCheckedKeys())
            this.$nextTick(() => {
              this.$emit('change', this.value, this.getCheckedNodes())
            })
          })
        },
        'node-expand': (...args) => {
          this.updatePopper()
          this.$emit('node-expand', ...args)
        },
        'node-collapse': (...args) => {
          this.updatePopper()
          this.$emit('node-collapse', ...args)
        }
      }
    },
    _attrsInput() {
      const result = {}
      for (const key in this.attrsInput) {
        result[camelize(key)] = this.attrsInput[key]
      }
      return result
    },
    checkable() {
      const { showCheckbox } = this._attrs
      return showCheckbox !== undefined && showCheckbox !== false
    },
    label() {
      if (this.checkable) {
        const nodes = this.getCheckedNodes()
        const names = nodes.map((node) => node[this._attrs.props.label])
        return names.join('，')
      } else {
        const node = this.getCurrentNode()
        return node ? node[this._attrs.props.label] : ''
      }
    },
    text: {
      get() {
        if (!this.filterable) {
          return this.label
        } else {
          return this.visible ? this.filterText : this.label
        }
      },
      set(newVal) {
        this.filterText = newVal
      }
    },
    _placeholder() {
      if (!this.filterable) {
        return this._attrsInput.placeholder || this.placeholder
      } else {
        return !!this.label ? this.label : this._attrsInput.placeholder || this.placeholder
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    },
    visible() {
      this.filterText = undefined
    }
  },
  mounted() {
    if (!this.filterable) {
      this.$refs.input.$el.querySelector('.el-input__inner').setAttribute('readonly', true)
    }
  }
}
</script>
