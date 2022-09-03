## DatePicker 日期选择器

y-date-picker 组件将 el-time-picker、el-date-picker 以及 el-date-picker 合并成一个，通过 type 属性进行区分，简化调用方式。

### 选择日期

:::demo 如果 `type` 属性不设置，则默认是日期类型。

```html
<y-date-picker v-model="value" />

<script>
  export default {
    data() {
      return {
        value: undefined
      }
    }
  }
</script>
```

:::

### 选择时间

:::demo 通过将 `type` 属性设置为 `time`，可以将控件改为时间类型。

```html
<y-date-picker v-model="value" type="time" />

<script>
  export default {
    data() {
      return {
        value: undefined
      }
    }
  }
</script>
```

:::

### 选择日期时间

:::demo 通过将 `type` 属性设置为 `datetime`，可以将控件改为日期时间类型。

```html
<y-date-picker v-model="value" type="datetime" />

<script>
  export default {
    data() {
      return {
        value: undefined
      }
    }
  }
</script>
```

:::

:::tip
y-date-picker 支持 el-time-picker、el-date-picker 以及 el-date-picker 的所有属性、事件以及方法，完整的 API 请参考[官方网站](https://element.eleme.cn/2.13/#/zh-CN/component/date-picker#attributes)。
:::

### Attributes

| 参数 | 说明     | 类型   | 可选值                                                                                        | 默认值 |
| ---- | -------- | ------ | --------------------------------------------------------------------------------------------- | ------ |
| type | 显示类型 | string | year / month / week / date / dates / datetime / time / monthrange / daterange / datetimerange | date   |
