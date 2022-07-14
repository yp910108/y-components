<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
html {
  box-sizing: border-box;
  height: 100%;
  font-size: 14px;
  color: #606266;
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  ::-webkit-scrollbar-track {
    background: #f6f6f6;
    border-radius: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background: #9093994d;
    border-radius: 5px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #90939980;
  }
  ::-webkit-scrollbar-corner {
    background: #f6f6f6;
  }
  ::selection {
    color: #fff;
    background: #409eff;
  }
}

body {
  height: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
  overflow: hidden;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

a,
a:focus,
a:hover {
  cursor: pointer;
  color: inherit;
  text-decoration: none;
}

input {
  &:-webkit-autofill {
    transition: background-color 5000s ease-in-out 0s;
  }
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.el-form .el-form-item .el-form-item__content {
  .el-input,
  .el-input-number,
  .el-select,
  .el-cascader,
  .y-date-editor-wrapper {
    vertical-align: top;
    width: 100%;
  }
}
</style>

<style lang="scss" scoped>
#app {
  height: 100%;
}
</style>
