<template>
  <y-dropdown type="primary" trigger="click" class="y-pro-table-settings" :hide-on-click="false">
    <y-button type="primary" icon="el-icon-setting" />
    <y-dropdown-menu ref="dropdown" slot="dropdown" class="y-pro-table-settings-popper">
      <y-dropdown-item class="check-all-wrapper">
        <y-checkbox v-model="checkAll" :indeterminate="indeterminate">列展示/排序</y-checkbox>
        <y-button type="text" @click="handleReset">重置</y-button>
      </y-dropdown-item>
      <y-scrollbar>
        <y-checkbox-group v-model="checked">
          <y-dropdown-item v-for="({ label, prop }, index) of columns" :key="prop">
            <i class="el-icon-rank" />
            <y-checkbox :label="prop">{{ label }}</y-checkbox>
            <span class="y-pro-table-settings-operation">
              <i v-if="index !== 0" class="el-icon-upload2" @click="handleUp(prop)" />
              <i v-if="index !== columns.length - 1" class="el-icon-download" @click="handleDown(prop)" />
            </span>
          </y-dropdown-item>
        </y-checkbox-group>
      </y-scrollbar>
    </y-dropdown-menu>
  </y-dropdown>
</template>

<script>
import sortable from 'sortablejs'
import YScrollBar from 'packages/scrollbar'
import YDropdown from 'packages/dropdown'
import YDropdownMenu from 'packages/dropdown-menu'
import YDropdownItem from 'packages/dropdown-item'
import YCheckboxGroup from 'packages/checkbox-group'
import YCheckbox from 'packages/checkbox'

export default {
  props: {
    columns: {
      type: Array,
      default: () => []
    }
  },
  components: {
    YScrollBar,
    YDropdown,
    YDropdownMenu,
    YDropdownItem,
    YCheckboxGroup,
    YCheckbox
  },
  methods: {
    handleReset() {
      this.$emit('column-reset')
    },
    handleUp(prop) {
      this.$emit('column-up', prop)
    },
    handleDown(prop) {
      this.$emit('column-down', prop)
    },
    setSort() {
      if (this.sortable) {
        this.sortable.destroy()
      }
      const el = this.$refs.dropdown.$el.querySelector('.el-checkbox-group')
      this.sortable = sortable.create(el, {
        animation: 200,
        easing: 'linear',
        onEnd: ({ oldIndex, newIndex }) => {
          this.$emit('column-move', oldIndex, newIndex)
        }
      })
    }
  },
  computed: {
    checked: {
      get() {
        const columnsChecked = this.columns.filter(({ hideInSettings }) => !hideInSettings)
        return columnsChecked.map(({ prop }) => prop)
      },
      set(newVal) {
        this.$emit('column-toggle', newVal)
      }
    },
    checkAll: {
      get() {
        return this.checked.length === this.columns.length
      },
      set(newVal) {
        if (newVal) {
          this.checked = this.columns.map(({ prop }) => prop)
        } else {
          this.checked = []
        }
      }
    },
    indeterminate() {
      return !this.checkAll && !!this.checked.length
    }
  },
  watch: {
    columns() {
      this.$nextTick(() => {
        this.setSort()
      })
    }
  }
}
</script>
