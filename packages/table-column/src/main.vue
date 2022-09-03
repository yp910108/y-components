<template>
  <el-table-column
    v-bind="{
      resizable: false,
      showOverflowTooltip: true,
      ...$attrs
    }"
    v-on="$listeners"
  >
    <slot v-if="$slots.default" />
    <template #header="{ column, $index }">
      <slot name="header" :column="column" :$index="$index">
        {{ column.label }}
      </slot>
    </template>
    <template v-if="!this.$attrs.type || this.$attrs.type === 'expand'" #default="{ row, $index, column }">
      <slot :row="row" :$index="$index" :column="column">
        {{ row[column.property] }}
      </slot>
    </template>
  </el-table-column>
</template>

<script>
export default {
  name: 'YTableColumn',
  inheritAttrs: false
}
</script>
