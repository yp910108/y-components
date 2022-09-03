## 安装

### npm 安装

推荐使用 npm 的方式安装，它能更好地和 [webpack](https://webpack.js.org/) 打包工具配合使用。

```shell
# y-components 依赖于 element-ui，首先安装 element-ui
npm i element-ui@2.13.2 -S
npm i @yp910108/y-components -S

# 或
npm i element-ui@2.13.2 @yp910108/y-components -S
```

### CDN

目前可以通过 [unpkg.com/y-components](https://unpkg.com/@yp910108/y-components/) 获取到最新版本的资源，在页面上引入 js 和 css 文件即可开始使用。

```html
<!-- 在引入之前首先引入 element-ui -->
<link rel="stylesheet" href="https://unpkg.com/element-ui@2.13.2/lib/theme-chalk/index.css" />
<!-- 引入样式 -->
<link rel="stylesheet" href="https://unpkg.com/@yp910108/y-components/lib/theme/index.css" />

<!-- 在引入之前首先引入 vue 和 element-ui -->
<script src="https://unpkg.com/vue@2.6.14/dist/vue.js"></script>
<script src="https://unpkg.com/element-ui@2.13.2/lib/index.js"></script>
<!-- 引入组件库 -->
<script src="https://unpkg.com/@yp910108/y-components/lib/index.js"></script>
```

:::tip
我们建议使用 CDN 引入 y-components 的用户在链接地址上锁定版本，以免将来 y-components 升级时受到非兼容性更新的影响。锁定版本的方法请查看 [unpkg.com](https://unpkg.com)。
:::

### Hello world

通过 CDN 的方式我们可以很容易地使用 y-components 写出一个 Hello world 页面。[在线演示](https://codepen.io/yp910108/pen/NWYEEYL)

<iframe height="300" style="width: 100%;" scrolling="no" title="y-components demo" src="https://codepen.io/yp910108/embed/NWYEEYL?default-tab=html&theme-id=light" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/yp910108/pen/NWYEEYL">
  y-components demo</a> by yp910108 (<a href="https://codepen.io/yp910108">@yp910108</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

如果是通过 npm 安装，并希望配合 webpack 使用，请阅读下一节：[快速上手](#/quickstart)。
