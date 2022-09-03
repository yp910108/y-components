<template>
  <el-table ref="table" v-bind="{ border: true, ...$attrs }" v-on="$listeners">
    <slot>
      <y-table-column
        v-for="({ slotHeader, slot, ..._column }, index) of _columns"
        v-bind="{
          resizable: false,
          showOverflowTooltip: true,
          ..._column
        }"
        :key="_column.prop || _column.type || index"
      >
        <slot v-if="$slots.default" />
        <template #header="{ column, $index }">
          <slot :name="slotHeader" :column="column" :$index="$index">
            {{ column.label }}
          </slot>
        </template>
        <template v-if="!_column.type || _column.type === 'expand'" #default="{ row, $index, column }">
          <slot :name="slot" :row="row" :$index="$index" :column="column">
            {{ renderText(_column, row, $index, column) }}
          </slot>
        </template>
      </y-table-column>
    </slot>
    <template #append>
      <slot name="append" />
    </template>
  </el-table>
</template>

<script>
import { camelize, scrollTo } from 'packages/utils'
import YTableColumn from 'packages/table-column'

export default {
  name: 'YTable',
  inheritAttrs: false,
  props: {
    columns: Array
  },
  components: {
    YTableColumn
  },
  methods: {
    renderText({ render, prop }, row, index, column) {
      if (!!render && typeof render === 'function') {
        return render(row[prop], row, index, column)
      } else {
        return row[prop]
      }
    },
    scrollToTop() {
      if (this.$refs.table) {
        const el = this.$refs.table.$el.querySelector('.el-table__body-wrapper')
        scrollTo(el)
      }
    }
  },
  computed: {
    _columns() {
      return (this.columns || []).map((column) => {
        const result = {}
        for (const key in column) {
          result[camelize(key)] = column[key]
        }
        return result
      })
    }
  },
  watch: {
    '$attrs.data'(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$nextTick(this.$refs.table.doLayout)
        setTimeout(this.scrollToTop)
      }
    }
  },
  mounted() {
    for (const key in this.$refs.table) {
      if (!(key in this) && typeof this.$refs.table[key] === 'function') {
        this[key] = this.$refs.table[key]
      }
    }
    window.addEventListener('resize', this.$refs.table.doLayout)
  },
  activated() {
    this.$refs.table.doLayout()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.$refs.table.doLayout)
  }
}
</script>
