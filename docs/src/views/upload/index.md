## Upload 上传

y-upload 通过 v-model 的形式绑定上传路径，简化调用方式。

### 演示

:::demo 通过 `v-model` 的形式绑定上传路径。

```html
<template>
  <div>
    <y-upload v-model="files" action="/api/upload" list-type="picture">
      <y-button size="small" type="primary">点击上传</y-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </y-upload>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        files: [
          {
            name: 'food.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          }
        ]
      }
    }
  }
</script>
```

:::

:::tip
y-upload 支持 el-upload 的所有属性、事件以及方法，完整的 API 请参考[官方网站](https://element.eleme.cn/2.13/#/zh-CN/component/upload#attribute)。
:::

### Attributes

| 参数            | 说明   | 类型           | 可选值 | 默认值 |
| --------------- | ------ | -------------- | ------ | ------ |
| value / v-model | 绑定值 | string / array | —      | —      |
