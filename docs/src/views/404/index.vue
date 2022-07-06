<template>
  <div class="wrapper">
    <img src="./404.svg" />
    <span class="title">页面不存在</span>
    <span class="desc">对不起, 您访问的页面地址不存在。</span>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70%;
  .title {
    margin-top: 24px;
    line-height: 1.8;
    font-size: 24px;
    color: rgba(0, 0, 0, 0.85);
  }
  .desc {
    line-height: 1.6;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
  }
}
</style>
