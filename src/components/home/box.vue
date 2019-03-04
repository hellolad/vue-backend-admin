<template>
  <div class="box-container">
    <div class="box">
      <div class="box-header">
        <strong class="title">{{ title }}</strong>
      </div>
      <div class="box-main">
        <slot name="main"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    },
  }
}
</script>

<style lang="less" scoped>
@import '../../styles/vars.less';

.box-container {
  .box {
    width: 100%;
    border: 1px solid #e6e6e6;
    .box-header {
      width: 100%;
      height: 50px;
      background: @box-header-color;
      .title {
        color: #666;
        line-height: 50px;
        padding-left: 20px;
        box-sizing: border-box;
      }
    }
    .box-main {
      padding: 20px;
      box-sizing: border-box;
    }
  }
}
a {
  text-decoration: none;
  color: @blue;
  font-size: 17px;
}

</style>

