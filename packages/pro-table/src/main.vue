<template>
  <div
    :class="{
      'y-pro-table': true,
      [`y-pro-table--${sizeTable}`]: sizeTable
    }"
  >
    <search
      v-if="search && !!columnsSearch && columnsSearch.length > 1"
      ref="search"
      :columns="columnsSearch"
      @search="handleSearch"
    >
      <template v-for="slotSearch of slotsSearch" #[slotSearch]="{ params, prop }">
        <slot :name="slotSearch" :params="params" :prop="prop" />
      </template>
    </search>
    <div v-if="!!attrsToolbar" class="toolbar-wrapper">
      <slot name="toolbar">
        <div class="toolbar-left">
          <slot name="toolbar-left" />
        </div>
        <div class="toolbar-right">
          <slot name="toolbar-right" />
          <search
            v-if="search && (!columnsSearch || columnsSearch.length <= 1)"
            ref="search"
            :columns="columnsSearch"
            :size="sizeTable"
            @search="handleSearch"
          >
            <template v-for="slotSearch of slotsSearch" #[slotSearch]="{ params, prop }">
              <slot :name="slotSearch" :params="params" :prop="prop" />
            </template>
          </search>
          <settings
            v-if="!!attrsToolbar.settings"
            ref="settings"
            :columns="columnsSettings"
            class="settings-wrapper"
            @column-reset="handleResetColumn"
            @column-toggle="handleToggleColumn"
            @column-up="handleMoveColumn('up', $event)"
            @column-down="handleMoveColumn('down', $event)"
            @column-move="handleDragColumn"
          />
        </div>
      </slot>
    </div>
    <div class="table-wrapper">
      <y-table
        ref="table"
        v-loading="loadingTable"
        v-bind="{ data, height: !!_pagination ? 'calc(100% - 44px)' : '100%', ...$attrs, columns: columnsTable }"
        v-on="$listeners"
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
      </y-table>
      <y-pagination
        v-if="!!_pagination"
        v-bind="{
          total,
          currentPage,
          pageSize,
          ..._pagination
        }"
        v-on="{
          'update:currentPage': (newCurrentPage) => (currentPage = newCurrentPage),
          'update:pageSize': (newPageSize) => (pageSize = newPageSize),
          'current-change': fetch,
          'size-change': fetch,
          ..._pagination
        }"
      />
    </div>
  </div>
</template>

<script>
import { camelize } from 'packages/utils'
import YTable from 'packages/table'
import YPagination from 'packages/pagination'
import { conditionSearch, conditionSettings, conditionTable } from './util'
import mixin from './mixin'
import Search from './search'
import Settings from './settings'

export default {
  name: 'YProTable',
  inheritAttrs: false,
  mixins: [mixin],
  inject: {
    elForm: {
      default: () => ({})
    },
    elFormItem: {
      default: () => ({})
    }
  },
  props: {
    search: {
      type: Boolean,
      default: true
    },
    toolbar: {
      type: [Object, Boolean],
      default: () => ({})
    },
    pagination: {
      type: [Object, Boolean],
      default: () => ({})
    },
    request: Function,
    size: String
  },
  components: {
    YTable,
    YPagination,
    Search,
    Settings
  },
  data() {
    return {
      loading: false,
      currentPage: 1, // 当前页码
      pageSize: 20, // 每页显示条数
      total: 0, // 总条数
      params: undefined,
      data: undefined
    }
  },
  methods: {
    async fetch() {
      if (!!this.request) {
        const { currentPage } = this
        const pageSize = this._pagination.pageSize || this.pageSize
        try {
          this.loading = true
          const { total = 0, data = [] } = (await this.request({ currentPage, pageSize, ...this.params })) || {}
          this.loading = false
          this.total = total
          this.data = data
        } catch (e) {
          console.warn(e)
          this.loading = false
        }
      }
    },
    handleSearch(params) {
      this.currentPage = 1
      this.params = params
      this.fetch()
      this.$emit('search', params)
    },
    reload() {
      this.currentPage = 1
      this.fetch()
      this.$emit('search', this.params)
    },
    reset() {
      if (this.$refs.search) {
        this.$refs.search.reset()
      } else {
        this.reload()
      }
    }
  },
  computed: {
    sizeTable() {
      return this.size || this.elFormItem.size || this.elForm.size || (this.$ELEMENT || {}).size
    },
    attrsToolbar() {
      if (!this.toolbar) {
        return false
      } else {
        return {
          settings: true,
          ...this.toolbar
        }
      }
    },
    columns() {
      for (const column of this.$attrs.columns) {
        for (const key in column) {
          column[camelize(key)] = column[key]
        }
      }
      const columnsSearch = this.$attrs.columns.filter(conditionSearch)
      for (const [i, column] of columnsSearch.entries()) {
        this.$set(column, 'searchIndex', i)
      }
      const columnsInTable = this.$attrs.columns.filter(conditionTable)
      for (const [i, column] of columnsInTable.entries()) {
        this.$set(column, 'originTableIndex', i)
        this.$set(column, 'tableIndex', column.tableIndex === undefined ? i : column.tableIndex)
      }
      const columnsSettings = this.$attrs.columns.filter(conditionSettings)
      for (const column of columnsSettings) {
        this.$set(column, 'hideInSettings', !!column.hideInSettings)
      }
      return this.$attrs.columns
    },
    columnsSearch() {
      return this.columns.filter(conditionSearch).sort((val1, val2) => (val1.searchIndex > val2.searchIndex ? 1 : -1))
    },
    slotsSearch() {
      const columns = this.columnsSearch.filter((column) => !!column.slotSearch)
      return columns.map((column) => column.slotSearch)
    },
    columnsSettings() {
      return this.columns.filter(conditionSettings).sort((val1, val2) => (val1.tableIndex > val2.tableIndex ? 1 : -1))
    },
    columnsTable() {
      return this.columns.filter(conditionTable)
    },
    slotsHeader() {
      const columns = this.columnsTable.filter((column) => !!column.slotHeader)
      return columns.map((column) => column.slotHeader)
    },
    slotsColumn() {
      const columns = this.columns.filter((column) => !!column.slot)
      return columns.map((column) => column.slot)
    },
    loadingTable() {
      const { $attrs, loading } = this
      return $attrs.loading !== undefined ? $attrs.loading : loading
    },
    _pagination() {
      if (typeof this.pagination === 'boolean') {
        return this.pagination
      }
      const result = {}
      for (const key in this.pagination) {
        if (['current-change', 'currentChange'].includes(key)) {
          result['current-change'] = this.pagination[key]
        } else if (['size-change', 'sizeChange'].includes(key)) {
          result['size-change'] = this.pagination[key]
        } else {
          result[camelize(key)] = this.pagination[key]
        }
      }
      return result
    }
  },
  mounted() {
    if (
      !this.search ||
      this.$slots.toolbar ||
      (!this.attrsToolbar && (!this.columnsSearch || this.columnsSearch.length <= 1))
    ) {
      this.fetch()
    }
  }
}
</script>
