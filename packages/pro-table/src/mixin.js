export default {
  methods: {
    initEvents() {
      for (const key in this.$refs.search) {
        if (!(key in this) && typeof this.$refs.search[key] === 'function') {
          this[key] = this.$refs.search[key]
        }
      }
      for (const key in this.$refs.table) {
        if (!(key in this) && typeof this.$refs.table[key] === 'function') {
          this[key] = this.$refs.table[key]
        }
      }
    },
    moveColumn(index, targetIndex) {
      const elCols = this.$refs.table.$el.querySelectorAll('colgroup')
      for (const elCol of elCols) {
        const elOld = elCol.children[index]
        elCol.removeChild(elOld)
        const elNew = elCol.children[targetIndex]
        elCol.insertBefore(elOld, elNew)
      }
      const elTrs = this.$refs.table.$el.querySelectorAll('tr')
      for (const elTr of elTrs) {
        const elOld = elTr.children[index]
        elTr.removeChild(elOld)
        const elNew = elTr.children[targetIndex]
        elTr.insertBefore(elOld, elNew)
      }
    },
    handleResetColumn() {
      for (const column of this.columnsSettings) {
        column.hideInSettings = false
        while (column.tableIndex > column.originTableIndex) {
          this.handleMoveColumn('up', column.prop)
        }
        while (column.tableIndex < column.originTableIndex) {
          this.handleMoveColumn('down', column.prop)
        }
      }
      const elCols = this.$refs.table.$el.querySelectorAll('colgroup')
      const elTrs = this.$refs.table.$el.querySelectorAll('tr')
      for (const elCol of elCols) {
        for (const el of elCol.children) {
          if (el.style.display === 'none') {
            el.style.display = ''
          }
        }
      }
      for (const elTr of elTrs) {
        for (const el of elTr.children) {
          if (el.style.display === 'none') {
            el.style.display = ''
          }
        }
      }
    },
    handleToggleColumn(props) {
      const elCols = this.$refs.table.$el.querySelectorAll('colgroup')
      const elTrs = this.$refs.table.$el.querySelectorAll('tr')
      for (const column of this.columnsSettings) {
        const { prop, tableIndex } = column
        if (props.includes(prop)) {
          column.hideInSettings = false
          for (const elCol of elCols) {
            const el = elCol.children[tableIndex]
            if (el.style.display === 'none') {
              el.style.display = ''
            }
          }
          for (const elTr of elTrs) {
            const el = elTr.children[tableIndex]
            if (el.style.display === 'none') {
              el.style.display = ''
            }
          }
        } else {
          column.hideInSettings = true
          for (const elCol of elCols) {
            const el = elCol.children[tableIndex]
            if (el.style.display === '') {
              el.style.display = 'none'
            }
          }
          for (const elTr of elTrs) {
            const el = elTr.children[tableIndex]
            if (el.style.display === '') {
              el.style.display = 'none'
            }
          }
        }
      }
    },
    handleMoveColumn(action, prop) {
      const column = this.columnsSettings.find(({ prop: currProp }) => currProp === prop)
      const { tableIndex } = column
      const targetTableIndex = action === 'up' ? tableIndex - 1 : tableIndex + 1
      const targetColumn = this.columnsSettings.find(({ tableIndex: _index }) => _index === targetTableIndex)
      column.tableIndex = targetTableIndex
      targetColumn.tableIndex = tableIndex
      this.moveColumn(tableIndex, targetTableIndex)
    },
    handleDragColumn(elIndex, elTargetIndex) {
      if (elIndex === elTargetIndex) return
      const column = this.columnsSettings[elIndex]
      const targetColumn = this.columnsSettings[elTargetIndex]
      const { tableIndex } = column
      const { tableIndex: targetTableIndex } = targetColumn
      if (tableIndex < targetTableIndex) {
        for (const _column of this.columnsSettings) {
          if (_column.tableIndex > tableIndex && _column.tableIndex <= targetTableIndex) {
            _column.tableIndex -= 1
          }
        }
      } else {
        for (const _column of this.columnsSettings) {
          if (_column.tableIndex >= targetTableIndex && _column.tableIndex < tableIndex) {
            _column.tableIndex += 1
          }
        }
      }
      column.tableIndex = targetTableIndex
      this.moveColumn(tableIndex, targetTableIndex)
    }
  },
  mounted() {
    this.initEvents()
  }
}
