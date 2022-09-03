## Icon 图标

除了 element-ui 自带的字体图标，基于 svg + symbol 技术封装了自定义图标组件。

### 使用方法

#### 下载字体文件

自定义图标组件需要使用 svg 作为字体图标。将下载的 .svg 文件放入项目中，本文以 src/icons 为例。推荐使用 [iconfont](https://www.iconfont.cn/) 作为图标库。

#### 配置项目

安装 [svg-sprite-loader](https://github.com/JetBrains/svg-sprite-loader)：

```shell
npm i svg-sprite-loader -D
```

在 main.js 中引入所有字体图标：

```javascript
const icons = require.context('./icons', false, /\.svg$/)
for (const key of icons.keys()) {
  icons(key)
}
```

修改 vue.config.js：

```javascript
module.exports = {
  chainWebpack(config) {
    config.module.rule('svg').exclude.add(resolve('src/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}
```

#### 图标使用

:::demo

```html
<div class="y-icon-demo">
  <y-icon icon="github"></y-icon>
  <y-icon icon="weixin"></y-icon>
  <y-icon icon="qq"></y-icon>
  <y-icon icon="weibo"></y-icon>
  <y-icon icon="favorite"></y-icon>
  <y-icon icon="lock"></y-icon>
  <y-icon icon="Aa"></y-icon>
  <y-icon icon="diamond"></y-icon>
  <y-icon icon="comment"></y-icon>
  <y-icon icon="search"></y-icon>
</div>

<style>
  .y-icon-demo .y-icon {
    margin: 0 20px;
    font-size: 1.5em;
    color: #606266;
  }
</style>
```

:::

### Attributes

| 参数 | 说明     | 类型   | 可选值 | 默认值 |
| ---- | -------- | ------ | ------ | ------ |
| icon | 图标名称 | string | —      | —      |
