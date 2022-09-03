<template>
  <el-select ref="select" v-bind="{ filterable: true, clearable: true, ...$attrs }" v-on="$listeners">
    <slot>
      <template v-if="isGroup">
        <y-option-group v-for="group in options" :key="group[__props.value]" :label="group[__props.label]">
          <y-option
            v-for="item in group[__props.options]"
            :key="item[__props.value]"
            :label="item[__props.label]"
            :value="item[__props.value]"
          />
        </y-option-group>
      </template>
      <template v-else>
        <y-option
          v-for="item in options"
          :key="item[__props.value]"
          :label="item[__props.label]"
          :value="item[__props.value]"
        />
      </template>
    </slot>
    <template #prefix>
      <slot name="prefix" />
    </template>
    <template #empty>
      <slot name="empty" />
    </template>
  </el-select>
</template>

<script>
import YOptionGroup from 'packages/option-group'
import YOption from 'packages/option'

export default {
  name: 'YSelect',
  inheritAttrs: false,
  props: {
    props: Object,
    options: Array
  },
  components: {
    YOptionGroup,
    YOption
  },
  computed: {
    // hack: _props is a attr of vue, so use __props
    __props() {
      return {
        value: 'value',
        label: 'label',
        options: 'options',
        ...this.props
      }
    },
    isGroup() {
      if (!this.options || !this.options.length) {
        return false
      }
      return this.options.some((option) => !!option[this.__props.options])
    }
  },
  mounted() {
    for (const key in this.$refs.select) {
      if (!(key in this) && typeof this.$refs.select[key] === 'function') {
        this[key] = this.$refs.select[key]
      }
    }
  }
}
</script>
