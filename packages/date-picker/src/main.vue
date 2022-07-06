<template>
  <range-picker
    v-if="[TYPE.monthrange, TYPE.daterange, TYPE.datetimerange].includes(_attrs.type)"
    v-bind="_attrs"
    v-on="$listeners"
  />
  <time-pick v-else-if="_attrs.type === TYPE.time" v-bind="{ ..._attrs, type: undefined }" v-on="$listeners" />
  <date-picker v-else v-bind="_attrs" v-on="$listeners" />
</template>

<script>
import { camelize } from 'packages/utils'
import { TYPE } from './constant'
import RangePicker from './range-picker'
import TimePick from './time-pick'
import DatePicker from './date-picker'

export default {
  name: 'YDatePicker',
  inheritAttrs: false,
  components: {
    RangePicker,
    TimePick,
    DatePicker
  },
  data() {
    return {
      TYPE
    }
  },
  computed: {
    _attrs() {
      const result = {}
      for (const key in this.$attrs) {
        result[camelize(key)] = this.$attrs[key]
      }
      return result
    }
  }
}
</script>
