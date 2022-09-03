## 快速上手

本节将介绍如何在项目中使用 y-components

### 引入 y-components

你可以引入整个 y-components，或是根据需要仅引入部分组件。我们先介绍如何引入完整的 y-components。

#### 完整引入

在 main.js 中写入以下内容：

```javascript
import Vue from 'vue'
import Element from 'element-ui'
import YComponents from '@yp910108/y-components'
import 'element-ui/lib/theme-chalk/index.css'
import '@yp910108/y-components/lib/theme/index.css'
import App from './App.vue'

Vue.use(YComponents)

new Vue({
  el: '#app',
  render: (h) => h(App)
})
```

以上代码便完成了 y-components 的引入。

#### 按需引入

借助 [babel-plugin-component](https://github.com/yp910108/babel-plugin-component)，我们可以只引入需要的组件，以达到减小项目体积的目的。

首先，安装 babel-plugin-component：

```bash
npm i @yp910108/babel-plugin-component -D
```

然后，在 .babelrc 添加 plugins：

```json
{
  "plugins": [
    [
      "component",
      {
        "libraryName": "@yp910108/y-components"
      }
    ]
  ]
}
```

接下来，如果你只希望引入部分组件，比如 Button 和 Select，那么需要在 main.js 中写入以下内容：

```javascript
import Vue from 'vue'
import { Button, Select } from '@yp910108/y-components'
import App from './App.vue'

Vue.component(Button.name, Button)
Vue.component(Select.name, Select)
/* 或写为
 * Vue.use(Button)
 * Vue.use(Select)
 */

new Vue({
  el: '#app',
  render: (h) => h(App)
})
```

完整组件列表和引入方式（完整组件列表以 [components.json](https://github.com/yp910108/y-components/blob/master/components.json) 为准）：

```javascript
import Vue from 'vue'
import {
  Button,
  Select,
  Loading,
  Message,
  MessageBox,
  Notification,
  // ...
  ProTable,
  TreeSelect,
  ListSelect,
  ListSelectPane
} from '@yp910108/y-components'

Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 }

Vue.use(Button)
Vue.use(Select)
// ...
Vue.use(ProTable)
Vue.use(TreeSelect)
Vue.use(ListSelect)
Vue.use(ListSelectPane)

Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service
Vue.prototype.$message = Message
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
```
