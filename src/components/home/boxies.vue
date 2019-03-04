<template>
  <div class="boxies-container">
    <div class="title">
      <strong>{{ title }}</strong>
    </div>
    <div class="main">
      <slot name="main"></slot>  
    </div>
  </div>  
</template>

<script>
export default {
  props: {
    title: {
      type: String
    }
  }
}
</script>

<style lang="less" scoped>
.boxies-container {
  border: 1px solid #e6e6e6;
  .title {
    text-align: center;
    height: 50px;
    line-height: 50px;
    color: #666;
    border-bottom: 1px solid #e6e6e6;
  }
  .main {
    padding: 20px;
    box-sizing: border-box;
    text-align: center;
    color: #666;
    font-size: 20px;
  }
}
</style>


