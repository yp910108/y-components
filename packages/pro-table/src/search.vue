<template>
  <div ref="wrapper" :class="{ 'y-pro-table-search': true, collapse }">
    <y-form
      v-if="!!columns && !!columns.length"
      :model="form"
      :size="size"
      class="search-content"
      @submit.native.prevent
    >
      <y-form-item
        v-for="{ label, slotSearch, searchType, valueEnum, prop } of columns"
        :key="prop"
        :label="label"
        :style="styleFormItem"
      >
        <slot :name="slotSearch" :params="form" :prop="prop">
          <y-select
            v-if="!!valueEnum"
            v-model="form[prop]"
            filterable
            :options="typeof valueEnum === 'function' ? valueEnum() : valueEnum"
            :placeholder="`请选择${extraPlaceholder}`"
          />
          <y-date-picker
            v-else-if="SEARCH_TYPE.date.includes(searchType)"
            v-model="form[prop]"
            :type="searchType"
            :placeholder="`请选择${extraPlaceholder}`"
          />
          <y-input v-else v-model.trim="form[prop]" :placeholder="`请输入${extraPlaceholder}`" />
        </slot>
      </y-form-item>
    </y-form>
    <div class="button-group">
      <y-button type="primary" :size="size" @click="handleSearch">查 询</y-button>
      <y-button plain :size="size" @click="handleReset">重 置</y-button>
    </div>
    <i v-if="visibleCollapse" class="el-icon-arrow-up" @click="collapse = !collapse" />
  </div>
</template>

<script>
import { debounce, toRawType, getParentDom, filterData } from 'packages/utils'
import YForm from 'packages/form'
import YFormItem from 'packages/form-item'
import YInput from 'packages/input'
import YSelect from 'packages/select'
import YDatePicker from 'packages/date-picker'
import YButton from 'packages/button'

export const DATE_TYPE = {
  year: 'year',
  month: 'month',
  week: 'week',
  date: 'date',
  dates: 'dates',
  datetime: 'datetime',
  time: 'time',
  monthrange: 'monthrange',
  daterange: 'daterange',
  datetimerange: 'datetimerange'
}

const SEARCH_TYPE = {
  select: 'select',
  date: Object.keys(DATE_TYPE)
}

const WIDTH = {
  xl: 1400,
  lg: 1100,
  md: 750
}

export default {
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    size: String
  },
  components: {
    YForm,
    YFormItem,
    YInput,
    YSelect,
    YDatePicker,
    YButton
  },
  data() {
    return {
      SEARCH_TYPE,
      styleFormItem: undefined,
      visibleCollapse: false,
      collapse: true,
      form: {}
    }
  },
  methods: {
    initForm() {
      for (const { prop, initialValue } of this.columns) {
        if (toRawType(initialValue) === 'Array') {
          this.$set(this.form, prop, [...initialValue])
        } else if (toRawType(initialValue) === 'Object') {
          this.$set(this.form, prop, { ...initialValue })
        } else {
          this.$set(this.form, prop, initialValue)
        }
      }
    },
    initWatch() {
      for (const { prop, searchOnFieldChange, searchDebounce } of this.columns) {
        if (searchOnFieldChange) {
          this.$watch(
            `form.${[prop]}`,
            debounce(() => {
              if (this.reseting) return
              this.handleSearch()
            }, searchDebounce || 0)
          )
        }
      }
    },
    setInitialValue(prop, value) {
      const column = this.columns.find(({ prop: _prop }) => _prop === prop)
      column.initialValue = value
      this.setFieldValue(prop, value)
    },
    setInitialsValue(fields) {
      for (const prop of Object.keys(fields)) {
        this.setInitialValue(prop, fields[prop])
      }
    },
    getFieldValue(prop) {
      return this.form[prop]
    },
    getFieldsValue(props) {
      props = !!props && !!props.length ? props : this.columns.map(({ prop: _prop }) => _prop)
      const result = {}
      for (const prop of props) {
        result[prop] = this.getFieldValue(prop)
      }
      return result
    },
    setFieldValue(prop, value) {
      this.form[prop] = value
    },
    setFieldsValue(fields) {
      for (const prop of Object.keys(fields)) {
        this.setFieldValue(prop, fields[prop])
      }
    },
    resetFieldValue(prop) {
      const { initialValue } = this.columns.find(({ prop: _prop }) => _prop === prop)
      if (toRawType(initialValue) === 'Array') {
        this.form[prop] = [...initialValue]
      } else if (toRawType(initialValue) === 'Object') {
        this.form[prop] = { ...initialValue }
      } else {
        this.form[prop] = initialValue
      }
    },
    resetFieldsValue(props) {
      props =
        !!props && !!props.length
          ? props
          : this.columns.filter(({ ignoreOnReset }) => !ignoreOnReset).map(({ prop: _prop }) => _prop)
      for (const prop of props) {
        this.resetFieldValue(prop)
      }
    },
    setWidth() {
      if (this.$refs.wrapper) {
        const elParent = getParentDom(this.$refs.wrapper, 'y-pro-table', true)
        const parentWidth = elParent.clientWidth
        if (parentWidth >= WIDTH.xl) {
          this.styleFormItem = { width: '25%' }
        } else if (parentWidth >= WIDTH.lg) {
          this.styleFormItem = { width: '33.3%' }
        } else if (parentWidth >= WIDTH.md) {
          this.styleFormItem = { width: '50%' }
        } else {
          this.styleFormItem = undefined
        }
      }
    },
    setCollapseVisible() {
      if (this.$refs.wrapper) {
        const elSearchContent = this.$refs.wrapper.querySelector('.search-content')
        if (elSearchContent) {
          const contentHeight = elSearchContent.clientHeight
          this.visibleCollapse = contentHeight > this.wrapperHeight
        }
      }
    },
    handleSearch() {
      this.$emit('search', filterData(this.form))
    },
    handleReset() {
      this.reseting = true
      setTimeout(() => {
        this.reseting = false
      }, 100)
      this.resetFieldsValue()
      this.handleSearch()
    },
    submit() {
      this.handleSearch()
    },
    reset() {
      this.handleReset()
    }
  },
  computed: {
    extraPlaceholder() {
      const { columns } = this
      return !!columns && columns.length === 1 ? columns[0].label : ''
    },
    wrapperHeight() {
      return (
        {
          medium: 58,
          small: 50,
          mini: 46
        }[this.size] || 62
      )
    }
  },
  created() {
    this.initForm()
    this.initWatch()
    this.handleSearch()
  },
  beforeMount() {
    window.addEventListener('resize', this.setWidth)
    window.addEventListener('resize', this.setCollapseVisible)
  },
  mounted() {
    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
    const elParent = getParentDom(this.$refs.wrapper, 'y-pro-table', true)
    const observer = new MutationObserver(() => {
      this.setWidth()
      this.setCollapseVisible()
    })
    observer.observe(elParent, { attributes: true, subtree: true, attributeFilter: ['style'] })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setWidth)
    window.removeEventListener('resize', this.setCollapseVisible)
  }
}
</script>
