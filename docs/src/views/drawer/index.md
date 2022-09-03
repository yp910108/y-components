## Drawer 抽屉

y-drawer 组件增加了 footer 插槽。

### 用法演示

:::demo 通过 `footer` 插槽自定义脚步内容。

```html
<y-drawer :visible.sync="visible" title="测试标题" size="850px">
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <template #footer>
    <y-button plain @click="hide">取消</y-button>
    <y-button type="primary">确 定</y-button>
  </template>
</y-drawer>
<y-button type="primary" @click="show">点我打开</y-button>

<script>
  export default {
    data() {
      return {
        visible: false
      }
    },
    methods: {
      show() {
        this.visible = true
      },
      hide() {
        this.visible = false
      }
    }
  }
</script>

<style>
  .el-drawer__content {
    color: #606266;
  }
</style>
```

:::

### 内容滚动

:::demo 当内容超出页面高度时，内容区域滚动。

```html
<y-drawer :visible.sync="visible" title="测试标题" size="850px">
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <div>这是内容！</div>
  <template #footer>
    <y-button plain @click="hide">取消</y-button>
    <y-button type="primary">确 定</y-button>
  </template>
</y-drawer>
<y-button type="primary" @click="show">点我打开</y-button>

<script>
  export default {
    data() {
      return {
        visible: false
      }
    },
    methods: {
      show() {
        this.visible = true
      },
      hide() {
        this.visible = false
      }
    }
  }
</script>

<style>
  .el-drawer__content {
    color: #606266;
  }
</style>
```

:::

:::tip
y-drawer 支持 el-drawer 的所有属性、事件以及方法，完整的 API 请参考[官方网站](https://element.eleme.cn/2.13/#/zh-CN/component/drawer#drawer-attributes)。
:::

### Slot

| name   | 说明                   |
| ------ | ---------------------- |
| footer | 抽屉主体 footer 的内容 |
